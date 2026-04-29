module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "http:"],
          "img-src": ["'self'", "data:", "blob:", "https:", "http:"],
          "media-src": ["'self'", "data:", "blob:", "https:", "http:"],
          // hCaptcha CSP requirements
          "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://hcaptcha.com", "https://*.hcaptcha.com", "https://js.hcaptcha.com"],
          "frame-src": ["'self'", "https://hcaptcha.com", "https://*.hcaptcha.com"],
          "style-src": ["'self'", "'unsafe-inline'", "https://hcaptcha.com", "https://*.hcaptcha.com", "https://fonts.googleapis.com"],
          "font-src": ["'self'", "https://fonts.gstatic.com"],
        },
      },
    },
  },
  // hCaptcha verification middleware — intercepts POST /admin/login
  {
    name: "global::hcaptcha-verify",
    config: {},
  },
  {
    name: "strapi::cors",
    config: {
      // CORS is enabled by default when this middleware is in the array
      origin: [
        "https://jammu-municipal-corporation.vercel.app", //todo_change_it_to_actual_url
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization"],
      keepHeadersOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      text: true,
      textLimit: "1mb",
      includeUnparsed: true,
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
