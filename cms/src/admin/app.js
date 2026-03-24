import logo from './logo.jpeg';
import favicon from './favicon.png';

/* ──────────────────────────────────────────────────────
   JMC Admin — Strapi 5 Customisation
   ─ Login page branding ONLY (scoped CSS)
   ─ Theme tokens for internal admin (Strapi-native)
   ─ Dashboard translations
   ────────────────────────────────────────────────────── */

const injectLoginStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* ═══════ SCOPED TO LOGIN / AUTH PAGES ONLY ═══════
       These selectors target ONLY the authentication
       wrapper and will NOT bleed into the content
       manager, list views, or settings pages.
       ════════════════════════════════════════════════ */

    /* ── Auth page background ── */
    main[class*="LayoutContent"] ~ div,
    body:has(form[action*="auth"]),
    [class*="UnauthenticatedLayout"] {
      background: linear-gradient(135deg, #001f44 0%, #003366 50%, #004080 100%) !important;
    }

    /* ── Auth card ── */
    [class*="UnauthenticatedLayout"] [class*="Column"] > div,
    [class*="UnauthenticatedLayout"] form {
      background: #ffffff !important;
      border-radius: 16px !important;
      box-shadow: 0 25px 60px rgba(0,0,0,0.35) !important;
    }

    /* ── Auth logo sizing ── */
    [class*="UnauthenticatedLayout"] img {
      max-height: 80px !important;
      object-fit: contain !important;
    }

    /* ── Auth submit button ── */
    [class*="UnauthenticatedLayout"] button[type="submit"] {
      background: linear-gradient(135deg, #003366, #004080) !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 12px !important;
      font-weight: 600 !important;
      color: #fff !important;
      box-shadow: 0 4px 14px rgba(0,51,102,0.3) !important;
      transition: all 0.2s ease !important;
    }
    [class*="UnauthenticatedLayout"] button[type="submit"]:hover {
      background: linear-gradient(135deg, #002855, #003366) !important;
      box-shadow: 0 6px 20px rgba(0,51,102,0.4) !important;
      transform: translateY(-1px) !important;
    }

    /* ── Auth input fields ── */
    [class*="UnauthenticatedLayout"] input {
      border: 1.5px solid #dde4ed !important;
      border-radius: 8px !important;
      padding: 10px 14px !important;
      background: #f6f8fa !important;
      transition: border-color 0.2s, box-shadow 0.2s !important;
    }
    [class*="UnauthenticatedLayout"] input:focus {
      border-color: #003366 !important;
      box-shadow: 0 0 0 3px rgba(0,51,102,0.12) !important;
      background: #fff !important;
      outline: none !important;
    }

    /* ── Auth links (forgot password) ── */
    [class*="UnauthenticatedLayout"] a {
      color: #FF6600 !important;
      font-weight: 500 !important;
    }
    [class*="UnauthenticatedLayout"] a:hover {
      color: #cc5200 !important;
    }

    /* ── Hide "Powered by Admin Panel" branding ── */
    [class*="UnauthenticatedLayout"] [class*="Strapi"],
    [class*="UnauthenticatedLayout"] [class*="strapi"] {
      display: none !important;
    }

    /* ═══════ DARK MODE — Auth pages only ═══════ */
    @media (prefers-color-scheme: dark) {
      [class*="UnauthenticatedLayout"] {
        background: linear-gradient(135deg, #0a0f1a 0%, #0d1b2e 50%, #0f2040 100%) !important;
      }
      [class*="UnauthenticatedLayout"] [class*="Column"] > div,
      [class*="UnauthenticatedLayout"] form {
        background: #141e2e !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6) !important;
      }
      [class*="UnauthenticatedLayout"] input {
        background: #1c2a3d !important;
        border-color: #2e4060 !important;
        color: #d6e6f7 !important;
      }
      [class*="UnauthenticatedLayout"] input:focus {
        border-color: #4a90d9 !important;
        box-shadow: 0 0 0 3px rgba(74,144,217,0.18) !important;
        background: #1e2f45 !important;
      }
      [class*="UnauthenticatedLayout"] button[type="submit"] {
        background: linear-gradient(135deg, #1a4a80, #1e5799) !important;
        box-shadow: 0 4px 14px rgba(30,87,153,0.45) !important;
      }
      [class*="UnauthenticatedLayout"] button[type="submit"]:hover {
        background: linear-gradient(135deg, #15396a, #1a4a80) !important;
      }
      [class*="UnauthenticatedLayout"] a { color: #ff8533 !important; }
      [class*="UnauthenticatedLayout"] a:hover { color: #ffaa66 !important; }
    }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] {
      background: linear-gradient(135deg, #0a0f1a 0%, #0d1b2e 50%, #0f2040 100%) !important;
    }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] [class*="Column"] > div,
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] form {
      background: #141e2e !important;
      border: 1px solid rgba(255,255,255,0.08) !important;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6) !important;
    }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] input {
      background: #1c2a3d !important;
      border-color: #2e4060 !important;
      color: #d6e6f7 !important;
    }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] input:focus {
      border-color: #4a90d9 !important;
      box-shadow: 0 0 0 3px rgba(74,144,217,0.18) !important;
      background: #1e2f45 !important;
    }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] button[type="submit"] {
      background: linear-gradient(135deg, #1a4a80, #1e5799) !important;
    }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] button[type="submit"]:hover {
      background: linear-gradient(135deg, #15396a, #1a4a80) !important;
    }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] a { color: #ff8533 !important; }
    html[data-theme="dark"] [class*="UnauthenticatedLayout"] a:hover { color: #ffaa66 !important; }

    /* ═══════ GLOBAL ADMIN Polish (non-breaking) ═══════ */
    /* Hide only the "Powered by Admin Panel" footer badge */
    [class*="NpsSurvey"], [class*="npsSurvey"] { display: none !important; }

    /* ═══════ Hide Strapi branding throughout admin ═══════ */
    /* Hide Strapi text in header/tabs */
    header span:empty,
    header a { font-size: 0 !important; }
    
    /* Target Strapi link by href pattern */
    a[href*="strapi.io"],
    a[href*="strapi"],
    a[title*="Strapi"] { 
      display: none !important; 
    }
  `;
  document.head.appendChild(style);
  
  // Dynamically replace Strapi text with Admin Panel
  const observer = new MutationObserver(() => {
    document.querySelectorAll('*').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        if (el.textContent.includes('Strapi')) {
          el.textContent = el.textContent.replace(/Strapi/g, 'Admin Panel');
        }
      }
    });
  });
  
  observer.observe(document.body, { 
    childList: true, 
    subtree: true, 
    characterData: false 
  });
};

export default {
  config: {
    auth: { logo },
    head: { title: 'JMC — Admin Portal', favicon },
    menu: { logo },
    theme: {
      light: {
        colors: {
          primary100: '#e6edf4',
          primary200: '#b3c9dd',
          primary500: '#003366',
          primary600: '#002855',
          primary700: '#001f44',
          buttonPrimary500: '#003366',
          buttonPrimary600: '#002855',
          secondary500: '#FF6600',
          secondary700: '#cc5200',
          neutral0: '#ffffff',
          neutral100: '#f6f8fa',
          neutral150: '#edf1f5',
          neutral200: '#dde4ed',
        },
      },
      dark: {
        colors: {
          primary100: '#0d1b2e',
          primary200: '#1a3450',
          primary500: '#4a90d9',
          primary600: '#3a7abf',
          primary700: '#2a64a6',
          buttonPrimary500: '#1a4a80',
          buttonPrimary600: '#15396a',
          secondary500: '#ff8533',
          secondary700: '#ff6600',
          neutral0: '#0d1421',
          neutral100: '#141e2e',
          neutral150: '#1c2a3d',
          neutral200: '#2e4060',
          neutral600: '#8ba3be',
          neutral700: '#a8c7f0',
          neutral800: '#d6e6f7',
          neutral900: '#eaf3ff',
          buttonNeutral0: '#1c2a3d',
          danger700: '#ff6b6b',
          success700: '#4ecb71',
          warning700: '#ffcc57',
        },
      },
    },
    translations: {
      en: {
        'app.components.HomePage.welcome': 'Welcome to JMC Admin',
        'app.components.HomePage.welcome.again':
          'Manage your website content — Bulletin Board, Notices, Tenders, Officials & more.',
        'Auth.form.welcome.title': 'JMC Admin Portal',
        'Auth.form.welcome.subtitle':
          'Jammu Municipal Corporation — Content Management System',
      },
    },
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap() {
    injectLoginStyles();
  },
};
