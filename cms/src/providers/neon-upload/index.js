'use strict';

const { errors, file: fileUtils } = require('@strapi/utils');
const store = require('../../utils/neon-upload-store');

const { PayloadTooLargeError } = errors;
const { kbytesToBytes, bytesToHumanReadable } = fileUtils;

function getDefaultPublicPath() {
  const apiPrefix = global.strapi?.config?.get?.('api.rest.prefix');
  const prefix =
    typeof apiPrefix === 'string' && apiPrefix.trim()
      ? apiPrefix.trim()
      : '/api';
  const normalized = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;
  return `${normalized}/neon-uploads`;
}

function normalizePublicPath(value) {
  if (!value) {
    return getDefaultPublicPath();
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return getDefaultPublicPath();
  }

  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

module.exports = {
  init(options = {}) {
    const { sizeLimit: providerOptionsSizeLimit, publicPath } = options;
    const basePath = normalizePublicPath(publicPath);

    return {
      checkFileSize(file, { sizeLimit } = {}) {
        if (providerOptionsSizeLimit) {
          if (kbytesToBytes(file.size) > providerOptionsSizeLimit) {
            throw new PayloadTooLargeError(
              `${file.name} exceeds size limit of ${bytesToHumanReadable(
                providerOptionsSizeLimit
              )}.`
            );
          }
        } else if (sizeLimit) {
          if (kbytesToBytes(file.size) > sizeLimit) {
            throw new PayloadTooLargeError(
              `${file.name} exceeds size limit of ${bytesToHumanReadable(
                sizeLimit
              )}.`
            );
          }
        }
      },

      async upload(file) {
        if (!file.buffer) {
          throw new Error('Missing file buffer');
        }

        const key = `${file.hash}${file.ext}`;

        await store.putFile({
          key,
          hash: file.hash,
          ext: file.ext,
          mime: file.mime,
          size: file.size,
          sizeInBytes: file.sizeInBytes,
          name: file.name,
          buffer: file.buffer,
        });

        file.url = `${basePath}/${key}`;
      },

      async delete(file) {
        const key = `${file.hash}${file.ext}`;
        await store.deleteFile(key);
      },
    };
  },
};
