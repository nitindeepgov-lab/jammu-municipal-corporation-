/**
 * BillDesk Service
 *
 * Handles JWS-HMAC token generation and Create Order API calls.
 * Uses JOSE library for JWS (JSON Web Signature) with HMAC-SHA256.
 *
 * Docs reference:
 * - BillDesk Web SDK Specs One Time Payments (HMAC) v1.5
 * - https://www.billdesk.com/web/onboarding-documents
 */

"use strict";

const { CompactSign, compactVerify } = require("jose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

// ── Helpers ─────────────────────────────────────────────

/**
 * Get BillDesk config from environment
 */
function getConfig() {
  const merchantId = process.env.BILLDESK_MERCHANT_ID;
  const clientId = process.env.BILLDESK_CLIENT_ID;
  const secretKey = process.env.BILLDESK_SECRET_KEY;
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

  if (!merchantId || !clientId || !secretKey) {
    throw new Error(
      "BillDesk credentials missing. Set BILLDESK_MERCHANT_ID, BILLDESK_CLIENT_ID, and BILLDESK_SECRET_KEY in .env"
    );
  }

  return {
    merchantId,
    clientId,
    secretKey,
    env,
    baseUrl,
    createOrderUrl,
    transactionStatusUrl,
    sdkBaseUrl,
  };
}

/**
 * Create a JWS token from payload using HMAC-SHA256
 */
async function createJwsToken(payload, secretKey, clientId) {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(secretKey);

  // Import key for HMAC
  const key = await crypto.subtle
    ? crypto.webcrypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      )
    : keyBytes;

  const jws = await new CompactSign(encoder.encode(JSON.stringify(payload)))
    .setProtectedHeader({
      alg: "HS256",
      clientid: clientId,
    })
    .sign(keyBytes);

  return jws;
}

/**
 * Verify a JWS token response from BillDesk
 */
async function verifyJwsToken(token, secretKey) {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(secretKey);

  try {
    const { payload } = await compactVerify(token, keyBytes);
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(payload));
  } catch (err) {
    console.error("JWS verification failed:", err.message);
    throw new Error("Invalid BillDesk response signature");
  }
}

// ── Main Service ────────────────────────────────────────

module.exports = () => ({
  /**
   * Create a BillDesk order and return SDK config for frontend
   *
   * @param {Object} params
   * @param {number} params.amount - Amount in INR (e.g. 100.50)
   * @param {string} params.customerName - Customer name
   * @param {string} params.customerEmail - Customer email
   * @param {string} params.customerMobile - Customer mobile (10 digits)
   * @param {string} params.feeType - Fee category (tender/other)
   * @param {Object} params.additionalInfo - Any extra metadata
   * @returns {Object} SDK config for frontend
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

    // BillDesk Create Order payload
    const orderPayload = {
      mercid: config.merchantId,
      orderid: orderId,
      amount: parseFloat(amount).toFixed(2),
      order_date: new Date().toISOString(),
      currency: "356", // INR
      ru: `${process.env.BILLDESK_RETURN_URL || "https://jammu-municipal-corporation.vercel.app/payment-status"}`,
      additional_info: {
        additional_info1: feeType || "JMC_FEE",
        additional_info2: customerName || "",
        additional_info3: customerMobile || "",
        additional_info4: JSON.stringify(additionalInfo).substring(0, 240),
      },
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
          amount: parseFloat(amount),
          customerName,
          customerMobile,
          customerEmail,
          feeType,
          additionalInfo,
          status: "PENDING",
        },
      });

      // Create JWS token
      const jwsToken = await createJwsToken(
        orderPayload,
        config.secretKey,
        config.clientId
      );

      // Call BillDesk Create Order API
      const response = await fetch(config.createOrderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/jose",
          Accept: "application/jose",
          "BD-Traceid": uuidv4(),
          "BD-Timestamp": new Date().toISOString(),
        },
        body: jwsToken,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("BillDesk API error:", response.status, errorText);
        throw new Error(`BillDesk API returned ${response.status}`);
      }

      // Response is a JWS token, verify and decode
      const responseJws = await response.text();
      const orderResponse = await verifyJwsToken(responseJws, config.secretKey);

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
      console.error("BillDesk createOrder error:", error);
      throw error;
    }
  },

  /**
   * Verify a transaction response from BillDesk
   *
   * @param {string} transactionResponse - JWS token from BillDesk callback
   * @returns {Object} Verified transaction details
   */
  async verifyTransaction(transactionResponse) {
    const config = getConfig();

    try {
      const txnData = await verifyJwsToken(
        transactionResponse,
        config.secretKey
      );

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
        error: error.message,
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
   * @returns {Object} Transaction response from BillDesk
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
      const jwsToken = await createJwsToken(
        payload,
        config.secretKey,
        config.clientId
      );

      const response = await fetch(config.transactionStatusUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/jose",
          Accept: "application/jose",
          "BD-Traceid": uuidv4(),
          "BD-Timestamp": new Date().toISOString(),
        },
        body: jwsToken,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("BillDesk transaction status error:", response.status, errorText);
        throw new Error(`BillDesk API returned ${response.status}`);
      }

      const responseJws = await response.text();
      const txnResponse = await verifyJwsToken(responseJws, config.secretKey);

      return txnResponse;
    } catch (error) {
      console.error("BillDesk retrieveTransaction error:", error);
      throw error;
    }
  },
});
