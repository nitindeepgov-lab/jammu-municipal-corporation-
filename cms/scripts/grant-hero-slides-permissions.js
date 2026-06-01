'use strict';

/**
 * Grants public find/findOne permissions for Hero Slides.
 * Usage: node scripts/grant-hero-slides-permissions.js
 */

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  const roleQuery = app.query('plugin::users-permissions.role');
  const permissionQuery = app.query('plugin::users-permissions.permission');

  const publicRole = await roleQuery.findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    console.error('Public role not found.');
    process.exit(1);
  }

  const actions = [
    'api::hero-slide.hero-slide.find',
    'api::hero-slide.hero-slide.findOne',
  ];

  for (const action of actions) {
    const existing = await permissionQuery.findOne({
      where: { role: publicRole.id, action },
    });

    if (!existing) {
      await permissionQuery.create({ data: { action, role: publicRole.id } });
      console.log(`Created permission: ${action}`);
    } else {
      console.log(`Permission already exists: ${action}`);
    }
  }

  console.log('Hero slide public permissions are ready.');
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
