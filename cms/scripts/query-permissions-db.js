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
    console.log('Connected to Postgres database successfully!');

    // Get all table names to verify
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name LIKE '%permission%'
    `);
    console.log('Permission-related tables:', tablesRes.rows.map(r => r.table_name));

    const table_name = tablesRes.rows.find(r => r.table_name.includes('permission'))?.table_name || 'up_permissions';
    console.log(`Querying table: ${table_name}`);

    // Query permissions
    const permissionsRes = await client.query(`
      SELECT * FROM ${table_name} 
      WHERE action LIKE '%contact-strip%'
    `);
    console.log(`Permissions matching contact-strip in DB (${permissionsRes.rows.length}):`);
    permissionsRes.rows.forEach(r => {
      console.log(r);
    });

  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await client.end();
  }
}

main();
