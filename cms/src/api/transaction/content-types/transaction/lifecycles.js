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
    const { data } = event.params;

    // Enforce that the update must contain system authentication or syncing flags
    const isSystemRetry =
      data.statusChangedBy === "SYSTEM_RETRY" ||
      data.statusChangedBy === "CRON_RECONCILE" ||
      data.statusChangedBy === "CRON_SYNC_RETRY";
    const isDirectVerification = !!data.rawResponse;
    const isCronMetadataUpdate =
      data.retryCount !== undefined ||
      data.lastSyncAttempt !== undefined ||
      data.syncStatus !== undefined;
    const isInitialOrderCreation =
      data.bdOrderId !== undefined && data.rawResponse !== undefined;

    if (!isSystemRetry && !isDirectVerification && !isCronMetadataUpdate && !isInitialOrderCreation) {
      throw new ValidationError(
        "Transaction updates are restricted. The transaction records are read-only and automatically managed by the system."
      );
    }
  },
};
