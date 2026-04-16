/**
 * Vercel Serverless Function: BillDesk POST handler at /payment-status
 *
 * BillDesk redirects users via POST with application/x-www-form-urlencoded.
 * This URL (/payment-status) is whitelisted with BillDesk — do NOT change.
 *
 * POST: Extract transaction_response token → redirect to /payment-result?transaction_response=<token>
 * GET:  Redirect to /payment-result with any existing query params (direct visits)
 */

export default function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body || {};

    // BillDesk sends the JOSE token in one of these form fields
    const token =
      body.transaction_response ||
      body.transactionResponse ||
      body.txnResponse ||
      body.response ||
      body.jws ||
      body.payload ||
      "";

    if (token) {
      return res.redirect(302, `/payment-result?transaction_response=${encodeURIComponent(token)}`);
    }

    // Fallback: try any field that looks like a JOSE token
    const allKeys = Object.keys(body);
    for (const key of allKeys) {
      const value = body[key];
      if (typeof value === "string" && value.includes(".") && value.length > 100) {
        return res.redirect(302, `/payment-result?transaction_response=${encodeURIComponent(value)}`);
      }
    }

    // Nothing found
    return res.redirect(302, `/payment-result?error=no_token`);
  }

  // GET — redirect to the SPA payment-result page preserving query params
  const qs = req.url?.includes("?") ? req.url.split("?")[1] : "";
  return res.redirect(302, `/payment-result${qs ? "?" + qs : ""}`);
}
