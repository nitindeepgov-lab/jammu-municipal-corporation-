module.paths.push('/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/node_modules');
const { Client } = require('pg');
require('dotenv').config({ path: '/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/.env' });

const slidesData = [
  {
    image_url: '/banner/jmc-office.jpeg',
    title: 'Infrastructure Development',
    subtitle: 'Building roads, parks, and amenities for a better Jammu',
    order: 1
  },
  {
    image_url: '/banner/banner10.png',
    title: 'Jammu Municipal Corporation',
    subtitle: 'Committed to serving the residents of Jammu City',
    order: 2
  },
  {
    image_url: '/banner/banner9.jpg',
    title: 'Cleaner, Greener Jammu',
    subtitle: "JMC's commitment to sanitation and environment",
    order: 3
  },
  {
    image_url: '/banner/banner1.jpg',
    title: 'Infrastructure Development',
    subtitle: 'Building roads, parks, and amenities for a better Jammu',
    order: 4
  },
  {
    image_url: '/banner/banner8.jpeg',
    title: 'Infrastructure Development',
    subtitle: 'Building roads, parks, and amenities for a better Jammu',
    order: 5
  }
];

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

    // Let's verify that the hero_slides table exists
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'hero_slides'
    `);

    if (tableCheck.rows.length === 0) {
      console.warn('⚠️ Table "hero_slides" does not exist in the database yet. Wait a few seconds for Strapi dev server to sync schemas, then try again.');
      process.exit(1);
    }

    // Clear existing slides
    await client.query('DELETE FROM hero_slides');
    console.log('🧹 Cleared existing hero slides.');

    // Insert slides
    let inserted = 0;
    for (const slide of slidesData) {
      // Generate standard documentId for Strapi v5
      const docId = Math.random().toString(36).substring(2, 16);
      
      await client.query(
        `INSERT INTO hero_slides (document_id, title, subtitle, image_url, "order", created_at, updated_at, published_at) 
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), NOW())`,
        [docId, slide.title, slide.subtitle, slide.image_url, slide.order]
      );
      console.log(`✅ Seeded slide: "${slide.title}"`);
      inserted++;
    }

    console.log(`\n🎉 Seeded ${inserted} hero slides successfully!`);

  } catch (err) {
    console.error('Error running seed script:', err);
  } finally {
    await client.end();
  }
}

main();
