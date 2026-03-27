import logo from './logo.jpeg';
import favicon from './favicon.png';

/* ──────────────────────────────────────────────────────
   JMC Admin — Strapi 5 Customisation
   MINIMAL + TARGETED: Only styles what we own.
   Lets Strapi's built-in theme handle light/dark for
   all internal admin panels (tables, forms, modals, etc.)
   ────────────────────────────────────────────────────── */

const injectAdminStyles = () => {
  if (typeof document === 'undefined') return;

  // Force light theme for the admin UI
  try {
    localStorage.setItem('strapi-theme', 'light');
  } catch (_) {}
  document.documentElement.setAttribute('data-theme', 'light');

  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

    /* ═══════ FONT ONLY — no color overrides ═══════ */
    * {
      font-family: 'Outfit', sans-serif !important;
    }

    /* ═══════ PRIMARY ICON SIDEBAR ONLY ═══════
       Targets ONLY the narrow ~50px icon sidebar on the far left.
       Uses the > combinator so it NEVER leaks into the
       Content Manager's secondary sidebar or any other panel. */
    body > div:first-child > div > nav:first-of-type,
    [class*="LeftMenu"], [class*="leftMenu"] {
      background: linear-gradient(180deg, #0f1c2e 0%, #152b47 100%) !important;
      border-right: 1px solid rgba(255,255,255,0.06) !important;
    }
    /* Icon sidebar links */
    body > div:first-child > div > nav:first-of-type a,
    [class*="LeftMenu"] a, [class*="leftMenu"] a {
      transition: all 0.25s ease !important;
    }
    body > div:first-child > div > nav:first-of-type a:hover,
    [class*="LeftMenu"] a:hover, [class*="leftMenu"] a:hover {
      background: rgba(255, 255, 255, 0.08) !important;
    }
    /* Make sure icon sidebar SVGs are visible */
    body > div:first-child > div > nav:first-of-type svg,
    [class*="LeftMenu"] svg, [class*="leftMenu"] svg {
      color: rgba(255,255,255,0.7) !important;
      fill: rgba(255,255,255,0.7) !important;
    }
    body > div:first-child > div > nav:first-of-type span,
    [class*="LeftMenu"] span, [class*="leftMenu"] span {
      color: rgba(255,255,255,0.8) !important;
    }

    /* ═══════ SMOOTH BUTTON POLISH ═══════ */
    button {
      border-radius: 8px !important;
      transition: all 0.25s ease !important;
    }

    /* ═══════ LOGIN PAGE ═══════ */
    [class*="UnauthenticatedLayout"] {
      background: linear-gradient(135deg, #001f44 0%, #003366 50%, #004080 100%) !important;
    }
    [class*="UnauthenticatedLayout"] img {
      max-height: 85px !important;
      object-fit: contain !important;
    }

    /* ═══════ HIDE STRAPI BRANDING ═══════ */
    [class*="NpsSurvey"],
    a[href*="strapi.io"] { display: none !important; }

    /* ═══════ HIDE THEME TOGGLE ═══════ */
    [data-strapi-theme-toggle],
    button[data-strapi-theme-toggle],
    [class*="ThemeToggle"],
    [aria-label="Change theme"] { display: none !important; }

    /* ═══════ HIDE DEFAULT HOMEPAGE when custom dashboard is active ═══════ */
    .dashboard-active #custom-jmc-dashboard ~ * {
      display: none !important;
    }

    /* ═══════════════════════════════════════════
       CUSTOM DASHBOARD — uses CSS vars for theme
       ═══════════════════════════════════════════ */
    :root {
      --jmc-bg: #ffffff;
      --jmc-bg-alt: #f8fafc;
      --jmc-border: #e2e8f0;
      --jmc-text-h: #0f172a;
      --jmc-text: #334155;
      --jmc-text-dim: #64748b;
      --jmc-shadow: 0 10px 40px rgba(0,0,0,0.06);
    }
    html[data-theme="dark"] { color-scheme: light; }

    #custom-jmc-dashboard {
      padding: 32px 40px;
      margin: 24px 40px;
      background: var(--jmc-bg);
      border-radius: 20px;
      box-shadow: var(--jmc-shadow);
      border: 1px solid var(--jmc-border);
      animation: slideInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      position: relative;
      z-index: 10;
      overflow: hidden;
    }
    #custom-jmc-dashboard::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 5px;
      background: linear-gradient(90deg, #FF6600, #ff9933, #003366, #4a90d9);
    }

    .jmc-dash-header {
      margin-bottom: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .jmc-dash-header h1 {
      font-size: 26px; font-weight: 700;
      color: var(--jmc-text-h); margin: 0;
    }
    .jmc-dash-header p {
      color: var(--jmc-text-dim);
      font-size: 15px; margin-top: 4px;
    }

    .custom-badge {
      padding: 6px 14px;
      background: rgba(78, 203, 113, 0.12);
      color: #16a34a;
      border-radius: 20px;
      font-weight: 600; font-size: 13px;
      display: flex; align-items: center; gap: 8px;
    }
    .custom-badge::before {
      content: ''; display: block;
      width: 7px; height: 7px;
      background: #4ecb71; border-radius: 50%;
      box-shadow: 0 0 8px #4ecb71;
    }

    .jmc-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px; margin-bottom: 28px;
    }
    .jmc-stat-card {
      background: var(--jmc-bg-alt);
      border: 1px solid var(--jmc-border);
      border-radius: 12px; padding: 18px;
      display: flex; flex-direction: column; gap: 6px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .jmc-stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--jmc-shadow);
    }
    .jmc-stat-card h4 {
      margin: 0; color: var(--jmc-text-dim);
      font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px;
    }
    .jmc-stat-card .val {
      font-size: 22px; font-weight: 700; color: var(--jmc-text-h);
    }
    .jmc-stat-card .trend {
      font-size: 12px; color: #16a34a; font-weight: 600;
    }
    html[data-theme="dark"] .jmc-stat-card .trend { color: #4ade80; }

    .jmc-dash-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .jmc-widget-card {
      text-decoration: none !important;
      background: var(--jmc-bg);
      border-radius: 14px; padding: 22px;
      display: flex; flex-direction: column; gap: 10px;
      border: 1px solid var(--jmc-border);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s;
      position: relative; overflow: hidden;
      cursor: pointer;
    }
    .jmc-widget-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.1);
    }

    .jmc-widget-icon {
      width: 44px; height: 44px;
      border-radius: 10px;
      display: flex; justify-content: center; align-items: center;
      font-size: 22px; margin-bottom: 4px;
    }
    .jmc-widget-card h3 {
      margin: 0; font-size: 16px; font-weight: 600;
    }
    .jmc-widget-card p {
      margin: 0; font-size: 13px; color: var(--jmc-text-dim); line-height: 1.5;
    }

    /* ── Light mode card colors ── */
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


    @keyframes slideInDown {
      0% { opacity: 0; transform: translateY(-16px) scale(0.98); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Replace "Strapi" text with "JMC Admin"
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

      dashboard.innerHTML = `
        <div class="jmc-dash-header">
          <div>
            <h1>JMC Master Dashboard</h1>
            <p>Welcome back! Manage the municipal content & services.</p>
          </div>
          <div class="custom-badge">System Online</div>
        </div>

        <div class="jmc-stats-grid">
          <div class="jmc-stat-card">
            <h4>Live Visitors</h4>
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
        </div>

        <div class="jmc-dash-grid">
          <a href="/admin/content-manager/collection-types/api::tender.tender" class="jmc-widget-card blue">
            <div class="jmc-widget-icon">\ud83d\udcc4</div>
            <h3>Manage Tenders</h3>
            <p>Publish or edit smart city and regular municipal tenders.</p>
          </a>

          <a href="/admin/content-manager/collection-types/api::news-ticker.news-ticker" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">\ud83d\udcf0</div>
            <h3>News & Updates</h3>
            <p>Broadcast breaking news and daily updates to the portal.</p>
          </a>

          <a href="/admin/content-manager/collection-types/api::notice.notice" class="jmc-widget-card purple">
            <div class="jmc-widget-icon">\ud83d\udccc</div>
            <h3>Notices & Circulars</h3>
            <p>Upload official municipal decisions and circulars.</p>
          </a>

          <a href="/admin/content-manager/collection-types/api::bulletin-board.bulletin-board" class="jmc-widget-card green">
            <div class="jmc-widget-icon">\ud83d\udccb</div>
            <h3>Bulletin Board</h3>
            <p>Manage announcements on the frontend homepage.</p>
          </a>

          <a href="/admin/content-manager/collection-types/api::official.official" class="jmc-widget-card orange">
            <div class="jmc-widget-icon">\ud83d\udc65</div>
            <h3>Officials Directory</h3>
            <p>Update contact information of municipal officials.</p>
          </a>

          <a href="/admin/settings" class="jmc-widget-card gray">
            <div class="jmc-widget-icon">\u2699\ufe0f</div>
            <h3>Admin Settings</h3>
            <p>Configure permissions, media libraries, and rules.</p>
          </a>
        </div>
      `;

      const firstChild = mainContainer.firstChild;
      if (firstChild) {
        mainContainer.insertBefore(dashboard, firstChild);
      } else {
        mainContainer.appendChild(dashboard);
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
          neutral100: '#f8fafc',
          neutral150: '#f1f5f9',
          neutral200: '#e2e8f0',
        },
      },
      dark: {
        colors: {
          primary100: '#1e293b',
          primary200: '#334155',
          primary500: '#60a5fa',
          primary600: '#3b82f6',
          primary700: '#2563eb',
          buttonPrimary500: '#2563eb',
          buttonPrimary600: '#1d4ed8',
          secondary500: '#f97316',
          secondary700: '#ea580c',
          neutral0: '#0f172a',
          neutral100: '#1e293b',
          neutral150: '#334155',
          neutral200: '#475569',
          neutral600: '#94a3b8',
          neutral700: '#cbd5e1',
          neutral800: '#e2e8f0',
          neutral900: '#f1f5f9',
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
