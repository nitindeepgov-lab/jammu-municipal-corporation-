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
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization"],
      keepHeadersOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
