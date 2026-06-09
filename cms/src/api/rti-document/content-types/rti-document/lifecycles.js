"use strict";

const { ValidationError } = require("@strapi/utils").errors;

const isPdfAttachment = (document) => {
  if (!document || typeof document !== "object") return false;

  const mime = document.mime || document.mimeType || document?.data?.attributes?.mime;
  const url = document.url || document?.data?.attributes?.url || "";

  return (
    mime === "application/pdf" ||
    (typeof url === "string" && url.toLowerCase().endsWith(".pdf"))
  );
};

module.exports = {
  async beforeCreate(event) {
    const document = event.params.data.document;
    if (document && !isPdfAttachment(document)) {
      throw new ValidationError("RTI document must be a PDF file.");
    }
  },

  async beforeUpdate(event) {
    if (Object.prototype.hasOwnProperty.call(event.params.data, "document")) {
      const document = event.params.data.document;
      if (document && !isPdfAttachment(document)) {
        throw new ValidationError("RTI document must be a PDF file.");
      }
    }
  },
};
