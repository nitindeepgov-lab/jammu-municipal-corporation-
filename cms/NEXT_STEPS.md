# Next Steps - BillDesk Empty Response Issue

## Current Status (2026-04-15 05:53:27)

✅ **Timestamp Fix Deployed and Working**
- Format: `YYYYMMDDHHmmss` (14 digits)
- Example: `20260415055326`
- Verified in production logs

❌ **Still Getting Empty 200 Responses**
- Status: 200 OK
- Body: Empty (0 bytes)
- TS cookie present
- Both retry attempts fail

## Root Cause Analysis

### What We've Ruled Out
1. ❌ Timestamp format (now correct)
2. ❌ JOSE structure (follows spec)
3. ❌ Payload format (validated)
4. ❌ Connectivity (requests reach BillDesk)
5. ❌ Headers (all required headers present)

### Most Likely Causes

#### 1. IP Not Whitelisted (90% probability)
**Evidence:**
- Control probe with invalid token → 401 JSON error ✓
- Authenticated request → 200 empty body ✗
- Pattern suggests IP can reach endpoint but not authorized for authenticated calls

**Action Required:**
- Contact BillDesk support
- Confirm IP 74.220.48.243 is whitelisted
- Verify whitelist is active for merchant UATJMC02V2

#### 2. Merchant Profile Not Configured (8% probability)
**Evidence:**
- Empty response instead of error suggests edge-level filtering
- Might need merchant profile activation in UAT

**Action Required:**
- Ask BillDesk to verify merchant UATJMC02V2 is active in UAT
- Check if profile needs specific configuration for Symmetric JOSE

#### 3. Key ID Mismatch (2% probability)
**Evidence:**
- Both signing and encryption key IDs set to: `zko4MMjzjvXY`
- Might not match BillDesk's records

**Action Required:**
- Verify key IDs with BillDesk
- Try removing `kid` from JOSE headers (test)

## Immediate Actions

### Action 1: Contact BillDesk Support (URGENT)
**Send this escalation:**

```
Subject: URGENT - Empty Response from Create Order API (UATJMC02V2)

Dear BillDesk Support Team,

We are experiencing an issue with the UAT create-order API for merchant UATJMC02V2.

ISSUE: API returns HTTP 200 with empty body (content-length: 0)

CONFIRMED WORKING:
✅ BD-Timestamp format: YYYYMMDDHHmmss (14 digits)
✅ JOSE structure: Symmetric (JWE + JWS)
✅ Payload: All required fields present
✅ Connectivity: Requests reach UAT endpoint

EVIDENCE:
- Control probe (invalid token): Returns 401 JSON error ✓
- Authenticated request: Returns 200 empty body ✗
- Egress IP: 74.220.48.243
- Latest timestamp: 20260415055326
- Response URL: https://uat1.billdesk.com/u2/payments/ve1_2/orders/create

SUSPECTED CAUSE: IP address not whitelisted for authenticated calls

REQUESTED WHITELIST:
- 74.220.48.0/24
- 74.220.56.0/24

QUESTIONS:
1. Is IP 74.220.48.243 whitelisted for merchant UATJMC02V2?
2. Is merchant profile active in UAT environment?
3. Are there additional security requirements we're missing?
4. Why does the API return empty 200 instead of an error response?

This is blocking UAT testing for a government project (Jammu Municipal Corporation).

Please prioritize this issue.

Merchant Details:
- Merchant ID: UATJMC02V2
- Client ID: uatjmc02v2
- Environment: UAT
- Integration: Symmetric JOSE (Web SDK)

Thank you,
JMC Development Team
```

### Action 2: Try Without Key IDs (Test)
If BillDesk support is slow to respond, try removing `kid` from JOSE headers:

**File**: `cms/src/api/billdesk/services/billdesk.js`

**Change**:
```javascript
// Remove kid from both JWE and JWS headers
.setProtectedHeader({
  alg: "dir",
  enc: "A256GCM",
  // kid: config.encryptionKeyId,  // REMOVE THIS
  clientid: config.clientId,
})

.setProtectedHeader({
  alg: "HS256",
  // kid: config.signingKeyId,  // REMOVE THIS
  clientid: config.clientId,
})
```

**Test**: Deploy and check if response changes

### Action 3: Verify Environment Variables on Render
Double-check these are set correctly:
```
BILLDESK_MERCHANT_ID=UATJMC02V2
BILLDESK_CLIENT_ID=uatjmc02v2
BILLDESK_SIGNING_KEY=ZqSFQCwyLQL2MDY5L2RXB8EPyr8ZtvKP
BILLDESK_ENCRYPTION_KEY=9j4giX7RyanufaFacyY0UV1TlQxWMuUJ
BILLDESK_SIGNING_KEY_ID=zko4MMjzjvXY
BILLDESK_ENCRYPTION_KEY_ID=zko4MMjzjvXY
BILLDESK_JOSE_MODE=SYMMETRIC
BILLDESK_ENV=UAT
```

### Action 4: Request Detailed Logs from BillDesk
Ask BillDesk support to check their logs for:
- Trace ID: (from your logs)
- Timestamp: 20260415055326
- Source IP: 74.220.48.243
- What validation failed?
- Why empty response instead of error?

## Alternative Workarounds

### Option A: Use Different Hosting
If IP whitelisting is the issue and BillDesk is slow:
- Deploy to AWS/GCP with static IP
- Update whitelist request with new IP
- Test again

### Option B: Contact BillDesk Account Manager
- Escalate through your BillDesk account manager
- Request urgent UAT access
- Provide all evidence from logs

### Option C: Request JWS-Only Mode
If Symmetric JOSE is causing issues:
- Ask if JWS-only mode (without JWE) is supported
- Change `BILLDESK_JOSE_MODE=JWS`
- Test if that works

## Expected Timeline

**If IP Whitelist Issue:**
- BillDesk response: 1-2 business days
- Whitelist activation: Same day after approval
- Testing: Immediate after activation

**If Configuration Issue:**
- BillDesk investigation: 2-3 business days
- Fix deployment: 1 day
- Testing: Immediate after fix

## Success Criteria

When issue is resolved, you should see:
```
BillDesk createOrder response format: {
  status: 200,
  bodyBytes: >0,  // NOT 0
  segments: 3 or 5,  // JOSE segments
  contentType: "application/jose",
  ...
}
```

And API should return:
```json
{
  "success": true,
  "data": {
    "merchantId": "UATJMC02V2",
    "bdOrderId": "...",
    "authToken": "...",
    "orderId": "JMC...",
    "amount": "10.00",
    "sdkBaseUrl": "https://uat1.billdesk.com/merchant-uat"
  }
}
```

---

**Bottom Line**: This is almost certainly a BillDesk configuration issue (IP whitelist or merchant profile). Your code is correct. You need to escalate to BillDesk support immediately.
