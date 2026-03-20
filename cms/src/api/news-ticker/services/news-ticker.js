'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-ticker.news-ticker');
