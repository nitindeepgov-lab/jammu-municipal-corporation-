module.paths.push('/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/node_modules');
const { Client } = require('pg');
require('dotenv').config({ path: '/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/.env' });

const commissionerMessage = `The Jammu Municipal Corporation is deeply committed to serving the citizens of Jammu with integrity, efficiency, and transparency. Our goal is to ensure that every resident of this historic city receives quality civic services, ranging from sanitation and water supply to road infrastructure and public health.

We are actively working towards making Jammu a smart, clean, and green city under various Government of India flagship programmes including the Smart Cities Mission and Swachh Bharat Mission (Urban). Our teams are working round the clock to address citizen grievances and improve the overall quality of urban life.

I invite all citizens to engage with our e-governance portal for hassle-free access to municipal services — pay your property tax online, register your complaints, apply for building plans, and access birth/death certificates from the comfort of your home.

Your feedback and suggestions are invaluable for us to continually improve. Together, let us build a Jammu that we all are proud of.`;

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

    // Let's verify that the message column exists (it should have been created by Strapi's auto-migration)
    const colCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'officials' AND column_name = 'message'
    `);

    if (colCheck.rows.length === 0) {
      console.warn('⚠️ Column "message" does not exist in the "officials" table yet. Wait a few seconds for Strapi dev server to sync schemas, then try again.');
      process.exit(1);
    }

    // Update the commissioner's message
    const res = await client.query(
      `UPDATE officials 
       SET message = $1 
       WHERE id = 2 OR designation = 'Commissioner'`,
      [commissionerMessage]
    );

    if (res.rowCount > 0) {
      console.log(`✅ Successfully seeded the Commissioner message for ${res.rowCount} row(s) in the database!`);
    } else {
      console.error('❌ Could not find Commissioner in the database to update.');
    }

  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await client.end();
  }
}

main();
