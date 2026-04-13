/**
 * BillDesk Service
 *
 * Handles Symmetric JOSE (JWE + JWS) and Create Order API calls.
 * Uses JOSE library for encryption (JWE) and signing (JWS) with HMAC-SHA256.
 *
 * Docs reference:
 * - BillDesk Web SDK Specs One Time Payments (HMAC) v1.5
 * - https://www.billdesk.com/web/onboarding-documents
 */

"use strict";

const { CompactSign, compactVerify, CompactEncrypt, compactDecrypt } = require("jose");
const crypto = require("crypto");

/**
 * @typedef {Object} BillDeskConfig
 * @property {string} merchantId
 * @property {string} clientId
 * @property {string | undefined} signingKeyId
 * @property {string | undefined} encryptionKeyId
 * @property {"JWS" | "SYMMETRIC"} joseMode
 * @property {Uint8Array} signingKeyBytes
 * @property {Uint8Array | null} encryptionKeyBytes
 * @property {string} env
 * @property {string} baseUrl
 * @property {string} createOrderUrl
 * @property {string} transactionStatusUrl
 * @property {string} sdkBaseUrl
 */

/**
 * @param {unknown} error
 * @returns {string}
 */
function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * BillDesk expects an ISO timestamp with explicit timezone offset and no milliseconds.
 * Example: 2026-04-13T14:35:22+05:30
 * @param {Date=} date
 * @returns {string}
 */
function getBillDeskTimestamp(date = new Date()) {
  const istOffsetMinutes = 330;
  const shifted = new Date(date.getTime() + istOffsetMinutes * 60 * 1000);

  const year = shifted.getUTCFullYear();
  const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const day = String(shifted.getUTCDate()).padStart(2, "0");
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const minutes = String(shifted.getUTCMinutes()).padStart(2, "0");
  const seconds = String(shifted.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
}

/**
 * BillDesk expects BD-Timestamp as epoch timestamp of the server.
 * Default to seconds; set BILLDESK_TIMESTAMP_UNIT=MILLISECONDS if required by gateway config.
 * @param {Date=} date
 * @returns {string}
 */
function getBillDeskEpochTimestamp(date = new Date()) {
  const unit = (process.env.BILLDESK_TIMESTAMP_UNIT || "SECONDS").toUpperCase();
  const epochMs = date.getTime();
  return unit === "MILLISECONDS"
    ? String(epochMs)
    : String(Math.floor(epochMs / 1000));
}

/**
 * BillDesk Traceid should be alphanumeric and max length 35.
 * @returns {string}
 */
function getBillDeskTraceId() {
  return `${Date.now()}${crypto.randomBytes(16).toString("hex")}`.slice(0, 35);
}

/**
 * BillDesk additional_info values should be simple strings.
 * Keep only safe characters and short lengths to avoid schema rejections.
 * @param {unknown} value
 * @returns {string}
 */
function sanitizeAdditionalInfoValue(value) {
  if (value === null || value === undefined) return "NA";
  const normalized = String(value)
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 ._\/-]/g, "")
    .trim();

  if (!normalized) return "NA";
  return normalized.slice(0, 100);
}

/**
 * Build BillDesk additional_info object with 7 slots.
 * Avoid passing PII in additional_info as per BillDesk guidance.
 * @param {string} feeType
 * @param {Object} additionalInfo
 * @returns {{
 *  additional_info1: string,
 *  additional_info2: string,
 *  additional_info3: string,
 *  additional_info4: string,
 *  additional_info5: string,
 *  additional_info6: string,
 *  additional_info7: string,
 * }}
 */
function getBillDeskAdditionalInfo(feeType, additionalInfo = {}) {
  const info =
    additionalInfo && typeof additionalInfo === "object"
      ? /** @type {Record<string, unknown>} */ (additionalInfo)
      : {};

  // Use non-PII business/context references in additional info.
  const reference1 =
    info["nitTenderNo"] || info["payDetails"] || info["feeType"] || "NA";
  const reference2 = info["dept"] || info["location"] || "NA";

  return {
    additional_info1: sanitizeAdditionalInfoValue(feeType || "JMC_FEE"),
    additional_info2: sanitizeAdditionalInfoValue(reference1),
    additional_info3: sanitizeAdditionalInfoValue(reference2),
    additional_info4: "NA",
    additional_info5: "NA",
    additional_info6: "NA",
    additional_info7: "NA",
  };
}

// ── Helpers ─────────────────────────────────────────────

/**
 * Get BillDesk config from environment
 */
/**
 * @returns {BillDeskConfig}
 */
function getConfig() {
  const merchantId = process.env.BILLDESK_MERCHANT_ID;
  const clientId = process.env.BILLDESK_CLIENT_ID;
  const signingKey =
    process.env.BILLDESK_SIGNING_KEY || process.env.BILLDESK_SECRET_KEY;
  const encryptionKey =
    process.env.BILLDESK_ENCRYPTION_KEY || process.env.BILLDESK_SECRET_KEY;
  const signingKeyId = process.env.BILLDESK_SIGNING_KEY_ID;
  const encryptionKeyId = process.env.BILLDESK_ENCRYPTION_KEY_ID;
  const rawJoseMode = (process.env.BILLDESK_JOSE_MODE ||
    (process.env.BILLDESK_ENCRYPTION_KEY ? "SYMMETRIC" : "JWS"))
    .toUpperCase();
  /** @type {"JWS" | "SYMMETRIC"} */
  const joseMode = rawJoseMode === "SYMMETRIC" ? "SYMMETRIC" : "JWS";
  const rawKeyFormat = (process.env.BILLDESK_KEY_FORMAT || "RAW").toUpperCase();
  /** @type {"RAW" | "BASE64"} */
  const keyFormat = rawKeyFormat === "BASE64" ? "BASE64" : "RAW";
  const env = (process.env.BILLDESK_ENV || "UAT").toUpperCase();

  const baseUrl =
    env === "PRODUCTION"
      ? "https://api.billdesk.com"
      : "https://uat1.billdesk.com";

  const createOrderUrl =
    env === "PRODUCTION"
      ? `${baseUrl}/pgsi/v1_2/orders/create`
      : `${baseUrl}/u2/payments/ve1_2/orders/create`;

  const transactionStatusUrl =
    env === "PRODUCTION"
      ? `${baseUrl}/pgsi/v1_2/transactions/get`
      : `${baseUrl}/u2/payments/ve1_2/transactions/get`;

  const sdkBaseUrl =
    env === "PRODUCTION"
      ? "https://pay.billdesk.com"
      : "https://uat1.billdesk.com/merchant-uat";

  if (!merchantId || !clientId || !signingKey) {
    throw new Error(
      "BillDesk credentials missing. Set BILLDESK_MERCHANT_ID, BILLDESK_CLIENT_ID, and BILLDESK_SIGNING_KEY (or BILLDESK_SECRET_KEY) in .env"
    );
  }

  if (joseMode === "SYMMETRIC" && !encryptionKey) {
    throw new Error(
      "BillDesk encryption key missing. Set BILLDESK_ENCRYPTION_KEY (or BILLDESK_SECRET_KEY) in .env"
    );
  }

  const signingKeyBytes = getKeyBytes(signingKey, keyFormat);
  const encryptionKeyBytes = encryptionKey
    ? getKeyBytes(encryptionKey, keyFormat)
    : null;

  return {
    merchantId,
    clientId,
    signingKeyId,
    encryptionKeyId,
    joseMode,
    signingKeyBytes,
    encryptionKeyBytes,
    env,
    baseUrl,
    createOrderUrl,
    transactionStatusUrl,
    sdkBaseUrl,
  };
}

/**
 * Convert key to bytes based on format
 * @param {string} key
 * @param {"RAW" | "BASE64"} keyFormat
 * @returns {Uint8Array}
 */
function getKeyBytes(key, keyFormat) {
  if (keyFormat === "BASE64") {
    return Uint8Array.from(Buffer.from(key, "base64"));
  }
  const encoder = new TextEncoder();
  return encoder.encode(key);
}

/**
 * Create a JOSE request token
 * @param {Record<string, unknown>} payload
 * @param {BillDeskConfig} config
 * @returns {Promise<string>}
 */
async function createJoseToken(payload, config) {
  const encoder = new TextEncoder();

  if (config.joseMode === "SYMMETRIC") {
    if (!config.encryptionKeyBytes) {
      throw new Error("Encryption key missing for JOSE request");
    }
    const encryptionKey = config.encryptionKeyBytes;
    const jwe = await new CompactEncrypt(
      encoder.encode(JSON.stringify(payload))
    )
      .setProtectedHeader({
        alg: "dir",
        enc: "A256GCM",
        ...(config.encryptionKeyId ? { kid: config.encryptionKeyId } : {}),
        clientid: config.clientId,
      })
      .encrypt(encryptionKey);

    const jws = await new CompactSign(encoder.encode(jwe))
      .setProtectedHeader({
        alg: "HS256",
        ...(config.signingKeyId ? { kid: config.signingKeyId } : {}),
        clientid: config.clientId,
      })
      .sign(config.signingKeyBytes);

    return jws;
  }

  return new CompactSign(encoder.encode(JSON.stringify(payload)))
    .setProtectedHeader({
      alg: "HS256",
      clientid: config.clientId,
    })
    .sign(config.signingKeyBytes);
}

/**
 * Verify and decrypt a JOSE response from BillDesk
 * @param {string} token
 * @param {BillDeskConfig} config
 * @returns {Promise<Record<string, any>>}
 */
async function verifyJoseToken(token, config) {
  try {
    const { payload } = await compactVerify(token, config.signingKeyBytes);
    const decoder = new TextDecoder();
    const payloadText = decoder.decode(payload).trim();

    if (payloadText.split(".").length === 5) {
      if (!config.encryptionKeyBytes) {
        throw new Error("Encryption key missing for JOSE response");
      }
      const { plaintext } = await compactDecrypt(
        payloadText,
        config.encryptionKeyBytes
      );
      return JSON.parse(decoder.decode(plaintext));
    }

    return JSON.parse(payloadText);
  } catch (err) {
    console.error("JOSE verification failed:", getErrorMessage(err));
    throw new Error("Invalid BillDesk response signature");
  }
}

// ── Main Service ────────────────────────────────────────

module.exports = () => ({
  /**
   * Create a BillDesk order and return SDK config for frontend
   *
   * @param {Object} params
  * @param {string | number} params.amount - Amount in INR (e.g. 100.50)
   * @param {string} params.customerName - Customer name
   * @param {string} params.customerEmail - Customer email
   * @param {string} params.customerMobile - Customer mobile (10 digits)
   * @param {string} params.feeType - Fee category (tender/other)
   * @param {Object} params.additionalInfo - Any extra metadata
  * @returns {Promise<Object>} SDK config for frontend
   */
  async createOrder({
    amount,
    customerName,
    customerEmail,
    customerMobile,
    feeType,
    additionalInfo = {},
  }) {
    const config = getConfig();

    // Generate unique order ID
    const orderId = `JMC${Date.now()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    const parsedAmount = Number(amount);

    // BillDesk Create Order payload
    const orderPayload = {
      mercid: config.merchantId,
      orderid: orderId,
      amount: parsedAmount.toFixed(2),
      order_date: getBillDeskTimestamp(),
      currency: "356", // INR
      ru: `${process.env.BILLDESK_RETURN_URL || "https://jammu-municipal-corporation.vercel.app/payment-status"}`,
      additional_info: getBillDeskAdditionalInfo(feeType, additionalInfo),
      itemcode: "DIRECT",
      device: {
        init_channel: "internet",
        ip: "0.0.0.0",
        user_agent: "Mozilla/5.0",
      },
    };

    try {
      // Insert pending transaction into DB
      await strapi.db.query("api::transaction.transaction").create({
        data: {
          orderId,
          amount: parsedAmount,
          customerName,
          customerMobile,
          customerEmail,
          feeType,
          additionalInfo,
          status: "PENDING",
        },
      });

      // Create JWS token
      const joseToken = await createJoseToken(orderPayload, config);

      const traceId = getBillDeskTraceId();
      const timestamp = getBillDeskEpochTimestamp();

      // Call BillDesk Create Order API
      const response = await fetch(config.createOrderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/jose",
          Accept: "application/jose",
          "BD-Traceid": traceId,
          "BD-Timestamp": timestamp,
        },
        body: joseToken,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("BillDesk API error:", response.status, errorText, {
          traceId,
          timestamp,
        });
        throw new Error(`BillDesk API returned ${response.status}`);
      }

      // Response is a JWS token, verify and decode
      const responseJws = await response.text();
      const orderResponse = await verifyJoseToken(responseJws, config);

      if (
        orderResponse.status !== "ACTIVE" &&
        orderResponse.objectid !== "order"
      ) {
        console.error("Order creation failed:", orderResponse);
        throw new Error("Order creation rejected by BillDesk");
      }

      const bdOrderId = orderResponse.bdorderid || orderResponse.orderid;
      const authToken = orderResponse.links?.[1]?.headers?.authorization || "";

      // Update DB with bdOrderId
      await strapi.db.query("api::transaction.transaction").update({
        where: { orderId },
        data: {
          bdOrderId,
          authToken,
          rawResponse: orderResponse,
        },
      });

      // Return SDK config for frontend
      return {
        merchantId: config.merchantId,
        bdOrderId,
        authToken,
        orderId: orderId,
        amount: orderPayload.amount,
        sdkBaseUrl: config.sdkBaseUrl,
      };
    } catch (error) {
      console.error("BillDesk createOrder error:", getErrorMessage(error));
      throw error;
    }
  },

  /**
   * Verify a transaction response from BillDesk
   *
  * @param {string} transactionResponse - JOSE token from BillDesk callback
  * @returns {Promise<Object>} Verified transaction details
   */
  async verifyTransaction(transactionResponse) {
    const config = getConfig();

    try {
      const txnData = await verifyJoseToken(transactionResponse, config);

      const statusMessage = txnData.auth_status === "0300"
        ? "SUCCESS"
        : txnData.auth_status === "0002"
        ? "PENDING"
        : "FAILED";

      // Update DB
      await strapi.db.query("api::transaction.transaction").update({
        where: { orderId: txnData.orderid },
        data: {
          status: statusMessage,
          transactionId: txnData.transactionid,
          rawResponse: txnData,
        },
      });

      return {
        verified: true,
        orderId: txnData.orderid,
        transactionId: txnData.transactionid,
        amount: txnData.amount,
        status: txnData.auth_status,
        statusMessage,
        raw: txnData,
      };
    } catch (error) {
      return {
        verified: false,
        error: getErrorMessage(error),
      };
    }
  },

  /**
   * Retrieve transaction details by orderId or transactionId
   *
   * @param {Object} params
   * @param {string} [params.orderId] - Merchant order ID
   * @param {string} [params.transactionId] - BillDesk transaction ID
   * @param {boolean} [params.refundDetails] - Include refund details
  * @returns {Promise<Object>} Transaction response from BillDesk
   */
  async retrieveTransaction({ orderId, transactionId, refundDetails = false }) {
    const config = getConfig();

    if (!orderId && !transactionId) {
      throw new Error("orderId or transactionId is required");
    }

    const payload = {
      mercid: config.merchantId,
      ...(orderId ? { orderid: orderId } : {}),
      ...(transactionId ? { transactionid: transactionId } : {}),
      ...(refundDetails ? { refund_details: "true" } : {}),
    };

    try {
      const joseToken = await createJoseToken(payload, config);

      const traceId = getBillDeskTraceId();
      const timestamp = getBillDeskEpochTimestamp();

      const response = await fetch(config.transactionStatusUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/jose",
          Accept: "application/jose",
          "BD-Traceid": traceId,
          "BD-Timestamp": timestamp,
        },
        body: joseToken,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("BillDesk transaction status error:", response.status, errorText, {
          traceId,
          timestamp,
        });
        throw new Error(`BillDesk API returned ${response.status}`);
      }

      const responseJws = await response.text();
      const txnResponse = await verifyJoseToken(responseJws, config);

      return txnResponse;
    } catch (error) {
      console.error("BillDesk retrieveTransaction error:", getErrorMessage(error));
      throw error;
    }
  },
});
