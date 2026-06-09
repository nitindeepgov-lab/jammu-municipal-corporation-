const path = require("path");

module.exports = ({ env }) => {
  const connectionString = env("DATABASE_URL") || null;
  const host = env("DATABASE_HOST");
  const port = env.int("DATABASE_PORT", 5432);
  const username = env("DATABASE_USERNAME");
  const password = env("DATABASE_PASSWORD");
  const database = env("DATABASE_NAME");

  const fallbackConnectionString =
    host && username && password && database
      ? `postgresql://${username}:${password}@${host}:${port}/${database}`
      : null;

  return {
    connection: {
      client: "postgres",
      connection: {
        connectionString: connectionString || fallbackConnectionString,
        ssl: env.bool("DATABASE_SSL", false) && {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            false,
          ),
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 30000),
    },
  };
};
