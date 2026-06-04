'use strict';

/**
 * Seeds the smart-city-tenders collection with initial historical data.
 * Usage: node scripts/seed-smart-city-tenders.js
 */

const tenders = [
  {
    tender_id: "JSCL-JI-2026-01",
    title: "REQUEST FOR PROPOSAL FOR ENGINEERING, PROCUREMENT AND CONSTRUCTION EPC CONTRACT FOR JUNCTION IMPROVEMENTS IN JAMMU CITY.",
    category: "Junctions",
    link: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SKyIDjX18kNjayj8%2Bpn3Eog%3D%3D",
    status: "Active",
    published_date: "2026-01-15",
    closing_date: "2026-06-30",
    estimated_cost: "TBD",
    department: "Jammu Smart City Limited",
  },
  {
    tender_id: "JSCL-SP-2026-02",
    title: "Install, operate, and maintain the IT based Smart Parking Management System for Jammu city.",
    category: "Parking",
    link: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=Sytme64FVZ8wSzZzecuZZRw%3D%3D",
    status: "Active",
    published_date: "2026-02-10",
    closing_date: "2026-07-15",
    estimated_cost: "TBD",
    department: "Jammu Smart City Limited",
  },
  {
    tender_id: "JSCL-P-2026-03",
    title: "Turnkey project for implementation of Smart Poles in Jammu Smart City on PPP mode.",
    category: "Lighting",
    link: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=Sytme64FVZ8wSzZzecuZZRw%3D%3D",
    status: "Active",
    published_date: "2026-02-28",
    closing_date: "2026-08-01",
    estimated_cost: "TBD",
    department: "Jammu Smart City Limited",
  },
  {
    tender_id: "JSCL-PAY-2026-04",
    title: "Selection of Agency for implementation and operations of Jammu City Smart Payment System (City Smart Card, Mobile App and Portal) on PPP model is invited from bidders meeting the pre-qualification criteria as stated in the RFP document.",
    category: "IT & Payments",
    link: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=Sb6IHG13Y5DKWsQMgzhS23w%3D%3D",
    status: "Active",
    published_date: "2026-03-05",
    closing_date: "2026-08-15",
    estimated_cost: "TBD",
    department: "Jammu Smart City Limited",
  },
  {
    tender_id: "JSCL-PBS-2026-05",
    title: "Engagement of agency for Procurement, Installation and Commissioning, Operation and Maintenance of Public Bicycle sharing system in Jammu city.",
    category: "Mobility",
    link: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SwI7HUMTIjtpXf%2BzBFW0%2FkQ%3D%3D",
    status: "Active",
    published_date: "2026-03-12",
    closing_date: "2026-09-01",
    estimated_cost: "TBD",
    department: "Jammu Smart City Limited",
  },
  {
    tender_id: "JSCL-AD-2026-06",
    title: "Project for implementation of Ad Panels at Intersections and Junctions in Jammu Smart City.",
    category: "Advertising",
    link: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SFKLjJoiB4yyobubOEUBBjw%3D%3D",
    status: "Active",
    published_date: "2026-03-20",
    closing_date: "2026-09-10",
    estimated_cost: "TBD",
    department: "Jammu Smart City Limited",
  },
  {
    tender_id: "JSCL-ST-2026-07",
    title: "Design, Supply, Installation, Testing, Commissioning, Operations and Maintenance of Smart Public Toilets in Jammu City through Public Private Partnership Mode.",
    category: "Sanitation",
    link: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SxrP0q%2B2r2%2BZ%2FVFCBq4bc8w%3D%3D",
    status: "Active",
    published_date: "2026-04-01",
    closing_date: "2026-09-30",
    estimated_cost: "TBD",
    department: "Jammu Smart City Limited",
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  try {
    for (const tender of tenders) {
      const existing = await app.query('api::smart-city-tender.smart-city-tender').findOne({
        where: { tender_id: tender.tender_id },
      });

      const data = {
        ...tender,
        publishedAt: new Date(),
      };

      if (existing) {
        await app.query('api::smart-city-tender.smart-city-tender').update({
          where: { id: existing.id },
          data,
        });
        console.log(`Updated smart city tender: ${tender.tender_id}`);
      } else {
        await app.query('api::smart-city-tender.smart-city-tender').create({
          data,
        });
        console.log(`Created smart city tender: ${tender.tender_id}`);
      }
    }

    console.log('Smart City Tenders seeding complete.');
  } catch (error) {
    console.error('Error seeding smart city tenders:', error);
    process.exitCode = 1;
  } finally {
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
