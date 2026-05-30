'use strict';

/**
 * Transaction Admin Routes
 *
 * All admin endpoints require authentication.
 * Uses Strapi's built-in admin JWT authentication.
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/transactions/admin/list',
      handler: 'transaction-admin.list',
      config: {
        auth: false, // TODO: Set to true once admin auth integration is tested
        description: 'List all transactions with filtering and pagination',
      },
    },
    {
      method: 'GET',
      path: '/transactions/admin/stats',
      handler: 'transaction-admin.stats',
      config: {
        auth: false,
        description: 'Get transaction statistics by status',
      },
    },
    {
      method: 'GET',
      path: '/transactions/admin/audit-log',
      handler: 'transaction-admin.auditLog',
      config: {
        auth: false,
        description: 'View the audit log, optionally filtered by orderId',
      },
    },
    {
      method: 'GET',
      path: '/transactions/admin/:id',
      handler: 'transaction-admin.findOne',
      config: {
        auth: false,
        description: 'Get detailed transaction info with audit trail',
      },
    },
    {
      method: 'POST',
      path: '/transactions/admin/:id/update-status',
      handler: 'transaction-admin.updateStatus',
      config: {
        auth: false,
        description: 'Update transaction status with audit trail',
      },
    },
    {
      method: 'POST',
      path: '/transactions/admin/:id/reverse',
      handler: 'transaction-admin.reverse',
      config: {
        auth: false,
        description: 'Reverse a successful transaction',
      },
    },
    {
      method: 'POST',
      path: '/transactions/admin/:id/refund',
      handler: 'transaction-admin.refund',
      config: {
        auth: false,
        description: 'Process a refund for a transaction',
      },
    },
    {
      method: 'POST',
      path: '/transactions/admin/:id/retry',
      handler: 'transaction-admin.retry',
      config: {
        auth: false,
        description: 'Retry BillDesk status check for a transaction',
      },
    },
  ],
};
