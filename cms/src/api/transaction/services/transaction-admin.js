'use strict';

/**
 * Transaction Admin Service
 *
 * Business logic for admin transaction management:
 * - Paginated listing with filtering and search
 * - Status transitions with validation and audit trails
 * - BillDesk status re-check (retry)
 * - Refund/reversal operations
 *
 * @version 1.0.0
 */

// Valid status transitions
const VALID_TRANSITIONS = {
  INITIATED: ['PENDING', 'SUCCESS', 'FAILED'],
  PENDING:   ['SUCCESS', 'FAILED'],
  SUCCESS:   ['REVERSED', 'REFUNDED'],
  FAILED:    ['PENDING', 'SUCCESS'], // manual correction
  REVERSED:  [], // terminal state
  REFUNDED:  [], // terminal state
};

module.exports = ({ strapi }) => ({
  /**
   * List transactions with filtering, search, and pagination.
   */
  async list({ page = 1, pageSize = 25, status, search, sortBy = 'createdAt', sortOrder = 'desc' }) {
    const query = strapi.db.query('api::transaction.transaction');

    const where = {};
    if (status) {
      where.status = status;
    }
    if (search) {
      where.$or = [
        { orderId: { $containsi: search } },
        { transactionId: { $containsi: search } },
        { customerName: { $containsi: search } },
        { customerMobile: { $containsi: search } },
      ];
    }

    const [entries, total] = await Promise.all([
      query.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        offset: (page - 1) * pageSize,
        limit: pageSize,
      }),
      query.count({ where }),
    ]);

    return {
      data: entries,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      },
    };
  },

  /**
   * Get a single transaction with its audit log.
   */
  async findOneWithAudit(id) {
    const transaction = await strapi.db
      .query('api::transaction.transaction')
      .findOne({ where: { id } });

    if (!transaction) {
      return null;
    }

    const auditLogs = await strapi.db
      .query('api::audit-log.audit-log')
      .findMany({
        where: { orderId: transaction.orderId },
        orderBy: { createdAt: 'desc' },
        limit: 50,
      });

    return { transaction, auditLogs };
  },

  /**
   * Update transaction status with validation and audit trail.
   */
  async updateStatus({ id, newStatus, reason, performedBy, ipAddress }) {
    const transaction = await strapi.db
      .query('api::transaction.transaction')
      .findOne({ where: { id } });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const currentStatus = transaction.status;
    const allowed = VALID_TRANSITIONS[currentStatus] || [];

    if (!allowed.includes(newStatus)) {
      throw new Error(
        `Invalid status transition: ${currentStatus} → ${newStatus}. ` +
        `Allowed transitions: ${allowed.join(', ') || 'none (terminal state)'}`
      );
    }

    // Update the transaction
    const updated = await strapi.db
      .query('api::transaction.transaction')
      .update({
        where: { id },
        data: {
          status: newStatus,
          previousStatus: currentStatus,
          statusChangedBy: performedBy,
          statusChangedAt: new Date().toISOString(),
          adminNotes: reason || transaction.adminNotes,
        },
      });

    // Create audit log entry
    await strapi.db.query('api::audit-log.audit-log').create({
      data: {
        action: 'STATUS_CHANGE',
        transactionId: transaction.transactionId || '',
        orderId: transaction.orderId,
        performedBy,
        previousValue: { status: currentStatus },
        newValue: { status: newStatus },
        reason: reason || `Status changed from ${currentStatus} to ${newStatus}`,
        ipAddress,
      },
    });

    return updated;
  },

  /**
   * Reverse a successful transaction.
   */
  async reverseTransaction({ id, reason, performedBy, ipAddress }) {
    return this.updateStatus({
      id,
      newStatus: 'REVERSED',
      reason: reason || 'Transaction reversed by admin',
      performedBy,
      ipAddress,
    });
  },

  /**
   * Record a refund for a transaction.
   */
  async refundTransaction({ id, refundAmount, refundId, reason, performedBy, ipAddress }) {
    const transaction = await strapi.db
      .query('api::transaction.transaction')
      .findOne({ where: { id } });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (transaction.status !== 'SUCCESS') {
      throw new Error(`Cannot refund a transaction with status: ${transaction.status}`);
    }

    const amount = Number(refundAmount || transaction.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('Invalid refund amount');
    }

    const updated = await strapi.db
      .query('api::transaction.transaction')
      .update({
        where: { id },
        data: {
          status: 'REFUNDED',
          previousStatus: transaction.status,
          statusChangedBy: performedBy,
          statusChangedAt: new Date().toISOString(),
          refundId: refundId || `REF-${Date.now()}`,
          refundAmount: amount,
          refundedAt: new Date().toISOString(),
          adminNotes: reason || 'Refund processed',
        },
      });

    await strapi.db.query('api::audit-log.audit-log').create({
      data: {
        action: 'REFUND',
        transactionId: transaction.transactionId || '',
        orderId: transaction.orderId,
        performedBy,
        previousValue: { status: transaction.status, amount: transaction.amount },
        newValue: { status: 'REFUNDED', refundAmount: amount, refundId: updated.refundId },
        reason: reason || 'Refund processed by admin',
        ipAddress,
      },
    });

    return updated;
  },

  /**
   * Retry BillDesk status check for a pending/failed transaction.
   */
  async retryStatusCheck({ id, performedBy, ipAddress }) {
    const transaction = await strapi.db
      .query('api::transaction.transaction')
      .findOne({ where: { id } });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Update retry metadata
    await strapi.db.query('api::transaction.transaction').update({
      where: { id },
      data: {
        retryCount: (transaction.retryCount || 0) + 1,
        lastSyncAttempt: new Date().toISOString(),
        syncStatus: 'PENDING',
      },
    });

    // Log the retry attempt
    await strapi.db.query('api::audit-log.audit-log').create({
      data: {
        action: 'RETRY',
        transactionId: transaction.transactionId || '',
        orderId: transaction.orderId,
        performedBy,
        previousValue: { status: transaction.status, retryCount: transaction.retryCount || 0 },
        newValue: { retryCount: (transaction.retryCount || 0) + 1 },
        reason: 'Manual status re-check triggered by admin',
        ipAddress,
      },
    });

    // Attempt BillDesk status re-check
    try {
      const billDeskService = strapi.service('api::billdesk.billdesk-v2');
      const result = await billDeskService.retrieveTransaction({
        orderId: transaction.orderId,
      });

      if (result && result.status) {
        // Map BillDesk status
        let newStatus = transaction.status;
        if (result.status === '0300' || result.statusMessage === 'SUCCESS') {
          newStatus = 'SUCCESS';
        } else if (result.status === '0002') {
          newStatus = 'PENDING';
        } else if (result.status !== transaction.status) {
          newStatus = 'FAILED';
        }

        // Update if status changed
        if (newStatus !== transaction.status) {
          await this.updateStatus({
            id,
            newStatus,
            reason: `Status updated after BillDesk re-check: ${result.statusMessage || result.status}`,
            performedBy: 'SYSTEM_RETRY',
            ipAddress: 'server',
          });
        }

        await strapi.db.query('api::transaction.transaction').update({
          where: { id },
          data: { syncStatus: 'SYNCED' },
        });

        return { success: true, billDeskResult: result, newStatus };
      }

      return { success: false, message: 'No result from BillDesk' };
    } catch (error) {
      await strapi.db.query('api::transaction.transaction').update({
        where: { id },
        data: { syncStatus: 'FAILED' },
      });

      return { success: false, message: error.message };
    }
  },

  /**
   * Get audit log entries, optionally filtered by orderId.
   */
  async getAuditLog({ page = 1, pageSize = 50, orderId }) {
    const where = {};
    if (orderId) {
      where.orderId = orderId;
    }

    const query = strapi.db.query('api::audit-log.audit-log');

    const [entries, total] = await Promise.all([
      query.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        offset: (page - 1) * pageSize,
        limit: pageSize,
      }),
      query.count({ where }),
    ]);

    return {
      data: entries,
      meta: {
        pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) },
      },
    };
  },

  /**
   * Get transaction summary statistics.
   */
  async getStats() {
    const query = strapi.db.query('api::transaction.transaction');

    const [total, success, failed, pending, initiated, reversed, refunded] = await Promise.all([
      query.count({}),
      query.count({ where: { status: 'SUCCESS' } }),
      query.count({ where: { status: 'FAILED' } }),
      query.count({ where: { status: 'PENDING' } }),
      query.count({ where: { status: 'INITIATED' } }),
      query.count({ where: { status: 'REVERSED' } }),
      query.count({ where: { status: 'REFUNDED' } }),
    ]);

    return { total, success, failed, pending, initiated, reversed, refunded };
  },
});
