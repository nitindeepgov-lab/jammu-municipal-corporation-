'use strict';

/**
 * Seed script for Smart City Tenders & News Ticker
 *
 * Usage:  node scripts/seed-tenders-news.js
 *
 * Requirements:
 *   1. Strapi must be running on http://localhost:1337
 *   2. Public permissions must be configured for the content types
 *      (or pass a valid API token as STRAPI_TOKEN env variable)
 */

const API_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN   = process.env.STRAPI_TOKEN || '';

const headers = {
  'Content-Type': 'application/json',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function post(path, data) {
  const res = await fetch(`${API_URL}/api${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`POST ${path} failed (${res.status}): ${err}`);
  }
  return res.json();
}

// ── Smart City Tenders ──────────────────────────────────────────
const tenders = [
  {
    tender_id: 'JSCL/RFP/2024/01',
    title: 'Request for Proposal for Engineering, Procurement and Construction EPC Contract for Junction Improvements in Jammu City',
    category: 'Infrastructure',
    status: 'Active',
    department: 'Smart City Engineering Wing',
    published_date: '2024-12-15',
    closing_date: '2025-01-30',
    estimated_cost: '₹24.5 Cr',
  },
  {
    tender_id: 'JSCL/IT/2024/02',
    title: 'Install, Operate, and Maintain the IT Based Smart Parking Management System for Jammu City',
    category: 'IT & Smart Solutions',
    status: 'Active',
    department: 'Smart City IT Division',
    published_date: '2024-11-20',
    closing_date: '2025-02-15',
    estimated_cost: '₹8.2 Cr',
  },
  {
    tender_id: 'JSCL/INFRA/2024/03',
    title: 'Turnkey Project for Implementation of Smart Poles in Jammu Smart City on PPP Mode',
    category: 'Smart Infrastructure',
    status: 'Active',
    department: 'Smart City Infrastructure Wing',
    published_date: '2024-10-05',
    closing_date: '2025-01-20',
    estimated_cost: '₹15.8 Cr',
  },
  {
    tender_id: 'JSCL/IT/2024/04',
    title: 'Selection of Agency for Implementation and Operations of Jammu City Smart Payment System (City Smart Card, Mobile App and Portal) on PPP Model',
    category: 'Digital Payment',
    status: 'Under Evaluation',
    department: 'Smart City IT Division',
    published_date: '2024-09-12',
    closing_date: '2024-11-30',
    estimated_cost: '₹12.0 Cr',
  },
  {
    tender_id: 'JSCL/TRANS/2024/05',
    title: 'Engagement of Agency for Procurement, Installation and Commissioning, Operation and Maintenance of Public Bicycle Sharing System in Jammu City',
    category: 'Transport',
    status: 'Awarded',
    department: 'Smart City Transport Wing',
    published_date: '2024-08-01',
    closing_date: '2024-10-15',
    estimated_cost: '₹6.5 Cr',
  },
  {
    tender_id: 'JSCL/INFRA/2024/06',
    title: 'Project for Implementation of Ad Panels at Intersections and Junctions in Jammu Smart City',
    category: 'Urban Furniture',
    status: 'Active',
    department: 'Smart City Infrastructure Wing',
    published_date: '2024-07-18',
    closing_date: '2025-03-30',
    estimated_cost: '₹4.2 Cr',
  },
  {
    tender_id: 'JSCL/INFRA/2024/07',
    title: 'Design, Supply, Installation, Testing, Commissioning, Operations and Maintenance of Smart Public Toilets in Jammu City Through Public Private Partnership Mode',
    category: 'Sanitation',
    status: 'Under Evaluation',
    department: 'Smart City Health & Sanitation',
    published_date: '2024-06-25',
    closing_date: '2024-09-10',
    estimated_cost: '₹9.8 Cr',
  },
];

// ── News Ticker Items ───────────────────────────────────────────
const newsTickerItems = [
  {
    text: 'PHE WATER SUPPLY HELPLINE NUMBERS — Click to view contact details',
    link: 'https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf',
    is_external: true,
    order: 1,
    is_active: true,
  },
  {
    text: 'Online Building Permission: Apply at OBPS Portal for building plan sanction',
    link: 'https://obps.jk.gov.in/BPAMSClient/Home.aspx',
    is_external: true,
    order: 2,
    is_active: true,
  },
  {
    text: 'Pay Property Tax and other dues Online — Quick & Convenient',
    link: '/pay-online',
    is_external: false,
    order: 3,
    is_active: true,
  },
  {
    text: 'Register your Grievance / Complaint online with Jammu Municipal Corporation',
    link: 'https://myjammu.jk.gov.in/Login/Index',
    is_external: true,
    order: 4,
    is_active: true,
  },
  {
    text: 'Smart City Mission: View latest Smart City tenders and developments in Jammu',
    link: '/smart-city-tenders',
    is_external: false,
    order: 5,
    is_active: true,
  },
  {
    text: 'Apply for Birth, Death and Marriage Certificates via JanSugam Portal',
    link: 'https://jansugam.jk.gov.in/login.do',
    is_external: true,
    order: 6,
    is_active: true,
  },
  {
    text: 'View Public Notices, Orders & Circulars issued by Jammu Municipal Corporation',
    link: '/notices',
    is_external: false,
    order: 7,
    is_active: true,
  },
  {
    text: 'Jammu Smart City Limited Tenders — View active procurement opportunities',
    link: '/smart-city-tenders',
    is_external: false,
    order: 8,
    is_active: true,
  },
];

// ── Notices & Tenders ───────────────────────────────────────────
const noticesData = [
  // Public Notices
  { title: 'PHE Water Supply Helpline Numbers — Important Notice', notice_type: 'public', notice_date: '2025-05-20', link: 'https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf' },
  { title: 'Notice regarding Property Tax Assessment for Financial Year 2025-26', notice_type: 'public', notice_date: '2025-05-15', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
  { title: 'Public Notice: Trade License Renewal — All Traders to Apply', notice_type: 'public', notice_date: '2025-05-10', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
  { title: 'Important: Solid Waste Management Guidelines for Residents', notice_type: 'public', notice_date: '2025-05-05', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
  { title: 'Notification regarding Garbage Collection Timings', notice_type: 'public', notice_date: '2025-05-01', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
  { title: 'Online Building Permission — Apply via JMC Portal', notice_type: 'public', notice_date: '2025-04-25', link: 'https://jmc.jk.gov.in/PermissionForm.aspx' },
  { title: 'Swachh Bharat Mission — Citizen Participation Drive', notice_type: 'public', notice_date: '2025-04-20', link: 'https://jmc.jk.gov.in/swachhgallery.aspx' },
  { title: 'Street Light Repair Grievance — Report via Helpline', notice_type: 'public', notice_date: '2025-04-15', link: 'https://jmc.jk.gov.in/OnlineGrievances.aspx' },

  // Council Updates
  { title: 'Council Meeting Proceedings — April 2025', notice_type: 'council', notice_date: '2025-04-30', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
  { title: 'Resolutions Passed in General House Meeting — March 2025', notice_type: 'council', notice_date: '2025-03-28', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
  { title: 'Standing Committee Meeting Minutes — February 2025', notice_type: 'council', notice_date: '2025-02-25', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
  { title: 'Special Session on Development Works — January 2025', notice_type: 'council', notice_date: '2025-01-20', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
  { title: 'Budget Approval Meeting — December 2024', notice_type: 'council', notice_date: '2024-12-15', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
];

// ── JMC General Tenders ─────────────────────────────────────────
const jmcTendersData = [
  { title: 'Tender for Street Light Repair and Maintenance Works in Jammu City', tender_date: '2025-05-22', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender', department: 'Engineering Wing' },
  { title: 'Tender for Supply and Installation of Solid Waste Management Equipment', tender_date: '2025-05-18', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender', department: 'Health & Sanitation' },
  { title: 'Tender for Construction of Public Toilet Complexes at Multiple Locations', tender_date: '2025-05-12', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender', department: 'Engineering Wing' },
  { title: 'Tender for Road Repair and Development Works in Jammu City', tender_date: '2025-05-08', link: 'https://jmc.jk.gov.in/developwork.aspx', department: 'Development Wing' },
  { title: 'Tender for Horticulture Development and Maintenance of Gardens', tender_date: '2025-05-03', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender', department: 'Horticulture Wing' },
  { title: 'Tender for Supply of Uniform and Safety Equipment for Sanitation Workers', tender_date: '2025-04-28', link: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender', department: 'Health & Sanitation' },
];

async function seed() {
  console.log('🌱 Seeding Smart City Tenders...\n');
  for (const tender of tenders) {
    try {
      await post('/smart-city-tenders', tender);
      console.log(`  ✅ ${tender.tender_id} — ${tender.title.substring(0, 60)}...`);
    } catch (e) {
      console.log(`  ⚠️  ${tender.tender_id} — ${e.message}`);
    }
  }

  console.log('\n🌱 Seeding News Ticker Items...\n');
  for (const item of newsTickerItems) {
    try {
      await post('/news-tickers', item);
      console.log(`  ✅ [${item.order}] ${item.text.substring(0, 60)}...`);
    } catch (e) {
      console.log(`  ⚠️  [${item.order}] ${e.message}`);
    }
  }

  console.log('\n🌱 Seeding Notices (Public & Council)...\n');
  for (const notice of noticesData) {
    try {
      await post('/notices', notice);
      console.log(`  ✅ [${notice.notice_type}] ${notice.title.substring(0, 55)}...`);
    } catch (e) {
      console.log(`  ⚠️  [${notice.notice_type}] ${e.message}`);
    }
  }

  console.log('\n🌱 Seeding JMC General Tenders...\n');
  for (const tender of jmcTendersData) {
    try {
      await post('/tenders', tender);
      console.log(`  ✅ ${tender.title.substring(0, 60)}...`);
    } catch (e) {
      console.log(`  ⚠️  ${e.message}`);
    }
  }

  console.log('\n✨ Seeding complete!\n');
  console.log('IMPORTANT: Go to Strapi Admin → Settings → Roles → Public');
  console.log('  and enable "find" and "findOne" for ALL content types:');
  console.log('    • Smart-city-tender');
  console.log('    • News-ticker');
  console.log('    • Notice');
  console.log('    • Tender');
  console.log('\n  Also publish all entries via Content Manager.\n');
}

seed().catch(console.error);
