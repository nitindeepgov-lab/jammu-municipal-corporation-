/**
 * Diagnostic Controller
 * Helps verify BillDesk configuration
 */

"use strict";

module.exports = {
  /**
   * GET /api/billdesk/config-check
   * 
   * Returns configuration status (without exposing sensitive data)
   */
  async configCheck(ctx) {
    const config = {
      merchantId: process.env.BILLDESK_MERCHANT_ID || "NOT_SET",
      clientId: process.env.BILLDESK_CLIENT_ID || "NOT_SET",
      keyId: process.env.BILLDESK_KEY_ID || "NOT_SET",
      signingPasswordSet: !!process.env.BILLDESK_SIGNING_PASSWORD,
      encryptionPasswordSet: !!process.env.BILLDESK_ENCRYPTION_PASSWORD,
      signingPasswordLength: process.env.BILLDESK_SIGNING_PASSWORD?.length || 0,
      encryptionPasswordLength: process.env.BILLDESK_ENCRYPTION_PASSWORD?.length || 0,
      baseUrl: process.env.BILLDESK_BASE_URL || "NOT_SET",
      returnUrl: process.env.BILLDESK_RETURN_URL || "NOT_SET",
      env: process.env.BILLDESK_ENV || "NOT_SET",
    };

    ctx.send({
      success: true,
      config,
      allVariablesSet: 
        config.merchantId !== "NOT_SET" &&
        config.clientId !== "NOT_SET" &&
        config.signingPasswordSet &&
        config.encryptionPasswordSet,
    });
  },
};
