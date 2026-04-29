module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": [
            "'self'",
            "https:",
            "http:",
            "https://hcaptcha.com",
            "https://*.hcaptcha.com",
            "https://api.hcaptcha.com",
            "https://api2.hcaptcha.com",
            "https://accounts.hcaptcha.com",
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https:",
            "http:",
            "https://imgs.hcaptcha.com",
            "https://*.hcaptcha.com",
          ],
          "media-src": ["'self'", "data:", "blob:", "https:", "http:"],
          // hCaptcha CSP requirements (full list per hCaptcha docs)
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://hcaptcha.com",
            "https://*.hcaptcha.com",
            "https://js.hcaptcha.com",
            "https://newassets.hcaptcha.com",
          ],
          "frame-src": [
            "'self'",
            "https://hcaptcha.com",
            "https://*.hcaptcha.com",
            "https://newassets.hcaptcha.com",
          ],
          "style-src": [
            "'self'",
            "'unsafe-inline'",
            "https://hcaptcha.com",
            "https://*.hcaptcha.com",
            "https://newassets.hcaptcha.com",
            "https://fonts.googleapis.com",
          ],
          "font-src": ["'self'", "https://fonts.gstatic.com"],
          "worker-src": [
            "'self'",
            "blob:",
            "https://hcaptcha.com",
            "https://*.hcaptcha.com",
            "https://newassets.hcaptcha.com",
          ],
          "child-src": ["https://hcaptcha.com", "https://*.hcaptcha.com", "https://newassets.hcaptcha.com"],
        },
      },
    },
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
  // hCaptcha verification middleware — MUST be after strapi::body so ctx.request.body is parsed
  {
    name: "global::hcaptcha-verify",
    config: {},
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
