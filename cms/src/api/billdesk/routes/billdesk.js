/**
 * BillDesk Routes
 *
 * Custom routes — not content-type based, so we use custom route config.
 *
 * SECURITY NOTES:
 * - create-order and verify are public (called by the frontend payment flow)
 * - webhook is public (called by BillDesk servers)
 * - transaction-status is public (used by the payment status page)
 * - config-check has been REMOVED — it leaked server metadata (see security audit)
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
    // REMOVED: /billdesk/config-check — exposed server configuration,
    // egress IP, key metadata, and environment variables publicly.
    // See diagnostic.js for the original handler (preserved for local dev use only).
  ],
};
