module.exports = ({ env }) => {
  const keepAliveUrl =
    env('KEEP_ALIVE_URL') ||
    env('RENDER_HEALTH_URL') ||
    env('STRAPI_URL') ||
    'https://example-onrender.com/api/health';

  return {
    enabled: env.bool('CRON_ENABLED', true),
    tasks: {
      // Ping Render every 5 minutes to prevent sleep
      '*/5 * * * *': async ({ strapi }) => {
        const startedAt = Date.now();
        try {
          const response = await fetch(keepAliveUrl, {
            method: 'GET',
            headers: { 'User-Agent': 'jmc-keep-alive-cron' },
          });
          const elapsed = Date.now() - startedAt;

          if (response.ok) {
            strapi.log.info(
              `[keep-alive] Ping succeeded (${elapsed}ms) -> ${keepAliveUrl}`,
            );
          } else {
            strapi.log.warn(
              `[keep-alive] Ping returned ${response.status} after ${elapsed}ms -> ${keepAliveUrl}`,
            );
          }
        } catch (error) {
          const elapsed = Date.now() - startedAt;
          strapi.log.error(
            `[keep-alive] Ping failed after ${elapsed}ms -> ${keepAliveUrl} :: ${error.message}`,
          );
        }
      },

      // ── Transaction Reconciliation ─────────────────────────────────
      // Every 15 minutes: check PENDING transactions older than 30 minutes,
      // attempt to re-verify their status with BillDesk.
      '*/15 * * * *': async ({ strapi }) => {
        try {
          const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();

          const staleTransactions = await strapi.db
            .query('api::transaction.transaction')
            .findMany({
              where: {
                status: { $in: ['PENDING', 'INITIATED'] },
                createdAt: { $lt: thirtyMinutesAgo },
                retryCount: { $lt: 3 }, // Don't retry more than 3 times
              },
              limit: 10,
              orderBy: { createdAt: 'asc' },
            });

          if (staleTransactions.length === 0) return;

          strapi.log.info(
            `[txn-reconcile] Found ${staleTransactions.length} stale transaction(s) to reconcile`,
          );

          const adminService = strapi.service('api::transaction.transaction-admin');

          for (const txn of staleTransactions) {
            try {
              const result = await adminService.retryStatusCheck({
                id: txn.id,
                performedBy: 'CRON_RECONCILE',
                ipAddress: 'server',
              });

              strapi.log.info(
                `[txn-reconcile] ${txn.orderId}: ${result.success ? 'resolved' : 'still pending'} (retry #${(txn.retryCount || 0) + 1})`,
              );
            } catch (retryError) {
              strapi.log.error(
                `[txn-reconcile] ${txn.orderId}: retry failed — ${retryError.message}`,
              );
            }
          }
        } catch (error) {
          strapi.log.error(`[txn-reconcile] Cron error: ${error.message}`);
        }
      },

      // ── Failed Sync Retry ──────────────────────────────────────────
      // Every hour: retry transactions whose sync failed.
      '0 * * * *': async ({ strapi }) => {
        try {
          const failedSyncs = await strapi.db
            .query('api::transaction.transaction')
            .findMany({
              where: {
                syncStatus: 'FAILED',
                retryCount: { $lt: 5 },
              },
              limit: 5,
              orderBy: { lastSyncAttempt: 'asc' },
            });

          if (failedSyncs.length === 0) return;

          strapi.log.info(
            `[sync-retry] Found ${failedSyncs.length} failed sync(s) to retry`,
          );

          const adminService = strapi.service('api::transaction.transaction-admin');

          for (const txn of failedSyncs) {
            try {
              await adminService.retryStatusCheck({
                id: txn.id,
                performedBy: 'CRON_SYNC_RETRY',
                ipAddress: 'server',
              });
            } catch (err) {
              strapi.log.error(
                `[sync-retry] ${txn.orderId}: failed — ${err.message}`,
              );
            }
          }
        } catch (error) {
          strapi.log.error(`[sync-retry] Cron error: ${error.message}`);
        }
      },
    },
  };
};
