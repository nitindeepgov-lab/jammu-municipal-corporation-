'use strict';

/**
 * Seeds the footer-links collection with all current static footer links.
 * Uses the Strapi Admin REST API (no createStrapi!) so it never interferes
 * with schema sync or wipes data.
 *
 * Usage: node scripts/seed-footer-links.js
 *
 * Requirements:
 *   - Strapi must be running at http://localhost:1338
 *   - Admin credentials are used to authenticate
 */

const STRAPI_URL = 'http://localhost:1338';

const FOOTER_LINKS = [
  // ── Nav bar (bottom policy strip) ──────────────────────────
  { name: 'Home',                  url: '/',                          is_external: false, section: 'nav', order: 1,  is_active: true },
  { name: 'About Us',              url: '/about',                     is_external: false, section: 'nav', order: 2,  is_active: true },
  { name: 'Feedback',              url: '/feedback',                  is_external: false, section: 'nav', order: 3,  is_active: true },
  { name: 'Contact Us',            url: '/contact',                   is_external: false, section: 'nav', order: 4,  is_active: true },
  { name: 'Help',                  url: '/contact',                   is_external: false, section: 'nav', order: 5,  is_active: true },
  { name: 'Sitemap',               url: '/sitemap',                   is_external: false, section: 'nav', order: 6,  is_active: true },
  { name: 'Web Information Manager', url: '/web-info-manager',        is_external: false, section: 'nav', order: 7,  is_active: true },
  { name: 'Hyperlink Policy',      url: '/hyperlink-policy',          is_external: false, section: 'nav', order: 8,  is_active: true },
  { name: 'Privacy Policy',        url: '/privacy-policy',            is_external: false, section: 'nav', order: 9,  is_active: true },
  { name: 'Disclaimer',            url: '/disclaimer',                is_external: false, section: 'nav', order: 10, is_active: true },
  { name: 'Accessibility',         url: '/accessibility',             is_external: false, section: 'nav', order: 11, is_active: true },
  { name: 'Copyright Policy',      url: '/copyright-policy',         is_external: false, section: 'nav', order: 12, is_active: true },
  { name: 'Terms & Conditions',    url: '/terms-conditions',          is_external: false, section: 'nav', order: 13, is_active: true },

  // ── Quick Links column ──────────────────────────────────────
  { name: 'About JMC',             url: '/about',                          is_external: false, section: 'quick-links', order: 1, is_active: true },
  { name: 'About Jammu City',      url: '/information/about-jammu-city',   is_external: false, section: 'quick-links', order: 2, is_active: true },
  { name: 'Photo Gallery',         url: '/gallery',                        is_external: false, section: 'quick-links', order: 3, is_active: true },
  { name: 'Tenders',               url: '/notices',                        is_external: false, section: 'quick-links', order: 4, is_active: true },
  { name: 'Public Notices',        url: '/notices',                        is_external: false, section: 'quick-links', order: 5, is_active: true },
  { name: 'E-Newsletter',          url: '/notices',                        is_external: false, section: 'quick-links', order: 6, is_active: true },
  { name: 'RTI',                   url: '/rti',                            is_external: false, section: 'quick-links', order: 7, is_active: true },

  // ── Citizen Services column ─────────────────────────────────
  { name: 'Pay Online',             url: '/pay-online',  is_external: false, section: 'citizen-services', order: 1, is_active: true },
  { name: 'Register a Complaint',   url: '/feedback',    is_external: false, section: 'citizen-services', order: 2, is_active: true },
  { name: 'Apply for Rehri License',url: '/egov',        is_external: false, section: 'citizen-services', order: 3, is_active: true },
  { name: 'Building Permission',    url: '/egov',        is_external: false, section: 'citizen-services', order: 4, is_active: true },
  { name: 'Birth / Death Certificate', url: '/egov',     is_external: false, section: 'citizen-services', order: 5, is_active: true },
  { name: 'Trade License',          url: '/egov',        is_external: false, section: 'citizen-services', order: 6, is_active: true },
  { name: 'E-Tendering',            url: '/egov',        is_external: false, section: 'citizen-services', order: 7, is_active: true },

  // ── Information column ──────────────────────────────────────
  { name: 'Achievements',          url: '/footer/achievement1.pdf', is_external: true,  section: 'information', order: 1, is_active: true },
  { name: 'Smart City Projects',   url: '/smart-city',              is_external: false, section: 'information', order: 2, is_active: true },
  { name: 'Swachh Bharat Mission', url: '/swachh-mission',          is_external: false, section: 'information', order: 3, is_active: true },
  { name: 'Council Updates',       url: '/notices',                 is_external: false, section: 'information', order: 4, is_active: true },
  { name: 'E-Governance Portal',   url: '/egov',                    is_external: false, section: 'information', order: 5, is_active: true },
  { name: 'Polythene Control',     url: '/information/polythene-control', is_external: false, section: 'information', order: 6, is_active: true },
  { name: "Commissioner's Desk",   url: '/commissioner',            is_external: false, section: 'information', order: 7, is_active: true },
];

async function getAdminToken() {
  // Try common admin credentials
  const credentials = [
    { email: 'deveshyadav@yopmail.com', password: 'Admin@123' },
    { email: 'devesh@yopmail.com', password: 'Admin@123' },
    { email: 'admin@example.com', password: 'Admin@123' },
  ];

  for (const cred of credentials) {
    try {
      const res = await fetch(`${STRAPI_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred),
      });
      if (res.ok) {
        const body = await res.json();
        console.log(`✅ Logged in as ${cred.email}`);
        return body.data.token;
      }
    } catch (_) { /* try next */ }
  }
  throw new Error('Could not authenticate with Strapi admin. Please check credentials.');
}

async function main() {
  console.log('🔌 Connecting to Strapi at', STRAPI_URL, '...');

  // Verify Strapi is running
  try {
    await fetch(`${STRAPI_URL}/admin`);
  } catch (e) {
    console.error('❌ Strapi is not running at', STRAPI_URL);
    process.exit(1);
  }

  const token = await getAdminToken();

  // Check existing entries
  const existingRes = await fetch(
    `${STRAPI_URL}/api/footer-links?pagination[pageSize]=100`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const existingData = await existingRes.json();
  const existing = existingData.data || [];

  console.log(`📋 Found ${existing.length} existing footer links`);

  // Build a lookup map of existing links by name+section
  const existingMap = new Map();
  for (const item of existing) {
    existingMap.set(`${item.name}||${item.section}`, item);
  }

  let created = 0;
  let skipped = 0;

  for (const link of FOOTER_LINKS) {
    const key = `${link.name}||${link.section}`;
    if (existingMap.has(key)) {
      console.log(`ℹ️  Skipped (already exists): [${link.section}] ${link.name}`);
      skipped++;
      continue;
    }

    const createRes = await fetch(`${STRAPI_URL}/api/footer-links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: link }),
    });

    if (createRes.ok) {
      console.log(`✅ Created: [${link.section}] ${link.name}`);
      created++;
    } else {
      const err = await createRes.text();
      console.error(`❌ Failed to create [${link.section}] ${link.name}: ${err}`);
    }
  }

  console.log(`\n🎉 Done. Created: ${created}, Skipped: ${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
