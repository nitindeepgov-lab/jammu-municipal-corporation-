'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const getOrCreateCounter = async (strapi) => {
  const query = strapi.db.query('api::visitor-count.visitor-count');
  const entries = await query.findMany({ limit: 1, orderBy: { id: 'asc' } });
  let entry = entries[0];

  if (!entry) {
    entry = await query.create({ data: { count: 0 } });
  }

  return entry;
};

module.exports = createCoreController(
  'api::visitor-count.visitor-count',
  ({ strapi }) => ({
    async current(ctx) {
      const entry = await getOrCreateCounter(strapi);
      ctx.send({ count: entry.count || 0 });
    },

    async increment(ctx) {
      const entry = await getOrCreateCounter(strapi);
      const nextCount = (entry.count || 0) + 1;

      const updated = await strapi.db
        .query('api::visitor-count.visitor-count')
        .update({
          where: { id: entry.id },
          data: { count: nextCount },
        });

      ctx.send({ count: updated?.count ?? nextCount });
    },
  }),
);
