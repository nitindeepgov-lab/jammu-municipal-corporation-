'use strict';

const DEFAULT_TABLE = 'neon_uploads';
const DEFAULT_SCHEMA = 'public';

let schemaReadyPromise = null;

function normalizeIdentifier(value, fallback) {
  if (!value) {
    return fallback;
  }

  const trimmed = String(value).trim();
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return fallback;
  }

  return trimmed;
}

function getKnex() {
  if (!global.strapi || !global.strapi.db || !global.strapi.db.connection) {
    throw new Error('Strapi database connection is not available.');
  }

  return global.strapi.db.connection;
}

function getConfig() {
  const fallbackTable = normalizeIdentifier(
    process.env.NEON_UPLOADS_TABLE,
    DEFAULT_TABLE
  );
  const fallbackSchema = normalizeIdentifier(
    process.env.DATABASE_SCHEMA,
    DEFAULT_SCHEMA
  );

  const uploadConfig =
    global.strapi?.config?.get?.('plugin::upload') || {};
  const providerOptions = uploadConfig.providerOptions || {};

  return {
    table: normalizeIdentifier(providerOptions.table, fallbackTable),
    schema: normalizeIdentifier(providerOptions.schema, fallbackSchema),
  };
}

async function ensureSchema() {
  if (schemaReadyPromise) {
    return schemaReadyPromise;
  }

  schemaReadyPromise = (async () => {
    const knex = getKnex();
    const { table, schema } = getConfig();
    const schemaBuilder = knex.schema.withSchema(schema);
    const exists = await schemaBuilder.hasTable(table);

    if (!exists) {
      await schemaBuilder.createTable(table, (t) => {
        t.bigIncrements('id').primary();
        t.string('file_key').notNullable().unique();
        t.string('hash').notNullable();
        t.string('ext').notNullable();
        t.string('mime');
        t.integer('size_kb');
        t.integer('size_bytes');
        t.string('name');
        t.specificType('data', 'bytea').notNullable();
        t
          .timestamp('created_at', { useTz: true })
          .defaultTo(knex.fn.now());
      });
    }
  })();

  schemaReadyPromise = schemaReadyPromise.catch((error) => {
    schemaReadyPromise = null;
    throw error;
  });

  return schemaReadyPromise;
}

function getTableRef(knex) {
  const { table, schema } = getConfig();
  return knex.withSchema(schema).table(table);
}

async function putFile(file) {
  await ensureSchema();
  const knex = getKnex();
  const table = getTableRef(knex);

  const data = {
    file_key: file.key,
    hash: file.hash,
    ext: file.ext,
    mime: file.mime || null,
    size_kb: Number.isFinite(file.size) ? Math.round(file.size) : null,
    size_bytes: Number.isFinite(file.sizeInBytes)
      ? Math.round(file.sizeInBytes)
      : null,
    name: file.name || null,
    data: file.buffer,
  };

  await table
    .insert(data)
    .onConflict('file_key')
    .merge({
      hash: data.hash,
      ext: data.ext,
      mime: data.mime,
      size_kb: data.size_kb,
      size_bytes: data.size_bytes,
      name: data.name,
      data: data.data,
    });
}

async function getFile(key) {
  await ensureSchema();
  const knex = getKnex();
  const table = getTableRef(knex);

  return table
    .select('file_key', 'mime', 'data', 'name', 'size_bytes')
    .where({ file_key: key })
    .first();
}

async function deleteFile(key) {
  await ensureSchema();
  const knex = getKnex();
  const table = getTableRef(knex);

  await table.where({ file_key: key }).del();
}

module.exports = {
  putFile,
  getFile,
  deleteFile,
};
