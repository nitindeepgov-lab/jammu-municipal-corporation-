'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  console.log('--- STRAPI SERVICE QUERY DEBUG ---');
  
  try {
    const rawCount = await app.db.connection('contact_strips').count();
    console.log('Raw DB Count in contact_strips:', rawCount);
  } catch (err) {
    console.error('Raw DB Count query failed:', err.message);
  }

  try {
    // In Strapi v5, we use app.documents() or app.service().find()
    if (typeof app.documents === 'function') {
      const docRes = await app.documents('api::contact-strip.contact-strip').find({});
      console.log('app.documents().find() result:', docRes);
    } else {
      console.log('app.documents is not a function');
    }
  } catch (err) {
    console.error('app.documents().find() failed:', err.message);
  }

  try {
    if (app.entityService) {
      const entityRes = await app.entityService.findMany('api::contact-strip.contact-strip');
      console.log('app.entityService.findMany() result:', entityRes);
    } else {
      console.log('app.entityService is not available');
    }
  } catch (err) {
    console.error('app.entityService.findMany() failed:', err.message);
  }

  try {
    const queryRes = await app.query('api::contact-strip.contact-strip').findMany({});
    console.log('app.query().findMany() result:', queryRes);
  } catch (err) {
    console.error('app.query().findMany() failed:', err.message);
  }

  process.exit(0);
}

main().catch(console.error);
