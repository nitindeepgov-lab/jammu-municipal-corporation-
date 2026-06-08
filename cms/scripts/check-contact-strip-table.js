'use strict';

module.paths.push('/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/node_modules');
const { Client } = require('pg');
require('dotenv').config({ path: '/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/.env' });

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database!');

    // List all tables matching contact
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name LIKE '%contact%'
    `);
    console.log('Tables matching contact:', tablesRes.rows.map(r => r.table_name));

    for (const row of tablesRes.rows) {
      const countRes = await client.query(`SELECT COUNT(*) FROM ${row.table_name}`);
      console.log(`Table ${row.table_name} has ${countRes.rows[0].count} rows.`);
      if (countRes.rows[0].count > 0) {
        const dataRes = await client.query(`SELECT * FROM ${row.table_name} LIMIT 5`);
        console.log(dataRes.rows);
      }
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
