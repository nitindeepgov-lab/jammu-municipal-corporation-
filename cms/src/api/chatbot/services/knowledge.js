/**
 * JMC Chatbot Knowledge Base & Smart Matching Engine
 * Structured Q&A with keyword-based fuzzy matching + page navigation
 */

// ── Page Route Map (for "take me to" navigation) ─────────────────
const pageRoutes = {
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

const knowledgeBase = [
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

  // ── PROPERTY TAX ────────────────────────────────────────────
  {
    id: "property-tax",
    cat: "payments",
    kw: ["property tax", "house tax", "tax payment", "ghar ka tax", "property", "self assessment"],
    q: "How do I pay property tax?",
    a: "To pay property tax online:\n\n1. Go to the **E-Governance** page\n2. Click on **\"Online Property Tax Payment\"**\n3. You'll be redirected to the JMC property tax portal\n4. Enter your property details / ID\n5. Review the assessed amount\n6. Pay via card, net banking, or UPI\n\nFor property tax queries, contact the **Revenue & Taxation Department**.\n\n📞 **Helpline:** 18001807207",
    followUps: ["pay-online-how", "egov-services", "contact-helpline"],
  },

  // ── PANJTIRTHI BOOKING ──────────────────────────────────────
  {
    id: "panjtirthi",
    cat: "services",
    kw: ["panjtirthi", "slot", "booking", "cremation", "last rites", "antim sanskar"],
    q: "How do I book a Panjtirthi slot?",
    a: "Book a Panjtirthi (cremation ground) slot online through the JMC portal:\n\n1. Go to the **E-Governance** page\n2. Click **\"Panjtirthi Slot Booking\"**\n3. Fill your details and select a date/time slot\n4. Confirm the booking\n\nFor urgent requirements, call the **Toll-Free Helpline: 18001807207**.",
    followUps: ["contact-helpline"],
  },

  // ── ROAD DAMAGE ─────────────────────────────────────────────
  {
    id: "pothole",
    cat: "complaints",
    kw: ["pothole", "road damage", "bad road", "broken road", "road repair", "gaddha", "sadak", "repair", "toota", "pathole", "engineering", "civil", "construction"],
    q: "How to report a pothole or damaged road?",
    a: "To report road damage or potholes:\n\n1. Go to **Contact Us** page\n2. Select **\"Roads & Infrastructure\"** department\n3. Provide your **ward number** and road location\n4. Describe the damage\n5. Submit\n\nOr call **18001807207** (Toll-Free).\n\nThe Engineering Department handles all road repairs.",
    followUps: ["file-complaint", "engineering-dept"],
  },

  // ── GARBAGE / WASTE ─────────────────────────────────────────
  {
    id: "garbage-issue",
    cat: "complaints",
    kw: ["garbage", "kachra", "dirty", "waste dump", "no collection", "missed pickup", "garbage not collected", "safai", "sanitation", "sweeping", "sweeper", "cleaning"],
    q: "Garbage not being collected in my area?",
    a: "If garbage is not being collected:\n\n1. **File a complaint** on the Contact Us page selecting **\"Sanitation\"**\n2. Mention your **ward number** and area\n3. Or call **18001807207** (Toll-Free)\n\nJMC provides daily door-to-door garbage collection in all 75 wards. If collection is missed, the Sanitation Department will address it promptly.",
    followUps: ["file-complaint", "sanitation-dept", "contact-helpline"],
  },

  // ── WATER PROBLEM ───────────────────────────────────────────
  {
    id: "water-problem",
    cat: "complaints",
    kw: ["no water", "water problem", "dirty water", "low pressure", "pipeline leak", "burst pipe", "pani nahi", "pani", "paani", "water supply", "phe"],
    q: "No water supply in my area?",
    a: "For water supply issues:\n\n1. **File a complaint** on Contact Us page selecting **\"Water Supply / PHE\"**\n2. Mention your **ward number** and area\n3. For emergencies, call **18001807207**\n\n**SE, PHE (Water):** Sunil Gandotra — 9419147521\n\nYou can also **book a water tanker** via the MyJammu portal.",
    followUps: ["water-tanker", "file-complaint", "contact-helpline"],
  },

  // ── HINDI QUERIES ───────────────────────────────────────────
  {
    id: "hindi-payment",
    cat: "payments",
    kw: ["paisa", "bhugtan", "kaise pay", "payment kaise", "kaise bhare", "online kaise"],
    q: "Online payment kaise kare?",
    a: "Online payment karne ke liye:\n\n1. **Pay Online** page par jaayein\n2. Payment category chunein (Tender Fee ya Other Fee)\n3. Apni details bharein\n4. **Pay Now** par click karein\n5. BillDesk se payment karein (Card, Net Banking, UPI)\n\n📞 Madad ke liye Helpline: **18001807207** (Toll-Free)",
    followUps: ["pay-online-how", "contact-helpline"],
  },
  {
    id: "hindi-complaint",
    cat: "complaints",
    kw: ["shikayat", "problem hai", "complaint kaise", "kaise kare complaint", "pareshan"],
    q: "Shikayat kaise kare?",
    a: "Shikayat (complaint) karne ke liye:\n\n1. **Contact Us** page par jaayein\n2. Form bharein — apna naam, mobile, ward number\n3. **Department** chunein (Pani, Safai, Sadak, etc.)\n4. Submit karein\n\nYa seedha call karein: **18001807207** (Toll-Free)\n\n**MyJammu portal** par bhi online shikayat kar sakte hain.",
    followUps: ["file-complaint", "contact-helpline"],
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
function detectGreeting(query) {
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
const quickActions = [
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

const synonymGroups = [
  {
    keys: ["property tax", "house tax", "ghar tax", "makan tax", "gharka tax", "assessment", "propertytax", "tax"],
    canonical: "property-tax"
  },
  {
    keys: ["complaint", "grievance", "issue", "problem", "shikayat", "shikayet", "pareshani", "report", "register"],
    canonical: "file-complaint"
  },
  {
    keys: ["water", "tanker", "pani", "paani", "pipe", "leak", "supply", "phe"],
    canonical: "water-problem"
  },
  {
    keys: ["sanitation", "garbage", "waste", "kachra", "safai", "sweeper", "cleaning", "dustbin", "cleanliness"],
    canonical: "garbage-issue"
  },
  {
    keys: ["light", "street light", "lamp", "pole", "dark", "bijli"],
    canonical: "street-light"
  },
  {
    keys: ["building", "permission", "construction", "map", "plan", "naksha", "bps"],
    canonical: "building-permission"
  },
  {
    keys: ["trade", "license", "business", "shop", "dukaan", "dukan", "registration", "noc"],
    canonical: "trade-license"
  },
  {
    keys: ["birth", "death", "certificate", "born", "died", "janam", "janm", "mrityu"],
    canonical: "birth-death-cert"
  },
  {
    keys: ["rti", "information", "right to info", "pio", "appeal"],
    canonical: "rti-info"
  },
  {
    keys: ["panjtirthi", "cremation", "slot", "antim sanskar", "crematorium"],
    canonical: "panjtirthi"
  },
  {
    keys: ["tender", "notice", "bid", "contractor", "nit"],
    canonical: "tenders"
  }
];

function diceCoefficient(str1, str2) {
  if (str1 === str2) return 1.0;
  if (str1.length < 2 || str2.length < 2) return 0.0;
  
  const getBigrams = (str) => {
    const bigrams = new Set();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  };
  
  const bigrams1 = getBigrams(str1);
  const bigrams2 = getBigrams(str2);
  
  let intersection = 0;
  for (const bigram of bigrams1) {
    if (bigrams2.has(bigram)) {
      intersection++;
    }
  }
  
  return (2.0 * intersection) / (bigrams1.size + bigrams2.size);
}

function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  let prevRow = Array(a.length + 1);
  let currRow = Array(a.length + 1);
  
  for (let i = 0; i <= a.length; i++) prevRow[i] = i;
  
  for (let j = 1; j <= b.length; j++) {
    currRow[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      currRow[i] = Math.min(
        currRow[i - 1] + 1, // deletion
        prevRow[i] + 1, // insertion
        prevRow[i - 1] + indicator // substitution
      );
    }
    const temp = prevRow;
    prevRow = currRow;
    currRow = temp;
  }
  return prevRow[a.length];
}

function areWordsFuzzyEqual(word1, word2) {
  const w1 = word1.toLowerCase().trim();
  const w2 = word2.toLowerCase().trim();
  if (w1 === w2) return true;
  
  if (w1.length < 4 || w2.length < 4) {
    return levenshteinDistance(w1, w2) <= 1;
  }
  
  const dice = diceCoefficient(w1, w2);
  if (dice >= 0.72) return true;
  
  const maxDistance = Math.floor(Math.min(w1.length, w2.length) / 3);
  const dist = levenshteinDistance(w1, w2);
  return dist <= maxDistance;
}

function linkifyText(text) {
  if (!text) return text;
  
  let formatted = text;
  
  // Linkify emails
  formatted = formatted.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    "[$1](mailto:$1)"
  );
  
  const knownNumbers = [
    { num: "18001807207", label: "1800-180-7207 (Toll Free)" },
    { num: "1800-180-7207", label: "1800-180-7207 (Toll Free)" },
    { num: "9797999495", label: "9797999495 (Commissioner)" },
    { num: "9906069409", label: "9906069409 (Jt. Commissioner Adm.)" },
    { num: "9419145837", label: "9419145837 (Jt. Commissioner R&E)" },
    { num: "9419027458", label: "9419027458 (Jt. Commissioner H&S)" },
    { num: "7006129804", label: "7006129804 (Jt. Commissioner Works)" },
    { num: "7006046450", label: "7006046450 (Secretary)" },
    { num: "9419182088", label: "9419182088 (Health Officer)" },
    { num: "9419147521", label: "9419147521 (SE, PHE Water)" },
    { num: "9419162344", label: "9419162344 (Senior Town Planner)" },
    { num: "9419383788", label: "9419383788 (Financial Advisor / CAO)" },
    { num: "9419137292", label: "9419137292 (DC North)" },
    { num: "7889455797", label: "7889455797 (DC South)" },
    { num: "8803274201", label: "8803274201 (EE Div-II)" },
    { num: "7889856380", label: "7889856380 (EE Div-III)" },
    { num: "9419184058", label: "9419184058 (EE Div-IV)" },
    { num: "9419161201", label: "9419161201 (EE Projects)" },
    { num: "9149767538", label: "9149767538 (EE Electrical)" },
    { num: "9419211990", label: "9419211990 (EE Mechanical)" },
    { num: "9797682216", label: "9797682216 (MVO Veterinary)" },
    { num: "9797371677", label: "9797371677 (AWO Animal Welfare)" },
    { num: "8492081239", label: "8492081239 (Building Officer)" },
    { num: "9018896437", label: "9018896437 (Building Officer)" },
    { num: "2542192", label: "0191-2542192 (Office)" },
    { num: "2547846", label: "0191-2547846 (Office)" },
    { num: "2546252", label: "0191-2546252 (Office)" }
  ];
  
  for (const item of knownNumbers) {
    const escapedNum = item.num.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?<!\\]\\()\\b${escapedNum}\\b(?!\\))`, 'g');
    formatted = formatted.replace(regex, `[${item.label}](tel:${item.num.replace(/[^0-9]/g, "")})`);
  }
  
  return formatted;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));
}

const answerCache = new Map();

function findAnswer(query) {
  if (!query) return null;
  const normalizedQuery = query.trim().toLowerCase();
  if (answerCache.has(normalizedQuery)) {
    return answerCache.get(normalizedQuery);
  }

  const tokens = tokenize(query);
  if (tokens.length === 0) return null;

  const matchedCanonicalIds = new Set();
  const queryLower = query.toLowerCase();
  
  for (const group of synonymGroups) {
    for (const key of group.keys) {
      if (queryLower.includes(key.toLowerCase())) {
        matchedCanonicalIds.add(group.canonical);
        break;
      }
      for (const token of tokens) {
        if (areWordsFuzzyEqual(token, key)) {
          matchedCanonicalIds.add(group.canonical);
          break;
        }
      }
    }
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    
    if (matchedCanonicalIds.has(entry.id)) {
      score += 12; // High synonym boost
    }
    
    for (const token of tokens) {
      for (const kw of entry.kw) {
        if (areWordsFuzzyEqual(token, kw)) {
          score += 3;
          if (token.toLowerCase() === kw.toLowerCase()) {
            score += 1.5;
          }
          break;
        }
      }
      if (entry.q.toLowerCase().includes(token)) {
        score += 1.5;
      }
    }
    
    for (const kw of entry.kw) {
      if (kw.includes(" ") && queryLower.includes(kw.toLowerCase())) {
        score += 6;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestScore < 3) {
    answerCache.set(normalizedQuery, null);
    return null;
  }

  const entryClone = { ...bestMatch };
  entryClone.a = linkifyText(entryClone.a);
  answerCache.set(normalizedQuery, entryClone);
  return entryClone;
}

function getEntryById(id) {
  return knowledgeBase.find((e) => e.id === id) || null;
}

function getFollowUps(entry) {
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
function detectNavigation(query) {
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
function findRelatedRoute(entry) {
  if (!entry) return null;
  // Try matching based on keywords
  const testStr = entry.kw.join(" ");
  return matchDestination(testStr);
}

/**
 * Returns popular page links for the "take me to" quick menu.
 */
function getPopularPages() {
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

const AI_SYSTEM_PROMPT = `You are the official JMC Assistant, the digital concierge for the Jammu Municipal Corporation (JMC) website. Your role is to provide extremely professional, welcoming, and precise guidance to citizens who may be completely unfamiliar with navigating government websites.

Tone & Persona:
- Professional, empathetic, and highly helpful.
- Speak in a clear, accessible manner (avoid excessive bureaucratic jargon).
- Always ensure the citizen feels supported. Examples: "I would be glad to help you with that." or "Here is the exact page you need."
- You may respond in Hindi if the user writes in Hindi.

Key Officers & Contact Numbers:
- Commissioner: Devansh Yadav, IAS — 9797999495
- Jt. Commissioner (Adm.): Rajeev Khajuria — 9906069409
- Jt. Commissioner (R&E): Subah Mehta — 9419145837
- Jt. Commissioner (H&S): Abdul Star — 9419027458
- Jt. Commissioner (Works): Firdous Ahmed Qazi — 7006129804
- Secretary / PIO: Chand Singh — 7006046450
- Health Officer: Dr. Vinod Sharma — 9419182088
- SE, PHE (Water): Sunil Gandotra — 9419147521
- Senior Town Planner: Manoj Kumar — 9419162344
- Toll-Free Helpline: 1800-180-7207
- Office Address: Town Hall Jammu, J&K 180001
- Working Hours: 10:00 AM – 05:00 PM (Mon–Sat)

Website Structure & Comprehensive Link Guide:
- Home [/]: The main landing page for all JMC updates.
- About JMC [/about]: History, mission, and vision of JMC.
- Governing Bodies [/governing-bodies]: Mayor, Deputy Mayor, Committees.
- Commissioner [/commissioner]: Commissioner's message and profile.
- Officials [/officials]: Directory of all key JMC officers.
- Ex-Municipal Councillors [/councillor-details]: Ward-wise councillor details (75 wards).
- Citizen Services [/services]: Complete directory of services for residents.
- E-Governance Services [/egov]: 15+ digital services including:
  • Online Property Tax Payment
  • Online Grievance Redressal (MyJammu portal)
  • Water Tanker Booking (MyJammu portal)
  • Building Plan Permission (HUDD BPS — jkhuddobps.in)
  • Birth & Death Certificate (JAKSMAC — serviceonline.gov.in/jammu)
  • Online NOC / Trade License (JanSugam — jansugam.jk.gov.in)
  • Rehri License (JAKSMAC)
  • Pet Dog Registration (JAKSMAC)
  • Pay Rent – Municipal Shop/Flat
  • Online User Charges
  • Sewerage Connection Verification
  • Panjtirthi Slot Booking
  • E-Tendering (jktenders.gov.in)
  • E-Newsletter
  • Feedback & Suggestions
- Pay Online [/pay-online]: Secure BillDesk portal for Tender Fees, License Fees, Other Fees. Supports Card, Net Banking, UPI.
- Notices & Tenders [/notices]: Public notices, council notices, procurement tenders.
- Smart City Tenders [/smart-city-tenders]: Smart City Mission project tenders.
- Smart City [/smart-city]: Jammu Smart City initiatives.
- Swachh Mission [/swachh-mission]: Clean India mission, waste management.
- Development Works [/development-works]: Ongoing/completed infrastructure projects.
- Departments [/departments]: All 7 JMC departments.
  - Engineering [/departments/engineering]: Roads, drainage, bridges.
  - Health [/departments/health]: Public health, epidemic control.
  - Sanitation [/departments/sanitation]: Waste management, garbage collection.
  - Revenue & Taxation [/departments/revenue-taxation]: Property tax, trade licenses.
  - Urban Planning [/departments/urban-planning]: Master plan, building permissions.
  - Water Supply [/departments/water-supply]: Drinking water, tankers, pipelines.
  - Horticulture [/departments/horticulture]: Parks, gardens, green spaces.
- RTI [/rti]: Right to Information disclosures, PIO contacts.
- Photo Gallery [/gallery]: Event photos and project visuals.
- Contact Us [/contact]: Helplines, office addresses, grievance form.
- Feedback [/feedback]: Rate and review JMC services.

Common Citizen Scenarios — Answer these directly:
1. "I need to pay property tax" → Direct to [E-Governance](/egov) > Online Property Tax Payment.
2. "Garbage not collected" → File complaint at [Contact Us](/contact) selecting Sanitation dept.
3. "Need water tanker" → Book via MyJammu portal, link on [E-Governance](/egov).
4. "Building permission" → Apply via HUDD BPS (jkhuddobps.in), link on [E-Governance](/egov).
5. "Birth/Death certificate" → Apply via JAKSMAC portal, link on [E-Governance](/egov).
6. "Street light broken" → Complaint at [Contact Us](/contact) > Street Lighting dept.
7. "Pothole on road" → Complaint at [Contact Us](/contact) > Roads & Infrastructure.
8. "Trade license" → Apply via JanSugam portal, link on [E-Governance](/egov).

Rules:
1. ONLY answer JMC-related questions. For unrelated topics: "I apologize, but I can only assist with Jammu Municipal Corporation services. How can I help you with JMC today?"
2. ALWAYS provide the exact page link using format: [Page Name](/page-path).
3. Anticipate needs. If they ask about property tax, also mention the Revenue & Taxation department.
4. For complaints, direct to [Contact Us](/contact) or MyJammu portal.
5. If unsure, provide the JMC Toll-Free Helpline: 1800-180-7207.
6. Keep responses concise and use bullet points for steps.
7. Use **bold** for key terms and important info.`;

/**
 * AI fallback for queries not matched by the local knowledge base.
 * Only activated if VITE_AI_API_KEY is set in the environment.
 * Returns a promise that resolves to a string answer or null.
 */
async function aiAnswer(query, history = []) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const messages = [
      { role: "system", content: AI_SYSTEM_PROMPT },
      ...history.map((h) => ({
        role: h.role === "bot" ? "assistant" : "user",
        content: h.text || h.content,
      })),
      { role: "user", content: query },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 400,
        temperature: 0.4,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const replyText = data.choices?.[0]?.message?.content || null;
    return replyText ? linkifyText(replyText) : null;
  } catch {
    return null;
  }
}

function normalizeQuery(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function getTextScore(text, queryTokens) {
  if (!text) return 0;

  const normalized = normalizeQuery(text);
  let score = 0;

  for (const token of queryTokens) {
    if (normalized.includes(token)) {
      score += token.length >= 5 ? 3 : 1;
    }
  }

  return score;
}

function formatTitle(value, fallback) {
  const text = String(value || "").trim();
  return text || fallback;
}

function formatDateLabel(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function getDatabaseAnswer(queryText) {
  const cms = global.strapi;
  if (!cms?.db?.query) {
    return null;
  }

  const q = normalizeQuery(queryText);
  if (!q) return null;

  const queryTokens = q.split(" ").filter(Boolean);

  const fetchMany = async (uid, params = {}) => {
    try {
      return await cms.db.query(uid).findMany(params);
    } catch {
      return [];
    }
  };

  const summarizeList = (heading, items, options = {}) => {
    if (!items.length) return null;

    const lines = items.slice(0, options.limit || 5).map((item, index) => {
      const title = formatTitle(item.title || item.text || item.name, `${heading} ${index + 1}`);
      const dateLabel = formatDateLabel(item.updatedAt || item.notice_date || item.tender_date || item.release_date || item.event_date);
      const extra = item.description || item.caption || item.designation || item.party_name || item.category || "";
      const suffix = [dateLabel, extra].filter(Boolean).join(" — ");
      return `${index + 1}. **${title}**${suffix ? ` — ${suffix}` : ""}`;
    });

    return {
      text: `${heading}\n\n${lines.join("\n")}`,
      followUps: options.followUps || [],
      nav: options.nav || undefined,
    };
  };

  const isHomepageQuery = includesAny(q, [
    "latest",
    "recent",
    "updates",
    "what is new",
    "what's new",
    "homepage",
    "home page",
    "recent activity",
    "what is on home",
    "show updates",
    "latest updates",
  ]);

  if (isHomepageQuery) {
    const [newsTickers, notices, tenders, smartCityTenders, bulletins, events, galleries, officials, ministers] = await Promise.all([
      fetchMany("api::news-ticker.news-ticker", { where: { is_active: true }, orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::notice.notice", { orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::tender.tender", { orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::smart-city-tender.smart-city-tender", { orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::bulletin-board.bulletin-board", { orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::event-activity.event-activity", { where: { is_active: true }, orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::photo-gallery.photo-gallery", { where: { is_active: true }, orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::official.official", { orderBy: { updatedAt: "desc" }, limit: 3 }),
      fetchMany("api::minister.minister", { where: { is_active: true }, orderBy: { updatedAt: "desc" }, limit: 3 }),
    ]);

    const combined = [
      ...newsTickers.map((item) => ({
        kind: "News",
        title: formatTitle(item.text, "News update"),
        time: item.updatedAt,
      })),
      ...notices.map((item) => ({
        kind: item.notice_type === "council" ? "Council notice" : "Public notice",
        title: formatTitle(item.title, "Notice"),
        time: item.updatedAt,
      })),
      ...tenders.map((item) => ({
        kind: "Tender",
        title: formatTitle(item.title, "Tender"),
        time: item.updatedAt,
      })),
      ...smartCityTenders.map((item) => ({
        kind: "Smart City tender",
        title: formatTitle(item.title, "Smart City tender"),
        time: item.updatedAt,
      })),
      ...bulletins.map((item) => ({
        kind: "Bulletin",
        title: formatTitle(item.title, "Bulletin board item"),
        time: item.updatedAt,
      })),
      ...events.map((item) => ({
        kind: "Event",
        title: formatTitle(item.title, "Event"),
        time: item.updatedAt,
      })),
      ...galleries.map((item) => ({
        kind: "Gallery",
        title: formatTitle(item.title, "Photo gallery"),
        time: item.updatedAt,
      })),
      ...officials.map((item) => ({
        kind: "Officer",
        title: formatTitle(item.name, "Official"),
        time: item.updatedAt,
      })),
      ...ministers.map((item) => ({
        kind: "Governing body",
        title: formatTitle(item.name, "Governing body member"),
        time: item.updatedAt,
      })),
    ]
      .filter((item) => item.title)
      .sort((a, b) => new Date(b.time || 0) - new Date(a.time || 0));

    if (combined.length === 0) {
      return null;
    }

    return {
      text: `Here are the latest live updates from the CMS database:\n\n${combined
        .slice(0, 6)
        .map((item, index) => `${index + 1}. **${item.kind}** — ${item.title}`)
        .join("\n")}\n\nIf you want, I can narrow this down to notices, tenders, officers, councillors, gallery, or homepage news.`,
      followUps: [
        { id: "notices", label: "View Notices" },
        { id: "tenders", label: "View Tenders" },
        { id: "officer-contacts", label: "Officer Contacts" },
      ],
      nav: pageRoutes.home,
    };
  }

  const wardMatch = q.match(/ward\s*(\d{1,3})/);
  const wantsCouncillor = includesAny(q, ["councillor", "councilor", "ward member", "ward detail", "council member"]);
  if (wardMatch || wantsCouncillor) {
    const councillors = await fetchMany("api::councillor-detail.councillor-detail", {
      orderBy: { ward_no: "asc" },
      limit: 20,
    });

    const wardNo = wardMatch ? Number(wardMatch[1]) : null;
    const matched = wardNo
      ? councillors.filter((item) => Number(item.ward_no) === wardNo)
      : councillors
          .map((item) => ({ item, score: getTextScore(`${item.name} ${item.party_name || ""} ${item.address || ""}`, queryTokens) }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score)
          .map((entry) => entry.item);

    const list = matched.length ? matched : councillors.slice(0, 5);
    if (list.length === 0) return null;

    return summarizeList(
      wardNo ? `Ward ${wardNo} councillor details` : "Councillor details from the CMS database",
      list,
      {
        limit: 5,
        nav: pageRoutes["councillor-details"],
        followUps: [{ id: "find-councillor", label: "Find Councillor" }],
      }
    );
  }

  const wantsOfficials = includesAny(q, ["commissioner", "officer", "official", "secretary", "mayor", "deputy mayor", "health officer", "engineer"]);
  if (wantsOfficials) {
    const officials = await fetchMany("api::official.official", {
      orderBy: { order: "asc" },
      limit: 25,
    });

    const ministers = await fetchMany("api::minister.minister", {
      where: { is_active: true },
      orderBy: { order: "asc" },
      limit: 10,
    });

    const matchedOfficials = officials
      .map((item) => ({ item, score: getTextScore(`${item.name} ${item.designation}`, queryTokens) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);

    const matchedMinisters = ministers
      .map((item) => ({ item, score: getTextScore(`${item.name} ${item.title}`, queryTokens) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);

    const items = [...matchedOfficials, ...matchedMinisters].slice(0, 5);
    if (items.length === 0) return null;

    return summarizeList("Here are the live people and offices currently published on the website:", items, {
      limit: 5,
      nav: pageRoutes.officials,
      followUps: [{ id: "contact-helpline", label: "Contact JMC" }],
    });
  }

  const wantsNotices = includesAny(q, ["notice", "notices", "circular", "order", "announcement", "public notice"]);
  const wantsTenders = includesAny(q, ["tender", "tenders", "bid", "procurement", "smart city tender", "e-tender"]);
  const wantsGallery = includesAny(q, ["gallery", "photo", "photos", "album", "images"]);
  const wantsHomepage = includesAny(q, ["home", "homepage", "front page", "latest update", "updates"]);

  if (wantsNotices || wantsTenders || wantsGallery || wantsHomepage) {
    const sourceConfigs = [
      wantsNotices && {
        uid: "api::notice.notice",
        label: "Latest notices from the CMS database",
        nav: pageRoutes.notices,
        titleField: "title",
        dateField: "notice_date",
        limit: 5,
      },
      wantsTenders && {
        uid: "api::tender.tender",
        label: "Latest tenders from the CMS database",
        nav: pageRoutes.notices,
        titleField: "title",
        dateField: "tender_date",
        limit: 5,
      },
      wantsTenders && {
        uid: "api::smart-city-tender.smart-city-tender",
        label: "Latest Smart City tenders from the CMS database",
        nav: pageRoutes["smart-city-tenders"],
        titleField: "title",
        dateField: "tender_date",
        limit: 5,
      },
      wantsGallery && {
        uid: "api::photo-gallery.photo-gallery",
        label: "Latest photo gallery albums from the CMS database",
        nav: pageRoutes.gallery,
        titleField: "title",
        dateField: "updatedAt",
        limit: 5,
      },
      wantsHomepage && {
        uid: "api::news-ticker.news-ticker",
        label: "Latest headline updates from the CMS database",
        nav: pageRoutes.home,
        titleField: "text",
        dateField: "updatedAt",
        limit: 5,
        where: { is_active: true },
      },
      wantsHomepage && {
        uid: "api::bulletin-board.bulletin-board",
        label: "Latest bulletin board items from the CMS database",
        nav: pageRoutes.home,
        titleField: "title",
        dateField: "release_date",
        limit: 5,
      },
      wantsHomepage && {
        uid: "api::event-activity.event-activity",
        label: "Latest events and activities from the CMS database",
        nav: pageRoutes.home,
        titleField: "title",
        dateField: "event_date",
        limit: 5,
        where: { is_active: true },
      },
    ].filter(Boolean);

    for (const source of sourceConfigs) {
      const items = await fetchMany(source.uid, {
        where: source.where || {},
        orderBy: { updatedAt: "desc" },
        limit: source.limit || 5,
      });

      const matched = items
        .map((item) => ({ item, score: getTextScore(`${item[source.titleField]} ${item.description || ""}`, queryTokens) }))
        .filter((entry) => entry.score > 0 || wantsHomepage)
        .sort((a, b) => b.score - a.score || new Date(b.item.updatedAt || 0) - new Date(a.item.updatedAt || 0))
        .map((entry) => entry.item);

      if (matched.length > 0) {
        return summarizeList(source.label, matched, {
          limit: 5,
          nav: source.nav,
          followUps: [],
        });
      }
    }
  }

  const locationMatch = q.match(/ward\s*(\d{1,3})/);
  const wantsLocation = includesAny(q, ["location", "payment location", "ward area", "ward", "zone"]);
  if (locationMatch || wantsLocation) {
    const locations = await fetchMany("api::location.location", {
      where: { is_active: true },
      orderBy: { ward_no: "asc" },
      limit: 20,
    });

    const wardNo = locationMatch ? Number(locationMatch[1]) : null;
    const matched = wardNo
      ? locations.filter((item) => Number(item.ward_no) === wardNo)
      : locations
          .map((item) => ({ item, score: getTextScore(`${item.name} ward ${item.ward_no}`, queryTokens) }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score)
          .map((entry) => entry.item);

    const list = matched.length ? matched : locations.slice(0, 5);
    if (list.length === 0) return null;

    return summarizeList("Here are the live payment locations currently stored in the CMS database:", list, {
      limit: 5,
      nav: pageRoutes.egov,
      followUps: [{ id: "egov-services", label: "E-Governance Services" }],
    });
  }

  return null;
}


module.exports = {
  pageRoutes,
  knowledgeBase,
  quickActions,
  detectGreeting,
  detectNavigation,
  findAnswer,
  getDatabaseAnswer,
  getPopularPages,
  findRelatedRoute,
  getEntryById,
  getFollowUps,
  aiAnswer
};
