'use strict';

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  try {
    const tenders = await app.query('api::smart-city-tender.smart-city-tender').findMany();
    console.log(`Smart City Tenders in Database: ${tenders.length}`);
    for (const t of tenders) {
      console.log(`- [${t.tender_id || t.id}] ${t.title}`);
    }
  } catch (error) {
    console.error('Error querying smart-city-tenders:', error);
  } finally {
    process.exit(0);
  }
}

main().catch(console.error);
