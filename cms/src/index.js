"use strict";

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      // 1) Programmatically auto-configure the transaction admin list and edit configurations
      const store = strapi.db.query("strapi::core-store");
      let config = await store.findOne({
        where: {
          key: "plugin_content_manager_configuration_content_types::api::transaction.transaction",
        },
      });

      let value;
      if (config && config.value) {
        value = JSON.parse(config.value);
      } else {
        // If the configuration does not exist, let's clone basic settings from another content type
        const templateConfig = await store.findOne({
          where: {
            key: {
              $containsi: "plugin_content_manager_configuration_content_types::api::"
            }
          }
        });

        if (templateConfig && templateConfig.value) {
          value = JSON.parse(templateConfig.value);
        } else {
          value = {
            settings: {
              bulkable: true,
              filterable: true,
              searchable: true,
              pageSize: 10,
              mainField: "id",
              defaultSortBy: "id",
              defaultSortOrder: "DESC"
            },
            layouts: {},
            metadatas: {}
          };
        }
      }

      // Force list view columns to be exactly: id, customerName, orderId, transactionId
      value.layouts = value.layouts || {};
      value.layouts.list = ["id", "customerName", "orderId", "transactionId"];

      // Force Edit View layout to show only the 8 core readable fields
      value.layouts.edit = [
        [
          { name: "customerName", size: 6 },
          { name: "amount", size: 6 }
        ],
        [
          { name: "status", size: 6 },
          { name: "feeType", size: 6 }
        ],
        [
          { name: "customerMobile", size: 6 },
          { name: "customerEmail", size: 6 }
        ],
        [
          { name: "orderId", size: 6 },
          { name: "transactionId", size: 6 }
        ]
      ];

      // Define standard attributes metadata to hide technical fields and make all fields read-only
      const attributes = [
        "id", "orderId", "bdOrderId", "transactionId", "amount", "status",
        "customerName", "customerMobile", "customerEmail", "feeType",
        "additionalInfo", "rawResponse", "previousStatus", "statusChangedBy",
        "statusChangedAt", "adminNotes", "refundId", "refundAmount",
        "refundedAt", "syncStatus", "retryCount", "lastSyncAttempt"
      ];

      value.metadatas = value.metadatas || {};
      const coreFields = [
        "id", "orderId", "transactionId", "amount", "status",
        "customerName", "customerMobile", "customerEmail", "feeType"
      ];

      for (const attr of attributes) {
        value.metadatas[attr] = value.metadatas[attr] || { edit: {}, list: {} };
        const label = attr
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, str => str.toUpperCase());

        value.metadatas[attr].edit = {
          label: value.metadatas[attr].edit?.label || label,
          description: value.metadatas[attr].edit?.description || "",
          placeholder: value.metadatas[attr].edit?.placeholder || "",
          visible: coreFields.includes(attr),
          editable: false
        };

        value.metadatas[attr].list = {
          label: value.metadatas[attr].list?.label || label,
          searchable: true,
          sortable: true
        };
      }

      if (config) {
        await store.update({
          where: { id: config.id },
          data: { value: JSON.stringify(value) },
        });
      } else {
        await store.create({
          data: {
            key: "plugin_content_manager_configuration_content_types::api::transaction.transaction",
            value: JSON.stringify(value),
            type: "object"
          }
        });
      }

      strapi.log.info(
        "Successfully simplified Transaction CMS edit/list layouts and disabled manual status edits."
      );
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
        "api::hero-slide.hero-slide",
        "api::minister.minister",
        "api::photo-gallery.photo-gallery",
        "api::location.location",
        "api::event-activity.event-activity",
        "api::footer-link.footer-link",
      ];

      const promises = [];
      for (const ct of contentTypes) {
        for (const method of ["find", "findOne"]) {
          const action = `${ct}.${method}`;
          promises.push(
            (async () => {
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
            })()
          );
        }
      }
      await Promise.all(promises);
    } catch (error) {
      strapi.log.warn(
        `Skipping public permission sync during bootstrap: ${error.message}`,
      );
    }

    try {
      // Auto-configure Footer Link content manager layout to prevent Admin UI crashes.
      // Strapi v5's auto-generated layout builder can crash on enumeration fields
      // if the stored layout config is missing proper metadata entries.
      const flStore = strapi.db.query("strapi::core-store");
      const flKey = "plugin_content_manager_configuration_content_types::api::footer-link.footer-link";

      let flConfig = await flStore.findOne({ where: { key: flKey } });
      const flValue = {
        settings: {
          bulkable: true,
          filterable: true,
          searchable: true,
          pageSize: 100,
          mainField: "name",
          defaultSortBy: "name",
          defaultSortOrder: "ASC",
        },
        layouts: {
          list: ["name", "url", "section", "is_active", "order", "is_external"],
          edit: [
            [{ name: "name", size: 6 }, { name: "url", size: 6 }],
            [{ name: "section", size: 4 }, { name: "order", size: 4 }, { name: "is_active", size: 4 }],
            [{ name: "is_external", size: 6 }],
          ],
        },
        metadatas: {
          id: {
            edit: { label: "ID", description: "", placeholder: "", visible: false, editable: false },
            list: { label: "ID", searchable: true, sortable: true },
          },
          name: {
            edit: { label: "Name", description: "", placeholder: "", visible: true, editable: true },
            list: { label: "Name", searchable: true, sortable: true },
          },
          url: {
            edit: { label: "URL", description: "", placeholder: "", visible: true, editable: true },
            list: { label: "URL", searchable: true, sortable: true },
          },
          is_external: {
            edit: { label: "Is External", description: "", placeholder: "", visible: true, editable: true },
            list: { label: "Is External", searchable: true, sortable: true },
          },
          section: {
            edit: { label: "Section", description: "", placeholder: "", visible: true, editable: true },
            list: { label: "Section", searchable: true, sortable: true },
          },
          order: {
            edit: { label: "Order", description: "", placeholder: "", visible: true, editable: true },
            list: { label: "Order", searchable: true, sortable: true },
          },
          is_active: {
            edit: { label: "Is Active", description: "", placeholder: "", visible: true, editable: true },
            list: { label: "Is Active", searchable: true, sortable: true },
          },
          createdAt: {
            edit: { label: "Created At", description: "", placeholder: "", visible: false, editable: false },
            list: { label: "Created At", searchable: true, sortable: true },
          },
          updatedAt: {
            edit: { label: "Updated At", description: "", placeholder: "", visible: false, editable: false },
            list: { label: "Updated At", searchable: true, sortable: true },
          },
        },
      };

      if (flConfig) {
        await flStore.update({
          where: { id: flConfig.id },
          data: { value: JSON.stringify(flValue) },
        });
      } else {
        await flStore.create({
          data: { key: flKey, value: JSON.stringify(flValue), type: "object" },
        });
      }

      strapi.log.info("Successfully configured Footer Link admin layout.");
    } catch (e) {
      strapi.log.warn(`Soft skip auto-configuring Footer Link layout: ${e.message}`);
    }
  },
};
