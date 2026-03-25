module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    // ✅ FIXED: New session configuration for Strapi 6 compatibility
    sessions: {
      // Maximum time a refresh token can be used (30 days)
      maxRefreshTokenLifespan: env.int(
        "ADMIN_MAX_REFRESH_TOKEN_LIFESPAN",
        30 * 24 * 60 * 60 * 1000,
      ),
      // Maximum time a session can last (7 days)
      maxSessionLifespan: env.int(
        "ADMIN_MAX_SESSION_LIFESPAN",
        7 * 24 * 60 * 60 * 1000,
      ),
    },
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
});
