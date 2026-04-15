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
      handler: "billdesk-v2.createOrder",
      config: {
        auth: false,
        description: "Create a BillDesk order and return SDK config",
      },
    },
    {
      method: "POST",
      path: "/billdesk/verify",
      handler: "billdesk-v2.verifyTransaction",
      config: {
        auth: false,
        description: "Verify a BillDesk transaction response",
      },
    },
    {
      method: "POST",
      path: "/billdesk/webhook",
      handler: "billdesk-v2.webhook",
      config: {
        auth: false,
        description: "Receive BillDesk webhook events",
      },
    },
    {
      method: "POST",
      path: "/billdesk/transaction-status",
      handler: "billdesk-v2.transactionStatus",
      config: {
        auth: false,
        description: "Retrieve BillDesk transaction status",
      },
    },
  ],
};
