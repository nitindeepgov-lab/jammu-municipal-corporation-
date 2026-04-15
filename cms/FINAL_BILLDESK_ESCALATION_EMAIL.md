# URGENT: BillDesk UAT Integration Issue - Empty Response

**To**: BillDesk Support Team  
**CC**: Devesh Yadav, Project Stakeholders  
**Subject**: URGENT - Empty 200 Response from Create Order API (Merchant: UATJMC02V2)  
**Priority**: HIGH  

---

## Issue Summary

We are unable to complete UAT testing for the Jammu Municipal Corporation (JMC) project due to BillDesk UAT API returning HTTP 200 with empty body for all create-order requests.

**Merchant ID**: UATJMC02V2  
**Client ID**: uatjmc02v2  
**Environment**: UAT  
**Issue Duration**: Since April 6, 2026 (9 days)  

---

## Current Behavior

### Request Details
```
Method: POST
URL: https://uat1.billdesk.com/u2/payments/ve1_2/orders/create
Headers:
  Content-Type: application/jose
  Accept: application/jose
  BD-Traceid: <32-char hex uppercase>
  BD-Timestamp: 20260415055326 (YYYYMMDDHHmmss format, 14 digits)
  Connection: close
  User-Agent: Mozilla/5.0
Body: Valid Symmetric JOSE token (JWS wrapping JWE)
```

### Response Details
```
Status: 200 OK
Content-Length: 0
Body: (completely empty)
Set-Cookie: TS01d1e959=... (present)
```

**This happens consistently for ALL authenticated requests, even after retry attempts.**

---

## What We've Verified

### ✅ Our Implementation is Correct

1. **BD-Timestamp Format**: `YYYYMMDDHHmmss` (14 digits)
   - Example: `20260415055326`
   - Verified in production logs

2. **BD-Traceid Format**: 32-character hex uppercase
   - Unique per request
   - Meets idempotency requirements

3. **JOSE Structure**: Symmetric JOSE (JWE + JWS)
   - JWE: `alg: "dir"`, `enc: "A256GCM"`
   - JWS: `alg: "HS256"`
   - Includes `clientid: "uatjmc02v2"` in headers
   - Tested with and without `kid` field - both fail

4. **Payload**: All required fields present
   ```json
   {
     "mercid": "UATJMC02V2",
     "orderid": "JMC...",
     "amount": "10.00",
     "order_date": "2026-04-15T11:19:33+05:30",
     "currency": "356",
     "ru": "https://jammu-municipal-corporation.vercel.app/payment-status",
     "additional_info": ["JMC_FEE", "test", "NA", "NA", "NA", "NA", "NA"],
     "itemcode": "DIRECT",
     "device": {...}
   }
   ```

5. **Connectivity**: Requests successfully reach BillDesk UAT endpoint

### 🔍 Diagnostic Evidence

**Control Test (Invalid Token)**:
- Request: Invalid JOSE token from same IP
- Response: **401 with JSON error body** ✓
- Conclusion: Connectivity and basic routing work

**Authenticated Request**:
- Request: Valid JOSE token with correct credentials
- Response: **200 with empty body** ✗
- Conclusion: Authentication passes but response is suppressed

**This pattern strongly suggests IP whitelisting or merchant configuration issue.**

---

## Whitelist Request (Sent April 6, 2026)

### Outbound IP Addresses
```
74.220.48.0/24
74.220.56.0/24
```
**Current Egress IP**: 74.220.48.243 (within requested range)

### Webhook URL
```
https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
```

### Return URL
```
https://jammu-municipal-corporation.vercel.app/payment-status
```

---

## Questions for BillDesk Support

### 1. IP Whitelist Status (CRITICAL)
**Question**: Has the IP range 74.220.48.0/24 been whitelisted for merchant UATJMC02V2 in UAT environment?

**Why we ask**: 
- Invalid token from same IP → Returns proper 401 error
- Valid token from same IP → Returns empty 200
- This suggests IP can reach endpoint but isn't authorized for authenticated operations

### 2. Merchant Profile Status
**Question**: Is merchant UATJMC02V2 fully activated and configured in UAT environment?

**Why we ask**: Empty response instead of error suggests edge-level filtering or incomplete merchant setup

### 3. Key Configuration
**Question**: Are the following key IDs correct for our merchant?
- Signing Key ID: `zko4MMjzjvXY`
- Encryption Key ID: `zko4MMjzjvXY`

**Why we ask**: We tested with and without `kid` field - both fail, but want to confirm correct values

### 4. Response Behavior
**Question**: Under what conditions does BillDesk return HTTP 200 with empty body instead of:
- 400/401 for authentication failures?
- 422 for validation errors?
- Proper JOSE response for success?

**Why we ask**: This behavior is unusual and makes debugging difficult

### 5. Additional Requirements
**Question**: Are there any additional security requirements, headers, or configuration steps needed for UAT access that we might be missing?

---

## Impact

**Project**: Jammu Municipal Corporation (Government Project)  
**Status**: UAT testing blocked for 9 days  
**Impact**: Cannot proceed with payment integration testing  
**Urgency**: HIGH - Government project with deadlines  

---

## Request for Action

1. **Verify IP whitelist** is active for 74.220.48.0/24 and 74.220.56.0/24
2. **Confirm merchant profile** UATJMC02V2 is fully configured in UAT
3. **Check UAT logs** for our requests:
   - Source IP: 74.220.48.243
   - Latest timestamp: 20260415055326
   - What validation is failing?
   - Why empty response instead of error?
4. **Provide guidance** on any missing configuration or requirements

---

## Technical Contact

**Developer**: JMC Development Team  
**Email**: [Your Email]  
**Phone**: [Your Phone]  

**Available for**:
- Screen sharing session
- Log sharing
- Sample JOSE token comparison
- Any additional testing required

---

## Attachments

We can provide:
1. Complete request/response logs
2. Sample JOSE tokens for verification
3. Diagnostic output from our system
4. Any additional technical details needed

---

## Timeline Request

Given the government project nature and 9-day delay, we request:
- **Initial response**: Within 24 hours
- **Issue resolution**: Within 48 hours
- **Escalation contact**: If standard support cannot resolve quickly

---

**Thank you for your urgent attention to this matter.**

Best regards,  
JMC Development Team

---

## For Internal Reference

**Commits tested**:
- c4b7d3c: Timestamp fix (YYYYMMDDHHmmss)
- 5df183c: Removed kid field test
- Both still return empty 200 response

**Conclusion**: Issue is on BillDesk side, not our implementation.
