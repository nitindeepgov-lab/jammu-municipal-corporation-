/**
 * Vercel Serverless Function: BillDesk Payment Return URL Handler
 *
 * BillDesk redirects the user back via POST with content-type
 * application/x-www-form-urlencoded. Since Vercel serves a React SPA,
 * the POST body is lost when index.html loads.
 *
 * This function:
 * 1. Reads the POST form body
 * 2. Extracts the transaction_response (JOSE token)
 * 3. Redirects to /payment-status?transaction_response=<token>
 *
 * The React PaymentStatus page then reads the query parameter.
 */

export default function handler(req, res) {
  // Handle GET (user navigated directly or refresh)
  if (req.method === "GET") {
    const token = req.query.transaction_response || req.query.transactionResponse || "";
    if (token) {
      return res.redirect(302, `/payment-status?transaction_response=${encodeURIComponent(token)}`);
    }
    return res.redirect(302, "/payment-status");
  }

  // Handle POST from BillDesk
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
      // Redirect to SPA with token as query param
      return res.redirect(302, `/payment-status?transaction_response=${encodeURIComponent(token)}`);
    }

    // If no known field found, pass ALL form keys as a fallback debug
    // (BillDesk UAT might use a different field name)
    const allKeys = Object.keys(body);
    console.log("BillDesk payment-callback POST fields:", allKeys);

    // Try the first field that looks like a JOSE token (contains dots)
    for (const key of allKeys) {
      const value = body[key];
      if (typeof value === "string" && value.includes(".") && value.length > 100) {
        console.log(`Using field "${key}" as transaction response (${value.length} chars)`);
        return res.redirect(302, `/payment-status?transaction_response=${encodeURIComponent(value)}`);
      }
    }

    // Nothing found — redirect with error
    console.error("BillDesk payment-callback: no transaction token in POST body. Fields:", allKeys);
    return res.redirect(302, `/payment-status?error=no_token&fields=${encodeURIComponent(allKeys.join(","))}`);
  }

  // Other methods
  res.status(405).json({ error: "Method not allowed" });
}
