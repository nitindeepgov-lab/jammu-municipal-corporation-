'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  console.log('--- DATABASE CONNECTION DEBUG ---');
  console.log('Environment DATABASE_URL:', process.env.DATABASE_URL);
  console.log('Strapi connection config:', app.db.connection.client.config.connection);

  try {
    const dbNameRes = await app.db.connection.raw('SELECT current_database()');
    console.log('Active database according to query:', dbNameRes.rows[0]);

    const tablesRes = await app.db.connection.raw(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name LIKE '%contact%'
    `);
    console.log('Tables matching contact in active db:', tablesRes.rows.map(r => r.table_name));
  } catch (err) {
    console.error('Database query failed:', err);
  }

  process.exit(0);
}

main().catch(console.error);
