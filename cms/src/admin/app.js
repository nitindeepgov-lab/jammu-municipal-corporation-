import logo from "./logo.jpeg";
import favicon from "./favicon.png";

/* ═══════════════════════════════════════════════════════════
   JMC Admin — Strapi 5 Complete UI Overhaul
   ─────────────────────────────────────────────────────────
   Professional, minimalistic CMS for daily administrative use.
   Covers: sidebar, topbar, login, content-manager, tables,
   forms, modals, settings, dashboard widgets.
   ═══════════════════════════════════════════════════════════ */

/* ── Shared debounce utility ── */
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

const injectAdminStyles = () => {
  if (typeof document === "undefined") return;

  // Force light theme — cover all known Strapi 5 localStorage keys
  try {
    localStorage.setItem("strapi-theme", "light");
    localStorage.setItem("STRAPI_THEME", "light");
    localStorage.setItem("strapi-admin-theme", "light");
    localStorage.setItem("theme", "light");
  } catch (_) {}
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "light";

  const style = document.createElement("style");
  style.textContent = `
    /* Font loaded via JS <link> preload for non-blocking render — see below */

    /* ═══════════════════════════════════════════
       1. GLOBAL FOUNDATION
       ═══════════════════════════════════════════ */
    :root {
      /* ── Core Palette ── */
      --jmc-navy: #0A1628;
      --jmc-navy-light: #152238;
      --jmc-blue: #003366;
      --jmc-blue-soft: #1e40af;
      --jmc-blue-glow: rgba(0, 51, 102, 0.15);
      --jmc-accent: #FF6600;
      --jmc-accent-soft: #ff8533;
      --jmc-accent-glow: rgba(255, 102, 0, 0.12);
      --jmc-emerald: #059669;
      --jmc-emerald-soft: #10b981;
      /* ── Surfaces ── */
      --jmc-bg: #f4f6fa;
      --jmc-bg-elevated: #f8f9fc;
      --jmc-surface: #ffffff;
      --jmc-surface-hover: #fafbfe;
      /* ── Borders ── */
      --jmc-border: #e2e5ea;
      --jmc-border-light: #edf0f4;
      --jmc-border-focus: rgba(0, 51, 102, 0.25);
      /* ── Text ── */
      --jmc-text-primary: #0f172a;
      --jmc-text-secondary: #64748b;
      --jmc-text-dim: #94a3b8;
      /* ── Radius ── */
      --jmc-radius-xs: 6px;
      --jmc-radius-sm: 8px;
      --jmc-radius: 12px;
      --jmc-radius-lg: 16px;
      --jmc-radius-xl: 20px;
      /* ── Shadows — Layered for depth ── */
      --jmc-shadow-xs: 0 1px 2px rgba(0,0,0,0.03);
      --jmc-shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
      --jmc-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03);
      --jmc-shadow-md: 0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03);
      --jmc-shadow-lg: 0 20px 48px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
      --jmc-shadow-xl: 0 32px 64px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.05);
      --jmc-shadow-blue: 0 4px 16px rgba(0, 51, 102, 0.12);
      --jmc-shadow-accent: 0 4px 16px rgba(255, 102, 0, 0.15);
      /* ── Gradients ── */
      --jmc-gradient-primary: linear-gradient(135deg, #003366 0%, #004d99 50%, #002855 100%);
      --jmc-gradient-accent: linear-gradient(135deg, #FF6600 0%, #ff8533 100%);
      --jmc-gradient-sidebar: linear-gradient(180deg, #080e1e 0%, #0c1a30 30%, #0f2040 60%, #0a1628 100%);
      --jmc-gradient-surface: linear-gradient(180deg, #ffffff 0%, #fafbfd 100%);
      --jmc-gradient-hero: linear-gradient(135deg, #003366 0%, #1a4d80 40%, #005599 70%, #003366 100%);
      /* ── Transitions ── */
      --jmc-ease: cubic-bezier(0.4, 0, 0.2, 1);
      --jmc-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      --jmc-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
      --jmc-transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      --jmc-transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      --jmc-transition-slow: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    /* ═══ ABSOLUTE DARK MODE LOCK ═══ */
    html, html[data-theme="dark"], html[data-theme="light"],
    html.dark, :root {
      color-scheme: light only !important;
    }
    @media (prefers-color-scheme: dark) {
      :root, html { color-scheme: light only !important; }
    }

    /* Force ALL Strapi design-system tokens to light values */
    html[data-theme="dark"],
    html[data-theme="dark"] body,
    html[data-theme="dark"] #app,
    html[data-theme="dark"] #app > div {
      --colors-neutral0: #ffffff !important;
      --colors-neutral100: #f8f9fb !important;
      --colors-neutral150: #f1f5f9 !important;
      --colors-neutral200: #e5e7eb !important;
      --colors-neutral300: #d4d8dd !important;
      --colors-neutral400: #c0c5cc !important;
      --colors-neutral500: #8e99a4 !important;
      --colors-neutral600: #666e7a !important;
      --colors-neutral700: #4a4f56 !important;
      --colors-neutral800: #32373d !important;
      --colors-neutral900: #1c2028 !important;
      --colors-neutral1000: #0d1015 !important;
      --colors-primary600: #003366 !important;
      --colors-primary700: #002855 !important;
      color-scheme: light only !important;
      background: var(--jmc-bg) !important;
      color: var(--jmc-text-primary) !important;
    }
    html[data-theme="dark"] [class*="Box-"],
    html[data-theme="dark"] [class*="ContentBox"],
    html[data-theme="dark"] main,
    html[data-theme="dark"] header,
    html[data-theme="dark"] [class*="SubNav"],
    html[data-theme="dark"] [class*="Dialog"],
    html[data-theme="dark"] [class*="Modal"],
    html[data-theme="dark"] [class*="Popover"],
    html[data-theme="dark"] [class*="Sidebar"],
    html[data-theme="dark"] [role="dialog"],
    html[data-theme="dark"] table,
    html[data-theme="dark"] thead,
    html[data-theme="dark"] tbody,
    html[data-theme="dark"] td,
    html[data-theme="dark"] th {
      background: var(--jmc-surface) !important;
      color: var(--jmc-text-primary) !important;
    }
    html[data-theme="dark"] input,
    html[data-theme="dark"] textarea,
    html[data-theme="dark"] select,
    html[data-theme="dark"] [class*="Input"],
    html[data-theme="dark"] [class*="Textarea"],
    html[data-theme="dark"] [class*="Select"] {
      background: var(--jmc-surface) !important;
      color: var(--jmc-text-primary) !important;
      border-color: var(--jmc-border) !important;
    }
    html[data-theme="dark"] label,
    html[data-theme="dark"] span,
    html[data-theme="dark"] p,
    html[data-theme="dark"] h1,
    html[data-theme="dark"] h2,
    html[data-theme="dark"] h3,
    html[data-theme="dark"] h4,
    html[data-theme="dark"] h5,
    html[data-theme="dark"] a {
      color: inherit !important;
    }
    html[data-theme="dark"] svg {
      fill: currentColor !important;
    }
    html[data-theme="dark"] [class*="Badge"] {
      background: var(--jmc-bg) !important;
    }

    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      box-sizing: border-box;
    }

    /* Smoother rendering */
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: var(--jmc-bg) !important;
      text-rendering: optimizeLegibility;
    }

    /* Selection color */
    ::selection {
      background: rgba(0, 51, 102, 0.12);
      color: var(--jmc-blue);
    }

    /* Targeted transition timing */
    a, button, input, textarea, select,
    [class*="SubNav"] a, [class*="AssetCard"],
    [class*="FolderCard"], tbody tr, .jmc-widget-card,
    .jmc-stat-card, .jmc-qa-btn, [class*="Badge"],
    [role="tab"], [class*="SettingsNav"] a {
      transition-timing-function: var(--jmc-ease);
    }

    /* ── CSS-only ripple effect for buttons ── */
    button, .jmc-qa-btn, a.jmc-widget-card {
      position: relative;
      overflow: hidden;
    }
    button::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at var(--ripple-x, 50%) var(--ripple-y, 50%), rgba(255,255,255,0.25) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    button:active::after {
      opacity: 1;
      transition: opacity 0s;
    }

    /* ═══════════════════════════════════════════
       2. MAIN SIDEBAR (Left Navigation)
       Premium glassmorphic dark nav with animated gradient
       ═══════════════════════════════════════════ */
    @keyframes sidebarGradientShift {
      0%, 100% { background-position: 50% 0%; }
      50% { background-position: 50% 100%; }
    }
    body > div:first-child > div > nav:first-of-type,
    [class*="LeftMenu"], [class*="leftMenu"] {
      background: var(--jmc-gradient-sidebar) !important;
      background-size: 100% 200% !important;
      animation: sidebarGradientShift 15s ease infinite !important;
      border-right: 1px solid rgba(255,255,255,0.04) !important;
      box-shadow: 4px 0 32px rgba(0,0,0,0.3), inset -1px 0 0 rgba(255,255,255,0.02) !important;
      overflow-y: auto !important;
      scrollbar-width: none !important;
    }
    body > div:first-child > div > nav:first-of-type::-webkit-scrollbar,
    [class*="LeftMenu"]::-webkit-scrollbar { width: 0; display: none; }

    /* Sidebar links — refined touch targets */
    body > div:first-child > div > nav:first-of-type a,
    [class*="LeftMenu"] a, [class*="leftMenu"] a {
      transition: all 0.3s var(--jmc-ease) !important;
      border-radius: var(--jmc-radius) !important;
      margin: 2px 10px !important;
      padding: 10px 14px !important;
      min-height: 44px !important;
      display: flex !important;
      align-items: center !important;
      position: relative !important;
      border: 1px solid transparent !important;
    }
    body > div:first-child > div > nav:first-of-type a:hover,
    [class*="LeftMenu"] a:hover, [class*="leftMenu"] a:hover {
      background: rgba(255, 255, 255, 0.06) !important;
      border-color: rgba(255, 255, 255, 0.04) !important;
      transform: translateX(3px) !important;
    }
    body > div:first-child > div > nav:first-of-type a[aria-current="page"],
    [class*="LeftMenu"] a[aria-current="page"], [class*="leftMenu"] a[aria-current="page"] {
      background: linear-gradient(135deg, rgba(255, 102, 0, 0.1), rgba(255, 140, 0, 0.04)) !important;
      border-color: rgba(255, 102, 0, 0.08) !important;
      box-shadow: inset 3px 0 0 var(--jmc-accent), 0 0 24px rgba(255, 102, 0, 0.05) !important;
    }
    body > div:first-child > div > nav:first-of-type a[aria-current="page"] svg,
    [class*="LeftMenu"] a[aria-current="page"] svg {
      color: var(--jmc-accent) !important;
      fill: var(--jmc-accent) !important;
      filter: drop-shadow(0 0 6px rgba(255, 102, 0, 0.4)) !important;
    }
    body > div:first-child > div > nav:first-of-type a[aria-current="page"] span,
    [class*="LeftMenu"] a[aria-current="page"] span {
      color: #fff !important;
      font-weight: 600 !important;
    }

    /* Sidebar icons — subtle glow on hover */
    body > div:first-child > div > nav:first-of-type svg,
    [class*="LeftMenu"] svg, [class*="leftMenu"] svg {
      color: rgba(255,255,255,0.4) !important;
      fill: rgba(255,255,255,0.4) !important;
      width: 18px !important;
      height: 18px !important;
      flex-shrink: 0 !important;
      transition: all 0.3s ease !important;
    }
    body > div:first-child > div > nav:first-of-type a:hover svg,
    [class*="LeftMenu"] a:hover svg, [class*="leftMenu"] a:hover svg {
      color: rgba(255,255,255,0.9) !important;
      fill: rgba(255,255,255,0.9) !important;
      filter: drop-shadow(0 0 4px rgba(255,255,255,0.2)) !important;
    }

    /* Sidebar text — premium typography */
    body > div:first-child > div > nav:first-of-type span,
    [class*="LeftMenu"] span, [class*="leftMenu"] span {
      color: rgba(255,255,255,0.6) !important;
      font-weight: 500 !important;
      font-size: 13.5px !important;
      letter-spacing: 0.01em !important;
      line-height: 1.3 !important;
      transition: color 0.3s ease !important;
    }
    body > div:first-child > div > nav:first-of-type a:hover span,
    [class*="LeftMenu"] a:hover span, [class*="leftMenu"] a:hover span {
      color: rgba(255,255,255,0.95) !important;
    }

    /* Sidebar section labels */
    body > div:first-child > div > nav:first-of-type p,
    [class*="LeftMenu"] p, [class*="leftMenu"] p {
      color: rgba(255,255,255,0.2) !important;
      font-size: 9px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.15em !important;
      font-weight: 700 !important;
      margin: 20px 14px 6px !important;
      padding-top: 12px !important;
      border-top: 1px solid rgba(255,255,255,0.04) !important;
    }
    body > div:first-child > div > nav:first-of-type p:first-of-type {
      border-top: none !important;
      margin-top: 8px !important;
    }

    /* Sidebar logo area — glow effect */
    body > div:first-child > div > nav:first-of-type > div:first-child {
      border-bottom: 1px solid rgba(255,255,255,0.05) !important;
      margin-bottom: 8px !important;
      background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%) !important;
    }
    body > div:first-child > div > nav:first-of-type > div:first-child img {
      filter: drop-shadow(0 0 12px rgba(255, 102, 0, 0.2)) !important;
    }

    /* Responsive sidebar */
    @media (max-width: 1024px) {
      body > div:first-child > div > nav:first-of-type,
      [class*="LeftMenu"], [class*="leftMenu"] {
        width: auto !important;
      }
    }

    /* ═══════════════════════════════════════════
       3. TOP BAR / HEADER — Frosted Glass
       ═══════════════════════════════════════════ */
    header, [class*="Header"] {
      background: rgba(255, 255, 255, 0.82) !important;
      border-bottom: none !important;
      box-shadow: 0 1px 0 var(--jmc-border-light), var(--jmc-shadow-xs) !important;
      backdrop-filter: blur(16px) saturate(180%) !important;
      -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
      position: relative !important;
    }
    header::after, [class*="Header"]::after {
      content: '' !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 1px !important;
      background: linear-gradient(90deg, transparent 0%, var(--jmc-border) 30%, var(--jmc-border) 70%, transparent 100%) !important;
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
      box-shadow: var(--jmc-shadow-sm) !important;
    }
    thead th {
      background: linear-gradient(180deg, #f5f7fb 0%, #edf0f6 100%) !important;
      color: var(--jmc-text-secondary) !important;
      font-weight: 700 !important;
      font-size: 10.5px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.08em !important;
      padding: 14px 16px !important;
      border-bottom: 2px solid var(--jmc-border) !important;
      white-space: nowrap !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 5 !important;
    }
    tbody tr {
      transition: all 0.2s var(--jmc-ease) !important;
      background: var(--jmc-surface) !important;
      position: relative !important;
    }
    tbody tr:hover {
      background: linear-gradient(90deg, rgba(0, 51, 102, 0.02), rgba(0, 51, 102, 0.04), transparent) !important;
      box-shadow: inset 3px 0 0 var(--jmc-blue) !important;
    }
    tbody tr:hover td:first-child {
      color: var(--jmc-blue) !important;
    }
    tbody td {
      padding: 14px 16px !important;
      border-bottom: 1px solid var(--jmc-border-light) !important;
      font-size: 13px !important;
      color: var(--jmc-text-primary) !important;
      vertical-align: middle !important;
    }
    tbody tr:last-child td {
      border-bottom: none !important;
    }

    /* ── Zebra striping ── */
    tbody tr:nth-child(even) {
      background: var(--jmc-bg-elevated) !important;
    }
    tbody tr:nth-child(odd) {
      background: var(--jmc-surface) !important;
    }
    tbody tr:nth-child(even):hover,
    tbody tr:nth-child(odd):hover {
      background: linear-gradient(90deg, rgba(0, 51, 102, 0.02), rgba(0, 51, 102, 0.04), transparent) !important;
    }

    /* ── CSS Row numbers ── */
    table { counter-reset: row-num !important; }
    tbody tr { counter-increment: row-num !important; }
    tbody tr td:first-child::before {
      content: counter(row-num) '. ' !important;
      color: var(--jmc-text-dim) !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      min-width: 20px !important;
      display: inline !important;
    }
    th:first-child, td:first-child {
      padding-left: 20px !important;
    }
    /* Row action buttons (edit icon, dots) */
    tbody td:last-child button {
      opacity: 0.3 !important;
      transition: all 0.25s ease !important;
    }
    tbody tr:hover td:last-child button {
      opacity: 1 !important;
      color: var(--jmc-blue) !important;
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
       7. BUTTONS — Premium Polish
       ═══════════════════════════════════════════ */
    button {
      border-radius: var(--jmc-radius-sm) !important;
      transition: var(--jmc-transition) !important;
      font-weight: 600 !important;
      letter-spacing: 0.01em !important;
    }

    /* Primary buttons — gradient with glow */
    button[class*="Primary"], button[aria-label*="Create"],
    a[class*="Primary"] {
      background: var(--jmc-gradient-primary) !important;
      border-color: transparent !important;
      box-shadow: var(--jmc-shadow-blue) !important;
      color: #fff !important;
    }
    button[class*="Primary"]:hover, button[aria-label*="Create"]:hover,
    a[class*="Primary"]:hover {
      background: linear-gradient(135deg, #004080 0%, #0059b3 50%, #003366 100%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(0, 51, 102, 0.3), 0 2px 6px rgba(0, 51, 102, 0.15) !important;
    }
    button[class*="Primary"]:active, button[aria-label*="Create"]:active {
      transform: translateY(0) !important;
      box-shadow: 0 2px 8px rgba(0, 51, 102, 0.2) !important;
    }

    /* Secondary / ghost buttons */
    button[class*="Secondary"], button[class*="Tertiary"] {
      border-color: var(--jmc-border) !important;
      background: var(--jmc-surface) !important;
    }
    button[class*="Secondary"]:hover, button[class*="Tertiary"]:hover {
      background: var(--jmc-bg) !important;
      border-color: var(--jmc-blue) !important;
      color: var(--jmc-blue) !important;
      transform: translateY(-1px) !important;
    }

    /* Danger buttons — gradient red */
    button[class*="Danger"], button[class*="danger"] {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%) !important;
      border-color: transparent !important;
      box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2) !important;
    }
    button[class*="Danger"]:hover, button[class*="danger"]:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3) !important;
    }

    /* ═══════════════════════════════════════════
       8. FORM INPUTS — Premium Focus States
       ═══════════════════════════════════════════ */
    input:not([type="checkbox"]):not([type="radio"]),
    textarea, select,
    [class*="Input"], [class*="Textarea"], [class*="Select"] {
      border-radius: var(--jmc-radius-sm) !important;
      border: 1.5px solid var(--jmc-border) !important;
      transition: all 0.25s var(--jmc-ease) !important;
      font-size: 14px !important;
      background: var(--jmc-surface) !important;
    }
    input:not([type="checkbox"]):not([type="radio"]):focus,
    textarea:focus, select:focus {
      border-color: var(--jmc-blue) !important;
      box-shadow: 0 0 0 3px var(--jmc-blue-glow), var(--jmc-shadow-sm) !important;
      outline: none !important;
    }
    input:not([type="checkbox"]):not([type="radio"]):hover,
    textarea:hover, select:hover {
      border-color: var(--jmc-text-dim) !important;
    }

    /* Labels — refined */
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
      line-height: 1.5 !important;
    }

    /* ═══════════════════════════════════════════
       9. MODALS & DIALOGS — Glass Morphism
       ═══════════════════════════════════════════ */
    [class*="Dialog"], [class*="Modal"], [role="dialog"] {
      border-radius: var(--jmc-radius-xl) !important;
      box-shadow: var(--jmc-shadow-xl), 0 0 0 1px rgba(0,0,0,0.03) !important;
      overflow: hidden !important;
      border: 1px solid var(--jmc-border-light) !important;
      animation: modalEntrance 0.35s var(--jmc-ease-out) !important;
    }
    @keyframes modalEntrance {
      0% { opacity: 0; transform: scale(0.95) translateY(10px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    /* Modal backdrop */
    [class*="ModalOverlay"], [class*="Overlay"] {
      backdrop-filter: blur(10px) saturate(150%) !important;
      -webkit-backdrop-filter: blur(10px) saturate(150%) !important;
      background: rgba(15, 23, 42, 0.4) !important;
      animation: fadeIn 0.2s ease-out !important;
    }

    /* ═══════════════════════════════════════════
       10. BADGES & CHIPS — Premium Pills
       ═══════════════════════════════════════════ */
    [class*="Badge"], [class*="Status"] {
      border-radius: 20px !important;
      font-weight: 700 !important;
      font-size: 10.5px !important;
      letter-spacing: 0.03em !important;
      padding: 3px 10px !important;
      text-transform: uppercase !important;
    }
    /* Published badge */
    [class*="Badge"][class*="success"], [class*="published"] {
      background: linear-gradient(135deg, #ecfdf5, #d1fae5) !important;
      color: #059669 !important;
      border: 1px solid rgba(5, 150, 105, 0.12) !important;
    }
    /* Draft badge */
    [class*="Badge"][class*="secondary"], [class*="draft"] {
      background: linear-gradient(135deg, #fef9c3, #fef3c7) !important;
      color: #a16207 !important;
      border: 1px solid rgba(161, 98, 7, 0.1) !important;
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
      border-radius: 50% !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      border: 1px solid var(--jmc-border-light) !important;
      background: var(--jmc-surface) !important;
      color: var(--jmc-text-secondary) !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    [class*="Pagination"] button:hover,
    [class*="pagination"] button:hover {
      background: var(--jmc-bg) !important;
      border-color: var(--jmc-blue) !important;
      color: var(--jmc-blue) !important;
    }
    [class*="Pagination"] button[aria-current="page"],
    [class*="pagination"] button[aria-current="page"],
    [class*="Pagination"] button[class*="active"],
    [class*="pagination"] button[class*="active"] {
      background: var(--jmc-gradient-primary) !important;
      color: #ffffff !important;
      border-color: transparent !important;
      box-shadow: var(--jmc-shadow-blue) !important;
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
       15. LOGIN PAGE — Minimalistic
       Applied via JS DOM manipulation in
       injectLoginPageEnhancements()
       ═══════════════════════════════════════════ */
    .jmc-locale-hidden { display: none !important; }
    .jmc-login-styled { /* marker class */ }

    /* ═══════════════════════════════════════════
       16. CONTENT-TYPE SIDEBAR (SubNav) — Premium Redesign
       Glass morphism header · Gradient active states · Categorized layout
       ═══════════════════════════════════════════ */

    /* ── Sidebar container ── */
    [class*="SubNav"] {
      background: #f8f9fc !important;
      border-right: 1px solid #e4e8ef !important;
      min-width: 248px !important;
      max-width: 248px !important;
      padding: 0 !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      scrollbar-width: thin !important;
      scrollbar-color: rgba(0,51,102,0.12) transparent !important;
      display: flex !important;
      flex-direction: column !important;
      box-shadow: 2px 0 16px rgba(0,0,0,0.04), 1px 0 0 #e4e8ef !important;
    }
    [class*="SubNav"]::-webkit-scrollbar { width: 4px; }
    [class*="SubNav"]::-webkit-scrollbar-track { background: transparent; }
    [class*="SubNav"]::-webkit-scrollbar-thumb { background: rgba(0,51,102,0.12); border-radius: 4px; }
    [class*="SubNav"]::-webkit-scrollbar-thumb:hover { background: rgba(0,51,102,0.22); }

    /* ── Sticky glass header inside SubNav ── */
    [class*="SubNav"] > div:first-child {
      position: sticky !important;
      top: 0 !important;
      z-index: 10 !important;
      background: rgba(255,255,255,0.92) !important;
      backdrop-filter: blur(12px) saturate(180%) !important;
      -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
      border-bottom: 1px solid #e8ecf3 !important;
      padding: 18px 16px 14px !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04) !important;
    }

    /* Header title "Content Manager" */
    [class*="SubNav"] > div:first-child h2,
    [class*="SubNav"] > div:first-child > p {
      font-size: 11px !important;
      font-weight: 800 !important;
      letter-spacing: 0.1em !important;
      color: #003366 !important;
      text-transform: uppercase !important;
      padding: 0 !important;
      margin: 0 0 10px !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }
    [class*="SubNav"] > div:first-child h2::before,
    [class*="SubNav"] > div:first-child > p::before {
      content: '' !important;
      display: inline-block !important;
      width: 18px !important;
      height: 3px !important;
      background: linear-gradient(90deg, #003366, #FF6600) !important;
      border-radius: 2px !important;
      flex-shrink: 0 !important;
    }

    /* ── Search input inside header ── */
    [class*="SubNav"] input[type="search"],
    [class*="SubNav"] input[type="text"],
    [class*="SubNav"] input {
      border-radius: 10px !important;
      font-size: 12.5px !important;
      font-weight: 500 !important;
      background: #f0f2f8 !important;
      border: 1.5px solid transparent !important;
      margin: 0 !important;
      padding: 9px 12px 9px 34px !important;
      width: 100% !important;
      transition: all 0.25s ease !important;
      color: #0f172a !important;
    }
    [class*="SubNav"] input:focus {
      background: #ffffff !important;
      border-color: #003366 !important;
      box-shadow: 0 0 0 3px rgba(0,51,102,0.1), 0 2px 8px rgba(0,0,0,0.06) !important;
      outline: none !important;
    }
    [class*="SubNav"] input::placeholder {
      color: #94a3b8 !important;
      font-size: 12px !important;
    }
    /* Search icon wrapper */
    [class*="SubNav"] [class*="SearchInput"],
    [class*="SubNav"] [class*="search"] {
      position: relative !important;
    }

    /* ── Section category labels (COLLECTION TYPES, SINGLE TYPES) ── */
    [class*="SubNav"] h2:not(:first-child),
    [class*="SubNav"] h3,
    [class*="SubNav"] > div:not(:first-child) > p,
    [class*="SubNav"] [class*="Header"] {
      font-size: 9.5px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.14em !important;
      color: #94a3b8 !important;
      font-weight: 800 !important;
      padding: 18px 18px 6px 16px !important;
      margin: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 0 !important;
    }

    /* Count badge next to section title */
    [class*="SubNav"] [class*="Badge"],
    [class*="SubNav"] [class*="badge"] {
      background: #eef2ff !important;
      color: #3730a3 !important;
      font-size: 9.5px !important;
      min-width: 20px !important;
      height: 18px !important;
      border-radius: 9px !important;
      font-weight: 800 !important;
      border: 1px solid rgba(55,48,163,0.1) !important;
      padding: 0 7px !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    /* ── Nav items — premium pill style ── */
    [class*="SubNav"] a {
      border-radius: 10px !important;
      margin: 1.5px 10px !important;
      padding: 9px 14px !important;
      transition: all 0.22s cubic-bezier(0.4,0,0.2,1) !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      display: flex !important;
      align-items: center !important;
      gap: 11px !important;
      min-height: 38px !important;
      color: #475569 !important;
      position: relative !important;
      overflow: hidden !important;
      border: 1px solid transparent !important;
      text-decoration: none !important;
      letter-spacing: 0.005em !important;
    }

    /* Emoji / icon that Strapi prepends */
    [class*="SubNav"] a > span:first-child,
    [class*="SubNav"] a > svg:first-child {
      font-size: 15px !important;
      width: 20px !important;
      min-width: 20px !important;
      text-align: center !important;
      flex-shrink: 0 !important;
      transition: transform 0.22s ease !important;
    }
    [class*="SubNav"] a svg {
      width: 15px !important;
      height: 15px !important;
      flex-shrink: 0 !important;
      color: #94a3b8 !important;
      transition: all 0.22s ease !important;
    }

    /* ── Hover state ── */
    [class*="SubNav"] a:hover {
      background: #ffffff !important;
      color: #003366 !important;
      border-color: #e0e7f0 !important;
      box-shadow: 0 2px 10px rgba(0,51,102,0.07), 0 1px 3px rgba(0,0,0,0.04) !important;
      transform: translateX(2px) !important;
    }
    [class*="SubNav"] a:hover > span:first-child,
    [class*="SubNav"] a:hover svg {
      transform: scale(1.1) !important;
      color: #003366 !important;
    }

    /* ── Active / selected state — gradient pill ── */
    [class*="SubNav"] a[aria-current="page"],
    [class*="SubNav"] a[class*="active"] {
      background: linear-gradient(135deg, #003366 0%, #004d99 100%) !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      border-color: transparent !important;
      box-shadow: 0 4px 14px rgba(0,51,102,0.25), 0 1px 4px rgba(0,51,102,0.15) !important;
      transform: translateX(0) !important;
      letter-spacing: 0.01em !important;
    }
    [class*="SubNav"] a[aria-current="page"]::before {
      display: none !important;
    }
    [class*="SubNav"] a[aria-current="page"] svg,
    [class*="SubNav"] a[class*="active"] svg {
      color: rgba(255,255,255,0.85) !important;
    }
    [class*="SubNav"] a[aria-current="page"] > span:first-child {
      transform: none !important;
    }
    /* Active item right accent — subtle glow orb */
    [class*="SubNav"] a[aria-current="page"]::after {
      content: '' !important;
      position: absolute !important;
      right: -20px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 40px !important;
      height: 40px !important;
      background: radial-gradient(circle, rgba(255,102,0,0.25) 0%, transparent 70%) !important;
      border-radius: 50% !important;
      pointer-events: none !important;
    }

    /* ── Divider between sections ── */
    [class*="SubNav"] hr,
    [class*="SubNav"] [class*="divider"] {
      border: none !important;
      border-top: 1px solid #edf0f5 !important;
      margin: 8px 16px !important;
    }

    /* ── Bottom padding ── */
    [class*="SubNav"] > div:last-child {
      padding-bottom: 20px !important;
    }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      [class*="SubNav"] {
        min-width: 210px !important;
        max-width: 210px !important;
      }
    }
    @media (max-width: 768px) {
      [class*="SubNav"] {
        min-width: 0 !important;
        max-width: none !important;
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

    /* ── Edit form field grouping ── */
    [class*="EditViewColumn"] > div > div + div {
      border-top: 1px solid var(--jmc-border-light) !important;
      padding-top: 20px !important;
      margin-top: 16px !important;
    }
    [class*="GridItem"], [class*="grid-item"] {
      margin-bottom: 8px !important;
    }
    /* Relation field list scroll */
    [class*="RelationInput"] [class*="list"] {
      max-height: 200px !important;
      overflow-y: auto !important;
      scrollbar-width: thin !important;
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

    /* Theme toggle — comprehensive hide */
    [data-strapi-theme-toggle],
    button[data-strapi-theme-toggle],
    [class*="ThemeToggle"],
    [class*="themeToggle"],
    [class*="theme-toggle"],
    [aria-label="Change theme"],
    [aria-label="Toggle theme"],
    [aria-label*="dark mode"],
    [aria-label*="Dark mode"],
    [aria-label*="theme"],
    button[title*="theme"],
    button[title*="Theme"],
    button[title*="dark"],
    button[title*="Dark"] { display: none !important; visibility: hidden !important; }

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

    /* ── Media library card polish ── */
    [class*="AssetCard"] img, [class*="AssetCard"] video {
      object-fit: cover !important;
    }
    [class*="AssetCard"] [class*="Extension"] {
      background: rgba(0, 0, 0, 0.6) !important;
      color: #fff !important;
      border-radius: 4px !important;
      font-size: 9px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      padding: 2px 6px !important;
    }
    [class*="FolderCard"] {
      background: linear-gradient(135deg, #f8f9fb, #f1f3f8) !important;
    }
    [class*="FolderCard"] svg {
      color: var(--jmc-blue) !important;
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
       28. ANIMATIONS — Enhanced System
       ═══════════════════════════════════════════ */
    @keyframes slideInDown {
      0% { opacity: 0; transform: translateY(-16px) scale(0.98); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes slideInUp {
      0% { opacity: 0; transform: translateY(20px) scale(0.98); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 8px rgba(0, 51, 102, 0.1); }
      50% { box-shadow: 0 0 20px rgba(0, 51, 102, 0.2); }
    }
    @keyframes counterUp {
      0% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes subtleBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    /* Page entrance — smooth fade in */
    #app > div {
      opacity: 0;
      animation: appFadeIn 0.6s var(--jmc-ease-out) 0.2s forwards;
    }
    @keyframes appFadeIn {
      0% { opacity: 0; transform: translateY(4px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* Per-page content transition */
    main > div {
      animation: fadeIn 0.35s var(--jmc-ease-out);
    }

    /* ── Staggered dashboard widget entrance ── */
    .jmc-dash-grid > * {
      opacity: 0;
      animation: slideInUp 0.5s var(--jmc-ease-out) forwards;
    }
    .jmc-dash-grid > *:nth-child(1) { animation-delay: 0.03s; }
    .jmc-dash-grid > *:nth-child(2) { animation-delay: 0.06s; }
    .jmc-dash-grid > *:nth-child(3) { animation-delay: 0.09s; }
    .jmc-dash-grid > *:nth-child(4) { animation-delay: 0.12s; }
    .jmc-dash-grid > *:nth-child(5) { animation-delay: 0.15s; }
    .jmc-dash-grid > *:nth-child(6) { animation-delay: 0.18s; }
    .jmc-dash-grid > *:nth-child(7) { animation-delay: 0.21s; }
    .jmc-dash-grid > *:nth-child(8) { animation-delay: 0.24s; }
    .jmc-dash-grid > *:nth-child(9) { animation-delay: 0.27s; }
    .jmc-dash-grid > *:nth-child(10) { animation-delay: 0.3s; }

    /* ═══════════════════════════════════════════
       31. LOADING STATES — Premium Shimmer
       ═══════════════════════════════════════════ */
    [class*="Loading"], [class*="Loader"] {
      background: linear-gradient(90deg, var(--jmc-bg) 25%, var(--jmc-border-light) 50%, var(--jmc-bg) 75%) !important;
      background-size: 200% 100% !important;
      animation: shimmer 1.8s ease infinite !important;
      border-radius: var(--jmc-radius-sm) !important;
    }

    /* ═══════════════════════════════════════════
       32. NOTIFICATION TOASTS — Premium Glass
       ═══════════════════════════════════════════ */
    [class*="Notification"], [class*="notification"] {
      border-radius: var(--jmc-radius-lg) !important;
      box-shadow: var(--jmc-shadow-lg) !important;
      backdrop-filter: blur(12px) saturate(150%) !important;
      -webkit-backdrop-filter: blur(12px) saturate(150%) !important;
      animation: notifSlideIn 0.4s var(--jmc-ease-out) !important;
      border: 1px solid var(--jmc-border-light) !important;
      overflow: hidden !important;
    }
    @keyframes notifSlideIn {
      0% { opacity: 0; transform: translateX(40px) scale(0.96); }
      100% { opacity: 1; transform: translateX(0) scale(1); }
    }

    /* ═══════════════════════════════════════════
       33. TYPOGRAPHY HIERARCHY
       ═══════════════════════════════════════════ */
    h1 { font-weight: 800 !important; letter-spacing: -0.025em !important; }
    h2 { font-weight: 700 !important; letter-spacing: -0.02em !important; }
    h3 { font-weight: 600 !important; letter-spacing: -0.01em !important; }
    [class*="ContentLayout"] > div {
      margin-bottom: 24px;
    }

    /* ═══════════════════════════════════════════
       34. FOCUS RINGS (Accessibility)
       ═══════════════════════════════════════════ */
    *:focus-visible {
      outline: 2px solid var(--jmc-blue) !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 4px var(--jmc-blue-glow) !important;
    }

    /* ═══════════════════════════════════════════
       35. TRANSACTION FIELD TOGGLE
       ═══════════════════════════════════════════ */
    .jmc-field-toggle {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600;
      color: var(--jmc-text-dim); background: var(--jmc-bg);
      border: 1px solid var(--jmc-border-light);
      cursor: pointer; transition: all 0.2s ease;
      margin-top: 6px;
    }
    .jmc-field-toggle:hover {
      color: var(--jmc-blue); border-color: var(--jmc-blue);
      background: rgba(0, 51, 102, 0.04);
    }
    .jmc-field-collapsed {
      display: none !important;
    }

    /* ═══════════════════════════════════════════
       29. DASHBOARD — Premium Redesign
       ═══════════════════════════════════════════ */
    .dashboard-active main {
      display: block !important;
      width: 100% !important;
      position: relative !important;
    }
    .dashboard-active main > *:not(#custom-jmc-dashboard) {
      display: none !important;
    }
    #custom-jmc-dashboard {
      display: block !important;
      width: 100% !important;
    }

    #custom-jmc-dashboard {
      padding: 0;
      margin: 0;
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      border: none;
      animation: fadeIn 0.5s var(--jmc-ease-out) forwards;
      position: relative; z-index: 10;
    }

    /* ── Hero Welcome Banner ── */
    .jmc-dash-hero {
      background: var(--jmc-gradient-hero);
      background-size: 200% 200%;
      animation: gradientFlow 12s ease infinite;
      padding: 40px 44px;
      border-radius: var(--jmc-radius-xl);
      margin: 28px 40px 0;
      position: relative;
      overflow: hidden;
      box-shadow: var(--jmc-shadow-md), 0 4px 20px rgba(0, 51, 102, 0.15);
    }
    .jmc-dash-hero::before {
      content: '';
      position: absolute;
      top: -50%; right: -20%;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }
    .jmc-dash-hero::after {
      content: '';
      position: absolute;
      bottom: -30%; left: -10%;
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(255, 102, 0, 0.08) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .jmc-dash-header {
      margin-bottom: 0;
      display: flex; justify-content: space-between; align-items: flex-start;
      position: relative; z-index: 1;
    }
    .jmc-dash-header h1 {
      font-size: 28px; font-weight: 800;
      color: #ffffff; margin: 0;
      letter-spacing: -0.02em;
      text-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .jmc-dash-header p {
      color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 6px;
      font-weight: 500;
    }
    .jmc-dash-header-actions {
      display: flex; align-items: center; gap: 10px;
    }

    .custom-badge {
      padding: 8px 16px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      color: #fff; border-radius: 24px;
      font-weight: 600; font-size: 12px;
      display: flex; align-items: center; gap: 8px;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .custom-badge::before {
      content: ''; display: block;
      width: 7px; height: 7px;
      background: #34d399; border-radius: 50%;
      box-shadow: 0 0 10px #34d399;
      animation: subtleBounce 2s ease infinite;
    }

    /* ── Quick Actions Row ── */
    .jmc-quick-actions {
      display: flex; gap: 10px; flex-wrap: wrap;
      margin: 24px 40px;
      padding: 0;
    }
    .jmc-qa-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px;
      border-radius: var(--jmc-radius);
      font-size: 13px; font-weight: 600;
      text-decoration: none !important;
      transition: all 0.25s var(--jmc-ease);
      cursor: pointer; border: none;
      letter-spacing: 0.01em;
    }
    .jmc-qa-btn.primary {
      background: var(--jmc-gradient-primary); color: #fff;
      box-shadow: var(--jmc-shadow-blue);
    }
    .jmc-qa-btn.primary:hover {
      background: linear-gradient(135deg, #004080 0%, #0059b3 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,51,102,0.3);
    }
    .jmc-qa-btn.outline {
      background: var(--jmc-surface);
      color: var(--jmc-text-secondary);
      border: 1px solid var(--jmc-border);
      box-shadow: var(--jmc-shadow-xs);
    }
    .jmc-qa-btn.outline:hover {
      background: var(--jmc-bg-elevated);
      border-color: var(--jmc-blue);
      color: var(--jmc-blue);
      transform: translateY(-2px);
      box-shadow: var(--jmc-shadow-sm);
    }

    /* ── Stats Grid ── */
    .jmc-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 14px; margin: 0 40px 28px;
    }
    .jmc-stat-card {
      background: var(--jmc-surface);
      border: 1px solid var(--jmc-border-light);
      border-radius: var(--jmc-radius); padding: 20px;
      display: flex; flex-direction: column; gap: 4px;
      transition: all 0.3s var(--jmc-ease);
      position: relative;
      overflow: hidden;
      box-shadow: var(--jmc-shadow-xs);
    }
    .jmc-stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--jmc-blue), rgba(0,51,102,0.3));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .jmc-stat-card:hover::before {
      opacity: 1;
    }
    .jmc-stat-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--jmc-shadow-md);
      border-color: var(--jmc-border);
    }
    .jmc-stat-card h4 {
      margin: 0; color: var(--jmc-text-dim);
      font-size: 10.5px; text-transform: uppercase;
      letter-spacing: 0.08em; font-weight: 700;
    }
    .jmc-stat-card .val {
      font-size: 26px; font-weight: 800;
      color: var(--jmc-text-primary);
      letter-spacing: -0.02em;
      animation: counterUp 0.6s var(--jmc-ease-out);
    }
    .jmc-stat-card .trend { font-size: 11px; color: var(--jmc-emerald); font-weight: 600; }

    /* ── Section Headers ── */
    .jmc-section-header {
      display: flex; align-items: center; justify-content: space-between;
      margin: 32px 40px 16px;
    }
    .jmc-section-header h2 {
      margin: 0; font-size: 15px; font-weight: 700;
      color: var(--jmc-text-primary);
      letter-spacing: -0.01em;
      display: flex; align-items: center; gap: 10px;
    }
    .jmc-section-header h2::after {
      content: '';
      flex: 1; height: 1px;
      background: linear-gradient(90deg, var(--jmc-border), transparent);
      margin-left: 12px;
      min-width: 40px;
    }
    .jmc-section-header span {
      font-size: 11px; color: var(--jmc-text-dim);
      font-weight: 500;
      padding: 4px 10px;
      background: var(--jmc-bg-elevated);
      border-radius: 20px;
      border: 1px solid var(--jmc-border-light);
    }

    /* ── Widget Grid ── */
    .jmc-dash-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
      margin: 0 40px;
    }

    .jmc-widget-card {
      text-decoration: none !important;
      background: var(--jmc-surface);
      border-radius: var(--jmc-radius); padding: 22px;
      display: flex; flex-direction: column; gap: 10px;
      border: 1px solid var(--jmc-border-light);
      transition: all 0.3s var(--jmc-ease);
      position: relative; overflow: hidden; cursor: pointer;
      box-shadow: var(--jmc-shadow-xs);
    }
    .jmc-widget-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
      background: var(--jmc-gradient-primary);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .jmc-widget-card:hover::before {
      opacity: 1;
    }
    .jmc-widget-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--jmc-shadow-md);
      border-color: var(--jmc-border);
    }

    .jmc-widget-icon {
      width: 44px; height: 44px; border-radius: var(--jmc-radius);
      display: flex; justify-content: center; align-items: center;
      font-size: 20px; margin-bottom: 2px;
      transition: all 0.3s var(--jmc-ease);
    }
    .jmc-widget-card:hover .jmc-widget-icon {
      transform: scale(1.08);
    }
    .jmc-widget-card h3 {
      margin: 0; font-size: 13px; font-weight: 700;
      letter-spacing: -0.01em;
    }
    .jmc-widget-card p {
      margin: 0; font-size: 11.5px; color: var(--jmc-text-dim);
      line-height: 1.45;
    }

    /* Card color classes — with hover glow */
    .jmc-widget-card.blue .jmc-widget-icon { background: #eef2ff; color: #4338ca; }
    .jmc-widget-card.blue h3 { color: #3730a3; }
    .jmc-widget-card.blue:hover { box-shadow: var(--jmc-shadow-md), 0 4px 16px rgba(67, 56, 202, 0.1); }
    .jmc-widget-card.blue:hover::before { background: linear-gradient(90deg, #4338ca, #6366f1); }

    .jmc-widget-card.orange .jmc-widget-icon { background: #fff7ed; color: #ea580c; }
    .jmc-widget-card.orange h3 { color: #c2410c; }
    .jmc-widget-card.orange:hover { box-shadow: var(--jmc-shadow-md), 0 4px 16px rgba(234, 88, 12, 0.1); }
    .jmc-widget-card.orange:hover::before { background: linear-gradient(90deg, #ea580c, #f97316); }

    .jmc-widget-card.green .jmc-widget-icon { background: #f0fdf4; color: #16a34a; }
    .jmc-widget-card.green h3 { color: #15803d; }
    .jmc-widget-card.green:hover { box-shadow: var(--jmc-shadow-md), 0 4px 16px rgba(22, 163, 74, 0.1); }
    .jmc-widget-card.green:hover::before { background: linear-gradient(90deg, #16a34a, #22c55e); }

    .jmc-widget-card.purple .jmc-widget-icon { background: #faf5ff; color: #9333ea; }
    .jmc-widget-card.purple h3 { color: #7e22ce; }
    .jmc-widget-card.purple:hover { box-shadow: var(--jmc-shadow-md), 0 4px 16px rgba(147, 51, 234, 0.1); }
    .jmc-widget-card.purple:hover::before { background: linear-gradient(90deg, #9333ea, #a855f7); }

    .jmc-widget-card.gray .jmc-widget-icon { background: #f1f5f9; color: #475569; }
    .jmc-widget-card.gray h3 { color: #475569; }

    .jmc-widget-card.red .jmc-widget-icon { background: #fef2f2; color: #dc2626; }
    .jmc-widget-card.red h3 { color: #b91c1c; }
    .jmc-widget-card.red:hover { box-shadow: var(--jmc-shadow-md), 0 4px 16px rgba(220, 38, 38, 0.1); }
    .jmc-widget-card.red:hover::before { background: linear-gradient(90deg, #dc2626, #ef4444); }

    .jmc-widget-card.teal .jmc-widget-icon { background: #f0fdfa; color: #0d9488; }
    .jmc-widget-card.teal h3 { color: #0f766e; }
    .jmc-widget-card.teal:hover { box-shadow: var(--jmc-shadow-md), 0 4px 16px rgba(13, 148, 136, 0.1); }
    .jmc-widget-card.teal:hover::before { background: linear-gradient(90deg, #0d9488, #14b8a6); }

    .jmc-widget-card.sky .jmc-widget-icon { background: #f0f9ff; color: #0284c7; }
    .jmc-widget-card.sky h3 { color: #0369a1; }
    .jmc-widget-card.sky:hover { box-shadow: var(--jmc-shadow-md), 0 4px 16px rgba(2, 132, 199, 0.1); }
    .jmc-widget-card.sky:hover::before { background: linear-gradient(90deg, #0284c7, #0ea5e9); }

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

    /* ── Modal Actions ── */
    .jmc-action-field {
      display: flex; flex-direction: column; gap: 6px;
      margin-bottom: 12px;
    }
    .jmc-action-label {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--jmc-text-dim);
    }
    .jmc-action-input {
      border: 1px solid var(--jmc-border);
      border-radius: 8px; padding: 8px 10px;
      font-size: 13px; color: var(--jmc-text-primary);
      background: #fff; outline: none;
    }
    .jmc-action-input:focus {
      border-color: var(--jmc-blue);
      box-shadow: 0 0 0 2px rgba(0,51,102,0.12);
    }
    .jmc-action-row {
      display: flex; gap: 8px; flex-wrap: wrap;
      margin-top: 6px;
    }
    .jmc-action-result {
      margin-top: 12px; padding: 12px;
      border-radius: 10px; background: var(--jmc-bg);
      border: 1px solid var(--jmc-border-light);
      font-size: 12px; color: var(--jmc-text-secondary);
      white-space: pre-wrap; min-height: 24px;
    }

    /* ── Activity Feed — Timeline Style ── */
    .jmc-activity-panel {
      margin: 28px 40px 40px; padding: 24px;
      background: var(--jmc-surface);
      border: 1px solid var(--jmc-border-light);
      border-radius: var(--jmc-radius);
      box-shadow: var(--jmc-shadow-xs);
    }
    .jmc-activity-item {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 14px 0;
      border-bottom: 1px solid var(--jmc-border-light);
      position: relative;
    }
    .jmc-activity-item:last-child { border-bottom: none; }
    .jmc-activity-dot {
      width: 10px; height: 10px; border-radius: 50%;
      margin-top: 4px; flex-shrink: 0;
      box-shadow: 0 0 0 3px rgba(255,255,255,1), 0 0 0 4px var(--jmc-border-light);
      position: relative; z-index: 1;
    }
    .jmc-activity-item:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 4px; top: 28px; bottom: -2px;
      width: 2px;
      background: var(--jmc-border-light);
    }
    .jmc-activity-item .act-text {
      font-size: 13px; color: var(--jmc-text-secondary);
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

    /* ═══════════════════════════════════════════
       31. RESILIENT CONTENT MANAGER REFRESH CONTROLS
       ═══════════════════════════════════════════ */
    #jmc-admin-refresh-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 99999;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      color: #475569;
      font-size: 18px;
      font-weight: bold;
      backdrop-filter: blur(8px);
    }
    #jmc-admin-refresh-button:hover {
      transform: rotate(180deg) scale(1.05);
      background: #f8fafc;
      border-color: #3b82f6;
      color: #3b82f6;
      box-shadow: 0 6px 16px rgba(59,130,246,0.16);
    }
    #jmc-admin-refresh-button:active {
      transform: rotate(180deg) scale(0.95);
    }

    #jmc-empty-refresh-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 500px;
      padding: 40px;
      background: rgba(248, 250, 252, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 16px;
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .jmc-empty-refresh-content {
      text-align: center;
      max-width: 440px;
      background: rgba(255, 255, 255, 0.85);
      padding: 40px 32px;
      border-radius: 24px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.02);
      transition: all 0.3s ease;
    }
    .jmc-empty-refresh-content:hover {
      transform: translateY(-4px);
      box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.02);
      border-color: rgba(59, 130, 246, 0.3);
    }
    .jmc-empty-icon {
      font-size: 42px;
      color: #3b82f6;
      margin-bottom: 20px;
      animation: spinSlow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      display: inline-block;
      text-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
    }
    .jmc-empty-refresh-content h3 {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 10px 0;
      letter-spacing: -0.01em;
    }
    .jmc-empty-refresh-content p {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 13px;
      color: #475569;
      line-height: 1.6;
      margin: 0 0 24px 0;
    }
    .jmc-refresh-btn-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
      width: 100%;
    }
    .jmc-refresh-large-btn {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: #ffffff;
      border: none;
      padding: 12px 28px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      max-width: 280px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
      letter-spacing: 0.01em;
    }
    .jmc-refresh-large-btn:hover {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
    }
    .jmc-refresh-large-btn:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
    }
    .jmc-refresh-secondary-btn {
      background: transparent;
      color: #64748b;
      border: 1px solid #e2e8f0;
      padding: 10px 24px;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      max-width: 280px;
      transition: all 0.2s;
    }
    .jmc-refresh-secondary-btn:hover {
      background: #f8fafc;
      color: #334155;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }
    .jmc-refresh-secondary-btn:active {
      transform: translateY(0);
    }

    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* ═══════════════════════════════════════════
       36. CONTENT MANAGER — ADVANCED POLISH
       ═══════════════════════════════════════════ */
    
    /* ── Content Manager Tables & Cells ── */
    [class*="DynamicTable"] th, [class*="DynamicTable"] td {
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      max-width: 250px !important;
    }
    /* Hover Row Animation & Left Border Accent */
    [class*="DynamicTable"] tbody tr {
      border-left: 3px solid transparent !important;
      transition: all 0.2s ease !important;
    }
    [class*="DynamicTable"] tbody tr:hover {
      border-left: 3px solid var(--jmc-blue) !important;
      transform: translateX(1px) !important;
    }
    
    /* ── Search & Filter Controls ── */
    [class*="SearchInput"] input, [class*="SearchInput"] [class*="Input"] {
      border-radius: var(--jmc-radius-sm) !important;
      padding: 10px 14px 10px 38px !important;
      font-size: 13.5px !important;
      background: var(--jmc-surface) !important;
      border: 1.5px solid var(--jmc-border) !important;
      transition: all 0.25s var(--jmc-ease) !important;
      width: 100% !important;
      max-width: 380px !important;
    }
    [class*="SearchInput"] input:focus, [class*="SearchInput"] [class*="Input"]:focus-within {
      border-color: var(--jmc-blue) !important;
      box-shadow: 0 0 0 3px var(--jmc-blue-glow), var(--jmc-shadow-sm) !important;
      max-width: 420px !important;
    }
    /* Filter Badges & Close Buttons */
    [class*="FilterBadge"] {
      background: rgba(0, 51, 102, 0.05) !important;
      color: var(--jmc-blue) !important;
      border: 1px solid rgba(0, 51, 102, 0.1) !important;
      border-radius: var(--jmc-radius-xs) !important;
      font-weight: 600 !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      padding: 4px 10px !important;
      transition: all 0.2s ease !important;
    }
    [class*="FilterBadge"]:hover {
      background: rgba(0, 51, 102, 0.08) !important;
    }

    /* ── Edit Form Layout Max-Widths & Visual Hierarchy ── */
    [class*="EditViewColumn"] form {
      max-width: 100% !important;
    }
    [class*="EditViewColumn"] input:not([type="checkbox"]):not([type="radio"]),
    [class*="EditViewColumn"] select {
      max-width: 680px !important;
      width: 100% !important;
    }
    [class*="EditViewColumn"] [class*="FieldWrapper"] {
      margin-bottom: 24px !important;
    }
    [class*="EditViewColumn"] [class*="Label"] {
      font-size: 13.5px !important;
      margin-bottom: 8px !important;
      color: var(--jmc-navy) !important;
      font-weight: 700 !important;
    }
    
    /* ── Component Pickers & Dynamic Zones ── */
    [class*="ComponentPicker"], [class*="DynamicZone"] {
      border: 2px dashed var(--jmc-border) !important;
      background: #f8fafc !important;
      border-radius: var(--jmc-radius) !important;
      padding: 24px !important;
      transition: all 0.25s var(--jmc-ease) !important;
    }
    [class*="ComponentPicker"]:hover, [class*="DynamicZone"]:hover {
      border-color: var(--jmc-blue) !important;
      background: rgba(0, 51, 102, 0.02) !important;
    }
    [class*="ComponentPicker"] button, [class*="DynamicZone"] button[class*="Add"] {
      border-radius: var(--jmc-radius-sm) !important;
      font-weight: 600 !important;
      transition: all 0.2s ease !important;
    }
    
    /* ── Sticky Save & Publish Footer Action Bar ── */
    [class*="StickyContainer"], [class*="sticky-bar"] {
      position: sticky !important;
      bottom: 0 !important;
      z-index: 100 !important;
      background: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(12px) saturate(160%) !important;
      -webkit-backdrop-filter: blur(12px) saturate(160%) !important;
      border-top: 1px solid var(--jmc-border-light) !important;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04) !important;
      padding: 16px 32px !important;
      display: flex !important;
      justify-content: flex-end !important;
      gap: 12px !important;
    }

    /* ── Premium High-Fidelity Empty States ── */
    [class*="EmptyBody"], [class*="NoContent"], .jmc-empty-state {
      background: var(--jmc-surface) !important;
      border: 1.5px dashed var(--jmc-border) !important;
      border-radius: var(--jmc-radius-lg) !important;
      padding: 60px 40px !important;
      text-align: center !important;
      max-width: 580px !important;
      margin: 40px auto !important;
      box-shadow: var(--jmc-shadow-xs) !important;
      animation: modalEntrance 0.4s var(--jmc-ease-out) !important;
    }
    [class*="EmptyBody"] h3, [class*="NoContent"] h2 {
      font-size: 17px !important;
      font-weight: 750 !important;
      color: var(--jmc-navy) !important;
      margin-top: 16px !important;
      margin-bottom: 8px !important;
    }
    [class*="EmptyBody"] p, [class*="NoContent"] p {
      font-size: 13.5px !important;
      color: var(--jmc-text-secondary) !important;
      max-width: 380px !important;
      margin: 0 auto 24px !important;
      line-height: 1.6 !important;
    }

    /* ── Interactive Focus / Outline (Accessibility) ── */
    input:focus-visible, textarea:focus-visible, select:focus-visible, button:focus-visible, a:focus-visible {
      outline: 2.5px solid var(--jmc-blue) !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 4px var(--jmc-blue-glow) !important;
    }

    /* ── Content Manager Responsiveness Overrides ── */
    @media (max-width: 1024px) {
      [class*="EditViewLayout"], [class*="edit-view-layout"] {
        flex-direction: column !important;
        gap: 24px !important;
      }
      [class*="EditViewColumn"], [class*="ContentBox"] {
        width: 100% !important;
        padding: 20px !important;
      }
      [class*="RightSide"], [class*="InformationBoxWrapper"] {
        width: 100% !important;
        border-left: none !important;
        border-top: 1px solid var(--jmc-border-light) !important;
        padding-top: 24px !important;
        background: transparent !important;
      }
    }
    @media (max-width: 640px) {
      [class*="HeaderLayout"] {
        padding: 16px 20px !important;
      }
      [class*="ContentLayout"], [class*="ActionLayout"] {
        padding: 16px 20px !important;
      }
      [class*="StickyContainer"], [class*="sticky-bar"] {
        padding: 12px 20px !important;
        flex-direction: column-reverse !important;
        align-items: stretch !important;
      }
      [class*="StickyContainer"] button, [class*="sticky-bar"] button {
        width: 100% !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Non-blocking font load via <link> preload
  const fontLink = document.createElement("link");
  fontLink.rel = "preload";
  fontLink.as = "style";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
  fontLink.onload = function () {
    this.rel = "stylesheet";
  };
  document.head.appendChild(fontLink);
  // Noscript fallback (built via DOM to avoid Vite import analysis)
  const noscript = document.createElement("noscript");
  const noscriptLink = document.createElement("link");
  noscriptLink.rel = "stylesheet";
  noscriptLink.href = fontLink.href;
  noscript.appendChild(noscriptLink);
  document.head.appendChild(noscript);

  // Theme guard — MutationObserver enforces light mode aggressively
  const forceLight = () => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
    try {
      localStorage.setItem("strapi-theme", "light");
      localStorage.setItem("STRAPI_THEME", "light");
      localStorage.setItem("strapi-admin-theme", "light");
      localStorage.setItem("theme", "light");
    } catch (_) {}
  };
  const themeGuard = new MutationObserver(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme !== "light") forceLight();
  });
  themeGuard.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class", "style"],
  });
  // Periodically enforce + remove theme toggle buttons from DOM
  setInterval(() => {
    forceLight();
    // Actively remove theme toggle buttons
    const toggleSelectors = [
      '[class*="ThemeToggle"]',
      '[class*="themeToggle"]',
      "[data-strapi-theme-toggle]",
      '[aria-label="Change theme"]',
      '[aria-label="Toggle theme"]',
      'button[title*="theme" i]',
    ];
    document.querySelectorAll(toggleSelectors.join(",")).forEach((el) => {
      el.style.display = "none";
      el.style.visibility = "hidden";
      el.setAttribute("aria-hidden", "true");
    });
  }, 2000);

  // Replace "Strapi" text globally (debounced 200ms)
  const replaceStapiText = debounce(() => {
    document.querySelectorAll("span, p, h1, h2, h3, h4").forEach((el) => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        if (el.textContent.includes("Strapi")) {
          el.textContent = el.textContent.replace(/Strapi/g, "JMC Admin");
        }
      }
    });
  }, 200);
  const textObserver = new MutationObserver(replaceStapiText);
  textObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: false,
  });

  /* ── Content Manager Sidebar — DOM-based styling (Strapi v5 uses hashed sc- classes) ── */
  const JMC_SIDEBAR_ID = 'jmc-cm-sidebar-styled';

  const injectSidebarKeyframes = () => {
    if (document.getElementById('jmc-sidebar-kf')) return;
    const kf = document.createElement('style');
    kf.id = 'jmc-sidebar-kf';
    kf.textContent = `
      @keyframes jmcNavIn {
        from { opacity: 0; transform: translateX(-8px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes jmcSidebarFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    `;
    document.head.appendChild(kf);
  };

  const styleLink = (link, isActive, index) => {
    const base = `
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      padding: 9px 14px !important;
      margin: 2px 8px !important;
      border-radius: 10px !important;
      font-size: 13px !important;
      font-weight: ${isActive ? '700' : '500'} !important;
      text-decoration: none !important;
      letter-spacing: 0.01em !important;
      transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease !important;
      border: 1px solid ${isActive ? 'transparent' : 'transparent'} !important;
      cursor: pointer !important;
      min-height: 38px !important;
      position: relative !important;
      overflow: hidden !important;
      animation: jmcNavIn 0.3s cubic-bezier(0.16,1,0.3,1) ${index * 30}ms both !important;
    `;
    if (isActive) {
      link.style.cssText = base + `
        background: linear-gradient(135deg, #003366 0%, #004d99 100%) !important;
        color: #ffffff !important;
        box-shadow: 0 4px 14px rgba(0,51,102,0.28), 0 1px 4px rgba(0,51,102,0.15) !important;
      `;
    } else {
      link.style.cssText = base + `
        background: transparent !important;
        color: #475569 !important;
        box-shadow: none !important;
      `;
      link.addEventListener('mouseenter', () => {
        link.style.background = '#ffffff';
        link.style.color = '#003366';
        link.style.boxShadow = '0 2px 10px rgba(0,51,102,0.08), 0 1px 3px rgba(0,0,0,0.04)';
        link.style.border = '1px solid #e0e7f0';
        link.style.transform = 'translateX(3px)';
      }, { passive: true });
      link.addEventListener('mouseleave', () => {
        link.style.background = 'transparent';
        link.style.color = '#475569';
        link.style.boxShadow = 'none';
        link.style.border = '1px solid transparent';
        link.style.transform = 'translateX(0)';
      }, { passive: true });
    }
  };

  const enhanceSidebar = debounce(() => {
    // Directly target Content Manager or Settings sub-navigation sidebars
    const sidebar = document.querySelector('nav[aria-label="Content Manager"], nav[aria-label="Settings"]');
    if (!sidebar) return;

    // Don't re-process if already done
    if (sidebar.dataset.jmcSb === '1') return;
    sidebar.dataset.jmcSb = '1';

    injectSidebarKeyframes();

    // Style the sidebar container itself
    sidebar.style.cssText = `
      background: #f7f8fc !important;
      border-right: 1px solid #e2e8f0 !important;
      min-width: 244px !important;
      max-width: 244px !important;
      padding: 0 !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      scrollbar-width: thin !important;
      box-shadow: 2px 0 16px rgba(0,0,0,0.05) !important;
      display: flex !important;
      flex-direction: column !important;
      animation: jmcSidebarFadeIn 0.4s ease both !important;
    `;

    // Style all collection-type / single-type links
    const cmLinks = Array.from(sidebar.querySelectorAll('a[href*="content-manager"]'));
    cmLinks.forEach((link, i) => {
      const isActive = link.getAttribute('aria-current') === 'page'
        || link.classList.contains('active')
        || window.location.href.includes(link.getAttribute('href') || '___');
      styleLink(link, isActive, i);
    });

    // Style section header labels (COLLECTION TYPES / SINGLE TYPES)
    // These are typically <p> or <span> tags containing those words
    sidebar.querySelectorAll('p, span, div').forEach(el => {
      const txt = (el.textContent || '').trim().toUpperCase();
      if ((txt === 'COLLECTION TYPES' || txt === 'SINGLE TYPES') && el.children.length === 0) {
        el.style.cssText = `
          font-size: 9px !important;
          font-weight: 800 !important;
          letter-spacing: 0.14em !important;
          color: #94a3b8 !important;
          text-transform: uppercase !important;
          padding: 16px 16px 5px 16px !important;
          margin: 0 !important;
          display: block !important;
        `;
      }
    });

    // Style the top header area (first child that isn't a link list)
    const firstChild = sidebar.firstElementChild;
    if (firstChild && !firstChild.querySelector('a[href*="content-manager"]')) {
      firstChild.style.cssText = `
        position: sticky !important;
        top: 0 !important;
        z-index: 10 !important;
        background: rgba(255,255,255,0.95) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid #e8ecf3 !important;
        padding: 14px 14px 12px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
      `;
      // Style any h2/h3/title within it
      firstChild.querySelectorAll('h1,h2,h3,h4,span,p').forEach(el => {
        if (el.children.length === 0 && el.textContent.trim().length > 0) {
          el.style.fontSize = '11px';
          el.style.fontWeight = '800';
          el.style.letterSpacing = '0.08em';
          el.style.color = '#003366';
          el.style.textTransform = 'uppercase';
        }
      });
      // Style search input if present
      firstChild.querySelectorAll('input').forEach(inp => {
        inp.style.cssText = `
          border-radius: 10px !important;
          background: #f0f2f8 !important;
          border: 1.5px solid transparent !important;
          padding: 8px 12px !important;
          font-size: 12.5px !important;
          width: 100% !important;
          color: #0f172a !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
        `;
        inp.addEventListener('focus', () => {
          inp.style.background = '#fff';
          inp.style.borderColor = '#003366';
          inp.style.boxShadow = '0 0 0 3px rgba(0,51,102,0.1)';
        }, { passive: true });
        inp.addEventListener('blur', () => {
          inp.style.background = '#f0f2f8';
          inp.style.borderColor = 'transparent';
          inp.style.boxShadow = 'none';
        }, { passive: true });
      });
    }

    // Inject branded footer at bottom of sidebar
    if (!document.getElementById('jmc-subnav-footer')) {
      const footer = document.createElement('div');
      footer.id = 'jmc-subnav-footer';
      footer.style.cssText = `
        margin-top: auto;
        padding: 14px 16px 18px;
        border-top: 1px solid #e8ecf3;
        display: flex;
        align-items: center;
        gap: 10px;
        background: #f7f8fc;
        flex-shrink: 0;
      `;
      footer.innerHTML = `
        <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#003366,#004d99);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div style="min-width:0;">
          <div style="font-size:11px;font-weight:700;color:#0f172a;letter-spacing:-0.01em;">JMC Content Hub</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:1px;">Jammu Municipal Corp.</div>
        </div>
      `;
      sidebar.appendChild(footer);
    }
  }, 350);

  // Observe DOM mutations to catch when the sidebar mounts (SPA navigation)
  const subNavObserver = new MutationObserver(enhanceSidebar);
  subNavObserver.observe(document.body, { childList: true, subtree: true });
  enhanceSidebar();

  // Re-apply on route change (hash or pushState)
  window.addEventListener('popstate', enhanceSidebar);
  const origPush = history.pushState.bind(history);
  history.pushState = (...args) => { origPush(...args); setTimeout(enhanceSidebar, 300); };
};

/* ═══════════════════════════════════════════════════════════
   Login Page Visual Enhancements — JS DOM approach
   ─────────────────────────────────────────────────────────
   Uses direct DOM manipulation instead of CSS selectors
   because Strapi uses dynamic hashed class names.
   ═══════════════════════════════════════════════════════════ */
const injectLoginPageEnhancements = () => {
  if (typeof document === "undefined") return;

  let styled = false;

  const applyLoginStyles = () => {
    const isLogin =
      window.location.pathname.includes("/admin/auth/login") ||
      window.location.pathname.includes("/admin/auth/");
    if (!isLogin) {
      styled = false;
      return;
    }

    const form = document.querySelector("form");
    if (!form || styled) return;
    styled = true;

    // ── 1. Hide locale / language selector ──────────────────
    // It's typically a <select> or a div with role="combobox" at the top-right.
    // Walk up the DOM from it and hide the entire top bar.
    const selects = document.querySelectorAll('select, [role="combobox"]');
    selects.forEach((sel) => {
      // Check if this is the locale selector (contains 'English' or similar)
      const text = sel.textContent || sel.value || "";
      if (
        text.match(/english|français|deutsch|locale|español|हिन्दी/i) ||
        sel.closest('[aria-label*="locale"]')
      ) {
        // Hide the entire header row containing it
        let parent = sel.parentElement;
        for (let i = 0; i < 5 && parent; i++) {
          if (parent.tagName === "HEADER" || parent.tagName === "NAV") {
            parent.classList.add("jmc-locale-hidden");
            break;
          }
          // If parent has only this child (or very few), keep going up
          if (parent.children.length <= 2) {
            parent = parent.parentElement;
          } else {
            // Just hide the select container
            sel.closest("div")?.classList.add("jmc-locale-hidden");
            break;
          }
        }
      }
    });

    // Also try the Strapi v5 approach: find any element that says "English" in the top area
    const allDivs = document.querySelectorAll("#app > div > div > div");
    allDivs.forEach((div) => {
      const txt = div.textContent?.trim();
      if (txt === "English" || txt?.match(/^(English|Français|Deutsch)\s*$/)) {
        let container = div;
        for (let i = 0; i < 4 && container.parentElement; i++) {
          container = container.parentElement;
          // If we find a container that's positioned at the top, hide it
          const rect = container.getBoundingClientRect();
          if (rect.height < 80 && rect.top < 100 && rect.width > 200) {
            container.classList.add("jmc-locale-hidden");
            break;
          }
        }
      }
    });

    // ── 2. Style the outermost wrapper (animated gradient background) ────
    const appRoot = document.querySelector("#app > div");
    if (appRoot) {
      appRoot.style.cssText = `
        background: linear-gradient(135deg, #0a1628 0%, #0f2040 25%, #1a3a5c 50%, #0c1a30 75%, #0a1628 100%) !important;
        background-size: 400% 400% !important;
        animation: gradientFlow 15s ease infinite !important;
        min-height: 100vh !important;
        position: relative !important;
      `;
      // Add floating blob shapes
      if (!document.getElementById('jmc-login-blobs')) {
        const blobs = document.createElement('div');
        blobs.id = 'jmc-login-blobs';
        blobs.style.cssText = 'position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0;';
        blobs.innerHTML = `
          <div style="position:absolute;top:15%;right:10%;width:300px;height:300px;background:radial-gradient(circle,rgba(255,102,0,0.08) 0%,transparent 70%);border-radius:50%;animation:subtleBounce 8s ease infinite;"></div>
          <div style="position:absolute;bottom:20%;left:5%;width:400px;height:400px;background:radial-gradient(circle,rgba(0,102,204,0.06) 0%,transparent 70%);border-radius:50%;animation:subtleBounce 10s ease 2s infinite;"></div>
          <div style="position:absolute;top:60%;right:30%;width:200px;height:200px;background:radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%);border-radius:50%;animation:subtleBounce 6s ease 1s infinite;"></div>
        `;
        appRoot.appendChild(blobs);
      }
    }

    // ── 3. Find the main content area and center it ─────────
    const main = document.querySelector("main");
    if (main) {
      main.style.cssText = `
        background: transparent !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 100vh !important;
        padding: 40px 20px !important;
        position: relative !important;
        z-index: 1 !important;
      `;
      // The wrapper inside main (holds logo column + form column)
      const mainChild = main.children[0];
      if (mainChild) {
        mainChild.style.cssText = `
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          width: 100% !important;
          max-width: 420px !important;
          gap: 0 !important;
          padding: 0 !important;
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border-radius: 20px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.1) !important;
          border: 1px solid rgba(255,255,255,0.3) !important;
          overflow: hidden !important;
          animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        `;
      }
    }

    // ── 4. Style the logo/branding section ──────────────────
    // The logo + title are usually in the first child div before the form
    const logo = document.querySelector("main img");
    if (logo) {
      const brandingContainer = logo.closest("div");
      if (brandingContainer && brandingContainer !== main) {
        brandingContainer.style.cssText = `
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          padding: 36px 32px 0 !important;
          width: 100% !important;
          box-sizing: border-box !important;
        `;
      }
      logo.style.cssText = `
        max-height: 60px !important;
        object-fit: contain !important;
        margin-bottom: 12px !important;
      `;
    }

    // ── 5. Style the title ──────────────────────────────────
    const h1 = document.querySelector("main h1");
    if (h1) {
      h1.style.cssText = `
        font-size: 22px !important;
        font-weight: 700 !important;
        color: #111827 !important;
        margin: 0 0 4px !important;
        text-align: center !important;
      `;
    }

    // ── 6. Style the subtitle ───────────────────────────────
    const subtitle = document.querySelector("main h1 + p, main h1 ~ p");
    if (subtitle) {
      subtitle.style.cssText = `
        font-size: 13px !important;
        color: #6b7280 !important;
        margin: 0 0 20px !important;
        text-align: center !important;
      `;
    }

    // ── 7. Style the form ───────────────────────────────────
    form.style.cssText = `
      width: 100% !important;
      padding: 20px 32px 32px !important;
      box-sizing: border-box !important;
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
    `;

    // ── 8. Style inputs ─────────────────────────────────────
    form
      .querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"]',
      )
      .forEach((input) => {
        input.style.cssText = `
        border-radius: 8px !important;
        padding: 11px 14px !important;
        font-size: 14px !important;
        border: 1px solid #d1d5db !important;
        background: #fafafa !important;
        color: #111827 !important;
        width: 100% !important;
        box-sizing: border-box !important;
        transition: border-color 0.2s, box-shadow 0.2s !important;
      `;
        input.addEventListener("focus", () => {
          input.style.borderColor = "#003366";
          input.style.boxShadow = "0 0 0 3px rgba(0,51,102,0.06)";
          input.style.background = "#fff";
        });
        input.addEventListener("blur", () => {
          input.style.borderColor = "#d1d5db";
          input.style.boxShadow = "none";
          input.style.background = "#fafafa";
        });
      });

    // ── 9. Style the submit button ──────────────────────────
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.style.cssText = `
        border-radius: 8px !important;
        padding: 12px 16px !important;
        font-weight: 600 !important;
        font-size: 14px !important;
        background: #003366 !important;
        color: #ffffff !important;
        border: none !important;
        box-shadow: none !important;
        cursor: pointer !important;
        width: 100% !important;
        margin-top: 8px !important;
        transition: background 0.2s !important;
      `;
      submitBtn.addEventListener("mouseenter", () => {
        submitBtn.style.background = "#002244";
      });
      submitBtn.addEventListener("mouseleave", () => {
        submitBtn.style.background = "#003366";
      });
    }

    // ── 10. Style labels ────────────────────────────────────
    form.querySelectorAll("label").forEach((label) => {
      label.style.cssText = `
        font-size: 12px !important;
        font-weight: 600 !important;
        color: #374151 !important;
      `;
    });

    form.classList.add("jmc-login-styled");
  };

  // Run immediately and re-check periodically (SPA navigation)
  applyLoginStyles();
  const loginObserver = new MutationObserver(
    debounce(() => applyLoginStyles(), 250),
  );
  loginObserver.observe(document.body, { childList: true, subtree: true });
};

/* ═══════════════════════════════════════════════════════════
   hCaptcha Login Protection
   ─────────────────────────────────────────────────────────
   Injects hCaptcha widget on Strapi admin login page.
   Intercepts the login API call to include the captcha token.
   ═══════════════════════════════════════════════════════════ */
const injectHCaptchaOnLogin = () => {
  if (typeof document === "undefined") return;

  // hCaptcha Site Key (public — safe for frontend)
  const SITE_KEY = "d932c48a-f38a-48f0-8982-b32a793c653a";

  // Inject captcha CSS
  const captchaStyle = document.createElement("style");
  captchaStyle.textContent = `
    .jmc-hcaptcha-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 24px 0 16px;
      padding: 16px;
      border-radius: 8px;
      background: #f8f9fb;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }
    .jmc-hcaptcha-wrapper:hover {
      border-color: #d1d5db;
    }
    .jmc-captcha-label {
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .jmc-captcha-error {
      color: #dc2626;
      font-size: 12px;
      font-weight: 500;
      margin-top: 8px;
      text-align: center;
      display: none;
    }
    .jmc-captcha-error.visible {
      display: block;
    }
    .jmc-captcha-loading {
      font-size: 12px;
      color: #6b7280;
      padding: 16px;
      text-align: center;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(captchaStyle);

  let hcaptchaToken = null;
  let injected = false;
  let widgetId = null;

  // Listen for hCaptcha token via the global callback
  window.jmcHCaptchaCallback = (token) => {
    hcaptchaToken = token;
    console.log("[hCaptcha] Token received");
    const errEl = document.getElementById("jmc-captcha-error");
    if (errEl) errEl.classList.remove("visible");
  };
  window.jmcHCaptchaExpired = () => {
    hcaptchaToken = null;
    console.warn("[hCaptcha] Token expired");
  };
  window.jmcHCaptchaError = () => {
    hcaptchaToken = null;
    console.error("[hCaptcha] Error");
  };

  // Intercept fetch to inject hCaptcha token into login requests
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    const [url, options] = args;
    const urlStr = typeof url === "string" ? url : url?.url || "";

    if (
      urlStr.includes("/admin/login") &&
      options?.method?.toUpperCase() === "POST"
    ) {
      try {
        const body =
          typeof options.body === "string"
            ? JSON.parse(options.body)
            : options.body;
        if (body && typeof body === "object") {
          body.hcaptchaToken = hcaptchaToken || "";
          options.body = JSON.stringify(body);
        }
      } catch (e) {
        console.warn("[hCaptcha] Could not inject token:", e);
      }
    }

    return originalFetch.apply(this, [url, options]);
  };

  // Load hCaptcha SDK with explicit render mode
  const loadHCaptchaSDK = () => {
    return new Promise((resolve) => {
      if (window.hcaptcha) {
        resolve();
        return;
      }
      if (document.querySelector('script[src*="hcaptcha.com"]')) {
        // Script tag exists but SDK not ready yet — wait for it
        const check = setInterval(() => {
          if (window.hcaptcha) {
            clearInterval(check);
            resolve();
          }
        }, 200);
        // Timeout after 15s
        setTimeout(() => {
          clearInterval(check);
          resolve();
        }, 15000);
        return;
      }
      const script = document.createElement("script");
      // Use explicit render mode so auto-render doesn't fire before our div exists
      script.src =
        "https://js.hcaptcha.com/1/api.js?render=explicit&onload=jmcHCaptchaOnLoad";
      script.async = true;
      script.defer = true;

      window.jmcHCaptchaOnLoad = () => {
        console.log("[hCaptcha] SDK loaded (explicit mode)");
        resolve();
      };

      script.onerror = () => {
        console.error("[hCaptcha] Failed to load SDK script");
        resolve(); // Resolve anyway so login still works
      };

      document.head.appendChild(script);
      console.log("[hCaptcha] SDK script injected (explicit render mode)");
    });
  };

  // Explicitly render the hCaptcha widget
  const renderWidget = (container) => {
    if (!window.hcaptcha || !container) return;
    // Remove any previous content
    container.innerHTML = "";
    try {
      widgetId = window.hcaptcha.render(container, {
        sitekey: SITE_KEY,
        callback: "jmcHCaptchaCallback",
        "expired-callback": "jmcHCaptchaExpired",
        "error-callback": "jmcHCaptchaError",
        theme: "light",
      });
      console.log("[hCaptcha] Widget rendered, widgetId:", widgetId);
    } catch (err) {
      console.error("[hCaptcha] Render error:", err);
    }
  };

  // Poll for the login button and inject the widget
  const tryInject = async () => {
    const isLoginPage =
      window.location.pathname.includes("/admin/auth/login") ||
      window.location.pathname.includes("/admin/auth/");

    if (!isLoginPage) {
      injected = false;
      hcaptchaToken = null;
      widgetId = null;
      return;
    }

    if (injected) return;

    // Find the Login button by text content
    const allButtons = document.querySelectorAll("button");
    let loginBtn = null;
    for (const btn of allButtons) {
      const text = btn.textContent?.trim();
      if (text === "Login" || text === "Log in" || text === "Sign in") {
        loginBtn = btn;
        break;
      }
    }

    if (!loginBtn) return;

    injected = true;
    console.log("[hCaptcha] Login button found, injecting captcha widget");

    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "jmc-hcaptcha-wrapper";
    wrapper.id = "jmc-hcaptcha-wrapper";

    const label = document.createElement("div");
    label.className = "jmc-captcha-label";
    label.textContent = "Security Verification";

    // Container for explicit render
    const captchaDiv = document.createElement("div");
    captchaDiv.id = "jmc-hcaptcha-container";

    // Show loading state while SDK loads
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "jmc-captcha-loading";
    loadingDiv.textContent = "Loading security check...";
    captchaDiv.appendChild(loadingDiv);

    const errorDiv = document.createElement("div");
    errorDiv.className = "jmc-captcha-error";
    errorDiv.id = "jmc-captcha-error";
    errorDiv.textContent = "Please complete the captcha";

    wrapper.appendChild(label);
    wrapper.appendChild(captchaDiv);
    wrapper.appendChild(errorDiv);

    // Insert the wrapper before the login button
    loginBtn.parentNode.insertBefore(wrapper, loginBtn);

    // Load SDK then explicitly render
    await loadHCaptchaSDK();
    renderWidget(captchaDiv);

    // Validate on login click
    loginBtn.addEventListener(
      "click",
      (e) => {
        if (!hcaptchaToken) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const errEl = document.getElementById("jmc-captcha-error");
          if (errEl) errEl.classList.add("visible");
          wrapper.style.animation = "none";
          wrapper.offsetHeight;
          wrapper.style.animation = "shake 0.4s ease";
        }
      },
      true,
    );
  };

  // Poll every 500ms to detect the login page and inject
  setInterval(tryInject, 500);
};

const injectDashboardWidgets = () => {
  const dashHandler = () => {
    const isHomepage =
      window.location.pathname === "/" ||
      window.location.pathname === "/admin/" ||
      window.location.pathname === "/admin";
    const mainContainer = document.querySelector("main");
    const existingDash = document.getElementById("custom-jmc-dashboard");

    if (isHomepage && mainContainer && !existingDash) {
      // Wait for sidebar nav to be fully rendered before showing dashboard
      const sidebarNav = document.querySelector(
        'nav, [class*="LeftMenu"], [class*="leftMenu"]',
      );
      if (!sidebarNav) return; // Sidebar not ready yet — observer will retry
      document.body.classList.add("dashboard-active");

      const dashboard = document.createElement("div");
      dashboard.id = "custom-jmc-dashboard";

      const now = new Date();
      const greeting =
        now.getHours() < 12
          ? "Good morning"
          : now.getHours() < 17
            ? "Good afternoon"
            : "Good evening";
      const dateStr = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      dashboard.innerHTML = `
        <div class="jmc-dash-hero">
          <div class="jmc-dash-header">
            <div>
              <h1>${greeting}, Administrator</h1>
              <p>${dateStr} — Jammu Municipal Corporation CMS</p>
            </div>
            <div class="jmc-dash-header-actions">
              <div class="custom-badge">System Online</div>
              <div class="custom-badge" id="jmc-live-clock" style="font-variant-numeric:tabular-nums;">${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="jmc-quick-actions">
          <a href="/admin/content-manager/collection-types/api::tender.tender/create" class="jmc-qa-btn primary">➕ New Tender</a>
          <a href="/admin/content-manager/collection-types/api::news-ticker.news-ticker/create" class="jmc-qa-btn primary">➕ News Update</a>
          <a href="/admin/content-manager/collection-types/api::notice.notice/create" class="jmc-qa-btn outline">📄 New Notice</a>
          <a href="/admin/content-manager/collection-types/api::bulletin-board.bulletin-board/create" class="jmc-qa-btn outline">📌 New Bulletin</a>
          <a href="/admin/plugins/upload" class="jmc-qa-btn outline">🖼 Media Library</a>
        </div>

        <!-- Dynamic Stats -->
        <div class="jmc-stats-grid">
          <div class="jmc-stat-card">
            <h4>Portal Visitors</h4>
            <div class="val">...</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Open Tenders</h4>
            <div class="val">...</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Active Notices</h4>
            <div class="val">...</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Officials Listed</h4>
            <div class="val">...</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Councillors</h4>
            <div class="val">...</div>
          </div>
          <div class="jmc-stat-card">
            <h4>Media Files</h4>
            <div class="val">...</div>
          </div>
        </div>

        <!-- Content Management Section -->
        <div class="jmc-section-header">
          <h2>📁 Content Management</h2>
          <span>All content types</span>
        </div>
        <div class="jmc-dash-grid" id="jmc-content-widgets">
          <a href="/admin/content-manager/collection-types/api::tender.tender" class="jmc-widget-card blue">
            <div class="jmc-widget-icon">📄</div>
            <h3>Tenders</h3>
            <p>Manage regular municipal tenders & NIT documents.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::smart-city-tender.smart-city-tender" class="jmc-widget-card sky">
            <div class="jmc-widget-icon">🏗</div>
            <h3>Smart City Tenders</h3>
            <p>Smart city project tender documents & tracking.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::news-ticker.news-ticker" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">📰</div>
            <h3>News Ticker</h3>
            <p>Manage scrolling news updates on the portal.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::notice.notice" class="jmc-widget-card purple">
            <div class="jmc-widget-icon">📌</div>
            <h3>Notices & Circulars</h3>
            <p>Official municipal notices, orders & circulars.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::bulletin-board.bulletin-board" class="jmc-widget-card green">
            <div class="jmc-widget-icon">📋</div>
            <h3>Bulletin Board</h3>
            <p>Homepage announcements & public bulletins.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::official.official" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">👤</div>
            <h3>Officials Directory</h3>
            <p>Who's who — officer profiles & contact info.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::councillor-detail.councillor-detail" class="jmc-widget-card teal">
            <div class="jmc-widget-icon">🏢</div>
            <h3>Councillor Details</h3>
            <p>Ward-wise councillor profiles & information.</p>
          </a>
          <a href="/admin/content-manager/collection-types/api::health.health" class="jmc-widget-card red">
            <div class="jmc-widget-icon">🏥</div>
            <h3>Health Section</h3>
            <p>Health department notices & service updates.</p>
          </a>
        </div>

        <!-- Finance Section -->
        <div class="jmc-section-header">
          <h2>💸 Finance & Payments</h2>
          <span>Gateway Logs</span>
        </div>
        <div class="jmc-dash-grid jmc-content-widgets">
          <a href="/admin/content-manager/collection-types/api::transaction.transaction" class="jmc-widget-card emerald">
            <div class="jmc-widget-icon">₹</div>
            <h3>Transactions</h3>
            <p>Monitor BillDesk payment flow and logs.</p>
          </a>
          <button type="button" id="jmc-verify-payment" class="jmc-widget-card blue">
            <div class="jmc-widget-icon">V</div>
            <h3>Verify Payment</h3>
            <p>Check status by transaction or order ID.</p>
          </button>
          <button type="button" id="jmc-reload-transactions" class="jmc-widget-card gray">
            <div class="jmc-widget-icon">R</div>
            <h3>Reload Transactions</h3>
            <p>Refresh pending payment statuses.</p>
          </button>
        </div>

        <!-- System & Tools Section -->
        <div class="jmc-section-header">
          <h2>⚙️ System & Tools</h2>
          <span>Administration</span>
        </div>
        <div class="jmc-dash-grid" id="jmc-system-widgets">
          <a href="/admin/settings" class="jmc-widget-card gray">
            <div class="jmc-widget-icon">⚙️</div>
            <h3>Admin Settings</h3>
            <p>Roles, permissions, tokens & API config.</p>
          </a>
          <a href="/admin/plugins/upload" class="jmc-widget-card purple">
            <div class="jmc-widget-icon">🖼</div>
            <h3>Media Library</h3>
            <p>Upload & manage images, documents and files.</p>
          </a>
          <a href="/admin/settings/users" class="jmc-widget-card blue">
            <div class="jmc-widget-icon">👥</div>
            <h3>Admin Users</h3>
            <p>Manage CMS administrator accounts & access.</p>
          </a>
          <a href="/admin/settings/api-tokens" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">🔑</div>
            <h3>API Tokens</h3>
            <p>Generate and manage API access tokens.</p>
          </a>
        </div>

        <!-- Recent Activity -->
        <div class="jmc-section-header">
          <h2>📊 Recent Activity</h2>
          <span>Latest Updates</span>
        </div>
        <div class="jmc-activity-panel" id="jmc-activity-list">
          <p style="font-size:12.5px;color:var(--jmc-text-dim);margin:0;padding:10px 0;">Loading recent activity feed...</p>
        </div>
      `;

      const firstChild = mainContainer.firstChild;
      if (firstChild) {
        mainContainer.insertBefore(dashboard, firstChild);
      } else {
        mainContainer.appendChild(dashboard);
      }

      // Fetch dynamic statistics from the DB
      const loadDynamicStats = async () => {
        // Safety guard: if the dashboard is no longer in the DOM, return false to halt polling
        if (!document.getElementById("custom-jmc-dashboard")) return false;

        try {
          const res = await fetch("/api/visitor-count/dashboard-stats");
          if (res.ok) {
            // Re-verify after fetch completed to prevent race conditions during unmounts
            const currentDash = document.getElementById("custom-jmc-dashboard");
            if (!currentDash) return false;

            const stats = await res.json();
            const cards = currentDash.querySelectorAll(".jmc-stat-card .val");
            if (cards && cards.length >= 6) {
              cards[0].textContent = Number(stats.visitors || 0).toLocaleString();
              cards[1].textContent = Number(stats.tenders || 0).toLocaleString();
              cards[2].textContent = Number(stats.notices || 0).toLocaleString();
              cards[3].textContent = Number(stats.officials || 0).toLocaleString();
              cards[4].textContent = Number(stats.councillors || 0).toLocaleString();
              cards[5].textContent = Number(stats.mediaFiles || 0).toLocaleString();
            }

            // Update Recent Activity Panel dynamically
            const activityPanel = currentDash.querySelector("#jmc-activity-list");
            if (activityPanel && stats.recentActivity) {
              activityPanel.innerHTML = stats.recentActivity.map(act => `
                <div class="jmc-activity-item">
                  <div class="jmc-activity-dot" style="background:${act.color}"></div>
                  <div>
                    <div class="act-text">${act.text}</div>
                    <div class="act-time">${act.time}</div>
                  </div>
                </div>
              `).join("");
            }
          }
        } catch (error) {
          console.error("[visitor-count] Error loading dashboard stats:", error);
        }
        return true;
      };

      loadDynamicStats();

      // Live clock update — tick every second
      const clockInterval = setInterval(() => {
        const clockEl = document.getElementById("jmc-live-clock");
        if (!clockEl) { clearInterval(clockInterval); return; }
        clockEl.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }, 1000);

      // Poll every 5 seconds for stats (reduced from 3s for performance)
      const statsPollInterval = setInterval(async () => {
        const active = await loadDynamicStats();
        if (!active) {
          clearInterval(statsPollInterval);
          clearInterval(clockInterval);
        }
      }, 5000);

      const verifyBtn = document.getElementById("jmc-verify-payment");
      if (verifyBtn) {
        verifyBtn.addEventListener("click", () => {
          if (document.getElementById("jmc-verify-modal-overlay")) return;

          const overlay = document.createElement("div");
          overlay.className = "jmc-widget-modal-overlay";
          overlay.id = "jmc-verify-modal-overlay";
          overlay.innerHTML = `
            <div class="jmc-widget-modal">
              <div class="jmc-widget-modal-header">
                <h2>Verify Payment</h2>
                <button id="jmc-verify-close">X</button>
              </div>
              <div class="jmc-widget-modal-body">
                <p style="margin:0 0 16px;font-size:12.5px;color:var(--jmc-text-dim);">Check status by Transaction ID or Order ID.</p>
                <div class="jmc-action-field">
                  <label class="jmc-action-label" for="jmc-verify-transaction">Transaction ID</label>
                  <input id="jmc-verify-transaction" class="jmc-action-input" type="text" placeholder="BillDesk transaction ID" />
                </div>
                <div class="jmc-action-field">
                  <label class="jmc-action-label" for="jmc-verify-order">Order ID (optional)</label>
                  <input id="jmc-verify-order" class="jmc-action-input" type="text" placeholder="Merchant order ID" />
                </div>
                <div class="jmc-action-row">
                  <button id="jmc-verify-submit" class="jmc-qa-btn primary" type="button">Check Status</button>
                  <button id="jmc-verify-reset" class="jmc-qa-btn outline" type="button">Clear</button>
                </div>
                <div id="jmc-verify-result" class="jmc-action-result">Awaiting input.</div>
              </div>
            </div>
          `;
          document.body.appendChild(overlay);

          const close = () => overlay.remove();
          const closeBtn = document.getElementById("jmc-verify-close");
          if (closeBtn) closeBtn.addEventListener("click", close);
          overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close();
          });
          document.addEventListener("keydown", function escHandler(e) {
            if (e.key === "Escape") {
              close();
              document.removeEventListener("keydown", escHandler);
            }
          });

          const txnInput = document.getElementById("jmc-verify-transaction");
          const orderInput = document.getElementById("jmc-verify-order");
          const submitBtn = document.getElementById("jmc-verify-submit");
          const resetBtn = document.getElementById("jmc-verify-reset");
          const resultEl = document.getElementById("jmc-verify-result");

          const setResult = (text) => {
            if (resultEl) resultEl.textContent = text;
          };

          if (submitBtn) {
            submitBtn.addEventListener("click", async () => {
              const transactionId = txnInput?.value?.trim() || "";
              const orderId = orderInput?.value?.trim() || "";

              if (!transactionId && !orderId) {
                setResult("Transaction ID or Order ID is required.");
                return;
              }

              submitBtn.disabled = true;
              setResult("Checking status...");

              try {
                const res = await fetch("/api/billdesk/transaction-status", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ transactionId, orderId }),
                });

                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                  throw new Error(
                    data.error?.message || "Unable to retrieve status.",
                  );
                }

                const result = data.data || {};
                const lines = [
                  `Status: ${result.status || "UNKNOWN"}`,
                  `Auth Status: ${result.authStatus || "-"}`,
                  `Transaction ID: ${result.transactionId || "-"}`,
                  `Order ID: ${result.orderId || "-"}`,
                  `Amount: ${result.amount || "-"}`,
                  `Message: ${result.message || "-"}`,
                ];
                setResult(lines.join("\n"));
              } catch (error) {
                setResult(error.message || "Unable to retrieve status.");
              } finally {
                submitBtn.disabled = false;
              }
            });
          }

          if (resetBtn) {
            resetBtn.addEventListener("click", () => {
              if (txnInput) txnInput.value = "";
              if (orderInput) orderInput.value = "";
              setResult("Awaiting input.");
            });
          }
        });
      }

      const reloadBtn = document.getElementById("jmc-reload-transactions");
      if (reloadBtn) {
        reloadBtn.addEventListener("click", () => {
          if (document.getElementById("jmc-reload-modal-overlay")) return;

          const overlay = document.createElement("div");
          overlay.className = "jmc-widget-modal-overlay";
          overlay.id = "jmc-reload-modal-overlay";
          overlay.innerHTML = `
            <div class="jmc-widget-modal">
              <div class="jmc-widget-modal-header">
                <h2>Reload Transactions</h2>
                <button id="jmc-reload-close">X</button>
              </div>
              <div class="jmc-widget-modal-body">
                <p style="margin:0 0 16px;font-size:12.5px;color:var(--jmc-text-dim);">Refresh pending and initiated transactions from BillDesk.</p>
                <div class="jmc-action-field">
                  <label class="jmc-action-label" for="jmc-reload-limit">Limit</label>
                  <input id="jmc-reload-limit" class="jmc-action-input" type="number" min="1" max="500" value="50" />
                </div>
                <div class="jmc-action-row">
                  <button id="jmc-reload-submit" class="jmc-qa-btn primary" type="button">Run Reload</button>
                </div>
                <div id="jmc-reload-result" class="jmc-action-result">Ready to reload.</div>
              </div>
            </div>
          `;
          document.body.appendChild(overlay);

          const close = () => overlay.remove();
          const closeBtn = document.getElementById("jmc-reload-close");
          if (closeBtn) closeBtn.addEventListener("click", close);
          overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close();
          });
          document.addEventListener("keydown", function escHandler(e) {
            if (e.key === "Escape") {
              close();
              document.removeEventListener("keydown", escHandler);
            }
          });

          const limitInput = document.getElementById("jmc-reload-limit");
          const submitBtn = document.getElementById("jmc-reload-submit");
          const resultEl = document.getElementById("jmc-reload-result");

          const setResult = (text) => {
            if (resultEl) resultEl.textContent = text;
          };

          if (submitBtn) {
            submitBtn.addEventListener("click", async () => {
              const limitValue = limitInput?.value
                ? parseInt(limitInput.value, 10)
                : 50;
              submitBtn.disabled = true;
              setResult("Reloading pending transactions...");

              try {
                const res = await fetch("/api/billdesk/reload-transactions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ limit: limitValue || 50 }),
                });

                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                  throw new Error(
                    data.error?.message || "Unable to reload transactions.",
                  );
                }

                const summary = data.data || {};
                const lines = [
                  `Total: ${summary.total ?? 0}`,
                  `Updated: ${summary.updated ?? 0}`,
                  `Failed: ${summary.failed ?? 0}`,
                  `Skipped: ${summary.skipped ?? 0}`,
                ];
                setResult(lines.join("\n"));
              } catch (error) {
                setResult(error.message || "Unable to reload transactions.");
              } finally {
                submitBtn.disabled = false;
              }
            });
          }
        });
      }
    }
  };

  // Fast route detector — runs immediately (no debounce) to toggle class instantly
  const fastRouteCheck = () => {
    const isHomepage =
      window.location.pathname === "/" ||
      window.location.pathname === "/admin/" ||
      window.location.pathname === "/admin";
    if (isHomepage) {
      document.body.classList.add("dashboard-active");
    } else {
      const existingDash = document.getElementById("custom-jmc-dashboard");
      if (existingDash) existingDash.remove();
      document.body.classList.remove("dashboard-active");
    }
  };

  // Intercept history and SPA navigation changes
  const patchHistory = () => {
    if (typeof window === "undefined" || !window.history) return;
    
    const pushState = window.history.pushState;
    if (pushState && !pushState.jmcPatched) {
      window.history.pushState = function (...args) {
        pushState.apply(this, args);
        fastRouteCheck();
      };
      window.history.pushState.jmcPatched = true;
    }

    const replaceState = window.history.replaceState;
    if (replaceState && !replaceState.jmcPatched) {
      window.history.replaceState = function (...args) {
        replaceState.apply(this, args);
        fastRouteCheck();
      };
      window.history.historyChangePatched = true; // marker
      window.history.replaceState.jmcPatched = true;
    }

    window.addEventListener("popstate", fastRouteCheck);
  };
  patchHistory();

  // Run fast check immediately and on every DOM mutation (debounced & subtree true for reliability)
  const routeObserver = new MutationObserver(fastRouteCheck);
  routeObserver.observe(document.body, { childList: true, subtree: true });
  fastRouteCheck();

  // Heavy dashboard build — debounced
  const dashObserver = new MutationObserver(debounce(dashHandler, 300));
  dashObserver.observe(document.body, { childList: true, subtree: true });
};

/* ═══════════════════════════════════════════════════════════
   Transaction Field Enhancements
   ─────────────────────────────────────────────────────────
   Collapses rawResponse and additionalInfo JSON fields by
   default with a styled toggle button.
   ═══════════════════════════════════════════════════════════ */
const injectTransactionFieldEnhancements = () => {
  if (typeof document === "undefined") return;

  const handleTransactionFields = debounce(() => {
    const path = window.location.pathname;
    // Match both URL-encoded and plain content-type paths
    const isTransactionEdit =
      path.includes("transaction.transaction/") ||
      path.includes("transaction.transaction%2F");
    if (!isTransactionEdit) return;

    const fieldNames = ["rawResponse", "additionalInfo"];

    fieldNames.forEach((fieldName) => {
      const labels = document.querySelectorAll("label");
      labels.forEach((label) => {
        const labelText = label.textContent?.trim();
        if (!labelText) return;

        // Normalise both sides for comparison
        const normalised = labelText.replace(/[\s_-]/g, "").toLowerCase();
        const target = fieldName.replace(/[\s_-]/g, "").toLowerCase();

        if (normalised === target && !label.dataset.jmcToggled) {
          label.dataset.jmcToggled = "true";

          // Strategy: walk UP from the label to find the outermost field container.
          // In Strapi 5, the structure is typically:
          //   <div>             ← field wrapper (what we want)
          //     <div>           ← label row
          //       <label>       ← the label we found
          //     </div>
          //     <div>           ← editor container (what we want to hide)
          //       <div class="cm-editor">...</div>
          //     </div>
          //   </div>
          let fieldWrapper = label.closest('[class*="Field"]');
          if (!fieldWrapper) {
            // Fallback: go up 3-4 levels from label to find a div that contains
            // both the label and an editor/textarea
            let candidate = label.parentElement;
            for (let i = 0; i < 4 && candidate; i++) {
              const hasEditor = candidate.querySelector(
                'textarea, [class*="cm-editor"], [class*="CodeMirror"], [class*="JSONInput"], pre',
              );
              if (hasEditor && candidate.contains(label)) {
                fieldWrapper = candidate;
                break;
              }
              candidate = candidate.parentElement;
            }
          }
          if (!fieldWrapper) return;

          // Find ALL child divs in the field wrapper that are NOT the label row
          const labelRow = label.closest("div");
          const editorContainers = [];
          for (const child of fieldWrapper.children) {
            if (child !== labelRow && child.nodeType === 1) {
              editorContainers.push(child);
            }
          }

          if (editorContainers.length === 0) return;

          // Collapse all editor containers by default
          editorContainers.forEach((c) => {
            c.classList.add("jmc-field-collapsed");
            c.dataset.jmcFieldContent = fieldName;
          });

          // Create toggle button
          const toggle = document.createElement("button");
          toggle.className = "jmc-field-toggle";
          toggle.type = "button";
          toggle.innerHTML = "\u25B6 Show " + fieldName;
          let collapsed = true;

          toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            collapsed = !collapsed;
            editorContainers.forEach((c) => {
              if (collapsed) {
                c.classList.add("jmc-field-collapsed");
              } else {
                c.classList.remove("jmc-field-collapsed");
              }
            });
            toggle.innerHTML = collapsed
              ? "\u25B6 Show " + fieldName
              : "\u25BC Hide " + fieldName;
          });

          // Insert toggle right after the label
          if (labelRow && labelRow.parentElement) {
            labelRow.style.display = "flex";
            labelRow.style.alignItems = "center";
            labelRow.style.gap = "8px";
            labelRow.style.flexWrap = "wrap";
            labelRow.appendChild(toggle);
          }
        }
      });
    });
  }, 500);

  const txnObserver = new MutationObserver(handleTransactionFields);
  txnObserver.observe(document.body, { childList: true, subtree: true });
  // Also run once immediately after a delay
  setTimeout(handleTransactionFields, 1500);
};

const injectResilientRefreshTools = () => {
  if (typeof document === "undefined") return;

  // 1) Inject floating bottom-right refresh button on all admin pages
  const existingFloatingBtn = document.getElementById("jmc-admin-refresh-button");
  if (!existingFloatingBtn) {
    const btn = document.createElement("div");
    btn.id = "jmc-admin-refresh-button";
    btn.title = "Refresh Content Panel";
    btn.innerHTML = "⟳";
    btn.addEventListener("click", () => {
      window.location.reload();
    });
    document.body.appendChild(btn);
  }

  // 2) Active observer to watch for empty content manager states
  const checkEmptyContentManager = () => {
    const isContentManager = window.location.pathname.includes("/content-manager");
    if (!isContentManager) return;

    // A. Primary: check standard <main> tag
    let mainContainer = document.querySelector("main");

    // B. Sibling fallback: If <main> is missing, look next to the sub-sidebar navigation panel
    if (!mainContainer) {
      const subSidebar = document.querySelector('nav[aria-label="Content Manager"]') || 
                         Array.from(document.querySelectorAll('nav')).find(n => n.textContent.includes('Collection Types'));
      if (subSidebar && subSidebar.parentElement) {
        const siblings = Array.from(subSidebar.parentElement.children);
        const siblingContent = siblings.find(el => el !== subSidebar && !el.tagName.toLowerCase().includes('nav'));
        if (siblingContent) {
          mainContainer = siblingContent;
        }
      }
    }

    // C. Root sidebar sibling fallback
    if (!mainContainer) {
      const firstNav = document.querySelector('nav');
      if (firstNav && firstNav.parentElement) {
        const siblings = Array.from(firstNav.parentElement.children);
        const siblingContent = siblings.find(el => el !== firstNav && !el.tagName.toLowerCase().includes('nav'));
        if (siblingContent) {
          mainContainer = siblingContent;
        }
      }
    }

    if (!mainContainer) return;

    const existingRefreshBox = document.getElementById("jmc-empty-refresh-box");
    
    // Check if any interactive tables, layouts, forms, skeletons or headers are loaded
    const activeElements = Array.from(mainContainer.querySelectorAll("table, form, h1, [role='grid'], [class*='Content'] h2, button, p, a, svg, [class*='Skeleton'], [class*='Loading']"));
    
    // Safety check: Filter out elements that belong to our own refresh panel to prevent infinite loops
    const realActiveContent = activeElements.filter(el => !el.closest("#jmc-empty-refresh-box"));
    const hasActiveContent = realActiveContent.length > 0;
    
    // If it's completely empty or taking too long, we inject a beautiful centered refresh card!
    if (!hasActiveContent) {
      if (!existingRefreshBox) {
        const box = document.createElement("div");
        box.id = "jmc-empty-refresh-box";
        box.innerHTML = `
          <div class="jmc-empty-refresh-content">
            <div class="jmc-empty-icon">⟳</div>
            <h3>Workspace Panel Loading Error</h3>
            <p>The workspace panel is taking too long to load or failed to render. Click below to refresh the view.</p>
            <div class="jmc-refresh-btn-group">
              <button onclick="window.location.reload()" class="jmc-refresh-large-btn">⟳ Refresh Content</button>
              <button onclick="window.location.reload()" class="jmc-refresh-secondary-btn">Hard Reload App</button>
            </div>
          </div>
        `;
        mainContainer.appendChild(box);
      }
    } else {
      if (existingRefreshBox) {
        existingRefreshBox.remove();
      }
    }
  };

  // Run initial check and bind to route changes/DOM mutations
  setInterval(checkEmptyContentManager, 2000);
};

export default {
  config: {
    auth: { logo },
    head: { title: "JMC \u2014 Admin Portal", favicon },
    menu: { logo },
    theme: {
      light: {
        colors: {
          primary100: "#eef2ff",
          primary200: "#c7d2fe",
          primary500: "#003366",
          primary600: "#002855",
          primary700: "#001f44",
          buttonPrimary500: "#003366",
          buttonPrimary600: "#002855",
          secondary500: "#FF6600",
          secondary700: "#cc5200",
          neutral0: "#ffffff",
          neutral100: "#f8f9fb",
          neutral150: "#f1f5f9",
          neutral200: "#e5e7eb",
        },
      },
    },
    translations: {
      en: {
        "app.components.HomePage.welcome": "Workspace Overview",
        "app.components.HomePage.welcome.again":
          "Quickly access content modules below or through the side navigation.",
        "Auth.form.welcome.title": "JMC Gateway",
        "Auth.form.welcome.subtitle":
          "Jammu Municipal Corporation \u2014 Master Control",
      },
    },
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap() {
    injectAdminStyles();
    injectLoginPageEnhancements();
    injectHCaptchaOnLogin();
    setTimeout(() => {
      injectDashboardWidgets();
      injectTransactionFieldEnhancements();
      injectResilientRefreshTools();
    }, 500);
  },
};
