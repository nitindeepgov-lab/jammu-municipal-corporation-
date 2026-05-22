"use strict";

/**
 * location router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::location.location", {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
