/**
 * BillDesk Payment Service - Complete Redesign
 * Based on official documentation: https://docs.billdesk.io/docs/neo-full-redirect
 * 
 * Integration Type: Neo – Full Redirect (Low-code integration)
 * Authentication: Symmetric JOSE (JWE + JWS)
 * Environment: UAT (ready for production)
 * 
 * @version 2.0.0
 * @date 2026-04-15
 */

"use strict";

const { CompactSign, compactVerify, CompactEncrypt, compactDecrypt } = require("jose");
const crypto = require("crypto");

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get BillDesk configuration from environment variables
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

  // Convert keys to bytes
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

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
 * Build additional_info array (7 elements required)
 * @param {string} feeType - Fee type
 * @param {Object} additionalInfo - Additional information object
 * @returns {string[]} Array of 7 strings
 */
function buildAdditionalInfo(feeType, additionalInfo = {}) {
  return [
    sanitizeValue(feeType || "JMC_FEE"),
    sanitizeValue(additionalInfo.reference1 || additionalInfo.dept || "NA"),
    sanitizeValue(additionalInfo.reference2 || "NA"),
    "NA",
    "NA",
    "NA",
    "NA",
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Call BillDesk Create Order API
 * @param {string} url - API endpoint URL
 * @param {string} joseToken - JOSE token
 * @returns {Promise<Object>} API response
 */
async function callBillDeskAPI(url, joseToken) {
  const traceId = generateTraceId();
  const timestamp = generateTimestamp();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/jose",
      "Accept": "application/jose",
      "BD-Traceid": traceId,
      "BD-Timestamp": timestamp,
    },
    body: joseToken,
  });

  const responseBody = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    body: responseBody,
    traceId,
    timestamp,
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
   * @param {Object} params.additionalInfo - Additional metadata
   * @returns {Promise<Object>} SDK configuration
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
    const orderId = generateOrderId();
    const parsedAmount = Number(amount);

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
        ip: "0.0.0.0",
        user_agent: "Mozilla/5.0",
      },
    };

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

      if (!response.ok) {
        console.error("BillDesk API error:", {
          status: response.status,
          traceId: response.traceId,
          timestamp: response.timestamp,
          body: response.body.substring(0, 500), // Log first 500 chars of error
        });
        throw new Error(`BillDesk API returned ${response.status}`);
      }

      if (!response.body || response.body.trim().length === 0) {
        console.error("BillDesk returned empty response:", {
          traceId: response.traceId,
          timestamp: response.timestamp,
        });
        throw new Error("BillDesk returned empty response");
      }

      // Decrypt response
      const orderResponse = await verifyJoseToken(response.body, config);

      // Validate response
      if (orderResponse.status !== "ACTIVE" || orderResponse.objectid !== "order") {
        console.error("Order creation failed:", orderResponse);
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
      console.error("Create order error:", error.message);
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
