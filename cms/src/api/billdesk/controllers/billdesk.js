/**
 * BillDesk Controller
 *
 * Exposes two endpoints:
 *   POST /api/billdesk/create-order   → creates a BillDesk order and returns SDK config
 *   POST /api/billdesk/verify         → verifies a BillDesk transaction response
 *   POST /api/billdesk/webhook        → receives BillDesk webhook notifications
 *   POST /api/billdesk/transaction-status → retrieves transaction status by ID
 *   POST /api/billdesk/reload-transactions → reloads pending transactions
 *   POST /api/billdesk/mark-failed    → manually mark a transaction as failed
 *   POST /api/billdesk/mark-status    → manually update transaction status
 */

"use strict";

/**
 * @param {unknown} error
 * @returns {string}
 */
const getErrorMessage = (error) =>
  error instanceof Error ? error.message : String(error);

const ALLOWED_MANUAL_STATUS = new Set([
  "PENDING",
  "SUCCESS",
  "FAILED",
  "INITIATED",
]);

/**
 * @param {string | null | undefined} status
 * @returns {string | null}
 */
const normalizeManualStatus = (status) => {
  if (!status) return null;
  const normalized = String(status).trim().toUpperCase();
  return ALLOWED_MANUAL_STATUS.has(normalized) ? normalized : null;
};

/**
 * @param {Object} params
 * @param {string=} params.orderId
 * @param {string=} params.transactionId
 * @param {string=} params.status
 * @param {string=} params.reason
 * @returns {Promise<{ notFound: boolean, data?: { id: string | number, orderId: string, transactionId: string, status: string } }>} 
 */
const updateTransactionStatus = async ({
  orderId,
  transactionId,
  status,
  reason,
}) => {
  if (!orderId && !transactionId) {
    throw new Error("orderId or transactionId is required");
  }

  const normalizedStatus = normalizeManualStatus(status);
  if (!normalizedStatus) {
    throw new Error("Invalid status. Use PENDING, SUCCESS, FAILED, INITIATED");
  }

  const transactionQuery = strapi.db.query("api::transaction.transaction");
  const where = orderId ? { orderId } : { transactionId };
  const existing = await transactionQuery.findOne({ where });

  if (!existing) {
    return { notFound: true };
  }

  const rawResponse =
    existing.rawResponse && typeof existing.rawResponse === "object"
      ? existing.rawResponse
      : {};

  const manualOverride = {
    status: normalizedStatus,
    reason: reason || "Manual override",
    updatedAt: new Date().toISOString(),
  };

  const updateData = /** @type {{ status: string, rawResponse: object, transactionId?: string }} */ ({
    status: normalizedStatus,
    rawResponse: { ...rawResponse, manualOverride },
  });

  if (transactionId && !existing.transactionId) {
    updateData.transactionId = transactionId;
  }

  await transactionQuery.update({
    where: { id: existing.id },
    data: updateData,
  });

  return {
    notFound: false,
    data: {
      id: existing.id,
      orderId: existing.orderId,
      transactionId: transactionId || existing.transactionId || "",
      status: normalizedStatus,
    },
  };
};

module.exports = {
  /**
   * POST /api/billdesk/create-order
   *
   * Body: { amount, customerName, customerEmail, customerMobile, feeType, additionalInfo }
   * Returns: { merchantId, bdOrderId, authToken, orderId, amount, sdkBaseUrl }
   */
  /** @param {any} ctx */
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
      const message = getErrorMessage(error);
      console.error("Create order error:", message);

      // Check if it's a credentials-missing error
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
   * Body: { transactionResponse } — JWS token from BillDesk
   * Returns: { verified, orderId, transactionId, amount, status, statusMessage }
   */
  /** @param {any} ctx */
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
      console.error("Verify transaction error:", getErrorMessage(error));
      ctx.internalServerError("Failed to verify transaction");
    }
  },

  /**
   * POST /api/billdesk/webhook
   *
   * Body: application/jose (raw JWS token) or JSON with { transactionResponse | jws | payload }
   * Returns: { received, success, data }
   */
  /** @param {any} ctx */
  async webhook(ctx) {
    try {
      const body = ctx.request.body;
      const token =
        typeof body === "string"
          ? body
          : body?.transactionResponse ||
            body?.jws ||
            body?.payload ||
            body?.event ||
            body?.data ||
            body?.response;

      if (!token) {
        return ctx.badRequest("Webhook payload is required");
      }

      const billDeskService = strapi.service("api::billdesk.billdesk");
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
   * Body: { orderId? , transactionId?, refundDetails? }
   * Returns: { status, authStatus, orderId, transactionId, amount, message }
   */
  /** @param {any} ctx */
  async transactionStatus(ctx) {
    try {
      const { orderId, transactionId, refundDetails } = ctx.request.body || {};

      if (!orderId && !transactionId) {
        return ctx.badRequest("orderId or transactionId is required");
      }

      const billDeskService = strapi.service("api::billdesk.billdesk");
      const result = await billDeskService.retrieveTransaction({
        orderId,
        transactionId,
        refundDetails: refundDetails === true || refundDetails === "true",
      });

      const statusMessage =
        result.auth_status === "0300"
          ? "SUCCESS"
          : result.auth_status === "0002"
          ? "PENDING"
          : "FAILED";

      const responseData = {
        status: statusMessage,
        authStatus: result.auth_status,
        orderId: result.orderid || orderId || "",
        transactionId: result.transactionid || transactionId || "",
        amount: result.amount,
        message: result.status || result.transaction_error_desc || "",
        raw: result,
      };

      const transactionQuery = strapi.db.query(
        "api::transaction.transaction"
      );

      const where = result.orderid
        ? { orderId: result.orderid }
        : result.transactionid
        ? { transactionId: result.transactionid }
        : orderId
        ? { orderId }
        : transactionId
        ? { transactionId }
        : null;

      if (where) {
        const existing = await transactionQuery.findOne({ where });
        if (existing) {
          await transactionQuery.update({
            where,
            data: {
              status: statusMessage,
              transactionId: responseData.transactionId || existing.transactionId,
              rawResponse: result,
            },
          });
        }
      }

      ctx.send({
        success: true,
        data: responseData,
      });
    } catch (error) {
      console.error("Transaction status error:", getErrorMessage(error));
      ctx.internalServerError("Failed to retrieve transaction status");
    }
  },

  /**
   * POST /api/billdesk/reload-transactions
   *
   * Body: { limit? }
   * Returns: { total, updated, failed, skipped }
   */
  /** @param {any} ctx */
  async reloadTransactions(ctx) {
    try {
      const { limit } = ctx.request.body || {};
      const limitValue = Math.max(1, Math.min(parseInt(limit, 10) || 50, 500));

      const transactionQuery = strapi.db.query(
        "api::transaction.transaction"
      );

      const pendingTransactions = await transactionQuery.findMany({
        where: {
          status: {
            $in: ["PENDING", "INITIATED"],
          },
        },
        orderBy: { createdAt: "desc" },
        limit: limitValue,
      });

      const billDeskService = strapi.service("api::billdesk.billdesk");

      const summary = {
        total: pendingTransactions.length,
        updated: 0,
        failed: 0,
        skipped: 0,
      };

      for (const txn of pendingTransactions) {
        const lookupOrderId = txn.orderId || "";
        const lookupTxnId = txn.transactionId || "";

        if (!lookupOrderId && !lookupTxnId) {
          summary.skipped += 1;
          continue;
        }

        try {
          const result = await billDeskService.retrieveTransaction({
            orderId: lookupOrderId || undefined,
            transactionId: lookupTxnId || undefined,
          });

          const statusMessage =
            result.auth_status === "0300"
              ? "SUCCESS"
              : result.auth_status === "0002"
              ? "PENDING"
              : "FAILED";

          await transactionQuery.update({
            where: { id: txn.id },
            data: {
              status: statusMessage,
              transactionId: result.transactionid || txn.transactionId,
              rawResponse: result,
            },
          });

          summary.updated += 1;
        } catch (error) {
          summary.failed += 1;
          console.error(
            "Reload transaction failed:",
            txn.orderId || txn.transactionId,
            getErrorMessage(error)
          );
        }
      }

      ctx.send({
        success: true,
        data: summary,
      });
    } catch (error) {
      console.error("Reload transactions error:", getErrorMessage(error));
      ctx.internalServerError("Failed to reload transactions");
    }
  },

  /**
   * POST /api/billdesk/mark-failed
   *
   * Body: { orderId?, transactionId?, reason? }
   * Returns: { id, orderId, transactionId, status }
   */
  /** @param {any} ctx */
  async markFailed(ctx) {
    try {
      const { orderId, transactionId, reason } = ctx.request.body || {};
      const result = await updateTransactionStatus({
        orderId,
        transactionId,
        status: "FAILED",
        reason,
      });

      if (result.notFound) {
        return ctx.notFound("Transaction not found");
      }

      ctx.send({ success: true, data: result.data });
    } catch (error) {
      const message = getErrorMessage(error);
      if (message.includes("required") || message.includes("Invalid status")) {
        return ctx.badRequest(message);
      }
      console.error("Mark failed error:", message);
      ctx.internalServerError("Failed to mark transaction as failed");
    }
  },

  /**
   * POST /api/billdesk/mark-status
   *
   * Body: { orderId?, transactionId?, status, reason? }
   * Returns: { id, orderId, transactionId, status }
   */
  /** @param {any} ctx */
  async markStatus(ctx) {
    try {
      const { orderId, transactionId, status, reason } = ctx.request.body || {};
      const result = await updateTransactionStatus({
        orderId,
        transactionId,
        status,
        reason,
      });

      if (result.notFound) {
        return ctx.notFound("Transaction not found");
      }

      ctx.send({ success: true, data: result.data });
    } catch (error) {
      const message = getErrorMessage(error);
      if (message.includes("required") || message.includes("Invalid status")) {
        return ctx.badRequest(message);
      }
      console.error("Mark status error:", message);
      ctx.internalServerError("Failed to update transaction status");
    }
  },
};
