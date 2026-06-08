'use strict';

module.paths.push('/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/node_modules');
const { Client } = require('pg');
require('dotenv').config({ path: '/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/.env' });
const { v4: uuidv4 } = require('uuid');

// Generate a 24-character lowercase alphanumeric string similar to Strapi v5's documentIds
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

    const actions = [
      'api::contact-strip.contact-strip.find',
      'api::contact-strip.contact-strip.findOne'
    ];

    for (const action of actions) {
      // Check if action already exists in up_permissions
      const checkRes = await client.query(
        'SELECT id FROM up_permissions WHERE action = $1',
        [action]
      );

      let permissionId;

      if (checkRes.rows.length === 0) {
        // Insert new permission
        const docId = generateStrapiDocumentId();
        const now = new Date();
        const insertRes = await client.query(
          `INSERT INTO up_permissions (document_id, action, created_at, updated_at, published_at) 
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [docId, action, now, now, now]
        );
        permissionId = insertRes.rows[0].id;
        console.log(`Inserted permission "${action}" with ID ${permissionId}`);
      } else {
        permissionId = checkRes.rows[0].id;
        console.log(`Permission "${action}" already exists with ID ${permissionId}`);
      }

      // Check if link to Public Role (role_id = 2) exists in up_permissions_role_lnk
      const linkCheck = await client.query(
        'SELECT id FROM up_permissions_role_lnk WHERE permission_id = $1 AND role_id = 2',
        [permissionId]
      );

      if (linkCheck.rows.length === 0) {
        // Insert role link
        await client.query(
          'INSERT INTO up_permissions_role_lnk (permission_id, role_id) VALUES ($1, 2)',
          [permissionId]
        );
        console.log(`Linked permission ID ${permissionId} to Public Role (2)`);
      } else {
        console.log(`Permission ID ${permissionId} is already linked to Public Role (2)`);
      }
    }

    console.log('Direct permissions update completed successfully!');
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    await client.end();
  }
}

main();
