'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::visitor-count.visitor-count',
  ({ strapi }) => ({
    /**
     * GET /api/visitor-count/current
     * Returns the current visitor count.
     */
    async current(ctx) {
      const query = strapi.db.query('api::visitor-count.visitor-count');
      const entries = await query.findMany({ limit: 1, orderBy: { id: 'asc' } });
      const entry = entries[0];
      ctx.send({ count: entry?.count || 0 });
    },

    /**
     * POST /api/visitor-count/increment
     *
     * Atomically increments the global visitor counter using raw SQL
     * to prevent race conditions (B1/B8 fix). Uses INSERT ON CONFLICT
     * for safe initialization and UPDATE ... SET count = count + 1 for
     * atomic increment without read-then-write.
     */
    async increment(ctx) {
      const knex = strapi.db.connection;

      try {
        // Atomic upsert: insert with count=1 if no row exists,
        // or increment existing row's count by 1.
        const result = await knex.raw(`
          INSERT INTO visitor_counts (count)
          VALUES (1)
          ON CONFLICT (id)
          DO UPDATE SET count = visitor_counts.count + 1
          RETURNING count
        `);

        const count = result?.rows?.[0]?.count ?? 1;
        ctx.send({ count });
      } catch (error) {
        // Fallback to Strapi ORM if raw SQL fails (e.g. table structure differs)
        console.error('[visitor-count] Atomic increment failed, using fallback:', error.message);

        const query = strapi.db.query('api::visitor-count.visitor-count');
        const entries = await query.findMany({ limit: 1, orderBy: { id: 'asc' } });
        let entry = entries[0];

        if (!entry) {
          entry = await query.create({ data: { count: 1 } });
        } else {
          entry = await query.update({
            where: { id: entry.id },
            data: { count: (entry.count || 0) + 1 },
          });
        }

        ctx.send({ count: entry?.count ?? 1 });
      }
    },
  }),
);
