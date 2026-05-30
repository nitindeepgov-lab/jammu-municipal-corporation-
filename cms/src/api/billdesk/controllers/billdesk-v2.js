/**
 * BillDesk Controller - v2 (Production Hardened)
 * Based on official documentation: https://docs.billdesk.io/docs/neo-full-redirect
 *
 * Key changes from earlier revision:
 * - Uses shared ip-validation and validation utilities (no duplicate logic)
 * - Proper mobile, email, and amount validation
 * - Structured diagnostic logging on every failure without leaking secrets
 *
 * @version 2.2.0
 * @date 2026-05-30
 */

"use strict";

const { getDeviceIp } = require("../../../utils/ip-validation");
const { validateMobile, validateEmail, validateAmount, validateName } = require("../../../utils/validation");

// ── Helpers ─────────────────────────────────────────────

const getErrorMessage = (error) =>
  error instanceof Error ? error.message : String(error);

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
      const amountCheck = validateAmount(amount);
      if (!amountCheck.valid) {
        return ctx.badRequest(amountCheck.message);
      }

      const nameCheck = validateName(customerName);
      if (!nameCheck.valid) {
        return ctx.badRequest(nameCheck.message);
      }

      const mobileCheck = validateMobile(customerMobile);
      if (!mobileCheck.valid) {
        return ctx.badRequest(mobileCheck.message);
      }

      const emailCheck = validateEmail(customerEmail);
      if (!emailCheck.valid) {
        return ctx.badRequest(emailCheck.message);
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
