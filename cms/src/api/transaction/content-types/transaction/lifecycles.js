"use strict";

const { ValidationError } = require("@strapi/utils").errors;

/**
 * Transaction Database Lifecycles
 * Enforces that transaction status changes can only occur through:
 * 1. Authenticated BillDesk status query sync (SYSTEM_RETRY)
 * 2. Authenticated BillDesk payment verification/webhook (rawResponse)
 *
 * Direct manual overrides from the Strapi Admin Panel interface are blocked.
 */
module.exports = {
  async beforeUpdate(event) {
    const { data, where } = event.params;

    // Intercept when the payment status attribute is modified
    if (data.status) {
      // Retrieve the current record from the database to compare
      const current = await strapi.db
        .query("api::transaction.transaction")
        .findOne({ where });

      if (current && current.status !== data.status) {
        // Enforce that the update must contain system authentication flags
        const isSystemRetry = data.statusChangedBy === "SYSTEM_RETRY";
        const isDirectVerification = !!data.rawResponse;

        if (!isSystemRetry && !isDirectVerification) {
          throw new ValidationError(
            "Manual status overrides are disabled. Transactions can only be updated automatically by syncing with BillDesk."
          );
        }
      }
    }
  },
};
