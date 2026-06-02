'use strict';

const OFFICES = [
  {
    title: 'Main Office (Head Quarters)',
    address: 'Town Hall Jammu, Jammu and Kashmir 180001',
    phone: '18001807207 (Toll Free)',
    hours: '10:00 AM – 05:00 PM (Working Days)',
    order: 1,
  },
  {
    title: 'Zone – North Office',
    address: 'Peer Mitha, Jammu',
    phone: 'Contact HQ',
    hours: '10:00 AM – 05:00 PM',
    order: 2,
  },
  {
    title: 'Zone – South Office',
    address: 'Bohri, Jammu',
    phone: 'Contact HQ',
    hours: '10:00 AM – 05:00 PM',
    order: 3,
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  try {
    for (const office of OFFICES) {
      const existing = await app.query('api::office-location.office-location').findOne({
        where: { title: office.title },
      });

      const data = {
        title: office.title,
        address: office.address,
        phone: office.phone || '',
        hours: office.hours || '',
        order: office.order || 0,
        is_active: true,
      };

      if (existing) {
        await app.query('api::office-location.office-location').update({
          where: { id: existing.id },
          data,
        });
        console.log(`Updated office: ${office.title}`);
      } else {
        await app.query('api::office-location.office-location').create({
          data,
        });
        console.log(`Created office: ${office.title}`);
      }
    }

    console.log('Office location seeding complete.');
  } catch (error) {
    console.error('Error seeding office locations:', error);
    process.exitCode = 1;
  } finally {
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});