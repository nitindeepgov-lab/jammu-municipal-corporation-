'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::visitor-count.visitor-count');
