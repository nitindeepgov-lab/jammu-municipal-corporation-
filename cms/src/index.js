"use strict";

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      // 1) Programmatically auto-configure the transaction admin list view configuration if present
      const store = strapi.db.query("strapi::core-store");
      const config = await store.findOne({
        where: {
          key: "plugin_content_manager_configuration_content_types::api::transaction.transaction",
        },
      });

      if (config && config.value) {
        const value = JSON.parse(config.value);
        if (value.layouts && value.layouts.list) {
          const list = value.layouts.list;
          if (!list.includes("customerName")) {
            const idIdx = list.indexOf("id");
            if (idIdx !== -1) {
              list.splice(idIdx + 1, 0, "customerName");
            } else {
              list.unshift("customerName");
            }
            value.layouts.list = list;
            await store.update({
              where: { id: config.id },
              data: { value: JSON.stringify(value) },
            });
            strapi.log.info(
              "Successfully updated Transaction collection view to display customerName column in CMS."
            );
          }
        }
      }
    } catch (e) {
      strapi.log.warn(
        `Soft skip auto-configuring transaction table layouts: ${e.message}`
      );
    }

    try {
      // Auto-grant Public role read access to all content types exposed to the frontend.
      // This must not block Strapi startup if the database is slow or temporarily unreachable.
      const publicRole = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });

      if (!publicRole) return;

      const contentTypes = [
        "api::bulletin-board.bulletin-board",
        "api::official.official",
        "api::news-ticker.news-ticker",
        "api::notice.notice",
        "api::tender.tender",
        "api::smart-city-tender.smart-city-tender",
        "api::councillor-detail.councillor-detail",
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
    } catch (error) {
      strapi.log.warn(
        `Skipping public permission sync during bootstrap: ${error.message}`,
      );
    }
  },
};
