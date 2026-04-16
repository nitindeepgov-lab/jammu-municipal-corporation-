/**
 * Diagnostic Controller
 * Helps verify BillDesk configuration, egress IP, and JOSE token structure.
 *
 * @version 2.1.0
 */

"use strict";

const crypto = require("crypto");
const { CompactEncrypt, CompactSign } = require("jose");

module.exports = {
  /**
   * GET /api/billdesk/config-check
   *
   * Returns:
   * - Configuration status (no secrets)
   * - Server egress IP (what BillDesk sees)
   * - BD-Timestamp format validation
   * - JOSE token structure validation (first 40 chars only)
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
      fallbackDeviceIp: process.env.BILLDESK_FALLBACK_DEVICE_IP || "NOT_SET",
    };

    // ── Timestamp check ─────────────────────────────────
    const now = new Date();
    const istOffset = 330;
    const istDate = new Date(now.getTime() + istOffset * 60 * 1000);
    const istTimestamp = [
      istDate.getUTCFullYear(),
      String(istDate.getUTCMonth() + 1).padStart(2, "0"),
      String(istDate.getUTCDate()).padStart(2, "0"),
      String(istDate.getUTCHours()).padStart(2, "0"),
      String(istDate.getUTCMinutes()).padStart(2, "0"),
      String(istDate.getUTCSeconds()).padStart(2, "0"),
    ].join("");

    const serverLocalTimestamp = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
      String(now.getSeconds()).padStart(2, "0"),
    ].join("");

    // ── Egress IP ───────────────────────────────────────
    let egressIp = "UNKNOWN";
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json", {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        egressIp = ipData.ip || "UNKNOWN";
      }
    } catch (e) {
      egressIp = `ERROR: ${e.message}`;
    }

    // ── JOSE token structure test ────────────────────────
    let joseTest = { ok: false, error: "not attempted" };
    try {
      const enc = new TextEncoder();
      const signingKey = process.env.BILLDESK_SIGNING_PASSWORD;
      const encryptionKey = process.env.BILLDESK_ENCRYPTION_PASSWORD;
      const clientId = process.env.BILLDESK_CLIENT_ID;
      const keyId = process.env.BILLDESK_KEY_ID;

      if (signingKey && encryptionKey && clientId) {
        const testPayload = { test: true, mercid: config.merchantId };
        const sigBytes = enc.encode(signingKey);
        const encBytes = enc.encode(encryptionKey);

        // Step 1: JWE
        const jweHeader = { alg: "dir", enc: "A256GCM", clientid: clientId };
        if (keyId) jweHeader.kid = keyId;
        const jwe = await new CompactEncrypt(enc.encode(JSON.stringify(testPayload)))
          .setProtectedHeader(jweHeader)
          .encrypt(encBytes);

        // Step 2: JWS
        const jwsHeader = { alg: "HS256", clientid: clientId };
        if (keyId) jwsHeader.kid = keyId;
        const jws = await new CompactSign(enc.encode(jwe))
          .setProtectedHeader(jwsHeader)
          .sign(sigBytes);

        const jwsParts = jws.split(".");
        const jweParts = jwe.split(".");

        joseTest = {
          ok: true,
          jwsSegments: jwsParts.length,
          jweSegments: jweParts.length,
          jwsHeaderPreview: jwsParts[0].substring(0, 60),
          totalTokenLength: jws.length,
          signingKeyBytesUsed: sigBytes.length,
          encryptionKeyBytesUsed: encBytes.length,
          a256gcmKeyRequirement: "32 bytes",
          keyLengthMatch: encBytes.length === 32,
        };
      }
    } catch (e) {
      joseTest = { ok: false, error: e.message };
    }

    // ── Invalid-token probe ─────────────────────────────
    // Send garbage to BillDesk to see if their server responds at all.
    // If they respond with an error, the egress IP is whitelisted.
    // If empty/timeout, the egress IP is blocked.
    let probeResult = { ok: false, error: "not attempted" };
    try {
      const traceId = crypto.randomBytes(16).toString("hex").toUpperCase();
      const probeUrl = (process.env.BILLDESK_BASE_URL || "https://uat1.billdesk.com")
        + "/u2/payments/ve1_2/orders/create";

      const probeRes = await fetch(probeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/jose",
          "Accept": "application/jose",
          "BD-Traceid": traceId,
          "BD-Timestamp": istTimestamp,
        },
        body: "invalid.jose.token",
        signal: AbortSignal.timeout(10000),
      });

      const probeBody = await probeRes.text();
      const probeHeaders = {};
      probeRes.headers.forEach((v, k) => { probeHeaders[k] = v; });

      probeResult = {
        ok: true,
        httpStatus: probeRes.status,
        statusText: probeRes.statusText,
        bodyBytes: probeBody.length,
        bodyPreview: probeBody.substring(0, 200),
        responseHeaders: probeHeaders,
        interpretation: probeBody.length > 0
          ? "BillDesk responded — egress IP is likely WHITELISTED"
          : probeRes.status === 200
            ? "BillDesk returned empty 200 — egress IP may NOT be whitelisted (WAF blocking)"
            : "Non-200 response — check BillDesk server status",
      };
    } catch (e) {
      probeResult = { ok: false, error: e.message };
    }

    ctx.send({
      success: true,
      config,
      allVariablesSet:
        config.merchantId !== "NOT_SET" &&
        config.clientId !== "NOT_SET" &&
        config.signingPasswordSet &&
        config.encryptionPasswordSet,
      timestamps: {
        serverUtcNow: now.toISOString(),
        bdTimestampIST: istTimestamp,
        bdTimestampLocal: serverLocalTimestamp,
        match: istTimestamp === serverLocalTimestamp,
        note: istTimestamp === serverLocalTimestamp
          ? "Server is in IST — timestamps match"
          : `Server is NOT in IST — using IST-shifted timestamp (${istTimestamp}) instead of local (${serverLocalTimestamp})`,
      },
      egressIp,
      joseTest,
      probeResult,
    });
  },
};
