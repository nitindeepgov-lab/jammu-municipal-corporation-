# BillDesk Escalation - Empty Response Issue (URGENT)

## Issue Summary
After fixing BD-Timestamp format to YYYYMMDDHHmmss, BillDesk UAT API is still returning HTTP 200 with empty body for authenticated create-order requests.

## Confirmed Working
✅ **Timestamp Format**: Now correctly sending `YYYYMMDDHHmmss` (14 digits)
- Example: `20260415055326`
- Format verified in production logs

✅ **Request Structure**: All headers and payload are correct per documentation
✅ **Connectivity**: Requests reach BillDesk successfully
✅ **JOSE Format**: Symmetric JOSE (JWE wrapped in JWS) with correct algorithms

## Current Behavior

### Request Details
```
Method: POST
URL: https://uat1.billdesk.com/u2/payments/ve1_2/orders/create
Headers:
  Content-Type: application/jose
  Accept: application/jose
  BD-Traceid: <32-char hex uppercase>
  BD-Timestamp: 20260415055326 (14 digits, YYYYMMDDHHmmss)
  Connection: close
  User-Agent: Mozilla/5.0
Body: <Valid Symmetric JOSE token>
```

### Response Details
```
Status: 200 OK
Content-Length: 0
Body: (empty)
Set-Cookie: TS01d1e959=... (present)
```

### Retry Behavior
- First attempt: Empty body
- Retry with TS cookie: Still empty body
- Both attempts return 200 with empty body

## Evidence from Logs

**Latest Production Log (2026-04-15 05:53:27):**
```
timestamp: '20260415055326'
requestCookiePresent: true
nextCookiePresent: true
redirected: false
responseUrl: 'https://uat1.billdesk.com/u2/payments/ve1_2/orders/create'
bodyBytes: 0
status: 200
```

## Merchant Details
- **Merchant ID**: UATJMC02V2
- **Client ID**: uatjmc02v2
- **Environment**: UAT
- **JOSE Mode**: SYMMETRIC (JWE + JWS)
- **Signing Algorithm**: HS256 (HMAC-SHA256)
- **Encryption**: A256GCM (AES-256-GCM)

## Egress IP Address
**Current Egress IP**: 74.220.48.243 (Render deployment)

**Requested Whitelist**:
- 74.220.48.0/24
- 74.220.56.0/24

## Questions for BillDesk Support

### 1. IP Whitelisting Status
**Question**: Has the IP range 74.220.48.0/24 been whitelisted for merchant UATJMC02V2?

**Evidence**: 
- Control probe with invalid token returns proper 401 JSON error
- Authenticated request returns empty 200 (suggests IP-based filtering)

### 2. Merchant Profile Configuration
**Question**: Is there a specific merchant profile or routing configuration that might cause empty responses?

**Observed Pattern**:
- Invalid auth → 401 with JSON body ✓
- Valid auth → 200 with empty body ✗

This suggests authentication passes but something else blocks the response.

### 3. Edge Security Policy
**Question**: Does UAT environment have edge security policies that might suppress responses for:
- Specific egress IPs?
- Symmetric JOSE requests?
- Requests with certain header patterns?

### 4. Timestamp Format Confirmation
**Question**: Can you confirm the expected BD-Timestamp format for UAT environment?

**We're now sending**: `YYYYMMDDHHmmss` (14 digits, e.g., `20260415055326`)
**Previously sent**: Epoch seconds (10 digits)

### 5. Response Suppression Conditions
**Question**: Under what conditions would BillDesk return HTTP 200 with empty body instead of:
- 400/401 for authentication failures?
- 422 for validation errors?
- Proper JOSE response for success?

## Payload Sample

```json
{
  "mercid": "UATJMC02V2",
  "orderid": "JMC1776232173822AFB1AD",
  "amount": "10.00",
  "order_date": "2026-04-15T11:19:33+05:30",
  "currency": "356",
  "ru": "https://jammu-municipal-corporation.vercel.app/payment-status",
  "additional_info": ["JMC_FEE", "test", "NA", "NA", "NA", "NA", "NA"],
  "itemcode": "DIRECT",
  "device": {
    "init_channel": "internet",
    "ip": "0.0.0.0",
    "user_agent": "Mozilla/5.0"
  }
}
```

## Integration Details

### Webhook Configuration
**Webhook URL**: https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
- Protocol: HTTPS ✓
- Returns 200 OK immediately ✓
- Handles JOSE verification ✓

### Return URL
**Return URL**: https://jammu-municipal-corporation.vercel.app/payment-status

### API Endpoints
- Create Order: POST /u2/payments/ve1_2/orders/create
- Transaction Status: POST /u2/payments/ve1_2/transactions/get

## Timeline

1. **Initial Issue**: Empty 200 responses with epoch timestamp
2. **Fix Applied**: Changed BD-Timestamp to YYYYMMDDHHmmss format
3. **Deployed**: 2026-04-15 11:05 AM (commit c4b7d3c)
4. **Current Status**: Still getting empty 200 responses with correct timestamp

## Request for Action

**URGENT**: Please investigate why merchant UATJMC02V2 is receiving empty 200 responses from the create-order endpoint despite:
- Correct timestamp format (YYYYMMDDHHmmss)
- Valid JOSE token structure
- Proper headers and payload
- Successful connectivity to UAT endpoint

**Suspected Root Cause**: IP address 74.220.48.243 may not be whitelisted for authenticated API calls, even though it can reach the endpoint.

## Contact Information
- Project: Jammu Municipal Corporation (JMC)
- Environment: UAT Testing
- Merchant ID: UATJMC02V2
- Integration Type: Symmetric JOSE (Web SDK)

---

**Please prioritize this issue as it's blocking UAT testing for a government project.**
