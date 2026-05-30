/**
 * Shared BillDesk SDK utilities.
 *
 * Extracts the duplicated token extraction and status derivation logic
 * from PayOnline.jsx and PaymentStatus.jsx into a single source of truth.
 */

// Keys BillDesk may use for the transaction response token
export const BILLDESK_TOKEN_KEYS = [
  "transaction_response",
  "transactionResponse",
  "txnResponse",
  "response",
  "jws",
  "payload",
];

/**
 * Normalize a raw status value to a trimmed string.
 * @param {*} value
 * @returns {string}
 */
export function normalizeStatusValue(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

/**
 * Extract the JOSE token from a BillDesk SDK response payload.
 *
 * @param {Object|string|null} payload - SDK response
 * @returns {string} Token string, or empty string if not found
 */
export function extractBillDeskToken(payload) {
  if (!payload) return "";
  if (typeof payload === "string") return payload;

  for (const key of BILLDESK_TOKEN_KEYS) {
    const value = payload[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return "";
}

/**
 * BillDesk status code → human-readable constant mapping.
 */
const STATUS_CODES = {
  "0300": "SUCCESS",
  "0002": "PENDING",
  "0399": "FAILED",
};

/**
 * Derive a normalized outcome from a BillDesk response payload.
 *
 * Used by both inline payment (PayOnline) and redirect-return (PaymentStatus).
 *
 * @param {Object|null} payload - Parsed BillDesk response
 * @param {Object} [fallback={}] - Fallback values if payload is missing
 * @returns {{ isSuccess: boolean, isPending: boolean, statusMessage: string, transactionId: string, orderId: string, gatewayStatus: string }}
 */
export function deriveBillDeskOutcome(payload, fallback = {}) {
  if (!payload) {
    return {
      isSuccess: false,
      isPending: false,
      statusMessage: fallback.statusMessage || "Payment was not completed.",
      transactionId: fallback.transactionId || "",
      orderId: fallback.orderId || "",
      gatewayStatus: fallback.gatewayStatus || "",
    };
  }

  const statusCodeRaw =
    payload.status || payload.auth_status || payload.authStatus || "";
  const statusTextRaw =
    payload.statusMessage ||
    payload.transaction_error_type ||
    payload.transaction_error_desc ||
    payload.message ||
    "";

  const statusCode = normalizeStatusValue(statusCodeRaw).toUpperCase();
  const statusText = normalizeStatusValue(statusTextRaw).toUpperCase();
  const statusValue = normalizeStatusValue(payload.status).toLowerCase();
  const errorType = normalizeStatusValue(
    payload.transaction_error_type,
  ).toLowerCase();

  const isSuccess =
    payload.verified === true ||
    statusCode === "0300" ||
    statusCode === "SUCCESS" ||
    statusText === "SUCCESS" ||
    statusText === "SUCCESSFUL" ||
    statusValue === "success" ||
    errorType === "success";

  const isPending = statusCode === "0002" || statusText === "PENDING";

  const statusMessage =
    payload.statusMessage ||
    STATUS_CODES[statusCode] ||
    (isPending
      ? "Payment pending"
      : isSuccess
        ? "Payment successful"
        : payload.transaction_error_desc ||
          payload.message ||
          "Payment was not completed.");

  return {
    isSuccess,
    isPending,
    statusMessage,
    transactionId:
      payload.transactionId ||
      payload.transactionid ||
      fallback.transactionId ||
      "",
    orderId: payload.orderId || payload.orderid || fallback.orderId || "",
    gatewayStatus:
      payload.status ||
      payload.auth_status ||
      payload.authStatus ||
      payload.transaction_error_type ||
      fallback.gatewayStatus ||
      "",
  };
}
