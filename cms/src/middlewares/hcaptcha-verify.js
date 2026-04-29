"use strict";

/**
 * hCaptcha Verification Middleware
 * ────────────────────────────────
 * Intercepts Strapi admin login requests and verifies
 * the hCaptcha token before allowing authentication.
 *
 * Activated only on POST /admin/login
 */

const HCAPTCHA_VERIFY_URL = "https://api.hcaptcha.com/siteverify";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Only intercept admin login POST requests
    const isAdminLogin =
      ctx.method === "POST" &&
      (ctx.path === "/admin/login" || ctx.path === "/admin/login/");

    if (!isAdminLogin) {
      return next();
    }

    const secret = process.env.HCAPTCHA_SECRET_KEY;

    // If no secret key is configured, skip verification (dev mode safety)
    if (!secret) {
      strapi.log.warn(
        "[hCaptcha] HCAPTCHA_SECRET_KEY not set — skipping verification"
      );
      return next();
    }

    // Extract hCaptcha token from request body
    const hcaptchaToken =
      ctx.request.body?.["h-captcha-response"] ||
      ctx.request.body?.hcaptchaToken;

    if (!hcaptchaToken) {
      ctx.status = 400;
      ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message:
            "Please complete the captcha verification before logging in.",
          details: {},
        },
      };
      return;
    }

    // Verify token with hCaptcha API
    try {
      const params = new URLSearchParams();
      params.append("secret", secret);
      params.append("response", hcaptchaToken);

      // Include client IP for improved accuracy
      const clientIp =
        ctx.request.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        ctx.request.ip;
      if (clientIp) {
        params.append("remoteip", clientIp);
      }

      // Optionally include sitekey for extra security
      const siteKey = process.env.HCAPTCHA_SITE_KEY;
      if (siteKey) {
        params.append("sitekey", siteKey);
      }

      const response = await fetch(HCAPTCHA_VERIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const result = await response.json();

      if (!result.success) {
        strapi.log.warn(
          `[hCaptcha] Verification failed: ${JSON.stringify(result["error-codes"] || [])}`
        );

        ctx.status = 403;
        ctx.body = {
          data: null,
          error: {
            status: 403,
            name: "ForbiddenError",
            message:
              "Captcha verification failed. Please try again.",
            details: {
              errorCodes: result["error-codes"] || [],
            },
          },
        };
        return;
      }

      strapi.log.info(
        `[hCaptcha] Verification passed for ${result.hostname || "unknown"}`
      );
    } catch (error) {
      strapi.log.error(`[hCaptcha] API error: ${error.message}`);

      // On network errors, deny access (fail-closed security)
      ctx.status = 500;
      ctx.body = {
        data: null,
        error: {
          status: 500,
          name: "InternalServerError",
          message:
            "Captcha service is temporarily unavailable. Please try again later.",
          details: {},
        },
      };
      return;
    }

    // Token verified — proceed to normal Strapi login
    return next();
  };
};
