"use strict";

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    // Auto-grant Public role read access to all content types exposed to the frontend
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (!publicRole) return;

    const contentTypes = [
      "api::bulletin-board.bulletin-board",
      "api::councillor-detail.councillor-detail",
      "api::official.official",
      "api::news-ticker.news-ticker",
      "api::notice.notice",
      "api::tender.tender",
      "api::smart-city-tender.smart-city-tender",
    ];

    for (const ct of contentTypes) {
      for (const method of ["find", "findOne"]) {
        const action = `${ct}.${method}`;
        const existing = await strapi
          .query("plugin::users-permissions.permission")
          .findOne({ where: { action, role: publicRole.id } });

        if (!existing) {
          await strapi
            .query("plugin::users-permissions.permission")
            .create({ data: { action, role: publicRole.id, enabled: true } });
        } else if (!existing.enabled) {
          await strapi
            .query("plugin::users-permissions.permission")
            .update({ where: { id: existing.id }, data: { enabled: true } });
        }
      }
    }
  },
};
