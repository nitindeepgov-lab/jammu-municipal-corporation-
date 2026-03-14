'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bulletin-board.bulletin-board');
