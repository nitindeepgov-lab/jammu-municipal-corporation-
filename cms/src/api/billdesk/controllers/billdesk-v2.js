/**
 * BillDesk Controller - v2 (Production Hardened)
 * Based on official documentation: https://docs.billdesk.io/docs/neo-full-redirect
 *
 * Key changes from earlier revision:
 * - Robust client IP extraction behind Render / Cloudflare proxies
 * - Strict IPv4 validation for BillDesk device.ip field
 * - Deterministic fail-fast when device IP cannot be resolved
 * - Structured diagnostic logging on every failure without leaking secrets
 *
 * @version 2.1.0
 * @date 2026-04-16
 */

"use strict";

const net = require("net");

// ── Helpers ─────────────────────────────────────────────

const getErrorMessage = (error) =>
  error instanceof Error ? error.message : String(error);

/**
 * Normalize a raw header value into a valid IP string (or null).
 * Handles:
 * - Comma-separated lists (x-forwarded-for)
 * - Forwarded header "for=" syntax
 * - IPv6-mapped IPv4 (::ffff:1.2.3.4)
 * - Bracketed IPv6 with port
 * - IPv4 with port (1.2.3.4:12345)
 *
 * @param {string | null | undefined} rawIp
 * @returns {string | null} Cleaned IP or null
 */
function normalizeIp(rawIp) {
  if (typeof rawIp !== "string") {
    return null;
  }

  let candidate = rawIp.trim();
  if (!candidate) {
    return null;
  }

  // Take first IP from comma-separated list
  if (candidate.includes(",")) {
    candidate = candidate.split(",")[0].trim();
  }

  // Handle Forwarded header "for=" prefix
  if (candidate.toLowerCase().startsWith("for=")) {
    candidate = candidate.slice(4).trim();
  }

  // Strip enclosing quotes
  candidate = candidate.replace(/^"|"$/g, "");

  // Handle bracketed IPv6 [::1]:port
  if (candidate.startsWith("[")) {
    const endIndex = candidate.indexOf("]");
    if (endIndex > 0) {
      candidate = candidate.slice(1, endIndex);
    }
  }

  // Strip IPv6-mapped IPv4 prefix
  if (candidate.startsWith("::ffff:")) {
    candidate = candidate.slice(7);
  }

  // Strip port from IPv4 (1.2.3.4:12345)
  if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(candidate)) {
    candidate = candidate.split(":")[0];
  }

  return net.isIP(candidate) ? candidate : null;
}

/**
 * Check whether an IP is a valid *public* IPv4 that BillDesk will accept.
 * Rejects: null, IPv6, 0.0.0.0, loopback, and RFC-1918 private ranges.
 *
 * @param {string | null} ip
 * @returns {boolean}
 */
function isPublicIPv4(ip) {
  if (typeof ip !== "string" || net.isIP(ip) !== 4) {
    return false;
  }

  // Reject obviously invalid
  if (ip === "0.0.0.0" || ip.startsWith("127.")) {
    return false;
  }

  // Reject RFC-1918 private ranges
  if (ip.startsWith("10.")) return false;
  if (ip.startsWith("172.")) {
    const second = parseInt(ip.split(".")[1], 10);
    if (second >= 16 && second <= 31) return false;
  }
  if (ip.startsWith("192.168.")) return false;

  // Reject link-local
  if (ip.startsWith("169.254.")) return false;

  return true;
}

/**
 * Extract the real client IP from the Koa context.
 * Priority order mirrors what Render / Cloudflare populate.
 *
 * @param {Object} ctx - Koa context
 * @returns {{ ip: string | null, source: string }}
 */
function getDeviceIp(ctx) {
  const headers = ctx.request.headers || {};

  // Ordered list of candidate sources (most reliable first behind a CDN/proxy)
  const sources = [
    { name: "cf-connecting-ip", value: headers["cf-connecting-ip"] },
    { name: "true-client-ip", value: headers["true-client-ip"] },
    { name: "x-real-ip", value: headers["x-real-ip"] },
    { name: "x-forwarded-for", value: headers["x-forwarded-for"] },
    { name: "x-client-ip", value: headers["x-client-ip"] },
    { name: "ctx.request.ip", value: ctx.request.ip },
    { name: "ctx.ip", value: ctx.ip },
    { name: "remoteAddress", value: ctx.req?.socket?.remoteAddress },
  ];

  for (const { name, value } of sources) {
    const ip = normalizeIp(value);
    if (isPublicIPv4(ip)) {
      return { ip, source: name };
    }
  }

  // Env fallback (statically configured Render egress IP)
  const fallback = normalizeIp(process.env.BILLDESK_FALLBACK_DEVICE_IP || "");
  if (isPublicIPv4(fallback)) {
    return { ip: fallback, source: "BILLDESK_FALLBACK_DEVICE_IP" };
  }

  return { ip: null, source: "none" };
}

// ── Controller ──────────────────────────────────────────

module.exports = {
  /**
   * POST /api/billdesk/create-order
   *
   * Creates a BillDesk order and returns SDK configuration
   * for launching the Neo – Full Redirect payment page.
   *
   * Request Body:
   * {
   *   amount: "100.00",
   *   customerName: "John Doe",
   *   customerEmail: "john@example.com",
   *   customerMobile: "9999999999",
   *   feeType: "JMC_FEE",
   *   additionalInfo: { dept: "water" }
   * }
   *
   * Response:
   * {
   *   success: true,
   *   data: {
   *     merchantId: "UATJMC02V2",
   *     bdOrderId: "OAZY21S8GXAC",
   *     authToken: "OToken ...",
   *     rdata: "89fd934cf8...",
   *     redirectUrl: "https://uat1.billdesk.com/pgi/MerchantPayment/",
   *     orderId: "JMC1776232173822AFB1AD",
   *     amount: "100.00",
   *     sdkBaseUrl: "https://uat1.billdesk.com/merchant-uat"
   *   }
   * }
   */
  async createOrder(ctx) {
    try {
      const {
        amount,
        customerName,
        customerEmail,
        customerMobile,
        feeType,
        additionalInfo,
      } = ctx.request.body;

      // ── Input validation ──────────────────────────────
      if (!amount || parseFloat(amount) <= 0) {
        return ctx.badRequest("Amount is required and must be greater than 0");
      }
      if (!customerName) {
        return ctx.badRequest("Customer name is required");
      }
      if (!customerMobile) {
        return ctx.badRequest("Mobile number is required");
      }

      // ── Resolve device IP (fail-fast) ─────────────────
      const { ip: deviceIp, source: ipSource } = getDeviceIp(ctx);

      console.log("BILLDESK_DEVICE_IP_RESOLVED:", {
        source: ipSource,
        raw: ctx.request.headers["x-forwarded-for"] || ctx.request.ip || "N/A",
        resolved: deviceIp || "NONE",
      });

      if (!deviceIp) {
        console.error("BILLDESK_DEVICE_IP_MISSING: Could not resolve a valid public IPv4.", {
          headers: {
            "x-forwarded-for": ctx.request.headers["x-forwarded-for"] || "absent",
            "x-real-ip": ctx.request.headers["x-real-ip"] || "absent",
            "cf-connecting-ip": ctx.request.headers["cf-connecting-ip"] || "absent",
          },
          ctxIp: ctx.request.ip,
          fallbackEnv: process.env.BILLDESK_FALLBACK_DEVICE_IP ? "SET" : "NOT_SET",
        });
        return ctx.badRequest(
          "Cannot determine a valid client IP address. " +
          "Ensure your request includes X-Forwarded-For or configure BILLDESK_FALLBACK_DEVICE_IP on the server."
        );
      }

      // ── Call service ──────────────────────────────────
      const billDeskService = strapi.service("api::billdesk.billdesk-v2");

      const orderConfig = await billDeskService.createOrder({
        amount,
        customerName,
        customerEmail: customerEmail || "",
        customerMobile,
        feeType: feeType || "JMC_FEE",
        additionalInfo: additionalInfo || {},
        deviceIp,
      });

      ctx.send({
        success: true,
        data: orderConfig,
      });
    } catch (error) {
      const message = getErrorMessage(error);
      console.error("BILLDESK_CREATE_ORDER_CONTROLLER_ERROR:", message);

      if (message.includes("credentials missing")) {
        return ctx.serviceUnavailable(
          "Payment gateway is not configured. Please contact the administrator."
        );
      }

      ctx.internalServerError(
        "Failed to initialize payment. Please try again."
      );
    }
  },

  /**
   * POST /api/billdesk/verify
   *
   * Verifies the transaction response received from BillDesk
   * after payment completion.
   *
   * Request Body:
   * {
   *   transactionResponse: "eyJ4NXQjUzI1NiI6..." // JOSE token
   * }
   *
   * Response:
   * {
   *   success: true,
   *   data: {
   *     verified: true,
   *     orderId: "JMC...",
   *     transactionId: "U1230000041968",
   *     amount: "100.00",
   *     status: "0300",
   *     statusMessage: "SUCCESS",
   *     paymentMethod: "netbanking"
   *   }
   * }
   */
  async verifyTransaction(ctx) {
    try {
      const { transactionResponse } = ctx.request.body;

      if (!transactionResponse) {
        return ctx.badRequest("Transaction response is required");
      }

      const billDeskService = strapi.service("api::billdesk.billdesk-v2");
      const result = await billDeskService.verifyTransaction(transactionResponse);

      ctx.send({
        success: result.verified,
        data: result,
      });
    } catch (error) {
      console.error("Verify transaction error:", getErrorMessage(error));
      ctx.internalServerError("Failed to verify transaction");
    }
  },

  /**
   * POST /api/billdesk/webhook
   *
   * Receives webhook notifications from BillDesk for transaction updates.
   *
   * Request Body: JOSE token (application/jose) or JSON with transactionResponse
   *
   * Response:
   * {
   *   received: true,
   *   success: true,
   *   data: { ... }
   * }
   */
  async webhook(ctx) {
    try {
      const body = ctx.request.body;
      const token =
        typeof body === "string"
          ? body
          : body?.transactionResponse ||
            body?.jws ||
            body?.payload ||
            body?.response;

      if (!token) {
        return ctx.badRequest("Webhook payload is required");
      }

      const billDeskService = strapi.service("api::billdesk.billdesk-v2");
      const result = await billDeskService.verifyTransaction(token);

      ctx.send({
        received: true,
        success: result.verified,
        data: result,
      });
    } catch (error) {
      console.error("Webhook error:", getErrorMessage(error));
      ctx.internalServerError("Failed to process webhook");
    }
  },

  /**
   * POST /api/billdesk/transaction-status
   *
   * Retrieves transaction status from BillDesk by order ID or transaction ID.
   *
   * Request Body:
   * {
   *   orderId: "JMC..." // OR
   *   transactionId: "U1230000041968"
   * }
   *
   * Response:
   * {
   *   success: true,
   *   data: {
   *     status: "SUCCESS",
   *     authStatus: "0300",
   *     orderId: "JMC...",
   *     transactionId: "U1230000041968",
   *     amount: "100.00",
   *     message: "Transaction Successful"
   *   }
   * }
   */
  async transactionStatus(ctx) {
    try {
      const { orderId, transactionId } = ctx.request.body || {};

      if (!orderId && !transactionId) {
        return ctx.badRequest("orderId or transactionId is required");
      }

      const billDeskService = strapi.service("api::billdesk.billdesk-v2");
      const result = await billDeskService.retrieveTransaction({
        orderId,
        transactionId,
      });

      ctx.send({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Transaction status error:", getErrorMessage(error));
      ctx.internalServerError("Failed to retrieve transaction status");
    }
  },
};
