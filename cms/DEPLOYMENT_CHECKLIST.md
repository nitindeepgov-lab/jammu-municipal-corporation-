# BillDesk Fix Deployment Checklist

## Critical Fix Applied
✅ **BD-Timestamp format corrected** from epoch seconds to `YYYYMMDDHHmmss` format

## Changes Made

### 1. Code Changes
- ✅ Updated `getBillDeskHeaderTimestamp()` function
- ✅ Updated `getBillDeskTraceId()` for better uniqueness
- ✅ Applied changes to both create-order and transaction-status calls
- ✅ Removed obsolete `BILLDESK_TIMESTAMP_UNIT` environment variable

### 2. Files Modified
- `cms/src/api/billdesk/services/billdesk.js` - Core timestamp fix
- `cms/.env` - Removed obsolete env var
- `cms/scripts/test-timestamp-format.js` - Test script (verified ✅)

## Deployment Steps

### Step 1: Commit Changes
```bash
cd jammu-municipal-corporation-/cms
git add .
git commit -m "fix: correct BillDesk BD-Timestamp header format to YYYYMMDDHHmmss"
git push origin main
```

### Step 2: Deploy to Render
1. Push will trigger auto-deploy on Render
2. OR manually deploy from Render dashboard
3. Wait for deploy to complete (check status)

### Step 3: Update Render Environment Variables
Remove the obsolete variable:
```
BILLDESK_TIMESTAMP_UNIT=SECONDS  ❌ DELETE THIS
```

Keep diagnostic probe enabled:
```
BILLDESK_DIAGNOSTIC_PROBE=true  ✅ KEEP THIS
```

### Step 4: Test Immediately After Deploy
```bash
# Test create-order endpoint
curl -X POST 'https://jammu-municipal-corporation.onrender.com/api/billdesk/create-order' \
  -H 'Content-Type: application/json' \
  --data '{
    "amount": "10.00",
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "customerMobile": "9999999999",
    "feeType": "JMC_FEE",
    "additionalInfo": {"dept": "test"}
  }'
```

### Step 5: Check Logs
Look for diagnostic output in Render logs:
```
BillDesk runtime diagnostics: {
  egress: { ok: true, ip: "74.220.48.243" },
  invalidTokenProbe: { ok: true, status: 401, ... }
}

BillDesk createOrder response format: {
  attempt: 1,
  status: 200,
  contentType: "application/jose",
  bodyBytes: >0,
  segments: 3 or 5,
  ...
}
```

## Expected Results

### ✅ Success Indicators
- HTTP 200 with **non-empty body**
- `bodyBytes` > 0
- `segments` = 3 (JWS) or 5 (JWE)
- `contentType` = "application/jose"
- Response contains `bdorderid` and `authToken`

### ❌ Failure Indicators
- HTTP 200 with empty body (content-length: 0)
- HTTP 500 "Failed to initialize payment"
- HTTP 401/403 errors

## If Still Failing

### Scenario A: Still Empty 200 Response
**Action:** Escalate to BillDesk with updated evidence
- Confirm timestamp format is now: `YYYYMMDDHHmmss`
- Request IP whitelist verification
- Ask about additional security requirements

### Scenario B: Different Error (401, 403, 422)
**Action:** Check error response body
- 401: Authentication issue (check credentials)
- 403: Authorization/IP not whitelisted
- 422: Payload validation error

### Scenario C: Success!
**Action:** 
1. Test full payment flow end-to-end
2. Test transaction-status endpoint
3. Test webhook handling
4. Disable diagnostic probe in production

## Whitelist Request Status

Your whitelist request is **CORRECT** and ready to send:

```
Outbound IPs: 74.220.48.0/24, 74.220.56.0/24
Webhook URL: https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
Return URL: https://jammu-municipal-corporation.vercel.app/payment-status
```

**Additional Info to Include:**
- Merchant ID: UATJMC02V2
- Client ID: uatjmc02v2
- BD-Timestamp Format: YYYYMMDDHHmmss (14 digits)
- Integration Type: Symmetric JOSE (JWE + JWS)

## Contact Points

If issues persist after this fix:
1. Check Render logs for diagnostic output
2. Verify timestamp format in logs (should be 14 digits)
3. Contact BillDesk support with trace IDs from logs
4. Reference: `BILLDESK_IMPLEMENTATION_REVIEW.md` for full analysis

---

**Confidence Level:** HIGH - The timestamp format was definitively wrong per BillDesk docs. This fix should resolve the empty response issue.
