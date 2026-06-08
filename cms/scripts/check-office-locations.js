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

    // Check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'office_locations'
      )
    `);
    
    console.log('office_locations table exists:', tableCheck.rows[0].exists);

    if (tableCheck.rows[0].exists) {
      // Query rows
      const rows = await client.query('SELECT * FROM office_locations');
      console.log(`Found ${rows.rows.length} rows:`);
      rows.rows.forEach(r => console.log(r));
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
