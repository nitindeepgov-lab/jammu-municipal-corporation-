# Test Without Key ID (kid) - Deployment Instructions

## Change Made
Removed `kid` (Key ID) field from both JWE and JWS headers to test if it's causing BillDesk to reject requests.

**Commit**: 5df183c
**Message**: "test: remove kid from JOSE headers to test BillDesk compatibility"

## What Changed

### Before:
```javascript
.setProtectedHeader({
  alg: "dir",
  enc: "A256GCM",
  kid: "zko4MMjzjvXY",  // ← REMOVED
  clientid: "uatjmc02v2",
})

.setProtectedHeader({
  alg: "HS256",
  kid: "zko4MMjzjvXY",  // ← REMOVED
  clientid: "uatjmc02v2",
})
```

### After:
```javascript
.setProtectedHeader({
  alg: "dir",
  enc: "A256GCM",
  clientid: "uatjmc02v2",
})

.setProtectedHeader({
  alg: "HS256",
  clientid: "uatjmc02v2",
})
```

## Deployment Steps

### 1. Wait for Render Deployment
- Go to: https://dashboard.render.com
- Check deployment status
- Wait for "Your service is live 🎉"
- Usually takes 2-5 minutes

### 2. Test Immediately After Deploy
```bash
curl -X POST 'https://jammu-municipal-corporation.onrender.com/api/billdesk/create-order' \
  -H 'Content-Type: application/json' \
  --data '{
    "amount": "10.00",
    "customerName": "Test User",
    "customerEmail": "test@test.com",
    "customerMobile": "9999999999",
    "feeType": "JMC_FEE",
    "additionalInfo": {"dept": "test"}
  }'
```

### 3. Check Render Logs
Look for:
```
BillDesk createOrder response format: {
  attempt: 1,
  status: 200,
  bodyBytes: ?,  // Check if > 0
  segments: ?,   // Check if 3 or 5
  ...
}
```

## Expected Outcomes

### Scenario A: Success (kid was the issue)
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

**Action**: Keep the change, kid was causing issues

### Scenario B: Still Empty Body (kid not the issue)
```
BillDesk createOrder error: BillDesk returned empty response body
bodyBytes: 0
```

**Action**: 
1. Revert the change (kid is required)
2. Escalate to BillDesk about IP whitelist
3. This confirms it's a BillDesk configuration issue

### Scenario C: Different Error
```json
{
  "error": {
    "status": 401,
    "message": "..."
  }
}
```

**Action**: Check error message, might give clues about what's wrong

## If Still Failing

### Revert the Change
```bash
cd jammu-municipal-corporation-/cms
git revert HEAD
git push origin main
```

### Escalate to BillDesk
Use the email template from `BILLDESK_ESCALATION_FINAL.md`:

**Key Points:**
1. Tested with and without `kid` field
2. Both return empty 200 response
3. Timestamp format is correct (14 digits)
4. JOSE structure is correct
5. Request IP whitelist verification

## Timeline

- **Pushed**: Just now
- **Deploy**: 2-5 minutes
- **Test**: Immediately after deploy
- **Decision**: Within 10 minutes

## Notes

- This is a diagnostic test
- If it doesn't work, we'll revert
- The real issue is likely IP whitelist, not JOSE format
- But worth testing to rule out `kid` as the problem

---

**Status**: Waiting for Render deployment...
**Next**: Test as soon as deployment completes
