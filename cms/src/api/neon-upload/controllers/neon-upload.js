'use strict';

const store = require('../../../utils/neon-upload-store');

module.exports = {
  async find(ctx) {
    const { key } = ctx.params;

    if (!key) {
      ctx.throw(400, 'Missing file key');
    }

    const record = await store.getFile(key);
    if (!record || !record.data) {
      ctx.throw(404, 'File not found');
    }

    ctx.set('Cache-Control', 'public, max-age=31536000, immutable');
    if (record.mime) {
      ctx.type = record.mime;
    }
    if (record.size_bytes) {
      ctx.length = record.size_bytes;
    }

    ctx.body = record.data;
  },
};
