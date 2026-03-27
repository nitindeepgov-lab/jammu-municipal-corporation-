/**
 * BillDesk Controller
 *
 * Exposes two endpoints:
 *   POST /api/billdesk/create-order   → creates a BillDesk order and returns SDK config
 *   POST /api/billdesk/verify         → verifies a BillDesk transaction response
 */

"use strict";

module.exports = {
  /**
   * POST /api/billdesk/create-order
   *
   * Body: { amount, customerName, customerEmail, customerMobile, feeType, additionalInfo }
   * Returns: { merchantId, bdOrderId, authToken, orderId, amount, sdkBaseUrl }
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

      // Validation
      if (!amount || parseFloat(amount) <= 0) {
        return ctx.badRequest("Amount is required and must be greater than 0");
      }
      if (!customerName) {
        return ctx.badRequest("Customer name is required");
      }
      if (!customerMobile) {
        return ctx.badRequest("Mobile number is required");
      }

      const billDeskService = strapi.service("api::billdesk.billdesk");

      const orderConfig = await billDeskService.createOrder({
        amount,
        customerName,
        customerEmail: customerEmail || "",
        customerMobile,
        feeType: feeType || "JMC_FEE",
        additionalInfo: additionalInfo || {},
      });

      ctx.send({
        success: true,
        data: orderConfig,
      });
    } catch (error) {
      console.error("Create order error:", error.message);

      // Check if it's a credentials-missing error
      if (error.message.includes("credentials missing")) {
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
   * Body: { transactionResponse } — JWS token from BillDesk
   * Returns: { verified, orderId, transactionId, amount, status, statusMessage }
   */
  async verifyTransaction(ctx) {
    try {
      const { transactionResponse } = ctx.request.body;

      if (!transactionResponse) {
        return ctx.badRequest("Transaction response is required");
      }

      const billDeskService = strapi.service("api::billdesk.billdesk");
      const result = await billDeskService.verifyTransaction(transactionResponse);

      ctx.send({
        success: result.verified,
        data: result,
      });
    } catch (error) {
      console.error("Verify transaction error:", error.message);
      ctx.internalServerError("Failed to verify transaction");
    }
  },
};
