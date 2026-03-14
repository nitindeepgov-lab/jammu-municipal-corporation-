import logo from './logo.jpeg';

const injectStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    /* ══════════════════════════════════════
       LIGHT MODE (default)
    ══════════════════════════════════════ */

    /* ── Login page background ── */
    #auth-page, [class*="AuthPage"], [class*="Wrapper"] {
      background: linear-gradient(135deg, #001f44 0%, #003366 50%, #004080 100%) !important;
    }

    /* ── Login card ── */
    [class*="Box"][class*="Card"],
    form > [class*="Box"],
    [class*="LoginWrapper"] > [class*="Box"] {
      background: #ffffff !important;
      border-radius: 16px !important;
      box-shadow: 0 25px 60px rgba(0,0,0,0.35) !important;
      padding: 40px !important;
      border: 1px solid rgba(255,255,255,0.15) !important;
    }

    /* ── Logo area ── */
    [class*="Logo"] img, [class*="AuthLogo"] img {
      max-height: 80px !important;
      object-fit: contain !important;
      margin-bottom: 8px !important;
    }

    /* ── Title & subtitle ── */
    [class*="Title"], h1 {
      color: #003366 !important;
      font-weight: 700 !important;
      font-size: 1.5rem !important;
      letter-spacing: -0.3px !important;
    }
    [class*="Subtitle"], [class*="Description"], p[class] {
      color: #5a6a7e !important;
      font-size: 0.9rem !important;
    }

    /* ── Input fields ── */
    input[type="email"], input[type="password"], input[type="text"] {
      border: 1.5px solid #dde4ed !important;
      border-radius: 8px !important;
      padding: 10px 14px !important;
      font-size: 0.95rem !important;
      transition: border-color 0.2s, box-shadow 0.2s !important;
      background: #f6f8fa !important;
      color: #1a2d42 !important;
    }
    input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus {
      border-color: #003366 !important;
      box-shadow: 0 0 0 3px rgba(0,51,102,0.12) !important;
      background: #fff !important;
      outline: none !important;
    }

    /* ── Labels ── */
    label {
      color: #003366 !important;
      font-weight: 600 !important;
      font-size: 0.85rem !important;
    }

    /* ── Login button ── */
    button[type="submit"] {
      background: linear-gradient(135deg, #003366, #004080) !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 12px !important;
      font-size: 0.95rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.3px !important;
      color: #fff !important;
      transition: all 0.2s !important;
      box-shadow: 0 4px 14px rgba(0,51,102,0.3) !important;
    }
    button[type="submit"]:hover {
      background: linear-gradient(135deg, #002855, #003366) !important;
      box-shadow: 0 6px 20px rgba(0,51,102,0.4) !important;
      transform: translateY(-1px) !important;
    }

    /* ── Forgot password link ── */
    a {
      color: #FF6600 !important;
      font-weight: 500 !important;
    }
    a:hover {
      color: #cc5200 !important;
    }

    /* ── Left decorative panel (Strapi shows one on wide screens) ── */
    [class*="LeftWrapper"], [class*="ContentWrapper"] > div:first-child {
      background: linear-gradient(160deg, #002050 0%, #003366 60%, #FF6600 200%) !important;
    }

    /* ── Divider line ── */
    hr { border-color: #dde4ed !important; }

    /* ── Bottom "Powered by" strip badge ── */
    [class*="Strapi"], [class*="strapi"] { display: none !important; }


    /* ══════════════════════════════════════
       DARK MODE — system preference OR Strapi toggle
    ══════════════════════════════════════ */
    @media (prefers-color-scheme: dark) {
      #auth-page, [class*="AuthPage"], [class*="Wrapper"] {
        background: linear-gradient(135deg, #0a0f1a 0%, #0d1b2e 50%, #0f2040 100%) !important;
      }
      [class*="Box"][class*="Card"],
      form > [class*="Box"],
      [class*="LoginWrapper"] > [class*="Box"] {
        background: #141e2e !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6) !important;
      }
      [class*="Title"], h1 {
        color: #a8c7f0 !important;
      }
      [class*="Subtitle"], [class*="Description"], p[class] {
        color: #8ba3be !important;
      }
      label {
        color: #7fafd6 !important;
      }
      input[type="email"], input[type="password"], input[type="text"] {
        background: #1c2a3d !important;
        border-color: #2e4060 !important;
        color: #d6e6f7 !important;
      }
      input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus {
        border-color: #4a90d9 !important;
        box-shadow: 0 0 0 3px rgba(74,144,217,0.18) !important;
        background: #1e2f45 !important;
      }
      button[type="submit"] {
        background: linear-gradient(135deg, #1a4a80, #1e5799) !important;
        box-shadow: 0 4px 14px rgba(30,87,153,0.45) !important;
      }
      button[type="submit"]:hover {
        background: linear-gradient(135deg, #15396a, #1a4a80) !important;
        box-shadow: 0 6px 20px rgba(30,87,153,0.6) !important;
      }
      a { color: #ff8533 !important; }
      a:hover { color: #ffaa66 !important; }
      hr { border-color: #2e4060 !important; }
      [class*="LeftWrapper"], [class*="ContentWrapper"] > div:first-child {
        background: linear-gradient(160deg, #080e1a 0%, #0d1b2e 60%, #7a3300 200%) !important;
      }
    }

    /* Strapi dark-mode toggle (data-theme="dark" on <html>) */
    html[data-theme="dark"] #auth-page,
    html[data-theme="dark"] [class*="AuthPage"],
    html[data-theme="dark"] [class*="Wrapper"] {
      background: linear-gradient(135deg, #0a0f1a 0%, #0d1b2e 50%, #0f2040 100%) !important;
    }
    html[data-theme="dark"] [class*="Box"][class*="Card"],
    html[data-theme="dark"] form > [class*="Box"],
    html[data-theme="dark"] [class*="LoginWrapper"] > [class*="Box"] {
      background: #141e2e !important;
      border: 1px solid rgba(255,255,255,0.08) !important;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6) !important;
    }
    html[data-theme="dark"] [class*="Title"],
    html[data-theme="dark"] h1 {
      color: #a8c7f0 !important;
    }
    html[data-theme="dark"] [class*="Subtitle"],
    html[data-theme="dark"] [class*="Description"],
    html[data-theme="dark"] p[class] {
      color: #8ba3be !important;
    }
    html[data-theme="dark"] label {
      color: #7fafd6 !important;
    }
    html[data-theme="dark"] input[type="email"],
    html[data-theme="dark"] input[type="password"],
    html[data-theme="dark"] input[type="text"] {
      background: #1c2a3d !important;
      border-color: #2e4060 !important;
      color: #d6e6f7 !important;
    }
    html[data-theme="dark"] input[type="email"]:focus,
    html[data-theme="dark"] input[type="password"]:focus,
    html[data-theme="dark"] input[type="text"]:focus {
      border-color: #4a90d9 !important;
      box-shadow: 0 0 0 3px rgba(74,144,217,0.18) !important;
      background: #1e2f45 !important;
    }
    html[data-theme="dark"] button[type="submit"] {
      background: linear-gradient(135deg, #1a4a80, #1e5799) !important;
      box-shadow: 0 4px 14px rgba(30,87,153,0.45) !important;
    }
    html[data-theme="dark"] button[type="submit"]:hover {
      background: linear-gradient(135deg, #15396a, #1a4a80) !important;
      box-shadow: 0 6px 20px rgba(30,87,153,0.6) !important;
    }
    html[data-theme="dark"] a { color: #ff8533 !important; }
    html[data-theme="dark"] a:hover { color: #ffaa66 !important; }
    html[data-theme="dark"] hr { border-color: #2e4060 !important; }
    html[data-theme="dark"] [class*="LeftWrapper"],
    html[data-theme="dark"] [class*="ContentWrapper"] > div:first-child {
      background: linear-gradient(160deg, #080e1a 0%, #0d1b2e 60%, #7a3300 200%) !important;
    }
  `;
  document.head.appendChild(style);
};

export default {
  config: {
    auth: {
      logo,
    },
    head: {
      title: 'JMC — Admin Portal',
    },
    menu: {
      logo,
    },
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
        'app.components.HomePage.welcome': 'Hello Jammu Municipal Corporation',
        'app.components.HomePage.welcome.again': 'Welcome to your administration panel',
        'Auth.form.welcome.title': 'CMS Portal — JMC',
        'Auth.form.welcome.subtitle': 'Jammu Municipal Corporation · Official Administration',
      },
    },
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap() {
    injectStyles();
  },
};
