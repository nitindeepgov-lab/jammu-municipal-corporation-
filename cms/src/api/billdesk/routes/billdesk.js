/**
 * BillDesk Routes
 *
 * Custom routes — not content-type based, so we use custom route config.
 * Both endpoints are public (no auth required) for payment processing.
 */

"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/billdesk/create-order",
      handler: "billdesk.createOrder",
      config: {
        auth: false, // Public endpoint — frontend calls this
        description: "Create a BillDesk order and return SDK config",
      },
    },
    {
      method: "POST",
      path: "/billdesk/verify",
      handler: "billdesk.verifyTransaction",
      config: {
        auth: false, // Public — BillDesk callback + frontend verification
        description: "Verify a BillDesk transaction response",
      },
    },
    {
      method: "POST",
      path: "/billdesk/webhook",
      handler: "billdesk.webhook",
      config: {
        auth: false, // Public — BillDesk webhook notifications
        description: "Receive BillDesk webhook events",
      },
    },
    {
      method: "POST",
      path: "/billdesk/transaction-status",
      handler: "billdesk.transactionStatus",
      config: {
        auth: false, // Public — manual verification by transaction/order ID
        description: "Retrieve BillDesk transaction status",
      },
    },
    {
      method: "POST",
      path: "/billdesk/reload-transactions",
      handler: "billdesk.reloadTransactions",
      config: {
        auth: false, // Public — intended for CMS admin use
        description: "Reload pending BillDesk transactions",
      },
    },
    {
      method: "POST",
      path: "/billdesk/mark-failed",
      handler: "billdesk.markFailed",
      config: {
        auth: false, // Public — intended for CMS admin use
        description: "Manually mark a transaction as failed",
      },
    },
    {
      method: "POST",
      path: "/billdesk/mark-status",
      handler: "billdesk.markStatus",
      config: {
        auth: false, // Public — intended for CMS admin use
        description: "Manually update a transaction status",
      },
    },
    {
      method: "GET",
      path: "/billdesk/diagnostic",
      handler: "billdesk.diagnostic",
      config: {
        auth: false,
        description: "Diagnostic endpoint to check timestamp format and configuration",
      },
    },
  ],
};
