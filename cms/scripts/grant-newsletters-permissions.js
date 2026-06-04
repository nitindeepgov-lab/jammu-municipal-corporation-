'use strict';

/**
 * Grants public find/findOne permissions for Newsletters.
 * Usage: node scripts/grant-newsletters-permissions.js
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
    'api::newsletter.newsletter.find',
    'api::newsletter.newsletter.findOne',
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

  console.log('Newsletter public permissions are ready.');
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
