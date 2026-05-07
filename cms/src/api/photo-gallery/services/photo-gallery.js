'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::photo-gallery.photo-gallery');
