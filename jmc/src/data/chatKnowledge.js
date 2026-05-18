/**
 * JMC Chatbot Knowledge Base & Smart Matching Engine
 * Structured Q&A with keyword-based fuzzy matching + page navigation
 */

// ── Page Route Map (for "take me to" navigation) ─────────────────
export const pageRoutes = {
  home:               { path: "/",                        label: "Home" },
  about:              { path: "/about",                   label: "About JMC" },
  officials:          { path: "/officials",               label: "JMC Officials" },
  commissioner:       { path: "/commissioner",            label: "Commissioner" },
  "governing-bodies": { path: "/governing-bodies",        label: "Governing Bodies" },
  notices:            { path: "/notices",                  label: "Notices & Tenders" },
  gallery:            { path: "/gallery",                  label: "Photo Gallery" },
  contact:            { path: "/contact",                  label: "Contact Us" },
  services:           { path: "/services",                 label: "Citizen Services" },
  "smart-city":       { path: "/smart-city",               label: "Smart City" },
  "development-works":{ path: "/development-works",        label: "Development Works" },
  feedback:           { path: "/feedback",                 label: "Feedback" },
  rti:                { path: "/rti",                      label: "RTI" },
  "swachh-mission":   { path: "/swachh-mission",           label: "Swachh Mission" },
  egov:               { path: "/egov",                     label: "E-Governance" },
  "pay-online":       { path: "/pay-online",               label: "Pay Online" },
  sitemap:            { path: "/sitemap",                  label: "Sitemap" },
  "quick-links":      { path: "/quick-links",              label: "Quick Links" },
  "councillor-details":{ path: "/councillor-details",     label: "Councillor Details" },
  "smart-city-tenders":{ path: "/smart-city-tenders",     label: "Smart City Tenders" },
  departments:        { path: "/departments",              label: "Departments" },
  engineering:        { path: "/departments/engineering",  label: "Engineering Dept" },
  health:             { path: "/departments/health",       label: "Health Dept" },
  "revenue-taxation": { path: "/departments/revenue-taxation", label: "Revenue & Taxation" },
  sanitation:         { path: "/departments/sanitation",   label: "Sanitation Dept" },
  "urban-planning":   { path: "/departments/urban-planning", label: "Urban Planning" },
  "water-supply":     { path: "/departments/water-supply", label: "Water Supply" },
  horticulture:       { path: "/departments/horticulture", label: "Horticulture Dept" },
  information:        { path: "/information",              label: "Information" },
  "privacy-policy":   { path: "/privacy-policy",           label: "Privacy Policy" },
  disclaimer:         { path: "/disclaimer",               label: "Disclaimer" },
  accessibility:      { path: "/accessibility",            label: "Accessibility" },
  "terms-conditions": { path: "/terms-conditions",         label: "Terms & Conditions" },
};

// ── Keyword → route aliases (for fuzzy nav matching) ─────────────
const navAliases = [
  { kw: ["home", "main", "homepage", "landing", "front"],                                               route: "home" },
  { kw: ["about", "about jmc", "about us", "history", "vision", "mission", "who are you"],              route: "about" },
  { kw: ["officials", "officers", "who is who", "whos who", "staff", "people"],                         route: "officials" },
  { kw: ["commissioner", "municipal commissioner"],                                                      route: "commissioner" },
  { kw: ["governing", "mayor", "deputy mayor", "governing bodies", "council"],                          route: "governing-bodies" },
  { kw: ["notices", "notice", "circular", "order", "tender", "tenders", "bids", "bid", "procurement"],  route: "notices" },
  { kw: ["gallery", "photos", "images", "pictures", "albums", "photo gallery"],                         route: "gallery" },
  { kw: ["contact", "phone", "helpline", "address", "reach", "call", "contact us", "number"],           route: "contact" },
  { kw: ["services", "citizen services", "citizen", "all services"],                                     route: "services" },
  { kw: ["smart city", "smartcity"],                                                                     route: "smart-city" },
  { kw: ["development", "works", "projects", "infrastructure", "ongoing projects", "development works"], route: "development-works" },
  { kw: ["feedback", "suggestion", "review", "compliment", "feedback form"],                             route: "feedback" },
  { kw: ["rti", "right to information", "disclosure", "information officer", "pio"],                     route: "rti" },
  { kw: ["swachh", "swachh bharat", "clean india", "swachh mission", "clean city"],                      route: "swachh-mission" },
  { kw: ["egov", "e-governance", "digital services", "e governance", "egovernance", "online services"],  route: "egov" },
  { kw: ["pay", "payment", "pay online", "fee", "pay fee", "online payment", "bill", "pay bill"],       route: "pay-online" },
  { kw: ["sitemap", "site map", "all pages", "full map"],                                                route: "sitemap" },
  { kw: ["quick links", "quick link", "shortcuts"],                                                      route: "quick-links" },
  { kw: ["councillor", "councilor", "ward", "councillors", "ward member", "council member"],             route: "councillor-details" },
  { kw: ["smart city tender", "smart city tenders", "smart tenders"],                                    route: "smart-city-tenders" },
  { kw: ["departments", "department", "all departments", "dept"],                                        route: "departments" },
  { kw: ["engineering", "roads", "drainage", "engineering dept", "road"],                                route: "engineering" },
  { kw: ["health", "health department", "health dept", "hospital", "epidemic"],                          route: "health" },
  { kw: ["revenue", "taxation", "tax", "property tax", "revenue dept", "tax payment"],                  route: "revenue-taxation" },
  { kw: ["sanitation", "garbage", "waste", "cleaning", "sweeping", "dustbin", "trash"],                  route: "sanitation" },
  { kw: ["urban planning", "zoning", "town planner", "master plan", "building plan"],                   route: "urban-planning" },
  { kw: ["water supply", "water", "phe", "tanker", "water tanker", "drinking water", "pipeline"],       route: "water-supply" },
  { kw: ["horticulture", "parks", "gardens", "trees", "plantation", "green"],                            route: "horticulture" },
  { kw: ["information", "info"],                                                                         route: "information" },
  { kw: ["privacy", "privacy policy"],                                                                   route: "privacy-policy" },
  { kw: ["disclaimer"],                                                                                  route: "disclaimer" },
  { kw: ["accessibility", "accessible"],                                                                 route: "accessibility" },
  { kw: ["terms", "conditions", "terms and conditions"],                                                 route: "terms-conditions" },
  { kw: ["complaint", "grievance", "complain", "lodge complaint"],                                       route: "contact" },
];

// ── Knowledge Entries ────────────────────────────────────────────
// Each entry: { id, cat, kw[], q, a, followUps[], route? }

export const knowledgeBase = [
  // ── GENERAL ──────────────────────────────────────────────────
  {
    id: "what-is-jmc",
    cat: "general",
    kw: ["what", "jmc", "jammu municipal", "website", "about", "corporation", "who"],
    q: "What is JMC?",
    a: "Jammu Municipal Corporation (JMC) is the urban local body responsible for civic administration of Jammu city — the winter capital of J&K Union Territory. It handles sanitation, water supply, road maintenance, property tax, solid waste management, public health, building permissions, street lighting, and all civic services.",
    followUps: ["what-can-do", "contact-helpline", "jmc-vision"],
  },
  {
    id: "what-can-do",
    cat: "general",
    kw: ["what can", "do", "services", "features", "options", "help", "use"],
    q: "What can I do on this website?",
    a: "On this website you can:\n\n• **Pay fees online** — tender fees, municipal charges\n• **File complaints** — about water, sanitation, roads, etc.\n• **Give feedback** about JMC services\n• **View notices & tenders** — public notices, council updates\n• **Access RTI documents** — Right to Information disclosures\n• **Find official contacts** — phone numbers of all officers\n• **Apply for certificates** — birth/death, trade license, building permission\n• **Check councillor details** — find your ward councillor\n• **Browse e-governance services** — 15+ digital services",
    followUps: ["pay-online-how", "file-complaint", "contact-helpline"],
  },
  {
    id: "jmc-vision",
    cat: "general",
    kw: ["vision", "mission", "goal"],
    q: "What is JMC's vision and mission?",
    a: "**Vision:** To make Jammu a clean, green, smart, and liveable city — a model of efficient urban governance that places citizens at the centre of all its activities.\n\n**Mission:** To provide efficient, transparent, and accountable civic services to all residents of Jammu city, leveraging technology and best practices in urban management.",
    followUps: ["what-is-jmc", "jmc-history"],
  },
  {
    id: "jmc-history",
    cat: "general",
    kw: ["history", "established", "when", "old", "started"],
    q: "What is JMC's history?",
    a: "The history of municipal governance in Jammu dates back to the Dogra rulers. The Jammu Municipal Committee was one of the earliest civic bodies in the region, later upgraded to the Jammu Municipal Corporation under the J&K Municipal Corporation Act. Over the decades, JMC has expanded its jurisdiction to cover all wards of Jammu city.",
    followUps: ["what-is-jmc", "governing-bodies"],
  },

  // ── PAYMENTS ─────────────────────────────────────────────────
  {
    id: "pay-online-how",
    cat: "payments",
    kw: ["pay", "online", "payment", "fee", "money", "dues", "charges", "how to pay"],
    q: "How do I pay online?",
    a: "To pay online:\n\n1. Go to the **Pay Online** page\n2. Select your payment category:\n   • **Tender Fee** — for contractors\n   • **Other Fee** — municipal charges\n3. Fill in your details and amount\n4. Click **Pay Now** → redirects to BillDesk\n5. Pay via card, net banking, or UPI\n6. Download your **PDF receipt** with QR code\n\nAccepted methods: Credit/Debit cards, Net Banking, UPI.",
    followUps: ["pay-tender-fee", "pay-other-fee", "payment-failed"],
  },
  {
    id: "pay-tender-fee",
    cat: "payments",
    kw: ["tender", "tender fee", "contractor", "nit", "bid"],
    q: "How do I pay tender fee?",
    a: "To pay **Tender Fee**:\n\n1. Go to Pay Online page\n2. Select **\"Tender Fee\"**\n3. Fill the form:\n   • Full Name *(required)*\n   • Parentage — S/o, D/o, W/o *(required)*\n   • Mobile Number *(required)*\n   • Email *(optional)*\n   • Address\n   • NIT / Tender No. — e.g. NIT-2025/001 *(required)*\n   • NIT / Tender Date *(required)*\n   • Tender Details\n   • Amount in ₹ *(required)*\n4. Click Pay Now → complete payment on BillDesk",
    followUps: ["payment-receipt", "payment-failed", "contact-helpline"],
  },
  {
    id: "pay-other-fee",
    cat: "payments",
    kw: ["other fee", "license", "municipal", "department", "zone", "health section", "veterinary", "transport", "revenue", "building permission", "miscellaneous"],
    q: "How do I pay other municipal fees?",
    a: "To pay **Other Fee** (municipal charges):\n\n1. Go to Pay Online page\n2. Select **\"Other Fee\"**\n3. Fill the form:\n   • **Department** — Health Section, Veterinary Services, Transport Section, Khilafwarzi Section, Revenue Section, Miscellaneous, Building Permission\n   • **Type of Fee** — e.g. License Renewal\n   • **Zone** — Zone A, B, C, D, or E\n   • Full Name, Mobile, Email, Address\n   • Amount in ₹\n4. Click Pay Now → complete payment on BillDesk",
    followUps: ["payment-receipt", "pay-online-how"],
  },
  {
    id: "payment-receipt",
    cat: "payments",
    kw: ["receipt", "download", "pdf", "proof", "qr"],
    q: "How do I get my payment receipt?",
    a: "After a successful payment, you'll see a **Payment Success** screen with a **Download Receipt** button. The PDF receipt includes:\n\n• JMC branding\n• Transaction ID & Order ID\n• Your name & contact details\n• Amount paid & date\n• Fee type & department\n• A QR code linking to the transaction\n\nIf you missed the download, contact JMC helpline: **18001807207**",
    followUps: ["payment-failed", "contact-helpline"],
  },
  {
    id: "payment-failed",
    cat: "payments",
    kw: ["failed", "error", "not working", "deducted", "refund", "money cut", "unsuccessful"],
    q: "My payment failed / money deducted but payment failed",
    a: "If your payment failed:\n\n1. **Check your bank statement** to confirm if money was deducted\n2. If money was deducted but payment shows \"Failed\":\n   • **Wait 24-48 hours** for automatic reversal\n   • If not refunded, call JMC helpline\n3. **Do NOT pay again** until you confirm the first attempt\n\n📞 **Helpline:** 18001807207 (Toll Free)\n\nKeep your transaction details ready when calling.",
    followUps: ["contact-helpline", "pay-online-how"],
  },
  {
    id: "payment-methods",
    cat: "payments",
    kw: ["card", "upi", "net banking", "method", "debit", "credit", "how to pay method"],
    q: "What payment methods are accepted?",
    a: "JMC uses **BillDesk** (government-approved payment gateway). Accepted methods:\n\n• **Credit Cards** — Visa, Mastercard, RuPay\n• **Debit Cards** — all major banks\n• **Net Banking** — all major Indian banks\n• **UPI** — Google Pay, PhonePe, Paytm, BHIM, etc.",
    followUps: ["pay-online-how", "payment-failed"],
  },

  // ── COMPLAINTS ───────────────────────────────────────────────
  {
    id: "file-complaint",
    cat: "complaints",
    kw: ["complaint", "grievance", "problem", "issue", "report", "register", "file"],
    q: "How do I file a complaint?",
    a: "Two ways to file a complaint:\n\n**Option 1: Via JMC Website**\n1. Go to Contact Us page\n2. Fill the grievance form:\n   • Full Name *(required)*\n   • Mobile Number *(required)*\n   • Email *(optional)*\n   • Department — Water Supply, Sanitation, Roads, Revenue, Street Lighting, Building, Transport, Veterinary, General\n   • Ward Number\n   • Complaint Details\n3. Submit → redirects to JMC Grievance portal\n\n**Option 2: Via MyJammu Portal**\nGo directly to the MyJammu Grievance portal.\n\n📞 **Helpline:** 18001807207 (Toll Free)",
    followUps: ["complaint-departments", "track-complaint", "contact-helpline"],
  },
  {
    id: "complaint-departments",
    cat: "complaints",
    kw: ["which department", "complaint about", "water", "sanitation", "road", "light", "street"],
    q: "What departments can I file complaints about?",
    a: "You can file complaints about these departments:\n\n• **Water Supply / PHE** — water issues, tanker, pipeline\n• **Sanitation** — garbage, cleaning, waste\n• **Roads & Infrastructure** — potholes, drainage\n• **Revenue / Tax** — property tax issues\n• **Street Lighting** — broken/missing lights\n• **Building Section** — illegal construction, permissions\n• **Transport** — municipal transport issues\n• **Veterinary** — stray animals, animal welfare\n• **General** — anything else",
    followUps: ["file-complaint", "contact-helpline"],
  },
  {
    id: "track-complaint",
    cat: "complaints",
    kw: ["track", "status", "complaint status", "check"],
    q: "How do I track my complaint?",
    a: "You can track your complaint status on the **JMC Online Grievance Portal**. You'll need your complaint/reference number that was given when you registered the complaint.\n\nAlternatively, call the **Toll-Free Helpline: 18001807207**.",
    followUps: ["file-complaint", "contact-helpline"],
  },

  // ── FEEDBACK ─────────────────────────────────────────────────
  {
    id: "give-feedback",
    cat: "feedback",
    kw: ["feedback", "suggestion", "opinion", "rate", "review"],
    q: "How do I give feedback?",
    a: "Go to the **Feedback** page and fill the form:\n\n• First Name *(required)*\n• Last Name\n• Email *(required)*\n• Department — Water Supply, Sanitation, Roads, Property Tax, Street Lighting, Smart City, Online Portal, General\n• Rating — Excellent, Good, Average, Poor\n• Your Feedback *(required)*\n\nYou can submit on the website or click **\"Submit on Portal\"** to go to JMC's official feedback page.",
    followUps: ["file-complaint", "contact-helpline"],
  },

  // ── RTI ──────────────────────────────────────────────────────
  {
    id: "rti-info",
    cat: "rti",
    kw: ["rti", "right to information", "information", "disclosure", "section 4"],
    q: "How do I access RTI information?",
    a: "Go to the **RTI** page to find all Right to Information disclosures.\n\n**RTI Officers at JMC:**\n• **PIO:** Chand Singh, JKAS (Secretary)\n• **First Appellate Authority:** Rajeev Khajuria, JKAS (Joint Commissioner)\n• **Second Appellate Authority:** Devansh Yadav, IAS (Commissioner)\n\n**Available Disclosures (Section 4):**\n• Organisation functions & duties\n• Decision-making procedures\n• Rules, regulations, manuals\n• Boards, councils, committees\n• Officer directory\n• Budget & expenditure\n• Subsidy programmes\n• Electronic information details\n• Public Information Officers list\n\nAll documents are downloadable as PDFs.",
    followUps: ["rti-pio", "rti-file"],
  },
  {
    id: "rti-pio",
    cat: "rti",
    kw: ["pio", "public information officer", "appellate", "who is pio"],
    q: "Who is the RTI Public Information Officer?",
    a: "**Public Information Officer (PIO):**\nChand Singh, JKAS — Secretary, JMC\n\n**First Appellate Authority:**\nRajeev Khajuria, JKAS — Joint Commissioner (Adm.)\n\n**Second Appellate Authority:**\nDevansh Yadav, IAS — Commissioner, JMC\n\nAddress: Town Hall Jammu, J&K 180001",
    followUps: ["rti-info", "rti-file"],
  },
  {
    id: "rti-file",
    cat: "rti",
    kw: ["file rti", "apply rti", "submit rti", "request information"],
    q: "How do I file an RTI request?",
    a: "To file a formal RTI request:\n\n1. Write an application addressed to the **PIO (Chand Singh, JKAS, Secretary JMC)**\n2. Include: your name, address, specific information you need\n3. Attach ₹10 fee (by postal order/demand draft)\n4. Send to: **JMC Head Office, Town Hall, Jammu, J&K 180001**\n\nYou can also file online through the J&K RTI portal.",
    followUps: ["rti-pio", "contact-helpline"],
  },

  // ── NOTICES & TENDERS ────────────────────────────────────────
  {
    id: "notices",
    cat: "notices",
    kw: ["notice", "public notice", "council", "circular", "order", "announcement"],
    q: "Where can I see notices?",
    a: "Go to the **Notices** page to see all official JMC notices:\n\n• **Public Notices** — announcements affecting citizens\n• **Council Notices** — internal council updates and decisions\n\nEach notice shows title, date, description, and downloadable PDF if attached. You can filter by type (Public/Council).",
    followUps: ["tenders", "smart-city-tenders"],
  },
  {
    id: "tenders",
    cat: "notices",
    kw: ["tender", "bid", "procurement", "e-tender", "jktenders"],
    q: "Where can I see tenders?",
    a: "JMC tenders are available in two places:\n\n1. **Notices page** — JMC general tenders, sorted newest first\n2. **Smart City Tenders page** — Smart City project tenders\n\nFor **e-tendering** (participating online), use the J&K e-procurement portal at **jktenders.gov.in**.\n\nEach tender shows: title, date, and downloadable documents.",
    followUps: ["smart-city-tenders", "pay-tender-fee"],
  },
  {
    id: "smart-city-tenders",
    cat: "notices",
    kw: ["smart city tender", "smart city bid"],
    q: "Where are Smart City tenders?",
    a: "Smart City tenders are on the dedicated **Smart City Tenders** page. These are tenders specific to Jammu's Smart City Mission projects.\n\nSorted by published date (newest first), each shows title, date, and downloadable documents.",
    followUps: ["tenders", "smart-city"],
  },

  // ── E-GOVERNANCE ─────────────────────────────────────────────
  {
    id: "egov-services",
    cat: "egov",
    kw: ["e-governance", "digital", "online service", "portal", "egov"],
    q: "What e-governance services are available?",
    a: "JMC offers **15 digital services** through its E-Governance page:\n\n1. **Online Property Tax Payment**\n2. **Online Grievance Redressal** (MyJammu)\n3. **Water Tanker Booking** (MyJammu)\n4. **Building Plan Permission** (HUDD BPS)\n5. **Birth & Death Certificate** (JAKSMAC)\n6. **Online NOC / Trade License** (JanSugam)\n7. **Rehri License** (JAKSMAC)\n8. **Pet Dog Registration** (JAKSMAC)\n9. **Pay Rent – Municipal Shop/Flat**\n10. **Online User Charges**\n11. **Sewerage Connection Verification**\n12. **Panjtirthi Slot Booking**\n13. **E-Tendering** (jktenders.gov.in)\n14. **E-Newsletter**\n15. **Feedback & Suggestions**",
    followUps: ["birth-death-cert", "building-permission", "trade-license"],
  },
  {
    id: "birth-death-cert",
    cat: "certificates",
    kw: ["birth", "death", "certificate", "born", "died"],
    q: "How do I apply for birth/death certificate?",
    a: "Apply for birth or death certificate through the **JAKSMAC e-service portal** (serviceonline.gov.in/jammu).\n\nThe link is available on the E-Governance page and the Services page of the JMC website.",
    followUps: ["egov-services", "contact-helpline"],
  },
  {
    id: "building-permission",
    cat: "certificates",
    kw: ["building", "permission", "plan", "construction", "sanction", "approval"],
    q: "How do I apply for building permission?",
    a: "Apply for building plan permission through the **HUDD BPS portal** (jkhuddobps.in).\n\nThe link is available on the E-Governance page. For queries, contact the Building Officer:\n• Kamal Kishore — 8492081239\n• Kapil Khajuria — 9018896437",
    followUps: ["egov-services", "urban-planning-dept"],
  },
  {
    id: "trade-license",
    cat: "certificates",
    kw: ["trade", "license", "business", "shop", "renew", "noc"],
    q: "How do I get a trade license?",
    a: "Apply for or renew your trade license through the **JanSugam portal** (jansugam.jk.gov.in).\n\nYou can also apply for NOC (No Objection Certificate) through the same portal. The link is on the E-Governance and Services pages.",
    followUps: ["egov-services", "rehri-license"],
  },
  {
    id: "rehri-license",
    cat: "certificates",
    kw: ["rehri", "street vendor", "stall", "hawker", "vendor license"],
    q: "How do I get a rehri/street vendor license?",
    a: "Apply for a Rehri (street vendor) license through the **JAKSMAC portal** (serviceonline.gov.in/jammu).\n\nThe link is available on the E-Governance page of the JMC website.",
    followUps: ["trade-license", "egov-services"],
  },
  {
    id: "pet-registration",
    cat: "certificates",
    kw: ["pet", "dog", "animal", "register pet"],
    q: "How do I register my pet dog?",
    a: "Register your pet dog with JMC through the **JAKSMAC portal** (serviceonline.gov.in/jammu).\n\nFor animal welfare issues, contact:\n• Dr. Jaswant Singh, JKAS (Municipal Veterinary Officer) — 9797682216\n• Dr. Gaurav Chowdhary (Animal Welfare Officer) — 9797371677",
    followUps: ["egov-services"],
  },
  {
    id: "water-tanker",
    cat: "services",
    kw: ["water", "tanker", "water supply", "booking", "no water"],
    q: "How do I book a water tanker?",
    a: "Book a water tanker online through the **MyJammu portal** (myjammu.in).\n\nFor water supply emergencies, contact:\n• Sunil Gandotra (SE, PHE) — 9419147521\n• PHE Water Supply Helpline numbers are available as PDF on the Contact page.\n• Toll-free: **18001807207**",
    followUps: ["contact-helpline", "egov-services"],
  },
  {
    id: "sewerage",
    cat: "services",
    kw: ["sewerage", "sewer", "drainage", "connection"],
    q: "How do I verify sewerage connection?",
    a: "Verify your sewerage connection permission status through the **JMC Sewerage Connection Verification** page on the JMC portal.\n\nThe link is available on the E-Governance page.",
    followUps: ["egov-services", "water-tanker"],
  },

  // ── CONTACT & HELPLINES ──────────────────────────────────────
  {
    id: "contact-helpline",
    cat: "contact",
    kw: ["contact", "phone", "call", "helpline", "number", "toll free", "reach", "talk"],
    q: "How do I contact JMC?",
    a: "**Toll-Free Helpline:** 📞 **18001807207**\n\n**Main Office:** Town Hall Jammu, J&K 180001\n**Hours:** 10:00 AM – 05:00 PM (Working Days)\n\n**Commissioner's Office:**\nDevansh Yadav, IAS\n📞 Office: 2542192 / 2547846\n📱 Mobile: 9797999495\n\n**Other offices:**\n• Zone North — Peer Mitha, Jammu\n• Zone South — Bohri, Jammu",
    followUps: ["officer-contacts", "file-complaint"],
  },
  {
    id: "officer-contacts",
    cat: "contact",
    kw: ["officer", "commissioner", "joint commissioner", "engineer", "health officer", "building officer", "transport", "secretary", "deputy commissioner"],
    q: "What are JMC officer phone numbers?",
    a: "**Key Officers:**\n\n• **Commissioner** — Devansh Yadav, IAS — 9797999495\n• **Jt. Commissioner (Adm.)** — Rajeev Khajuria — 9906069409\n• **Jt. Commissioner (R&E)** — Subah Mehta — 9419145837\n• **Jt. Commissioner (H&S)** — Abdul Star — 9419027458\n• **Jt. Commissioner (Works)** — Firdous Ahmed Qazi — 7006129804\n• **Secretary** — Chand Singh — 7006046450\n• **DC North** — Sanjay Badyal — 9419137292\n• **DC South** — Lal Chand — 7889455797\n• **Health Officer** — Dr. Vinod Sharma — 9419182088\n• **SE, PHE** — Sunil Gandotra — 9419147521\n• **Senior Town Planner** — Manoj Kumar — 9419162344\n• **FA/CAO** — Amit Kumar — 9419383788\n\n📞 Toll-Free: **18001807207**",
    followUps: ["contact-helpline", "file-complaint"],
  },
  {
    id: "jmc-address",
    cat: "contact",
    kw: ["address", "office", "where", "location", "visit", "town hall"],
    q: "Where is JMC's office?",
    a: "**Main Office (HQ):** Town Hall Jammu, J&K 180001\n📞 18001807207 (Toll Free)\n🕐 10:00 AM – 05:00 PM (Working Days)\n\n**Zone North Office:** Peer Mitha, Jammu\n**Zone South Office:** Bohri, Jammu\n\nBoth zone offices follow same working hours.",
    followUps: ["contact-helpline", "officer-contacts"],
  },
  {
    id: "working-hours",
    cat: "contact",
    kw: ["hours", "time", "open", "close", "when", "timing"],
    q: "What are JMC's working hours?",
    a: "JMC offices are open:\n\n🕐 **10:00 AM – 05:00 PM** on working days (Monday to Saturday, excluding holidays).\n\nThis applies to the Main Office (Town Hall), Zone North (Peer Mitha), and Zone South (Bohri).",
    followUps: ["jmc-address", "contact-helpline"],
  },

  // ── COUNCILLORS ──────────────────────────────────────────────
  {
    id: "find-councillor",
    cat: "councillors",
    kw: ["councillor", "ward", "my ward", "representative", "elected", "mla"],
    q: "How do I find my ward councillor?",
    a: "Go to the **Councillor Details** page:\n\n1. Browse the paginated list (7 councillors per page)\n2. Use the **ward number filter** to search your specific ward\n3. All **75 wards** of Jammu city are covered\n\nEach councillor's card shows:\n• Ward Number\n• Name\n• Political Party\n• Address\n• Email\n• Contact Number\n• Photo",
    followUps: ["governing-bodies", "contact-helpline"],
  },

  // ── GOVERNING BODIES ─────────────────────────────────────────
  {
    id: "governing-bodies",
    cat: "governance",
    kw: ["mayor", "deputy mayor", "governing", "elected", "chairman", "bodies"],
    q: "Who are the governing bodies?",
    a: "JMC's governing body includes:\n\n• **Hon'ble Mayor** — elected head of JMC\n• **Hon'ble Deputy Mayor**\n• **Chairman, Public Health & Sanitation Committee**\n• **Chairman, Swachh Bharat Committee**\n• **Chairman, Social Justice Committee**\n• **Commissioner Secretary to Govt. (HUDD)**\n• **Municipal Commissioner** — Devansh Yadav, IAS\n\nVisit the Governing Bodies page for detailed profiles of each position.",
    followUps: ["officer-contacts", "what-is-jmc"],
  },

  // ── DEPARTMENTS ──────────────────────────────────────────────
  {
    id: "departments",
    cat: "departments",
    kw: ["department", "departments", "which department", "how many"],
    q: "What departments does JMC have?",
    a: "JMC has **7 departments:**\n\n1. **Engineering** — roads, drainage, bridges, buildings, civil works\n2. **Health** — public health, epidemic control, food safety\n3. **Revenue & Taxation** — property tax, trade licenses, fees\n4. **Sanitation** — waste management, street sweeping, garbage\n5. **Urban Planning** — master plan, zoning, building permissions\n6. **Water Supply** — drinking water, pipelines, tanker services\n7. **Horticulture** — parks, gardens, tree plantation, green spaces\n\nEach has a detailed page on the website.",
    followUps: ["engineering-dept", "health-dept", "sanitation-dept"],
  },
  {
    id: "engineering-dept",
    cat: "departments",
    kw: ["engineering", "road", "bridge", "construction", "civil"],
    q: "What does the Engineering Department do?",
    a: "The **Engineering Department** handles all civil engineering works: road construction, drainage systems, bridges, JMC buildings, and infrastructure projects.\n\n**Key contacts:**\n• EE (Div-II) — Nawaz Ahmed Banday — 8803274201\n• EE (Div-III) — Akhil Dutt — 7889856380\n• EE (Div-IV) — Yasir Bashir Kichloo — 9419184058\n• EE (Projects) — Janak Singh — 9419161201\n• EE (Electrical) — S.P. Singh — 9149767538\n• EE (Mechanical) — Er. Rayaz Mir — 9419211990",
    followUps: ["departments", "file-complaint"],
  },
  {
    id: "health-dept",
    cat: "departments",
    kw: ["health", "hospital", "disease", "epidemic", "food safety", "medical"],
    q: "What does the Health Department do?",
    a: "The **Health Department** manages public health services, epidemic control, food safety inspections, sanitation inspection, and health awareness campaigns.\n\n**Health Officer:** Dr. Vinod Sharma — 9419182088\n**Veterinary Officer:** Dr. Jaswant Singh — 9797682216\n**Animal Welfare:** Dr. Gaurav Chowdhary — 9797371677",
    followUps: ["departments", "file-complaint"],
  },
  {
    id: "sanitation-dept",
    cat: "departments",
    kw: ["sanitation", "garbage", "waste", "cleaning", "sweeping", "dirty"],
    q: "What does the Sanitation Department do?",
    a: "The **Sanitation Department** handles solid waste management, daily street sweeping, garbage collection & disposal, waste processing, and cleanliness operations across all wards.\n\nTo report sanitation issues, file a complaint selecting **\"Sanitation\"** as the department, or call **18001807207**.",
    followUps: ["file-complaint", "departments"],
  },
  {
    id: "urban-planning-dept",
    cat: "departments",
    kw: ["urban planning", "zoning", "master plan", "town planner"],
    q: "What does Urban Planning do?",
    a: "The **Urban Planning** department manages the city master plan, zoning regulations, building permissions, land use planning, and urban design.\n\n**Senior Town Planner:** Manoj Kumar — 9419162344",
    followUps: ["building-permission", "departments"],
  },

  // ── SMART CITY & MISSIONS ────────────────────────────────────
  {
    id: "smart-city",
    cat: "projects",
    kw: ["smart city", "smart", "digital", "modern", "technology"],
    q: "What is Smart City Jammu?",
    a: "Jammu is part of the Government of India's **Smart Cities Mission**. The initiative covers urban development projects, technology-driven civic improvements, and infrastructure modernization.\n\nSmart City tenders are available on a dedicated page. Visit the Smart City page for full details on initiatives and progress.",
    followUps: ["smart-city-tenders", "development-works"],
  },
  {
    id: "swachh-mission",
    cat: "projects",
    kw: ["swachh", "clean", "bharat", "mission", "cleanliness"],
    q: "What is the Swachh Mission?",
    a: "JMC participates in the **Swachh Bharat (Clean India) Mission**. Initiatives include solid waste management, cleanliness drives, sanitation infrastructure, ODF (Open Defecation Free) status, waste processing plants, and community awareness campaigns.\n\nVisit the Swachh Mission page for details.",
    followUps: ["sanitation-dept", "development-works"],
  },
  {
    id: "development-works",
    cat: "projects",
    kw: ["development", "project", "works", "infrastructure", "ongoing"],
    q: "What development works are going on?",
    a: "The **Development Works** page shows all ongoing and completed infrastructure projects by JMC — road construction, drainage systems, parks, public facilities, smart city projects, and other civic infrastructure.\n\nVisit the page for current project updates.",
    followUps: ["smart-city", "departments"],
  },

  // ── GALLERY & MISC ───────────────────────────────────────────
  {
    id: "photo-gallery",
    cat: "misc",
    kw: ["gallery", "photos", "images", "pictures", "events"],
    q: "Where is the photo gallery?",
    a: "The **Photo Gallery** page shows albums of JMC events, initiatives, civic projects, and city life. Albums are organized by category with multiple high-resolution images each.",
    followUps: ["what-can-do"],
  },
  {
    id: "myjammu-app",
    cat: "misc",
    kw: ["app", "myjammu", "mobile app", "download"],
    q: "What is the MyJammu app?",
    a: "**MyJammu** is a mobile app/portal that provides:\n\n• Online Grievance Redressal\n• Water Tanker Booking\n• Various citizen services\n\nIt is a companion digital platform by the J&K government for Jammu citizens.",
    followUps: ["egov-services", "file-complaint"],
  },

  // ── NAVIGATION SHORTCUTS ────────────────────────────────────
  {
    id: "nav-help",
    cat: "navigation",
    kw: ["take me", "open", "navigate", "go to", "show me", "visit", "redirect", "page", "where"],
    q: "Take me to a page",
    a: "I can take you to any page on the JMC website! Just tell me where you'd like to go. Here are the available pages:",
    followUps: [],
  },
];

// ── Greetings & Conversational Responses ───────────────────────
const greetings = [
  {
    triggers: ["hello", "hi", "hey", "hii", "hiii", "helo", "heloo", "helo", "yo", "sup", "hola"],
    responses: [
      "Hello! 🙏 Welcome to JMC Assistant. How can I help you today?",
      "Hi there! 👋 I'm here to help you with any JMC-related queries. What do you need?",
      "Hey! 😊 Ask me anything about Jammu Municipal Corporation services.",
    ],
  },
  {
    triggers: ["good morning", "morning", "gm"],
    responses: [
      "Good morning! ☀️ How can I assist you with JMC services today?",
      "Morning! 🌞 Welcome to JMC Assistant. What can I help you with?",
    ],
  },
  {
    triggers: ["good afternoon", "afternoon"],
    responses: [
      "Good afternoon! 😊 How can I help you with JMC services?",
    ],
  },
  {
    triggers: ["good evening", "evening"],
    responses: [
      "Good evening! 🌙 Welcome to JMC Assistant. What do you need help with?",
    ],
  },
  {
    triggers: ["good night", "gn", "night"],
    responses: [
      "Good night! 🌙 If you need anything, I'm always here. Take care!",
    ],
  },
  {
    triggers: ["namaste", "namaskar", "pranam", "jai hind"],
    responses: [
      "Namaste! 🙏 Jammu Municipal Corporation mein aapka swagat hai. Main aapki kya madad kar sakta hoon?",
      "Namaste! 🙏 Welcome to JMC. How can I assist you today?",
    ],
  },
  {
    triggers: ["thank", "thanks", "thankyou", "thank you", "thx", "thnx", "dhanyawad", "shukriya", "ty"],
    responses: [
      "You're welcome! 😊 Is there anything else I can help you with?",
      "Glad I could help! 👍 Feel free to ask if you need anything else.",
      "Happy to help! 🙏 Ask me anything else about JMC services.",
    ],
  },
  {
    triggers: ["bye", "goodbye", "see you", "later", "tata", "alvida"],
    responses: [
      "Goodbye! 👋 Have a great day. Come back anytime you need help with JMC services!",
      "See you! 😊 Remember, I'm always here if you need help with Jammu Municipal Corporation.",
    ],
  },
  {
    triggers: ["ok", "okay", "k", "alright", "got it", "understood", "fine", "cool", "nice", "great", "awesome"],
    responses: [
      "Great! 👍 Is there anything else you'd like to know about JMC?",
      "Alright! Feel free to ask me anything else. 😊",
    ],
  },
  {
    triggers: ["help", "help me", "what can you do", "what do you do", "how can you help"],
    responses: [
      "I can help you with everything on the JMC website! Here's what I can do:\n\n• **Pay fees online** (tender fee, other fees)\n• **File complaints** or grievances\n• **Find contacts** of JMC officers\n• **View notices** & tenders\n• **RTI information** & documents\n• **Navigate to any page** — just say \"take me to [page]\"\n• **Department info**, e-governance, certificates & more\n\nJust type your question!",
    ],
  },
  {
    triggers: ["who are you", "what are you", "your name", "are you a bot", "are you human", "are you real", "are you ai"],
    responses: [
      "I'm **JMC Assistant** — an AI-powered chatbot built for the Jammu Municipal Corporation website. I can help you find information, navigate pages, and answer questions about all JMC services. I'm available 24/7! 🤖",
    ],
  },
  {
    triggers: ["how are you", "how r u", "how are u", "whats up", "what's up", "kaise ho", "kya haal"],
    responses: [
      "I'm doing great, thank you for asking! 😊 How can I help you with JMC services today?",
      "All good on my end! 👍 What can I assist you with?",
    ],
  },
];

/**
 * Check if the query is a greeting/conversational message.
 * Returns a random response string or null.
 */
export function detectGreeting(query) {
  const q = query.toLowerCase().trim().replace(/[!?.,:;]+/g, "");
  for (const g of greetings) {
    for (const t of g.triggers) {
      // Exact match or query starts/ends with trigger
      if (q === t || q.startsWith(t + " ") || q.endsWith(" " + t) || q.includes(t)) {
        // For short queries, only match if query is close in length to trigger
        // This prevents "how to pay" matching "how are you" via "how"
        if (t.length <= 3 && q.length > t.length + 5) continue;
        return g.responses[Math.floor(Math.random() * g.responses.length)];
      }
    }
  }
  return null;
}

// ── Quick Action Chips (shown on first open) ────────────────────
export const quickActions = [
  { label: "💳 Pay Online", id: "pay-online-how" },
  { label: "📞 Contact JMC", id: "contact-helpline" },
  { label: "📢 File Complaint", id: "file-complaint" },
  { label: "📋 View Tenders", id: "tenders" },
  { label: "🏛️ About JMC", id: "what-is-jmc" },
  { label: "🔍 RTI Info", id: "rti-info" },
];

// ── Matching Engine ─────────────────────────────────────────────

const stopWords = new Set([
  "i", "me", "my", "we", "our", "you", "your", "it", "its", "the", "a", "an",
  "is", "are", "was", "were", "be", "been", "am", "do", "does", "did", "has",
  "have", "had", "can", "could", "will", "would", "shall", "should", "may",
  "might", "to", "of", "in", "for", "on", "at", "by", "with", "from", "up",
  "out", "if", "or", "and", "but", "not", "no", "so", "as", "this", "that",
  "these", "those", "then", "than", "very", "just", "about", "please", "tell",
  "me", "want", "know", "need", "like", "get", "go", "see", "find",
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));
}

function similarity(tokens, keywords) {
  let score = 0;
  const kwSet = new Set(keywords.map((k) => k.toLowerCase()));
  const kwJoined = keywords.join(" ").toLowerCase();

  for (const token of tokens) {
    // Exact keyword match
    if (kwSet.has(token)) {
      score += 3;
      continue;
    }
    // Partial match (token is part of a keyword or vice versa)
    for (const kw of kwSet) {
      if (kw.includes(token) || token.includes(kw)) {
        score += 2;
        break;
      }
    }
  }

  // Bonus for multi-word phrase matches
  const queryJoined = tokens.join(" ");
  for (const kw of keywords) {
    if (kw.includes(" ") && queryJoined.includes(kw.toLowerCase())) {
      score += 5;
    }
  }

  return score;
}

export function findAnswer(query) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = similarity(tokens, entry.kw);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Minimum threshold
  if (bestScore < 2) return null;

  return bestMatch;
}

export function getEntryById(id) {
  return knowledgeBase.find((e) => e.id === id) || null;
}

export function getFollowUps(entry) {
  if (!entry?.followUps) return [];
  return entry.followUps
    .map((id) => knowledgeBase.find((e) => e.id === id))
    .filter(Boolean)
    .map((e) => ({ id: e.id, label: e.q }));
}

// ── Navigation Intent Detection (v2 — broad & smart) ────────────────

// TIER 1: Explicit navigation phrases (highest confidence)
const EXPLICIT_NAV = [
  "take me", "take to", "go to", "goto", "open", "navigate",
  "show me", "visit", "redirect", "bring me", "bring to",
  "want to go", "want to see", "want to visit", "move to",
  "switch to", "send me", "lead me", "direct me",
];

// TIER 2: Implicit navigation / location phrases (medium confidence)
const IMPLICIT_NAV = [
  "where is", "where can i find", "where do i find",
  "where can i see", "where to find", "where to see",
  "where are", "how can i find", "how do i find",
  "how to find", "how can i see", "how to go",
  "how do i go", "how to get to", "how do i get to",
  "how can i get to", "i want to see", "i want to find",
  "i need to go", "i need to find", "i need to see",
  "show the", "open the", "find the",
  "can you take", "can you show", "can you open",
];

// TIER 3: Suffix patterns — if query ends with "page" or "section"
const PAGE_SUFFIXES = ["page", "section", "tab", "screen", "portal"];

// Noise words to strip when isolating destination
const STRIP_WORDS = /\b(the|a|an|to|for|of|page|section|tab|screen|portal|please|pls|sir|madam|me|i|my|jmc|website|site)\b/gi;

/**
 * Try to match destination text against navAliases.
 * Returns { path, label } or null.
 */
function matchDestination(dest) {
  dest = dest.replace(STRIP_WORDS, " ").replace(/\s+/g, " ").trim();
  if (!dest || dest.length < 2) return null;

  const destTokens = dest.split(/\s+/).filter(Boolean);
  let bestRoute = null;
  let bestScore = 0;

  for (const alias of navAliases) {
    let score = 0;
    for (const kw of alias.kw) {
      const kwLower = kw.toLowerCase();
      // Full phrase match inside dest
      if (dest.includes(kwLower)) {
        score += kwLower.split(/\s+/).length * 5;
      }
      // Token-level matching
      for (const tok of destTokens) {
        if (kwLower === tok) score += 4;
        else if (tok.length >= 3 && kwLower.includes(tok)) score += 2;
        else if (tok.length >= 3 && tok.includes(kwLower)) score += 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestRoute = alias.route;
    }
  }

  if (!bestRoute || bestScore < 3) return null;
  return pageRoutes[bestRoute] || null;
}

/**
 * Detects if the user wants to navigate to a page.
 * Works with all kinds of natural phrasing:
 *   "take me to tender"     → /notices
 *   "where is the RTI page" → /rti
 *   "how can I find notices" → /notices
 *   "tender page"           → /notices
 *   "open gallery"          → /gallery
 * Returns { path, label } or null.
 */
export function detectNavigation(query) {
  const q = query.toLowerCase().trim();

  // Tier 1: Explicit nav — strip trigger, match rest
  for (const trigger of EXPLICIT_NAV) {
    if (q.includes(trigger)) {
      const after = q.slice(q.indexOf(trigger) + trigger.length);
      const result = matchDestination(after);
      if (result) return result;
    }
  }

  // Tier 2: Implicit nav — "where is the tender page", "how can I find notices"
  for (const trigger of IMPLICIT_NAV) {
    if (q.includes(trigger)) {
      const after = q.slice(q.indexOf(trigger) + trigger.length);
      const result = matchDestination(after);
      if (result) return result;
    }
  }

  // Tier 3: Ends with "page"/"section" — e.g. "tender page", "RTI section"
  for (const suffix of PAGE_SUFFIXES) {
    if (q.endsWith(suffix) || q.endsWith(suffix + "s")) {
      const before = q.replace(new RegExp(suffix + "s?$"), "");
      const result = matchDestination(before);
      if (result) return result;
    }
  }

  // Tier 4: Very short query (1-3 words) that directly matches a page name
  const wordCount = q.split(/\s+/).length;
  if (wordCount <= 3) {
    const result = matchDestination(q);
    if (result) return result;
  }

  return null;
}

/**
 * For knowledge-base answers about specific pages,
 * try to find a matching route to auto-attach a "Go to page" button.
 */
export function findRelatedRoute(entry) {
  if (!entry) return null;
  // Try matching based on keywords
  const testStr = entry.kw.join(" ");
  return matchDestination(testStr);
}

/**
 * Returns popular page links for the "take me to" quick menu.
 */
export function getPopularPages() {
  return [
    pageRoutes["home"],
    pageRoutes["pay-online"],
    pageRoutes["contact"],
    pageRoutes["notices"],
    pageRoutes["services"],
    pageRoutes["egov"],
    pageRoutes["rti"],
    pageRoutes["feedback"],
    pageRoutes["councillor-details"],
    pageRoutes["gallery"],
    pageRoutes["departments"],
    pageRoutes["smart-city"],
  ];
}

// ── AI Fallback (Optional — set VITE_AI_API_KEY in .env) ──────────

const AI_SYSTEM_PROMPT = `You are JMC Assistant, the official chatbot for the Jammu Municipal Corporation (JMC) website. You ONLY answer questions related to:
- Jammu Municipal Corporation services, departments, officials, contacts
- Online payments, complaints, feedback, RTI, tenders, notices
- E-governance services, certificates, licenses, building permissions
- Smart City Mission, Swachh Bharat Mission, development works
- JMC website navigation and features

Rules:
1. NEVER answer questions unrelated to JMC or Jammu city civic services.
2. If someone asks about unrelated topics, politely redirect: "I can only help with Jammu Municipal Corporation services. Please ask me about JMC!"
3. Keep answers concise, helpful, and friendly.
4. Use **bold** for key terms. Use bullet points for lists.
5. If you don't know something specific, suggest calling the JMC helpline: 18001807207.
6. You can mention the JMC website pages and suggest users navigate to them.`;

/**
 * AI fallback for queries not matched by the local knowledge base.
 * Only activated if VITE_AI_API_KEY is set in the environment.
 * Returns a promise that resolves to a string answer or null.
 */
export async function aiAnswer(query) {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: AI_SYSTEM_PROMPT },
          { role: "user", content: query },
        ],
        max_tokens: 400,
        temperature: 0.4,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}
