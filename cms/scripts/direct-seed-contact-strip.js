'use strict';

module.paths.push('/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/node_modules');
const { Client } = require('pg');
require('dotenv').config({ path: '/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/.env' });

function generateStrapiDocumentId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database!');

    // Get columns
    const colsRes = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'contact_strips'
    `);
    console.log('--- COLUMNS ---');
    colsRes.rows.forEach(c => console.log(`${c.column_name}: ${c.data_type}`));

    // Check if there are any rows
    const countRes = await client.query('SELECT COUNT(*) FROM contact_strips');
    const count = parseInt(countRes.rows[0].count, 10);
    console.log(`Current count: ${count}`);

    if (count === 0) {
      const docId = generateStrapiDocumentId();
      const now = new Date();
      
      // We will match the fields from the schema.json:
      // address_line1, address_line2, toll_free, toll_free_subtext, email, website, website_url
      // Wait, let's map them to their snake_case database column names. Let's see:
      // address_line_1, address_line_2, toll_free, toll_free_subtext, email, website, website_url, created_at, updated_at, published_at, document_id
      
      const columns = colsRes.rows.map(r => r.column_name);
      
      const hasLine1Snake = columns.includes('address_line_1');
      const hasLine2Snake = columns.includes('address_line_2');
      const hasLine1Normal = columns.includes('address_line1');
      const hasLine2Normal = columns.includes('address_line2');

      const col1 = hasLine1Snake ? 'address_line_1' : 'address_line1';
      const col2 = hasLine2Snake ? 'address_line_2' : 'address_line2';

      const query = `
        INSERT INTO contact_strips (
          document_id, 
          ${col1}, 
          ${col2}, 
          toll_free, 
          toll_free_subtext, 
          email, 
          website, 
          website_url, 
          created_at, 
          updated_at, 
          published_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;

      await client.query(query, [
        docId,
        'Jammu Municipal Corporation',
        'Jammu — 180001, J&K (UT)',
        '1800-180-7207',
        '10 AM – 5 PM (Working Days)',
        'commissionerjmc@gmail.com',
        'www.jmc.jk.gov.in',
        'https://jmc.jk.gov.in',
        now,
        now,
        now
      ]);

      console.log('Seeded contact-strip default record directly in Postgres!');
    } else {
      console.log('contact-strip table already has data, no seeding needed.');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
