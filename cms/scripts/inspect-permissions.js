'use strict';

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  console.log('--- PUBLIC ROLE PERMISSIONS ---');
  const roleQuery = app.query('plugin::users-permissions.role');
  const permissionQuery = app.query('plugin::users-permissions.permission');

  const publicRole = await roleQuery.findOne({
    where: { type: 'public' },
    populate: ['permissions'],
  });

  if (!publicRole) {
    console.error('Public role not found');
    process.exit(1);
  }

  console.log(`Public role permissions count: ${publicRole.permissions?.length || 0}`);
  publicRole.permissions?.forEach(p => {
    if (p.action.includes('contact-strip')) {
      console.log(`Permission action: ${p.action}`);
    }
  });

  console.log('--- ALL ACTIONS ON CONTACT STRIP ---');
  const actions = app.service('plugin::users-permissions.providers-routes')?.actions || {};
  console.log('Available API actions for contact-strip:', Object.keys(app.controllers['api::contact-strip.contact-strip'] || {}));

  process.exit(0);
}

main().catch(console.error);
