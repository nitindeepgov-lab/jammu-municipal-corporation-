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
  ],
};
