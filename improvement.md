BillDesk Integration Improvements & Fix Plan

:pushpin: Overview

This document outlines the issues identified in the current BillDesk integration and the required improvements to stabilize and successfully complete the payment flow.

:rotating_light: Current Issues Identified

1. Duplicate Implementations (Critical)

There are multiple implementations of the same logic:

controllers/

  billdesk-v2.js

  billdesk.js

services/

  billdesk-v2.js

  billdesk.js

Problem:

Conflicting logic between old and new implementations

Strapi may resolve the wrong service at runtime

Environment variables differ between versions

Leads to unexpected failures (500 errors)

2. Incorrect Debug Visibility

The controller is swallowing real errors:

ctx.internalServerError("Failed to initialize payment. Please try again.");

Problem:

Actual BillDesk error is hidden

Debugging becomes extremely difficult

3. Environment Variable Mismatch

Two different naming conventions exist:

Version 1:

BILLDESK_SIGNING_KEY

BILLDESK_ENCRYPTION_KEY

Version 2:

BILLDESK_SIGNING_PASSWORD

BILLDESK_ENCRYPTION_PASSWORD

Problem:

If env variables don’t match deployed code → config fails

Causes immediate backend failure before API call

4. Misunderstanding of Headers

Expected headers:

BD-Traceid

BD-Timestamp

Content-Type: application/jose

Accept: application/jose

Clarification:

These headers are NOT visible in browser

They are sent from backend → BillDesk

Missing/malformed headers → request rejected

5. Lack of Logging in Service Layer

Currently insufficient logs to debug:

Request headers not logged

API response not logged

JOSE payload flow not traceable

6. Possible Environment Misconfiguration

From checklist:

Domain may not be whitelisted

UAT vs Production endpoints mismatch

Incorrect credentials

:white_check_mark: Required Fixes

:fire: 1. Remove Duplicate Code (HIGH PRIORITY)

DELETE:

controllers/billdesk.js

services/billdesk.js

KEEP:

controllers/billdesk-v2.js

services/billdesk-v2.js

:fire: 2. Ensure Correct Service Binding

Controller must use:

strapi.service("api::billdesk.billdesk-v2")

:fire: 3. Fix Environment Variables

Ensure Render has EXACT variables:

BILLDESK_MERCHANT_ID=

BILLDESK_CLIENT_ID=

BILLDESK_SIGNING_PASSWORD=

BILLDESK_ENCRYPTION_PASSWORD=

BILLDESK_ENV=UAT

BILLDESK_RETURN_URL=

:fire: 4. Add Debug Logs (MANDATORY)

Add inside createOrder service:

console.log("CONFIG CHECK:", {

  merchantId: config.merchantId,

  clientId: config.clientId,

  hasSigningKey: !!config.signingKeyBytes,

  hasEncryptionKey: !!config.encryptionKeyBytes,

  url: config.createOrderUrl,

});

Add after API call:

console.log("BILLDESK RESPONSE:", {

  status: response.status,

  body: response.body?.slice(0, 200),

});

Add error logging:

catch (error) {

  console.error("BILLDESK ERROR:", error.message);

  console.error("STACK:", error.stack);

  throw error;

}

:fire: 5. Clear Strapi Cache After Changes

Run:

rm -rf .cache build

npm run develop

Why:

Strapi caches services — old code may still run without clearing cache.

:fire: 6. Validate Request Format

Ensure:

Content-Type: application/jose

Body is JOSE token, not JSON

Amount format:

"10.00" ✅

"10" ❌

:fire: 7. Verify BillDesk Response Handling

Ensure:

Response is not empty

JOSE token is properly decrypted

status === "ACTIVE"

objectid === "order"

:fire: 8. Domain Whitelisting (External)

From BillDesk checklist:

• Whitelist:

Vercel frontend domain

Render backend domain (if required)

:test_tube: Debugging Checklist

Before testing:

 Duplicate files removed

 Env variables verified

 Logs added

 Cache cleared

 Correct service used

During testing:

 Backend logs show request headers

 API response is logged

 No empty response from BillDesk

 JOSE decryption succeeds

:dart: Expected Working Flow

Frontend (React - Vercel)

    ↓

POST /billdesk/create-order (Render Backend)

    ↓

Backend creates JOSE payload

    ↓

Backend calls BillDesk API (with headers)

    ↓

BillDesk returns order + redirect link

    ↓

Backend sends config to frontend

    ↓

Frontend redirects user to BillDesk payment page

:rocket: Final Goal

No 500 errors

Successful order creation

Redirect to BillDesk payment page

Proper transaction verification

:brain: Key Takeaway

The issue is NOT in frontend or routes —

it is caused by conflicting backend implementations + misconfigured service layer.

:pushpin: Next Step

If issue persists after applying all fixes:

Share backend logs

Share BillDesk API response log

Debug deeper into JOSE/encryption layer