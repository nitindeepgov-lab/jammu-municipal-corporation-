'use strict';

/**
 * official service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::official.official');
