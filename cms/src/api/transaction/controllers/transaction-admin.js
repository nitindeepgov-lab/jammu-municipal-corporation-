'use strict';

/**
 * Transaction Admin Controller
 *
 * Admin-only endpoints for managing transactions.
 * All endpoints require authentication (admin JWT).
 */

module.exports = {
  /**
   * GET /api/transactions/admin/list
   * Query params: page, pageSize, status, search, sortBy, sortOrder
   */
  async list(ctx) {
    try {
      const { page, pageSize, status, search, sortBy, sortOrder } = ctx.query;
      const adminService = strapi.service('api::transaction.transaction-admin');

      const result = await adminService.list({
        page: parseInt(page, 10) || 1,
        pageSize: parseInt(pageSize, 10) || 25,
        status: status || null,
        search: search || null,
        sortBy: sortBy || 'createdAt',
        sortOrder: sortOrder || 'desc',
      });

      ctx.send(result);
    } catch (error) {
      console.error('Transaction admin list error:', error.message);
      ctx.internalServerError('Failed to fetch transactions');
    }
  },

  /**
   * GET /api/transactions/admin/:id
   * Returns transaction details with audit log history.
   */
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const adminService = strapi.service('api::transaction.transaction-admin');

      const result = await adminService.findOneWithAudit(parseInt(id, 10));
      if (!result) {
        return ctx.notFound('Transaction not found');
      }

      ctx.send(result);
    } catch (error) {
      console.error('Transaction admin findOne error:', error.message);
      ctx.internalServerError('Failed to fetch transaction details');
    }
  },

  /**
   * POST /api/transactions/admin/:id/update-status
   * Body: { newStatus, reason }
   */
  async updateStatus(ctx) {
    try {
      const { id } = ctx.params;
      const { newStatus, reason } = ctx.request.body;
      const adminUser = ctx.state?.user?.email || ctx.state?.user?.username || 'admin';
      const ipAddress = ctx.request.ip;

      if (!newStatus) {
        return ctx.badRequest('newStatus is required');
      }

      const adminService = strapi.service('api::transaction.transaction-admin');
      const result = await adminService.updateStatus({
        id: parseInt(id, 10),
        newStatus,
        reason,
        performedBy: adminUser,
        ipAddress,
      });

      ctx.send({ success: true, data: result });
    } catch (error) {
      console.error('Transaction status update error:', error.message);
      if (error.message.includes('not found')) {
        return ctx.notFound(error.message);
      }
      if (error.message.includes('Invalid status')) {
        return ctx.badRequest(error.message);
      }
      ctx.internalServerError('Failed to update transaction status');
    }
  },

  /**
   * POST /api/transactions/admin/:id/reverse
   * Body: { reason }
   */
  async reverse(ctx) {
    try {
      const { id } = ctx.params;
      const { reason } = ctx.request.body;
      const adminUser = ctx.state?.user?.email || ctx.state?.user?.username || 'admin';
      const ipAddress = ctx.request.ip;

      const adminService = strapi.service('api::transaction.transaction-admin');
      const result = await adminService.reverseTransaction({
        id: parseInt(id, 10),
        reason,
        performedBy: adminUser,
        ipAddress,
      });

      ctx.send({ success: true, data: result });
    } catch (error) {
      console.error('Transaction reverse error:', error.message);
      if (error.message.includes('not found')) {
        return ctx.notFound(error.message);
      }
      ctx.badRequest(error.message);
    }
  },

  /**
   * POST /api/transactions/admin/:id/refund
   * Body: { refundAmount, refundId, reason }
   */
  async refund(ctx) {
    try {
      const { id } = ctx.params;
      const { refundAmount, refundId, reason } = ctx.request.body;
      const adminUser = ctx.state?.user?.email || ctx.state?.user?.username || 'admin';
      const ipAddress = ctx.request.ip;

      const adminService = strapi.service('api::transaction.transaction-admin');
      const result = await adminService.refundTransaction({
        id: parseInt(id, 10),
        refundAmount,
        refundId,
        reason,
        performedBy: adminUser,
        ipAddress,
      });

      ctx.send({ success: true, data: result });
    } catch (error) {
      console.error('Transaction refund error:', error.message);
      if (error.message.includes('not found')) {
        return ctx.notFound(error.message);
      }
      ctx.badRequest(error.message);
    }
  },

  /**
   * POST /api/transactions/admin/:id/retry
   * Re-checks transaction status with BillDesk.
   */
  async retry(ctx) {
    try {
      const { id } = ctx.params;
      const adminUser = ctx.state?.user?.email || ctx.state?.user?.username || 'admin';
      const ipAddress = ctx.request.ip;

      const adminService = strapi.service('api::transaction.transaction-admin');
      const result = await adminService.retryStatusCheck({
        id: parseInt(id, 10),
        performedBy: adminUser,
        ipAddress,
      });

      ctx.send(result);
    } catch (error) {
      console.error('Transaction retry error:', error.message);
      ctx.internalServerError('Failed to retry status check');
    }
  },

  /**
   * GET /api/transactions/admin/audit-log
   * Query params: page, pageSize, orderId
   */
  async auditLog(ctx) {
    try {
      const { page, pageSize, orderId } = ctx.query;
      const adminService = strapi.service('api::transaction.transaction-admin');

      const result = await adminService.getAuditLog({
        page: parseInt(page, 10) || 1,
        pageSize: parseInt(pageSize, 10) || 50,
        orderId: orderId || null,
      });

      ctx.send(result);
    } catch (error) {
      console.error('Audit log fetch error:', error.message);
      ctx.internalServerError('Failed to fetch audit log');
    }
  },

  /**
   * GET /api/transactions/admin/stats
   * Returns transaction count statistics by status.
   */
  async stats(ctx) {
    try {
      const adminService = strapi.service('api::transaction.transaction-admin');
      const result = await adminService.getStats();
      ctx.send(result);
    } catch (error) {
      console.error('Transaction stats error:', error.message);
      ctx.internalServerError('Failed to fetch transaction statistics');
    }
  },
};
