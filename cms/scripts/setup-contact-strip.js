'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
console.log('🔌 Database URL in environment:', process.env.DATABASE_URL ? 'PRESENT (starts with ' + process.env.DATABASE_URL.substring(0, 15) + '...)' : 'MISSING');

/**
 * Sets up public permissions and seeds default values for the contact-strip Single Type.
 * Usage: node scripts/setup-contact-strip.js
 */

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  console.log('🔄 Compiling Strapi application...');
  const appContext = await compileStrapi();
  console.log('🔄 Loading Strapi application...');
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  const roleQuery = app.query('plugin::users-permissions.role');
  const permissionQuery = app.query('plugin::users-permissions.permission');

  const publicRole = await roleQuery.findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    console.error('❌ Public role not found.');
    process.exit(1);
  }

  // 1. Grant public permissions
  const actions = [
    'api::contact-strip.contact-strip.find',
    'api::contact-strip.contact-strip.findOne',
  ];

  console.log('🔑 Setting up public permissions...');
  for (const action of actions) {
    const existing = await permissionQuery.findOne({
      where: { role: publicRole.id, action },
    });

    if (!existing) {
      await permissionQuery.create({ data: { action, role: publicRole.id } });
      console.log(`✅ Created permission: ${action}`);
    } else {
      console.log(`ℹ️  Permission already exists: ${action}`);
    }
  }

  // 2. Seed default data for single type
  console.log('🌱 Seeding contact strip default data...');
  const contactStripQuery = app.query('api::contact-strip.contact-strip');

  // Verify schema is loaded by calling findOne
  let current;
  try {
    current = await contactStripQuery.findOne({});
  } catch (err) {
    console.error('❌ Failed to query contact-strip table. Make sure Strapi auto-migrations have run first.', err.message);
    process.exit(1);
  }

  if (!current) {
    const defaultData = {
      address_line1: "Jammu Municipal Corporation",
      address_line2: "Jammu — 180001, J&K (UT)",
      toll_free: "1800-180-7207",
      toll_free_subtext: "10 AM – 5 PM (Working Days)",
      email: "commissionerjmc@gmail.com",
      website: "www.jmc.jk.gov.in",
      website_url: "https://jmc.jk.gov.in",
    };

    await contactStripQuery.create({ data: defaultData });
    console.log('✅ Created contact strip default record.');
  } else {
    console.log('ℹ️  Contact strip record already exists.');
  }

  console.log('✅ Contact strip setup successfully completed.');
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
