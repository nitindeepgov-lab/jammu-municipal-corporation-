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
    },
  };
};
