module.paths.push('/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/node_modules');
const { Client } = require('pg');
require('dotenv').config({ path: '/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/.env' });

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to Neon database successfully!');

    // Let's verify that the rti_role column exists (it should have been created by Strapi's auto-migration)
    const colCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'officials' AND column_name = 'rti_role'
    `);

    if (colCheck.rows.length === 0) {
      console.warn('⚠️ Column "rti_role" does not exist in the "officials" table yet. Wait a few seconds for Strapi dev server to sync schemas, then try again.');
      process.exit(1);
    }

    // Reset rti_role for all officials first (in case we run this multiple times)
    await client.query("UPDATE officials SET rti_role = NULL");

    // Update PIO (Chand Singh)
    const resPio = await client.query(
      "UPDATE officials SET rti_role = 'PIO' WHERE id = 10 OR TRIM(name) = 'Chand Singh, JKAS'"
    );
    console.log(`✅ Set PIO role: ${resPio.rowCount} row(s) updated.`);

    // Update First Appellate Authority (Rajeev Khajuria)
    const resApp1 = await client.query(
      "UPDATE officials SET rti_role = 'First Appellate Authority' WHERE id = 4 OR TRIM(name) = 'Rajeev Khajuria, JKAS'"
    );
    console.log(`✅ Set First Appellate Authority role: ${resApp1.rowCount} row(s) updated.`);

    // Update Second Appellate Authority (Devansh Yadav)
    const resApp2 = await client.query(
      "UPDATE officials SET rti_role = 'Second Appellate Authority' WHERE id = 2 OR TRIM(name) = 'Devansh Yadav, IAS'"
    );
    console.log(`✅ Set Second Appellate Authority role: ${resApp2.rowCount} row(s) updated.`);

  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await client.end();
  }
}

main();
