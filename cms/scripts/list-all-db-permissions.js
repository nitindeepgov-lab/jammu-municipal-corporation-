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

    // Get all roles
    const rolesRes = await client.query('SELECT * FROM up_roles');
    console.log('--- ROLES ---');
    rolesRes.rows.forEach(r => console.log(r));

    // Get table names and columns for up_permissions
    const columnsRes = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'up_permissions'
    `);
    console.log('--- COLUMNS OF up_permissions ---');
    columnsRes.rows.forEach(c => console.log(`${c.column_name}: ${c.data_type}`));

    // Get table names and columns for up_permissions_role_lnk
    const lnkColumnsRes = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'up_permissions_role_lnk'
    `);
    console.log('--- COLUMNS OF up_permissions_role_lnk ---');
    lnkColumnsRes.rows.forEach(c => console.log(`${c.column_name}: ${c.data_type}`));

    // Query permissions and their roles
    const permRes = await client.query(`
      SELECT p.id, p.action, r.name as role_name
      FROM up_permissions p
      LEFT JOIN up_permissions_role_lnk l ON p.id = l.permission_id
      LEFT JOIN up_roles r ON l.role_id = r.id
      ORDER BY p.action ASC
    `);
    console.log(`--- ALL DB PERMISSIONS (${permRes.rows.length}) ---`);
    permRes.rows.forEach(p => {
      console.log(`[${p.role_name}] ${p.action} (id: ${p.id})`);
    });

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
