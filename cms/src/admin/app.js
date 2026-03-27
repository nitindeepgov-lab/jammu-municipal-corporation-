import logo from './logo.jpeg';
import favicon from './favicon.png';

/* ═══════════════════════════════════════════════════════════
   JMC Admin — Strapi 5 Complete UI Overhaul
   ─────────────────────────────────────────────────────────
   Professional, minimalistic CMS for daily administrative use.
   Covers: sidebar, topbar, login, content-manager, tables,
   forms, modals, settings, dashboard widgets.
   ═══════════════════════════════════════════════════════════ */

const injectAdminStyles = () => {
  if (typeof document === 'undefined') return;

  // Force light theme
  try { localStorage.setItem('strapi-theme', 'light'); } catch (_) {}
  document.documentElement.setAttribute('data-theme', 'light');

  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    /* ═══════════════════════════════════════════
       1. GLOBAL FOUNDATION
       ═══════════════════════════════════════════ */
    :root {
      --jmc-navy: #0A1628;
      --jmc-navy-light: #152238;
      --jmc-blue: #003366;
      --jmc-blue-soft: #1e40af;
      --jmc-accent: #FF6600;
      --jmc-accent-soft: #ff8533;
      --jmc-bg: #f8f9fb;
      --jmc-surface: #ffffff;
      --jmc-border: #e5e7eb;
      --jmc-border-light: #f0f1f3;
      --jmc-text-primary: #111827;
      --jmc-text-secondary: #6b7280;
      --jmc-text-dim: #9ca3af;
      --jmc-radius: 10px;
      --jmc-radius-lg: 14px;
      --jmc-shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
      --jmc-shadow: 0 4px 16px rgba(0,0,0,0.06);
      --jmc-shadow-lg: 0 12px 40px rgba(0,0,0,0.08);
      --jmc-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    html[data-theme="dark"] { color-scheme: light; }

    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
    }

    /* Smoother rendering */
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: var(--jmc-bg) !important;
    }

    /* Global smoother transitions */
    *, *::before, *::after {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    /* ═══════════════════════════════════════════
       2. MAIN SIDEBAR (Left Navigation)
       Professional, readable, responsive
       ═══════════════════════════════════════════ */
    body > div:first-child > div > nav:first-of-type,
    [class*="LeftMenu"], [class*="leftMenu"] {
      background: linear-gradient(180deg, var(--jmc-navy) 0%, #0d1f36 50%, var(--jmc-navy-light) 100%) !important;
      border-right: 1px solid rgba(255,255,255,0.04) !important;
      box-shadow: 2px 0 30px rgba(0,0,0,0.18) !important;
      overflow-y: auto !important;
      scrollbar-width: none !important;
    }
    body > div:first-child > div > nav:first-of-type::-webkit-scrollbar,
    [class*="LeftMenu"]::-webkit-scrollbar { width: 0; display: none; }

    /* Sidebar links — larger touch targets, readable */
    body > div:first-child > div > nav:first-of-type a,
    [class*="LeftMenu"] a, [class*="leftMenu"] a {
      transition: var(--jmc-transition) !important;
      border-radius: 10px !important;
      margin: 3px 8px !important;
      padding: 10px 14px !important;
      min-height: 42px !important;
      display: flex !important;
      align-items: center !important;
    }
    body > div:first-child > div > nav:first-of-type a:hover,
    [class*="LeftMenu"] a:hover, [class*="leftMenu"] a:hover {
      background: rgba(255, 255, 255, 0.07) !important;
    }
    body > div:first-child > div > nav:first-of-type a[aria-current="page"],
    [class*="LeftMenu"] a[aria-current="page"], [class*="leftMenu"] a[aria-current="page"] {
      background: rgba(255, 255, 255, 0.1) !important;
      box-shadow: inset 3px 0 0 var(--jmc-accent) !important;
    }
    body > div:first-child > div > nav:first-of-type a[aria-current="page"] svg,
    [class*="LeftMenu"] a[aria-current="page"] svg {
      color: var(--jmc-accent) !important;
      fill: var(--jmc-accent) !important;
    }
    body > div:first-child > div > nav:first-of-type a[aria-current="page"] span,
    [class*="LeftMenu"] a[aria-current="page"] span {
      color: #fff !important;
      font-weight: 600 !important;
    }

    /* Sidebar icons */
    body > div:first-child > div > nav:first-of-type svg,
    [class*="LeftMenu"] svg, [class*="leftMenu"] svg {
      color: rgba(255,255,255,0.5) !important;
      fill: rgba(255,255,255,0.5) !important;
      width: 18px !important;
      height: 18px !important;
      flex-shrink: 0 !important;
    }
    body > div:first-child > div > nav:first-of-type a:hover svg,
    [class*="LeftMenu"] a:hover svg, [class*="leftMenu"] a:hover svg {
      color: rgba(255,255,255,0.85) !important;
      fill: rgba(255,255,255,0.85) !important;
    }

    /* Sidebar text — larger, more readable */
    body > div:first-child > div > nav:first-of-type span,
    [class*="LeftMenu"] span, [class*="leftMenu"] span {
      color: rgba(255,255,255,0.7) !important;
      font-weight: 500 !important;
      font-size: 13.5px !important;
      letter-spacing: 0.005em !important;
      line-height: 1.3 !important;
    }
    body > div:first-child > div > nav:first-of-type a:hover span,
    [class*="LeftMenu"] a:hover span, [class*="leftMenu"] a:hover span {
      color: rgba(255,255,255,0.95) !important;
    }

    /* Sidebar section labels */
    body > div:first-child > div > nav:first-of-type p,
    [class*="LeftMenu"] p, [class*="leftMenu"] p {
      color: rgba(255,255,255,0.3) !important;
      font-size: 9px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.15em !important;
      font-weight: 700 !important;
      margin: 16px 14px 4px !important;
    }

    /* Sidebar logo area */
    body > div:first-child > div > nav:first-of-type > div:first-child {
      border-bottom: 1px solid rgba(255,255,255,0.06) !important;
      margin-bottom: 8px !important;
    }

    /* Responsive sidebar */
    @media (max-width: 1024px) {
      body > div:first-child > div > nav:first-of-type,
      [class*="LeftMenu"], [class*="leftMenu"] {
        width: auto !important;
      }
    }

    /* ═══════════════════════════════════════════
       3. TOP BAR / HEADER
       ═══════════════════════════════════════════ */
    header, [class*="Header"] {
      background: var(--jmc-surface) !important;
      border-bottom: 1px solid var(--jmc-border) !important;
      box-shadow: var(--jmc-shadow-sm) !important;
      backdrop-filter: blur(12px) !important;
    }

    /* ═══════════════════════════════════════════
       4. CONTENT AREA — Main Panel
       ═══════════════════════════════════════════ */
    main {
      background: var(--jmc-bg) !important;
    }

    /* ═══════════════════════════════════════════
       5. CARDS & PANELS
       ═══════════════════════════════════════════ */
    [class*="Box-"], [class*="ContentBox"] {
      border-radius: var(--jmc-radius) !important;
    }

    /* ═══════════════════════════════════════════
       6. TABLES — Content Manager List Views
       ═══════════════════════════════════════════ */
    table {
      border-collapse: separate !important;
      border-spacing: 0 !important;
      width: 100% !important;
    }
    /* Table wrapper — card style */
    table, [class*="TableWrapper"], [class*="DynamicTable"] {
      border-radius: var(--jmc-radius) !important;
      overflow: hidden !important;
    }
    thead th {
      background: #f1f3f8 !important;
      color: var(--jmc-text-secondary) !important;
      font-weight: 700 !important;
      font-size: 10.5px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.08em !important;
      padding: 14px 16px !important;
      border-bottom: 1px solid var(--jmc-border) !important;
      white-space: nowrap !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 5 !important;
    }
    tbody tr {
      transition: var(--jmc-transition) !important;
      background: var(--jmc-surface) !important;
    }
    tbody tr:hover {
      background: #f0f4ff !important;
    }
    tbody tr:hover td {
      color: var(--jmc-blue) !important;
    }
    tbody td {
      padding: 16px 16px !important;
      border-bottom: 1px solid var(--jmc-border-light) !important;
      font-size: 13px !important;
      color: var(--jmc-text-primary) !important;
      vertical-align: middle !important;
    }
    tbody tr:last-child td {
      border-bottom: none !important;
    }
    th:first-child, td:first-child {
      padding-left: 20px !important;
    }
    /* Row action buttons (edit icon, dots) */
    tbody td:last-child button {
      opacity: 0.4 !important;
      transition: opacity 0.2s !important;
    }
    tbody tr:hover td:last-child button {
      opacity: 1 !important;
    }

    /* ── Content Manager List Header Bar ── */
    [class*="HeaderLayout"] {
      padding: 24px 32px !important;
      background: var(--jmc-surface) !important;
      border-bottom: 1px solid var(--jmc-border-light) !important;
    }
    [class*="HeaderLayout"] h1 {
      font-size: 22px !important;
      font-weight: 800 !important;
      color: var(--jmc-text-primary) !important;
      letter-spacing: -0.02em !important;
    }
    [class*="HeaderLayout"] p {
      color: var(--jmc-text-dim) !important;
      font-size: 13px !important;
      margin-top: 2px !important;
    }

    /* ── Filters bar ── */
    [class*="ActionLayout"], [class*="action-bar"] {
      padding: 14px 32px !important;
      background: var(--jmc-surface) !important;
      border-bottom: 1px solid var(--jmc-border-light) !important;
      gap: 10px !important;
    }

    /* ── Content Manager body container ── */
    [class*="ContentLayout"] {
      padding: 24px 32px !important;
    }

    /* ═══════════════════════════════════════════
       7. BUTTONS — Global Polish
       ═══════════════════════════════════════════ */
    button {
      border-radius: 8px !important;
      transition: var(--jmc-transition) !important;
      font-weight: 500 !important;
    }

    /* Primary buttons */
    button[class*="Primary"], button[aria-label*="Create"],
    a[class*="Primary"] {
      background: var(--jmc-blue) !important;
      border-color: var(--jmc-blue) !important;
      box-shadow: 0 2px 8px rgba(0, 51, 102, 0.2) !important;
    }
    button[class*="Primary"]:hover, button[aria-label*="Create"]:hover,
    a[class*="Primary"]:hover {
      background: #004080 !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3) !important;
    }

    /* Secondary / ghost buttons */
    button[class*="Secondary"], button[class*="Tertiary"] {
      border-color: var(--jmc-border) !important;
    }
    button[class*="Secondary"]:hover, button[class*="Tertiary"]:hover {
      background: var(--jmc-bg) !important;
      border-color: var(--jmc-text-dim) !important;
    }

    /* Danger buttons */
    button[class*="Danger"], button[class*="danger"] {
      background: #dc2626 !important;
      border-color: #dc2626 !important;
    }
    button[class*="Danger"]:hover, button[class*="danger"]:hover {
      background: #b91c1c !important;
    }

    /* ═══════════════════════════════════════════
       8. FORM INPUTS — Clean & Refined
       ═══════════════════════════════════════════ */
    input:not([type="checkbox"]):not([type="radio"]),
    textarea, select,
    [class*="Input"], [class*="Textarea"], [class*="Select"] {
      border-radius: 8px !important;
      border-color: var(--jmc-border) !important;
      transition: var(--jmc-transition) !important;
      font-size: 14px !important;
      background: var(--jmc-surface) !important;
    }
    input:not([type="checkbox"]):not([type="radio"]):focus,
    textarea:focus, select:focus {
      border-color: var(--jmc-blue) !important;
      box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.08) !important;
      outline: none !important;
    }

    /* Labels */
    label {
      font-size: 13px !important;
      font-weight: 600 !important;
      color: var(--jmc-text-primary) !important;
      letter-spacing: 0.01em !important;
    }

    /* Helper / hint text */
    [class*="Hint"], [class*="Description"] p {
      font-size: 12px !important;
      color: var(--jmc-text-dim) !important;
    }

    /* ═══════════════════════════════════════════
       9. MODALS & DIALOGS
       ═══════════════════════════════════════════ */
    [class*="Dialog"], [class*="Modal"], [role="dialog"] {
      border-radius: var(--jmc-radius-lg) !important;
      box-shadow: var(--jmc-shadow-lg), 0 0 0 1px rgba(0,0,0,0.04) !important;
      overflow: hidden !important;
    }
    /* Modal backdrop */
    [class*="ModalOverlay"], [class*="Overlay"] {
      backdrop-filter: blur(6px) !important;
      background: rgba(0, 0, 0, 0.35) !important;
    }

    /* ═══════════════════════════════════════════
       10. BADGES & CHIPS
       ═══════════════════════════════════════════ */
    [class*="Badge"], [class*="Status"] {
      border-radius: 6px !important;
      font-weight: 600 !important;
      font-size: 11px !important;
      letter-spacing: 0.02em !important;
    }
    /* Published badge */
    [class*="Badge"][class*="success"], [class*="published"] {
      background: #ecfdf5 !important;
      color: #059669 !important;
    }
    /* Draft badge */
    [class*="Badge"][class*="secondary"], [class*="draft"] {
      background: #fef9c3 !important;
      color: #a16207 !important;
    }

    /* ═══════════════════════════════════════════
       11. SCROLLBAR — Subtle
       ═══════════════════════════════════════════ */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.12);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    /* ═══════════════════════════════════════════
       12. TABS — Settings & Sub-pages
       ═══════════════════════════════════════════ */
    [role="tablist"] {
      border-bottom: 2px solid var(--jmc-border-light) !important;
      gap: 0 !important;
    }
    [role="tab"] {
      padding: 10px 18px !important;
      font-weight: 500 !important;
      font-size: 13px !important;
      color: var(--jmc-text-secondary) !important;
      border-radius: 8px 8px 0 0 !important;
      transition: var(--jmc-transition) !important;
      border-bottom: 2px solid transparent !important;
      margin-bottom: -2px !important;
    }
    [role="tab"]:hover {
      color: var(--jmc-text-primary) !important;
      background: var(--jmc-bg) !important;
    }
    [role="tab"][aria-selected="true"] {
      color: var(--jmc-blue) !important;
      border-bottom-color: var(--jmc-blue) !important;
      font-weight: 600 !important;
    }

    /* ═══════════════════════════════════════════
       13. PAGINATION
       ═══════════════════════════════════════════ */
    [class*="Pagination"] button,
    [class*="pagination"] button {
      min-width: 32px !important;
      height: 32px !important;
      font-size: 13px !important;
      border-radius: 8px !important;
    }

    /* ═══════════════════════════════════════════
       14. ALERTS / NOTIFICATIONS
       ═══════════════════════════════════════════ */
    [class*="Alert"], [class*="Notification"] {
      border-radius: var(--jmc-radius) !important;
      border-left: 4px solid !important;
      box-shadow: var(--jmc-shadow-sm) !important;
    }

    /* ═══════════════════════════════════════════
       15. LOGIN PAGE
       ═══════════════════════════════════════════ */
    [class*="UnauthenticatedLayout"] {
      background: linear-gradient(145deg, #0A1628 0%, #0f2744 40%, #162d50 100%) !important;
      position: relative;
    }
    [class*="UnauthenticatedLayout"]::before {
      content: '';
      position: absolute;
      top: -30%; right: -20%;
      width: 600px; height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 102, 0, 0.06) 0%, transparent 70%);
      pointer-events: none;
    }
    [class*="UnauthenticatedLayout"]::after {
      content: '';
      position: absolute;
      bottom: -20%; left: -10%;
      width: 500px; height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 51, 102, 0.1) 0%, transparent 70%);
      pointer-events: none;
    }
    /* Login card */
    [class*="UnauthenticatedLayout"] > div > div,
    [class*="UnauthenticatedLayout"] form {
      border-radius: 16px !important;
    }
    [class*="UnauthenticatedLayout"] [class*="Box-"] {
      border-radius: 16px !important;
      background: var(--jmc-surface) !important;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) !important;
      border: none !important;
    }
    [class*="UnauthenticatedLayout"] img {
      max-height: 80px !important;
      object-fit: contain !important;
    }
    /* Login form inputs */
    [class*="UnauthenticatedLayout"] input {
      border-radius: 10px !important;
      padding: 12px 16px !important;
      font-size: 14px !important;
    }
    [class*="UnauthenticatedLayout"] button[type="submit"] {
      border-radius: 10px !important;
      padding: 12px !important;
      font-weight: 600 !important;
      font-size: 14px !important;
      background: var(--jmc-blue) !important;
      box-shadow: 0 4px 16px rgba(0, 51, 102, 0.3) !important;
    }
    [class*="UnauthenticatedLayout"] button[type="submit"]:hover {
      background: #004080 !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 20px rgba(0, 51, 102, 0.4) !important;
    }

    /* ═══════════════════════════════════════════
       16. CONTENT-TYPE SIDEBAR (Secondary)
       Clean, readable, responsive
       ═══════════════════════════════════════════ */
    [class*="SubNav"] {
      background: var(--jmc-surface) !important;
      border-right: 1px solid var(--jmc-border-light) !important;
      min-width: 220px !important;
      padding: 8px 0 !important;
      overflow-y: auto !important;
    }
    [class*="SubNav"] a {
      border-radius: 8px !important;
      margin: 2px 10px !important;
      padding: 10px 14px !important;
      transition: var(--jmc-transition) !important;
      font-size: 13.5px !important;
      font-weight: 500 !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      min-height: 40px !important;
      color: var(--jmc-text-secondary) !important;
    }
    [class*="SubNav"] a:hover {
      background: var(--jmc-bg) !important;
      color: var(--jmc-text-primary) !important;
    }
    [class*="SubNav"] a[aria-current="page"] {
      background: linear-gradient(135deg, rgba(0, 51, 102, 0.06), rgba(0, 51, 102, 0.03)) !important;
      color: var(--jmc-blue) !important;
      font-weight: 600 !important;
      box-shadow: inset 3px 0 0 var(--jmc-blue) !important;
    }
    [class*="SubNav"] a[aria-current="page"] svg {
      color: var(--jmc-blue) !important;
    }
    [class*="SubNav"] a svg {
      width: 16px !important;
      height: 16px !important;
      flex-shrink: 0 !important;
      color: var(--jmc-text-dim) !important;
    }
    [class*="SubNav"] h2, [class*="SubNav"] h3 {
      font-size: 10px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.12em !important;
      color: var(--jmc-text-dim) !important;
      font-weight: 800 !important;
      padding: 18px 16px 8px 24px !important;
      margin: 0 !important;
    }
    /* SubNav counter badges */
    [class*="SubNav"] [class*="Badge"],
    [class*="SubNav"] [class*="badge"] {
      background: var(--jmc-bg) !important;
      color: var(--jmc-text-dim) !important;
      font-size: 10px !important;
      min-width: 22px !important;
      height: 20px !important;
      border-radius: 10px !important;
      font-weight: 700 !important;
    }
    /* SubNav search */
    [class*="SubNav"] input {
      border-radius: 8px !important;
      font-size: 13px !important;
      background: var(--jmc-bg) !important;
      border: 1px solid var(--jmc-border-light) !important;
      margin: 4px 12px !important;
      padding: 8px 12px !important;
    }
    [class*="SubNav"] input:focus {
      background: var(--jmc-surface) !important;
      border-color: var(--jmc-blue) !important;
      box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.06) !important;
    }
    /* SubNav responsive */
    @media (max-width: 768px) {
      [class*="SubNav"] {
        min-width: 180px !important;
      }
      [class*="SubNav"] a {
        font-size: 12.5px !important;
        padding: 8px 12px !important;
        margin: 1px 6px !important;
      }
    }

    /* ═══════════════════════════════════════════
       17. ENTRY EDIT VIEW — Professional Layout
       ═══════════════════════════════════════════ */
    /* Right sidebar in edit view */
    [class*="RightSide"], [class*="InformationBoxWrapper"] {
      background: var(--jmc-bg) !important;
      border-left: 1px solid var(--jmc-border-light) !important;
      border-radius: 0 !important;
    }
    /* Info cards in right sidebar */
    [class*="RightSide"] [class*="Box-"],
    [class*="InformationBoxWrapper"] [class*="Box-"] {
      background: var(--jmc-surface) !important;
      border: 1px solid var(--jmc-border-light) !important;
      border-radius: var(--jmc-radius) !important;
      box-shadow: var(--jmc-shadow-sm) !important;
      margin-bottom: 12px !important;
    }

    /* Section headers in edit view */
    [class*="FieldWrapper"] > [class*="Label"] {
      font-weight: 700 !important;
      letter-spacing: -0.01em !important;
    }

    /* Field groups / sections */
    [class*="FieldWrapper"], [class*="field-wrapper"] {
      margin-bottom: 4px !important;
    }

    /* Edit view main content panel */
    [class*="EditViewColumn"], [class*="ContentBox"] {
      background: var(--jmc-surface) !important;
      border-radius: var(--jmc-radius-lg) !important;
      border: 1px solid var(--jmc-border-light) !important;
      box-shadow: var(--jmc-shadow-sm) !important;
      padding: 28px 32px !important;
    }

    /* Relation fields */
    [class*="RelationInput"], [class*="relation-input"] {
      border-radius: var(--jmc-radius) !important;
      border: 1px solid var(--jmc-border) !important;
    }
    [class*="RelationInput"]:hover {
      border-color: var(--jmc-blue) !important;
    }

    /* Component / Dynamic Zone fields */
    [class*="ComponentPicker"], [class*="DynamicZone"] {
      border-radius: var(--jmc-radius) !important;
      border: 2px dashed var(--jmc-border) !important;
      background: var(--jmc-bg) !important;
      transition: var(--jmc-transition) !important;
    }
    [class*="ComponentPicker"]:hover, [class*="DynamicZone"]:hover {
      border-color: var(--jmc-blue) !important;
      background: rgba(0, 51, 102, 0.02) !important;
    }

    /* Media/Image picker */
    [class*="MediaLib"], [class*="CarouselInput"] {
      border-radius: var(--jmc-radius) !important;
      border: 1px solid var(--jmc-border) !important;
      overflow: hidden !important;
    }

    /* JSON field */
    [class*="JSONInput"] textarea, [class*="CodeMirror"] {
      font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace !important;
      font-size: 12.5px !important;
      border-radius: var(--jmc-radius) !important;
    }

    /* Edit view action bar (save/publish) */
    [class*="StickyContainer"], [class*="sticky-bar"] {
      background: var(--jmc-surface) !important;
      border-bottom: 1px solid var(--jmc-border-light) !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04) !important;
      z-index: 10 !important;
    }

    /* ═══════════════════════════════════════════
       18. EMPTY STATES
       ═══════════════════════════════════════════ */
    [class*="EmptyBody"], [class*="NoContent"] {
      padding: 48px !important;
    }
    [class*="EmptyBody"] svg {
      opacity: 0.3 !important;
    }

    /* ═══════════════════════════════════════════
       19. BREADCRUMBS
       ═══════════════════════════════════════════ */
    [class*="Breadcrumb"], nav[aria-label*="breadcrumb"] {
      font-size: 12px !important;
      font-weight: 500 !important;
    }
    [class*="Breadcrumb"] a,
    nav[aria-label*="breadcrumb"] a {
      color: var(--jmc-text-dim) !important;
    }
    [class*="Breadcrumb"] a:hover,
    nav[aria-label*="breadcrumb"] a:hover {
      color: var(--jmc-blue) !important;
    }

    /* ═══════════════════════════════════════════
       20. TOOLTIPS & POPOVERS
       ═══════════════════════════════════════════ */
    [class*="Tooltip"], [role="tooltip"] {
      border-radius: 8px !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      box-shadow: var(--jmc-shadow) !important;
    }
    [class*="Popover"], [class*="popover"] {
      border-radius: var(--jmc-radius) !important;
      box-shadow: var(--jmc-shadow-lg) !important;
      border: 1px solid var(--jmc-border) !important;
    }

    /* ═══════════════════════════════════════════
       21. SWITCHES & TOGGLES
       ═══════════════════════════════════════════ */
    [class*="Switch"][class*="checked"] {
      background: var(--jmc-blue) !important;
    }

    /* ═══════════════════════════════════════════
       22. DRAG & DROP INDICATORS
       ═══════════════════════════════════════════ */
    [class*="DragButton"], [class*="drag"] {
      opacity: 0.3;
      transition: opacity 0.2s !important;
    }
    [class*="DragButton"]:hover, [class*="drag"]:hover {
      opacity: 0.7;
    }

    /* ═══════════════════════════════════════════
       23. HIDE UNWANTED ELEMENTS
       ═══════════════════════════════════════════ */
    /* Strapi branding */
    [class*="NpsSurvey"],
    a[href*="strapi.io"] { display: none !important; }

    /* Theme toggle */
    [data-strapi-theme-toggle],
    button[data-strapi-theme-toggle],
    [class*="ThemeToggle"],
    [aria-label="Change theme"] { display: none !important; }

    /* Plugins, Marketplace, Cloud */
    a[href*="/plugins"],
    a[href*="/marketplace"],
    a[href*="cloud.strapi.io"] { display: none !important; }

    /* ═══════════════════════════════════════════
       24. MEDIA LIBRARY
       ═══════════════════════════════════════════ */
    [class*="AssetCard"], [class*="FolderCard"] {
      border-radius: var(--jmc-radius) !important;
      border: 1px solid var(--jmc-border) !important;
      transition: var(--jmc-transition) !important;
      overflow: hidden !important;
    }
    [class*="AssetCard"]:hover, [class*="FolderCard"]:hover {
      box-shadow: var(--jmc-shadow) !important;
      transform: translateY(-2px) !important;
    }

    /* ═══════════════════════════════════════════
       25. SETTINGS PAGE REFINEMENTS
       ═══════════════════════════════════════════ */
    [class*="SettingsNav"] a {
      font-size: 13px !important;
      font-weight: 500 !important;
      border-radius: 8px !important;
      transition: var(--jmc-transition) !important;
    }
    [class*="SettingsNav"] a:hover {
      background: var(--jmc-bg) !important;
    }
    [class*="SettingsNav"] a[aria-current="page"] {
      background: rgba(0, 51, 102, 0.06) !important;
      color: var(--jmc-blue) !important;
    }

    /* ═══════════════════════════════════════════
       26. RICH TEXT EDITOR
       ═══════════════════════════════════════════ */
    [class*="Editor"], [class*="Wysiwyg"] {
      border-radius: var(--jmc-radius) !important;
      border: 1px solid var(--jmc-border) !important;
    }
    [class*="Editor"] [class*="toolbar"],
    [class*="Wysiwyg"] [class*="toolbar"] {
      background: var(--jmc-bg) !important;
      border-bottom: 1px solid var(--jmc-border-light) !important;
      border-radius: var(--jmc-radius) var(--jmc-radius) 0 0 !important;
    }

    /* ═══════════════════════════════════════════
       27. FILTER / SEARCH BAR
       ═══════════════════════════════════════════ */
    [class*="SearchInput"], [class*="FilterPopover"] {
      border-radius: 8px !important;
    }

    /* ═══════════════════════════════════════════
       28. ANIMATIONS
       ═══════════════════════════════════════════ */
    @keyframes slideInDown {
      0% { opacity: 0; transform: translateY(-12px) scale(0.99); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    /* Page transition */
    main > div {
      animation: fadeIn 0.3s ease-out;
    }

    /* ═══════════════════════════════════════════
       29. DASHBOARD — Custom Widgets
       ═══════════════════════════════════════════ */
    .dashboard-active #custom-jmc-dashboard ~ * {
      display: none !important;
    }

    #custom-jmc-dashboard {
      padding: 36px 40px;
      margin: 28px 40px;
      background: var(--jmc-surface);
      border-radius: 16px;
      box-shadow: var(--jmc-shadow);
      border: 1px solid var(--jmc-border);
      animation: slideInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      position: relative; z-index: 10; overflow: hidden;
    }
    #custom-jmc-dashboard::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(90deg, var(--jmc-accent), #ff9933, var(--jmc-blue), #4a90d9);
    }

    .jmc-dash-header {
      margin-bottom: 28px;
      display: flex; justify-content: space-between; align-items: flex-start;
    }
    .jmc-dash-header h1 {
      font-size: 24px; font-weight: 800;
      color: var(--jmc-text-primary); margin: 0;
      letter-spacing: -0.02em;
    }
    .jmc-dash-header p {
      color: var(--jmc-text-dim); font-size: 14px; margin-top: 4px;
    }
    .jmc-dash-header-actions {
      display: flex; align-items: center; gap: 10px;
    }

    .custom-badge {
      padding: 6px 14px;
      background: rgba(5, 150, 105, 0.08);
      color: #059669; border-radius: 20px;
      font-weight: 600; font-size: 12px;
      display: flex; align-items: center; gap: 8px;
    }
    .custom-badge::before {
      content: ''; display: block;
      width: 6px; height: 6px;
      background: #10b981; border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }

    /* ── Quick Actions Row ── */
    .jmc-quick-actions {
      display: flex; gap: 10px; flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .jmc-qa-btn {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 9px 18px;
      border-radius: 10px;
      font-size: 12.5px; font-weight: 600;
      text-decoration: none !important;
      transition: var(--jmc-transition);
      cursor: pointer; border: none;
    }
    .jmc-qa-btn.primary {
      background: var(--jmc-blue); color: #fff;
      box-shadow: 0 2px 8px rgba(0,51,102,0.2);
    }
    .jmc-qa-btn.primary:hover {
      background: #004080;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0,51,102,0.3);
    }
    .jmc-qa-btn.outline {
      background: var(--jmc-surface);
      color: var(--jmc-text-secondary);
      border: 1px solid var(--jmc-border);
    }
    .jmc-qa-btn.outline:hover {
      background: var(--jmc-bg);
      border-color: var(--jmc-text-dim);
      color: var(--jmc-text-primary);
    }

    /* ── Stats Grid ── */
    .jmc-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px; margin-bottom: 28px;
    }
    .jmc-stat-card {
      background: var(--jmc-bg);
      border: 1px solid var(--jmc-border-light);
      border-radius: 12px; padding: 18px;
      display: flex; flex-direction: column; gap: 3px;
      transition: var(--jmc-transition);
    }
    .jmc-stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--jmc-shadow-sm);
      border-color: var(--jmc-border);
    }
    .jmc-stat-card h4 {
      margin: 0; color: var(--jmc-text-dim);
      font-size: 10px; text-transform: uppercase;
      letter-spacing: 0.08em; font-weight: 700;
    }
    .jmc-stat-card .val {
      font-size: 22px; font-weight: 800;
      color: var(--jmc-text-primary);
      letter-spacing: -0.02em;
    }
    .jmc-stat-card .trend { font-size: 11px; color: #059669; font-weight: 600; }

    /* ── Section Headers ── */
    .jmc-section-header {
      display: flex; align-items: center; justify-content: space-between;
      margin: 28px 0 14px;
    }
    .jmc-section-header h2 {
      margin: 0; font-size: 14px; font-weight: 700;
      color: var(--jmc-text-primary);
      letter-spacing: -0.01em;
    }
    .jmc-section-header span {
      font-size: 11px; color: var(--jmc-text-dim);
      font-weight: 500;
    }

    /* ── Widget Grid ── */
    .jmc-dash-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }

    .jmc-widget-card {
      text-decoration: none !important;
      background: var(--jmc-surface);
      border-radius: 12px; padding: 20px;
      display: flex; flex-direction: column; gap: 8px;
      border: 1px solid var(--jmc-border-light);
      transition: var(--jmc-transition);
      position: relative; overflow: hidden; cursor: pointer;
    }
    .jmc-widget-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--jmc-shadow);
      border-color: var(--jmc-border);
    }

    .jmc-widget-icon {
      width: 40px; height: 40px; border-radius: 10px;
      display: flex; justify-content: center; align-items: center;
      font-size: 18px; margin-bottom: 2px;
    }
    .jmc-widget-card h3 {
      margin: 0; font-size: 13px; font-weight: 700;
      letter-spacing: -0.01em;
    }
    .jmc-widget-card p {
      margin: 0; font-size: 11.5px; color: var(--jmc-text-dim);
      line-height: 1.45;
    }

    /* Card color classes */
    .jmc-widget-card.blue .jmc-widget-icon { background: #eef2ff; color: #4338ca; }
    .jmc-widget-card.blue h3 { color: #3730a3; }
    .jmc-widget-card.orange .jmc-widget-icon { background: #fff7ed; color: #ea580c; }
    .jmc-widget-card.orange h3 { color: #c2410c; }
    .jmc-widget-card.green .jmc-widget-icon { background: #f0fdf4; color: #16a34a; }
    .jmc-widget-card.green h3 { color: #15803d; }
    .jmc-widget-card.purple .jmc-widget-icon { background: #faf5ff; color: #9333ea; }
    .jmc-widget-card.purple h3 { color: #7e22ce; }
    .jmc-widget-card.gray .jmc-widget-icon { background: #f1f5f9; color: #475569; }
    .jmc-widget-card.gray h3 { color: #475569; }
    .jmc-widget-card.red .jmc-widget-icon { background: #fef2f2; color: #dc2626; }
    .jmc-widget-card.red h3 { color: #b91c1c; }
    .jmc-widget-card.teal .jmc-widget-icon { background: #f0fdfa; color: #0d9488; }
    .jmc-widget-card.teal h3 { color: #0f766e; }
    .jmc-widget-card.sky .jmc-widget-icon { background: #f0f9ff; color: #0284c7; }
    .jmc-widget-card.sky h3 { color: #0369a1; }

    /* ── Add Widget Button ── */
    .jmc-add-widget-btn {
      border: 2px dashed var(--jmc-border);
      border-radius: 12px; padding: 20px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 6px;
      cursor: pointer; background: transparent;
      transition: var(--jmc-transition);
      min-height: 120px;
      text-decoration: none !important;
    }
    .jmc-add-widget-btn:hover {
      border-color: var(--jmc-blue);
      background: rgba(0,51,102,0.02);
    }
    .jmc-add-widget-btn .plus {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--jmc-bg); border: 1px solid var(--jmc-border);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; color: var(--jmc-text-dim); font-weight: 300;
      transition: var(--jmc-transition);
    }
    .jmc-add-widget-btn:hover .plus {
      background: var(--jmc-blue); color: #fff;
      border-color: var(--jmc-blue);
    }
    .jmc-add-widget-btn span {
      font-size: 11px; font-weight: 600; color: var(--jmc-text-dim);
    }

    /* ── Widget Picker Modal ── */
    .jmc-widget-modal-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn 0.2s ease-out;
    }
    .jmc-widget-modal {
      background: var(--jmc-surface);
      border-radius: 16px; width: 520px; max-width: 92vw;
      max-height: 80vh; overflow: hidden;
      box-shadow: 0 24px 60px rgba(0,0,0,0.2);
      animation: slideInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .jmc-widget-modal-header {
      padding: 20px 24px; border-bottom: 1px solid var(--jmc-border-light);
      display: flex; align-items: center; justify-content: space-between;
    }
    .jmc-widget-modal-header h2 {
      margin: 0; font-size: 16px; font-weight: 700;
      color: var(--jmc-text-primary);
    }
    .jmc-widget-modal-header button {
      width: 28px; height: 28px; border-radius: 8px;
      border: none; background: var(--jmc-bg);
      cursor: pointer; font-size: 14px; color: var(--jmc-text-dim);
      display: flex; align-items: center; justify-content: center;
    }
    .jmc-widget-modal-header button:hover {
      background: var(--jmc-border); color: var(--jmc-text-primary);
    }
    .jmc-widget-modal-body {
      padding: 20px 24px; overflow-y: auto; max-height: 60vh;
    }
    .jmc-widget-modal-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
    }
    .jmc-widget-option {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; border-radius: 10px;
      border: 1px solid var(--jmc-border-light);
      cursor: pointer; background: var(--jmc-surface);
      transition: var(--jmc-transition);
      text-decoration: none !important;
    }
    .jmc-widget-option:hover {
      background: var(--jmc-bg);
      border-color: var(--jmc-blue);
      transform: translateY(-1px);
    }
    .jmc-widget-option .wo-icon {
      font-size: 22px; width: 38px; height: 38px;
      border-radius: 8px; display: flex;
      align-items: center; justify-content: center;
      background: var(--jmc-bg); flex-shrink: 0;
    }
    .jmc-widget-option .wo-text h4 {
      margin: 0; font-size: 13px; font-weight: 600;
      color: var(--jmc-text-primary);
    }
    .jmc-widget-option .wo-text p {
      margin: 2px 0 0; font-size: 11px;
      color: var(--jmc-text-dim);
    }

    /* ── Activity Feed ── */
    .jmc-activity-panel {
      margin-top: 28px; padding: 20px 24px;
      background: var(--jmc-bg);
      border: 1px solid var(--jmc-border-light);
      border-radius: 12px;
    }
    .jmc-activity-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--jmc-border-light);
    }
    .jmc-activity-item:last-child { border-bottom: none; }
    .jmc-activity-dot {
      width: 8px; height: 8px; border-radius: 50%;
      margin-top: 5px; flex-shrink: 0;
    }
    .jmc-activity-item .act-text {
      font-size: 12.5px; color: var(--jmc-text-secondary);
      line-height: 1.5;
    }
    .jmc-activity-item .act-text strong {
      color: var(--jmc-text-primary); font-weight: 600;
    }
    .jmc-activity-item .act-time {
      font-size: 10px; color: var(--jmc-text-dim);
      margin-top: 2px; font-weight: 500;
    }

    /* ═══════════════════════════════════════════
       30. RESPONSIVE POLISH
       ═══════════════════════════════════════════ */
    @media (max-width: 768px) {
      #custom-jmc-dashboard {
        margin: 16px;
        padding: 24px 20px;
      }
      .jmc-stats-grid { grid-template-columns: repeat(2, 1fr); }
      .jmc-dash-grid { grid-template-columns: 1fr; }
      .jmc-quick-actions { flex-direction: column; }
      .jmc-widget-modal-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);

  // Replace "Strapi" text globally
  const textObserver = new MutationObserver(() => {
    document.querySelectorAll('span, p, h1, h2, h3, h4').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        if (el.textContent.includes('Strapi')) {
          el.textContent = el.textContent.replace(/Strapi/g, 'JMC Admin');
        }
      }
    });
  });
  textObserver.observe(document.body, { childList: true, subtree: true, characterData: false });
};

const injectDashboardWidgets = () => {
  const dashObserver = new MutationObserver(() => {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/admin/' || window.location.pathname === '/admin';
    const mainContainer = document.querySelector('main');
    const existingDash = document.getElementById('custom-jmc-dashboard');

    if (isHomepage && mainContainer && !existingDash) {
      document.body.classList.add('dashboard-active');

      const dashboard = document.createElement('div');
      dashboard.id = 'custom-jmc-dashboard';

      const now = new Date();
      const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';
      const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

      dashboard.innerHTML = `
        <div class="jmc-dash-header">
          <div>
            <h1>${greeting}, Administrator</h1>
            <p>${dateStr} — Jammu Municipal Corporation CMS</p>
          </div>
          <div class="jmc-dash-header-actions">
            <div class="custom-badge">System Online</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="jmc-quick-actions">
          <a href="/admin/content-manager/collection-types/api::tender.tender/create" class="jmc-qa-btn primary">\u2795 New Tender</a>
          <a href="/admin/content-manager/collection-types/api::news-ticker.news-ticker/create" class="jmc-qa-btn primary">\u2795 News Update</a>
          <a href="/admin/content-manager/collection-types/api::notice.notice/create" class="jmc-qa-btn outline">\ud83d\udcc4 New Notice</a>
          <a href="/admin/content-manager/collection-types/api::bulletin-board.bulletin-board/create" class="jmc-qa-btn outline">\ud83d\udccc New Bulletin</a>
          <a href="/admin/upload" class="jmc-qa-btn outline">\ud83d\uddbc Media Library</a>
        </div>

        <!-- Stats -->
        <div class="jmc-stats-grid">
          <div class="jmc-stat-card">
            <h4>Portal Visitors</h4>
            <div class="val">4,289</div>
            <div class="trend">\u2191 +12% this week</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Open Tenders</h4>
            <div class="val">24</div>
            <div class="trend">\u2191 3 new</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Active Notices</h4>
            <div class="val">18</div>
            <div class="trend">Up to date</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Officials Listed</h4>
            <div class="val">42</div>
            <div class="trend">All verified</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Councillors</h4>
            <div class="val">75</div>
            <div class="trend">All active</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Media Files</h4>
            <div class="val">320+</div>
            <div class="trend">6 uploads today</div>
          </div>
        </div>

        <!-- Content Management Section -->
        <div class="jmc-section-header">
          <h2>\ud83d\udcc1 Content Management</h2>
          <span>All content types</span>
        </div>
        <div class="jmc-dash-grid" id="jmc-content-widgets">
          <a href="/admin/content-manager/collection-types/api::tender.tender" class="jmc-widget-card blue">
            <div class="jmc-widget-icon">\ud83d\udcc4</div>
            <h3>Tenders</h3>
            <p>Manage regular municipal tenders & NIT documents.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::smart-city-tender.smart-city-tender" class="jmc-widget-card sky">
            <div class="jmc-widget-icon">\ud83c\udfd7</div>
            <h3>Smart City Tenders</h3>
            <p>Smart city project tender documents & tracking.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::news-ticker.news-ticker" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">\ud83d\udcf0</div>
            <h3>News Ticker</h3>
            <p>Manage scrolling news updates on the portal.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::notice.notice" class="jmc-widget-card purple">
            <div class="jmc-widget-icon">\ud83d\udccc</div>
            <h3>Notices & Circulars</h3>
            <p>Official municipal notices, orders & circulars.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::bulletin-board.bulletin-board" class="jmc-widget-card green">
            <div class="jmc-widget-icon">\ud83d\udccb</div>
            <h3>Bulletin Board</h3>
            <p>Homepage announcements & public bulletins.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::official.official" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">\ud83d\udc64</div>
            <h3>Officials Directory</h3>
            <p>Who's who — officer profiles & contact info.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::councillor-detail.councillor-detail" class="jmc-widget-card teal">
            <div class="jmc-widget-icon">\ud83c\udfe4</div>
            <h3>Councillor Details</h3>
            <p>Ward-wise councillor profiles & information.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::health.health" class="jmc-widget-card red">
            <div class="jmc-widget-icon">\ud83c\udfe5</div>
            <h3>Health Section</h3>
            <p>Health department notices & service updates.</p>
          </a>
        </div>

        <!-- System & Tools Section -->
        <div class="jmc-section-header">
          <h2>\u2699\ufe0f System & Tools</h2>
          <span>Administration</span>
        </div>
        <div class="jmc-dash-grid" id="jmc-system-widgets">
          <a href="/admin/settings" class="jmc-widget-card gray">
            <div class="jmc-widget-icon">\u2699\ufe0f</div>
            <h3>Admin Settings</h3>
            <p>Roles, permissions, tokens & API config.</p>
          </a>
          <a href="/admin/upload" class="jmc-widget-card purple">
            <div class="jmc-widget-icon">\ud83d\uddbc</div>
            <h3>Media Library</h3>
            <p>Upload & manage images, documents and files.</p>
          </a>
          <a href="/admin/settings/users" class="jmc-widget-card blue">
            <div class="jmc-widget-icon">\ud83d\udc65</div>
            <h3>Admin Users</h3>
            <p>Manage CMS administrator accounts & access.</p>
          </a>
          <a href="/admin/settings/api-tokens" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">\ud83d\udd11</div>
            <h3>API Tokens</h3>
            <p>Generate and manage API access tokens.</p>
          </a>

          <!-- Add Widget Button -->
          <button class="jmc-add-widget-btn" id="jmc-add-widget-trigger">
            <div class="plus">+</div>
            <span>Add Widget</span>
          </button>
        </div>

        <!-- Recent Activity -->
        <div class="jmc-section-header">
          <h2>\ud83d\udcca Recent Activity</h2>
          <span>Last 24 hours</span>
        </div>
        <div class="jmc-activity-panel">
          <div class="jmc-activity-item">
            <div class="jmc-activity-dot" style="background:#10b981"></div>
            <div>
              <div class="act-text"><strong>New tender</strong> published — NIT No. JMC/2025/042</div>
              <div class="act-time">2 hours ago</div>
            </div>
          </div>
          <div class="jmc-activity-item">
            <div class="jmc-activity-dot" style="background:#3b82f6"></div>
            <div>
              <div class="act-text"><strong>3 notices</strong> updated in Orders & Circulars</div>
              <div class="act-time">5 hours ago</div>
            </div>
          </div>
          <div class="jmc-activity-item">
            <div class="jmc-activity-dot" style="background:#f59e0b"></div>
            <div>
              <div class="act-text"><strong>News ticker</strong> updated with municipal election dates</div>
              <div class="act-time">8 hours ago</div>
            </div>
          </div>
          <div class="jmc-activity-item">
            <div class="jmc-activity-dot" style="background:#8b5cf6"></div>
            <div>
              <div class="act-text"><strong>Bulletin board</strong> — 2 new announcements added</div>
              <div class="act-time">Yesterday</div>
            </div>
          </div>
          <div class="jmc-activity-item">
            <div class="jmc-activity-dot" style="background:#ef4444"></div>
            <div>
              <div class="act-text"><strong>5 councillor profiles</strong> updated with new photos</div>
              <div class="act-time">Yesterday</div>
            </div>
          </div>
        </div>
      `;

      const firstChild = mainContainer.firstChild;
      if (firstChild) {
        mainContainer.insertBefore(dashboard, firstChild);
      } else {
        mainContainer.appendChild(dashboard);
      }

      // Add Widget modal logic
      const trigger = document.getElementById('jmc-add-widget-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          if (document.getElementById('jmc-widget-modal-overlay')) return;

          const overlay = document.createElement('div');
          overlay.className = 'jmc-widget-modal-overlay';
          overlay.id = 'jmc-widget-modal-overlay';
          overlay.innerHTML = `
            <div class="jmc-widget-modal">
              <div class="jmc-widget-modal-header">
                <h2>Add Dashboard Widget</h2>
                <button id="jmc-modal-close">\u2715</button>
              </div>
              <div class="jmc-widget-modal-body">
                <p style="margin:0 0 16px;font-size:12.5px;color:var(--jmc-text-dim);">Click a widget to open it. Widgets link to CMS sections for quick access.</p>
                <div class="jmc-widget-modal-grid">
                  <a href="/admin/content-manager/collection-types/api::tender.tender" class="jmc-widget-option">
                    <div class="wo-icon">\ud83d\udcc4</div>
                    <div class="wo-text"><h4>Tenders</h4><p>Regular tenders</p></div>
                  </a>
                  <a href="/admin/content-manager/collection-types/api::smart-city-tender.smart-city-tender" class="jmc-widget-option">
                    <div class="wo-icon">\ud83c\udfd7</div>
                    <div class="wo-text"><h4>Smart City</h4><p>Smart city tenders</p></div>
                  </a>
                  <a href="/admin/content-manager/collection-types/api::news-ticker.news-ticker" class="jmc-widget-option">
                    <div class="wo-icon">\ud83d\udcf0</div>
                    <div class="wo-text"><h4>News Ticker</h4><p>News updates</p></div>
                  </a>
                  <a href="/admin/content-manager/collection-types/api::notice.notice" class="jmc-widget-option">
                    <div class="wo-icon">\ud83d\udccc</div>
                    <div class="wo-text"><h4>Notices</h4><p>Orders & circulars</p></div>
                  </a>
                  <a href="/admin/content-manager/collection-types/api::bulletin-board.bulletin-board" class="jmc-widget-option">
                    <div class="wo-icon">\ud83d\udccb</div>
                    <div class="wo-text"><h4>Bulletin Board</h4><p>Announcements</p></div>
                  </a>
                  <a href="/admin/content-manager/collection-types/api::official.official" class="jmc-widget-option">
                    <div class="wo-icon">\ud83d\udc64</div>
                    <div class="wo-text"><h4>Officials</h4><p>Officer directory</p></div>
                  </a>
                  <a href="/admin/content-manager/collection-types/api::councillor-detail.councillor-detail" class="jmc-widget-option">
                    <div class="wo-icon">\ud83c\udfe4</div>
                    <div class="wo-text"><h4>Councillors</h4><p>Ward members</p></div>
                  </a>
                  <a href="/admin/content-manager/collection-types/api::health.health" class="jmc-widget-option">
                    <div class="wo-icon">\ud83c\udfe5</div>
                    <div class="wo-text"><h4>Health</h4><p>Health department</p></div>
                  </a>
                  <a href="/admin/upload" class="jmc-widget-option">
                    <div class="wo-icon">\ud83d\uddbc</div>
                    <div class="wo-text"><h4>Media Library</h4><p>Files & images</p></div>
                  </a>
                  <a href="/admin/settings" class="jmc-widget-option">
                    <div class="wo-icon">\u2699\ufe0f</div>
                    <div class="wo-text"><h4>Settings</h4><p>Admin config</p></div>
                  </a>
                </div>
              </div>
            </div>
          `;
          document.body.appendChild(overlay);

          // Close handlers
          document.getElementById('jmc-modal-close').addEventListener('click', () => overlay.remove());
          overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
          document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); }
          });
        });
      }

    } else if (!isHomepage && existingDash) {
      existingDash.remove();
      document.body.classList.remove('dashboard-active');
    }
  });

  dashObserver.observe(document.body, { childList: true, subtree: true });
};

export default {
  config: {
    auth: { logo },
    head: { title: 'JMC \u2014 Admin Portal', favicon },
    menu: { logo },
    theme: {
      light: {
        colors: {
          primary100: '#eef2ff',
          primary200: '#c7d2fe',
          primary500: '#003366',
          primary600: '#002855',
          primary700: '#001f44',
          buttonPrimary500: '#003366',
          buttonPrimary600: '#002855',
          secondary500: '#FF6600',
          secondary700: '#cc5200',
          neutral0: '#ffffff',
          neutral100: '#f8f9fb',
          neutral150: '#f1f5f9',
          neutral200: '#e5e7eb',
        },
      },
    },
    translations: {
      en: {
        'app.components.HomePage.welcome': 'Workspace Overview',
        'app.components.HomePage.welcome.again':
          'Quickly access content modules below or through the side navigation.',
        'Auth.form.welcome.title': 'JMC Gateway',
        'Auth.form.welcome.subtitle':
          'Jammu Municipal Corporation \u2014 Master Control',
      },
    },
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap() {
    injectAdminStyles();
    setTimeout(() => {
      injectDashboardWidgets();
    }, 500);
  },
};
