'use strict';

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  console.log('--- ALL PUBLIC PERMISSIONS ---');
  const roleQuery = app.query('plugin::users-permissions.role');
  const publicRole = await roleQuery.findOne({
    where: { type: 'public' },
    populate: ['permissions'],
  });

  if (!publicRole) {
    console.error('Public role not found');
    process.exit(1);
  }

  publicRole.permissions.forEach(p => {
    console.log(p.action);
  });

  process.exit(0);
}

main().catch(console.error);
