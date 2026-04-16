/**
 * BillDesk Payment Service - v2 (Production Hardened)
 * Based on official documentation: https://docs.billdesk.io/docs/neo-full-redirect
 *
 * Integration Type: Neo – Full Redirect (Low-code integration)
 * Authentication: Symmetric JOSE (JWE + JWS)
 * Environment: UAT (ready for production)
 *
 * Key changes from earlier revision:
 * - Strict public IPv4 validation for device.ip
 * - Structured diagnostic logs with traceId, timestamp, deviceIp on every failure
 * - No secrets logged (signing/encryption keys never appear in output)
 * - Deterministic error propagation — no silent fallbacks
 *
 * @version 2.1.0
 * @date 2026-04-16
 */

"use strict";

const { CompactSign, compactVerify, CompactEncrypt, compactDecrypt } = require("jose");
const crypto = require("crypto");
const net = require("net");

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get BillDesk configuration from environment variables.
 * Throws immediately if required credentials are missing.
 *
 * @returns {Object} Configuration object
 */
function getConfig() {
  const merchantId = process.env.BILLDESK_MERCHANT_ID;
  const clientId = process.env.BILLDESK_CLIENT_ID;
  const signingKey = process.env.BILLDESK_SIGNING_PASSWORD;
  const encryptionKey = process.env.BILLDESK_ENCRYPTION_PASSWORD;
  const env = (process.env.BILLDESK_ENV || "UAT").toUpperCase();

  // Validate required credentials
  if (!merchantId || !clientId || !signingKey || !encryptionKey) {
    throw new Error(
      "BillDesk credentials missing. Required: BILLDESK_MERCHANT_ID, BILLDESK_CLIENT_ID, BILLDESK_SIGNING_PASSWORD, BILLDESK_ENCRYPTION_PASSWORD"
    );
  }

  // Environment-specific URLs
  const isProduction = env === "PRODUCTION";
  const baseUrl = process.env.BILLDESK_BASE_URL || (isProduction
    ? "https://api.billdesk.com"
    : "https://uat1.billdesk.com");

  const createOrderUrl = isProduction
    ? `${baseUrl}/pgsi/v1_2/orders/create`
    : `${baseUrl}/u2/payments/ve1_2/orders/create`;

  const transactionStatusUrl = isProduction
    ? `${baseUrl}/pgsi/v1_2/transactions/get`
    : `${baseUrl}/u2/payments/ve1_2/transactions/get`;

  const sdkBaseUrl = isProduction
    ? "https://pay.billdesk.com"
    : "https://uat1.billdesk.com/merchant-uat";

  // Convert keys to bytes (raw UTF-8)
  const encoder = new TextEncoder();
  const signingKeyBytes = encoder.encode(signingKey);
  const encryptionKeyBytes = encoder.encode(encryptionKey);

  return {
    merchantId,
    clientId,
    signingKeyBytes,
    encryptionKeyBytes,
    env,
    baseUrl,
    createOrderUrl,
    transactionStatusUrl,
    sdkBaseUrl,
    returnUrl: process.env.BILLDESK_RETURN_URL || "https://jammu-municipal-corporation.vercel.app/payment-status",
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// JOSE ENCRYPTION & SIGNING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create JOSE token (Symmetric: JWE wrapped in JWS)
 *
 * Process:
 * 1. Encrypt payload with JWE (A256GCM)
 * 2. Sign JWE with JWS (HS256)
 *
 * @param {Object} payload - Request payload
 * @param {Object} config - BillDesk configuration
 * @returns {Promise<string>} JOSE token
 */
async function createJoseToken(payload, config) {
  const encoder = new TextEncoder();
  const keyId = process.env.BILLDESK_KEY_ID;

  // Step 1: Encrypt payload with JWE
  const jweHeader = {
    alg: "dir",              // Direct key agreement
    enc: "A256GCM",          // AES-256-GCM encryption
    clientid: config.clientId,
  };

  // Add kid if available
  if (keyId) {
    jweHeader.kid = keyId;
  }

  const jwe = await new CompactEncrypt(encoder.encode(JSON.stringify(payload)))
    .setProtectedHeader(jweHeader)
    .encrypt(config.encryptionKeyBytes);

  // Step 2: Sign JWE with JWS
  const jwsHeader = {
    alg: "HS256",            // HMAC-SHA256 signing
    clientid: config.clientId,
  };

  // Add kid if available
  if (keyId) {
    jwsHeader.kid = keyId;
  }

  const jws = await new CompactSign(encoder.encode(jwe))
    .setProtectedHeader(jwsHeader)
    .sign(config.signingKeyBytes);

  return jws;
}

/**
 * Verify and decrypt JOSE token from BillDesk
 *
 * Process:
 * 1. Verify JWS signature
 * 2. Decrypt JWE payload
 * 3. Return JSON object
 *
 * @param {string} token - JOSE token from BillDesk
 * @param {Object} config - BillDesk configuration
 * @returns {Promise<Object>} Decrypted payload
 */
async function verifyJoseToken(token, config) {
  const decoder = new TextDecoder();
  const trimmedToken = token.trim();

  try {
    // Handle plain JSON responses (some BillDesk responses)
    if (trimmedToken.startsWith("{")) {
      return JSON.parse(trimmedToken);
    }

    // Handle JSON-quoted tokens
    if (trimmedToken.startsWith('"')) {
      const parsed = JSON.parse(trimmedToken);
      if (typeof parsed === "string") {
        return verifyJoseToken(parsed, config);
      }
      return parsed;
    }

    // Step 1: Verify JWS signature
    const { payload: jwsPayload } = await compactVerify(
      trimmedToken,
      config.signingKeyBytes
    );
    const jweToken = decoder.decode(jwsPayload).trim();

    // Step 2: Decrypt JWE
    const { plaintext } = await compactDecrypt(
      jweToken,
      config.encryptionKeyBytes
    );

    // Step 3: Parse JSON
    return JSON.parse(decoder.decode(plaintext));
  } catch (error) {
    console.error("JOSE verification failed:", error.message);
    throw new Error("Invalid BillDesk response signature");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate unique order ID
 * Format: JMC<timestamp><random>
 * @returns {string} Unique order ID
 */
function generateOrderId() {
  const timestamp = Date.now();
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `JMC${timestamp}${random}`;
}

/**
 * Generate BD-Traceid (32-char hex uppercase)
 * @returns {string} Trace ID
 */
function generateTraceId() {
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}

/**
 * Generate BD-Timestamp (YYYYMMDDHHmmss format)
 * @param {Date} date - Date object (defaults to now)
 * @returns {string} Timestamp in YYYYMMDDHHmmss format
 */
function generateTimestamp(date = new Date()) {
  // BillDesk expects IST (UTC+5:30). Render servers run in UTC,
  // so we must shift explicitly — getHours() would give UTC on Render.
  const istOffset = 330; // minutes
  const istDate = new Date(date.getTime() + istOffset * 60 * 1000);

  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(istDate.getUTCDate()).padStart(2, "0");
  const hours = String(istDate.getUTCHours()).padStart(2, "0");
  const minutes = String(istDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istDate.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

/**
 * Generate order_date in ISO format with IST timezone
 * Format: YYYY-MM-DDTHH:mm:ss+05:30
 * @param {Date} date - Date object (defaults to now)
 * @returns {string} ISO timestamp with IST offset
 */
function generateOrderDate(date = new Date()) {
  const istOffset = 330; // IST is UTC+5:30 (330 minutes)
  const istDate = new Date(date.getTime() + istOffset * 60 * 1000);

  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(istDate.getUTCDate()).padStart(2, "0");
  const hours = String(istDate.getUTCHours()).padStart(2, "0");
  const minutes = String(istDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istDate.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
}

/**
 * Sanitize additional_info values
 * @param {*} value - Value to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeValue(value) {
  if (value === null || value === undefined) return "NA";

  const normalized = String(value)
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 ._\/-]/g, "")
    .trim();

  return normalized || "NA";
}

/**
 * Validate that an IP is a public IPv4 suitable for BillDesk device.ip.
 * BillDesk rejects: IPv6, 0.0.0.0, 127.x, 10.x, 172.16-31.x, 192.168.x, 169.254.x
 *
 * @param {string | null | undefined} ip
 * @returns {boolean}
 */
function isValidBillDeskIp(ip) {
  if (typeof ip !== "string" || net.isIP(ip) !== 4) {
    return false;
  }

  if (ip === "0.0.0.0" || ip.startsWith("127.")) {
    return false;
  }

  // RFC-1918 private ranges
  if (ip.startsWith("10.")) return false;
  if (ip.startsWith("172.")) {
    const second = parseInt(ip.split(".")[1], 10);
    if (second >= 16 && second <= 31) return false;
  }
  if (ip.startsWith("192.168.")) return false;

  // Link-local
  if (ip.startsWith("169.254.")) return false;

  return true;
}

/**
 * Build additional_info object (BillDesk v1.2 requires named keys)
 *
 * BillDesk expects: { additional_info1: "...", additional_info2: "...", ... additional_info7: "..." }
 * NOT an array. Sending an array causes GNAPE0001 (api_processing_error).
 *
 * @param {string} feeType - Fee type
 * @param {Object} additionalInfo - Additional information object
 * @returns {Object} Object with additional_info1 through additional_info7
 */
function buildAdditionalInfo(feeType, additionalInfo = {}) {
  return {
    additional_info1: sanitizeValue(feeType || "JMC_FEE"),
    additional_info2: sanitizeValue(additionalInfo.reference1 || additionalInfo.dept || "NA"),
    additional_info3: sanitizeValue(additionalInfo.reference2 || "NA"),
    additional_info4: "NA",
    additional_info5: "NA",
    additional_info6: "NA",
    additional_info7: "NA",
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Call BillDesk API with correct JOSE headers.
 *
 * Headers sent (per BillDesk spec):
 * - Content-Type: application/jose
 * - Accept: application/jose
 * - BD-Traceid: 32-char hex uppercase
 * - BD-Timestamp: YYYYMMDDHHmmss (14 digits)
 *
 * @param {string} url - API endpoint URL
 * @param {string} joseToken - JOSE token
 * @returns {Promise<Object>} API response with metadata
 */
async function callBillDeskAPI(url, joseToken) {
  const traceId = generateTraceId();
  const timestamp = generateTimestamp();

  const requestHeaders = {
    "Content-Type": "application/jose",
    "Accept": "application/jose",
    "BD-Traceid": traceId,
    "BD-Timestamp": timestamp,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: requestHeaders,
    body: joseToken,
  });

  // Read full response as buffer to capture both binary and text
  const responseBuffer = Buffer.from(await response.arrayBuffer());
  const responseBody = responseBuffer.toString("utf8");

  // Capture response headers for diagnostics
  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    body: responseBody,
    bodyBytes: responseBuffer.length,
    traceId,
    timestamp,
    requestHeaders,
    responseHeaders,
    redirected: response.redirected,
    finalUrl: response.url,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SERVICE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

module.exports = () => ({
  /**
   * Create BillDesk Order
   *
   * Creates an order with BillDesk and returns SDK configuration
   * for launching the Neo – Full Redirect payment page.
   *
   * @param {Object} params - Order parameters
   * @param {string|number} params.amount - Amount in INR (e.g., "100.00")
   * @param {string} params.customerName - Customer name
   * @param {string} params.customerEmail - Customer email
   * @param {string} params.customerMobile - Customer mobile (10 digits)
   * @param {string} params.feeType - Fee type/category
   * @param {string} params.deviceIp - Requesting client public IPv4 address
   * @param {Object} params.additionalInfo - Additional metadata
   * @returns {Promise<Object>} SDK configuration
   */
  async createOrder({
    amount,
    customerName,
    customerEmail,
    customerMobile,
    feeType,
    deviceIp,
    additionalInfo = {},
  }) {
    const config = getConfig();
    const orderId = generateOrderId();
    const parsedAmount = Number(amount);

    // ── Final device IP validation ────────────────────────
    // The controller already validates, but defense-in-depth here.
    if (!isValidBillDeskIp(deviceIp)) {
      throw new Error(
        `Invalid device IP for BillDesk: "${deviceIp || "null"}". ` +
        "Must be a public IPv4 address. Set BILLDESK_FALLBACK_DEVICE_IP."
      );
    }

    // Build Create Order payload
    const orderPayload = {
      mercid: config.merchantId,
      orderid: orderId,
      amount: parsedAmount.toFixed(2),
      order_date: generateOrderDate(),
      currency: "356", // INR
      ru: config.returnUrl,
      additional_info: buildAdditionalInfo(feeType, additionalInfo),
      itemcode: "DIRECT",
      device: {
        init_channel: "internet",
        ip: deviceIp,
        user_agent: "Mozilla/5.0",
      },
    };

    // Log the exact payload we're about to encrypt (no secrets)
    console.log("BILLDESK_ORDER_PAYLOAD:", JSON.stringify(orderPayload));

    try {
      // Save pending transaction to database
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

      // Create JOSE token
      const joseToken = await createJoseToken(orderPayload, config);

      // Call BillDesk API
      const response = await callBillDeskAPI(config.createOrderUrl, joseToken);

      // ── Log every BillDesk response for diagnostics ─────
      console.log("BILLDESK_HTTP_RESPONSE:", {
        traceId: response.traceId,
        timestamp: response.timestamp,
        httpStatus: response.status,
        statusText: response.statusText,
        bodyBytes: response.bodyBytes,
        redirected: response.redirected,
        finalUrl: response.finalUrl,
        responseContentType: response.responseHeaders["content-type"] || "MISSING",
        responseContentLength: response.responseHeaders["content-length"] || "MISSING",
        responseServer: response.responseHeaders["server"] || "MISSING",
        bodyPreview: (response.body || "").substring(0, 200),
      });

      // ── Handle empty body ───────────────────────────────
      if (!response.body || response.body.trim().length === 0) {
        console.error("BILLDESK_EMPTY_RESPONSE:", {
          traceId: response.traceId,
          timestamp: response.timestamp,
          resolvedDeviceIp: deviceIp,
          responseHeaders: response.responseHeaders,
          joseHeaders: response.requestHeaders,
          orderId,
          hint: "BillDesk returns empty body when device.ip is invalid, payload encryption fails, or credentials are wrong. Verify: (1) deviceIp is public IPv4, (2) keys match BillDesk-issued keys, (3) egress IP is whitelisted.",
        });
        throw new Error("BillDesk returned empty response");
      }

      // ── Decrypt JOSE response (even on non-OK status) ───
      // BillDesk returns encrypted error details inside the body
      // even on HTTP 4xx/5xx. We MUST decrypt to see the real error.
      if (!response.ok) {
        let billdeskError = null;
        try {
          billdeskError = await verifyJoseToken(response.body, config);
        } catch (decryptErr) {
          console.error("BILLDESK_ERROR_DECRYPT_FAILED:", {
            traceId: response.traceId,
            timestamp: response.timestamp,
            httpStatus: response.status,
            decryptError: decryptErr.message,
            rawBodyPreview: response.body.substring(0, 300),
          });
        }

        console.error("BILLDESK_CREATE_ORDER_REJECTED:", {
          traceId: response.traceId,
          timestamp: response.timestamp,
          resolvedDeviceIp: deviceIp,
          httpStatus: response.status,
          statusText: response.statusText,
          billdeskError,
          responseHeaders: response.responseHeaders,
          joseHeaders: response.requestHeaders,
          orderId,
        });

        const errorMsg = billdeskError
          ? `BillDesk error: ${billdeskError.status || billdeskError.error_code || "unknown"} — ${billdeskError.error_description || billdeskError.message || JSON.stringify(billdeskError)}`
          : `BillDesk API returned ${response.status}`;
        throw new Error(errorMsg);
      }

      // Decrypt response
      const orderResponse = await verifyJoseToken(response.body, config);

      // Validate response
      if (orderResponse.status !== "ACTIVE" || orderResponse.objectid !== "order") {
        console.error("BILLDESK_ORDER_REJECTED:", {
          traceId: response.traceId,
          timestamp: response.timestamp,
          orderResponse,
          orderId,
        });
        throw new Error("Order creation rejected by BillDesk");
      }

      // Extract SDK configuration from response
      const bdOrderId = orderResponse.bdorderid;
      const redirectLink = orderResponse.links?.find(link => link.rel === "redirect");

      if (!redirectLink) {
        throw new Error("Redirect link not found in BillDesk response");
      }

      const authToken = redirectLink.headers?.authorization || "";
      const rdata = redirectLink.parameters?.rdata || "";
      const redirectUrl = redirectLink.href || "";

      // Update database with BillDesk order ID
      await strapi.db.query("api::transaction.transaction").update({
        where: { orderId },
        data: {
          bdOrderId,
          authToken,
          rawResponse: orderResponse,
        },
      });

      console.log("BILLDESK_ORDER_CREATED:", {
        orderId,
        bdOrderId,
        traceId: response.traceId,
        deviceIp,
      });

      // Return SDK configuration for frontend
      return {
        merchantId: config.merchantId,
        bdOrderId,
        authToken,
        rdata,
        redirectUrl,
        orderId,
        amount: orderPayload.amount,
        sdkBaseUrl: config.sdkBaseUrl,
      };
    } catch (error) {
      console.error("BILLDESK_CREATE_ORDER_ERROR:", error.message);
      throw error;
    }
  },

  /**
   * Verify Transaction Response
   *
   * Verifies the JOSE token received from BillDesk after payment completion.
   *
   * @param {string} transactionResponse - JOSE token from BillDesk
   * @returns {Promise<Object>} Verified transaction details
   */
  async verifyTransaction(transactionResponse) {
    const config = getConfig();

    try {
      const txnData = await verifyJoseToken(transactionResponse, config);

      // Map auth_status to readable status
      const statusMessage =
        txnData.auth_status === "0300"
          ? "SUCCESS"
          : txnData.auth_status === "0002"
          ? "PENDING"
          : "FAILED";

      // Update database
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
        paymentMethod: txnData.payment_method_type,
        raw: txnData,
      };
    } catch (error) {
      console.error("Verify transaction error:", error.message);
      return {
        verified: false,
        error: error.message,
      };
    }
  },

  /**
   * Retrieve Transaction Status
   *
   * Queries BillDesk for transaction status by order ID or transaction ID.
   *
   * @param {Object} params - Query parameters
   * @param {string} params.orderId - Merchant order ID
   * @param {string} params.transactionId - BillDesk transaction ID
   * @returns {Promise<Object>} Transaction status
   */
  async retrieveTransaction({ orderId, transactionId }) {
    const config = getConfig();

    if (!orderId && !transactionId) {
      throw new Error("orderId or transactionId is required");
    }

    const payload = {
      mercid: config.merchantId,
      ...(orderId && { orderid: orderId }),
      ...(transactionId && { transactionid: transactionId }),
    };

    try {
      const joseToken = await createJoseToken(payload, config);
      const response = await callBillDeskAPI(config.transactionStatusUrl, joseToken);

      if (!response.ok) {
        console.error("BILLDESK_TXN_STATUS_FAILED:", {
          traceId: response.traceId,
          timestamp: response.timestamp,
          httpStatus: response.status,
          responseBodyPreview: response.body.substring(0, 500),
        });
        throw new Error(`BillDesk API returned ${response.status}`);
      }

      const txnResponse = await verifyJoseToken(response.body, config);

      // Map status
      const statusMessage =
        txnResponse.auth_status === "0300"
          ? "SUCCESS"
          : txnResponse.auth_status === "0002"
          ? "PENDING"
          : "FAILED";

      // Update database if transaction exists
      const where = orderId ? { orderId } : { transactionId };
      const existing = await strapi.db
        .query("api::transaction.transaction")
        .findOne({ where });

      if (existing) {
        await strapi.db.query("api::transaction.transaction").update({
          where: { id: existing.id },
          data: {
            status: statusMessage,
            transactionId: txnResponse.transactionid || existing.transactionId,
            rawResponse: txnResponse,
          },
        });
      }

      return {
        status: statusMessage,
        authStatus: txnResponse.auth_status,
        orderId: txnResponse.orderid,
        transactionId: txnResponse.transactionid,
        amount: txnResponse.amount,
        message: txnResponse.transaction_error_desc || "",
        raw: txnResponse,
      };
    } catch (error) {
      console.error("Retrieve transaction error:", error.message);
      throw error;
    }
  },
});
