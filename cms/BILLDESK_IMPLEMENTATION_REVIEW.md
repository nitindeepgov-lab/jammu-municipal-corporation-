# BillDesk Implementation Review - JMC Project

## Documentation Review Summary

Based on [BillDesk official documentation](https://docs.billdesk.io) and your implementation, here's the compliance analysis:

---

## ✅ CORRECT IMPLEMENTATIONS

### 1. Symmetric JOSE Format
**Your Implementation:**
```javascript
// JWE (encryption) wrapped in JWS (signature)
const jwe = await new CompactEncrypt(encoder.encode(JSON.stringify(payload)))
  .setProtectedHeader({
    alg: "dir",
    enc: "A256GCM",
    kid: config.encryptionKeyId,
    clientid: config.clientId,
  })
  .encrypt(encryptionKey);

const jws = await new CompactSign(encoder.encode(jwe))
  .setProtectedHeader({
    alg: "HS256",
    kid: config.signingKeyId,
    clientid: config.clientId,
  })
  .sign(config.signingKeyBytes);
```

**Status:** ✅ **CORRECT**
- Encryption: A256GCM (AES-256-GCM) ✓
- Signing: HS256 (HMAC-SHA256) ✓
- Structure: JWE wrapped in JWS ✓
- Headers include `clientid` ✓

### 2. Create Order Payload
**Your Implementation:**
```javascript
{
  mercid: config.merchantId,
  orderid: orderId,
  amount: parsedAmount.toFixed(2),
  order_date: getBillDeskTimestamp(), // ISO format with timezone
  currency: "356", // INR
  ru: returnUrl,
  additional_info: [/* 7 strings */],
  itemcode: "DIRECT",
  device: {
    init_channel: "internet",
    ip: "0.0.0.0",
    user_agent: "Mozilla/5.0",
  },
}
```

**Status:** ✅ **CORRECT**
- All required fields present ✓
- `additional_info` is array of 7 strings (not PII) ✓
- `order_date` in ISO format with timezone ✓
- Currency code 356 for INR ✓

### 3. Transaction Status Payload
**Your Implementation:**
```javascript
{
  mercid: config.merchantId,
  orderid: orderId,        // OR
  transactionid: transactionId,
  refund_details: "true"   // optional
}
```

**Status:** ✅ **CORRECT**
- Supports both `orderid` and `transactionid` lookup ✓
- Optional `refund_details` parameter ✓

### 4. Webhook Handling
**Your Implementation:**
```javascript
async webhook(ctx) {
  const body = ctx.request.body;
  const token = typeof body === "string" 
    ? body 
    : body?.transactionResponse || body?.jws || body?.payload;
  
  const result = await billDeskService.verifyTransaction(token);
  ctx.send({ received: true, success: result.verified, data: result });
}
```

**Status:** ✅ **CORRECT**
- Accepts both raw JOSE string and JSON wrapper ✓
- Returns 2xx immediately (idempotency) ✓
- Verifies signature before processing ✓

---

## ⚠️ ISSUES FOUND

### 1. BD-Timestamp Header Format
**Current Implementation:**
```javascript
function getBillDeskEpochTimestamp(date = new Date()) {
  const unit = (process.env.BILLDESK_TIMESTAMP_UNIT || "SECONDS").toUpperCase();
  const epochMs = date.getTime();
  return unit === "MILLISECONDS"
    ? String(epochMs)
    : String(Math.floor(epochMs / 1000));
}
```

**BillDesk Documentation Says:**
> "BD-Timestamp: Request timestamp to identify date and time of origin of request. Example, a value of BD-Timestamp **20210113180403** identifies the request to have originated on 13th January 2021 at 06:04:03 PM."

**Issue:** ❌ **WRONG FORMAT**
- Documentation shows format: `YYYYMMDDHHmmss` (14 digits)
- Your code sends: epoch seconds (10 digits) or milliseconds (13 digits)

**Fix Required:**
```javascript
function getBillDeskTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
```

### 2. BD-Traceid Format
**Current Implementation:**
```javascript
function getBillDeskTraceId() {
  return `${Date.now()}${crypto.randomBytes(16).toString("hex")}`.slice(0, 35);
}
```

**BillDesk Documentation Says:**
> "BD-TraceID is a unique identifier passed by the merchant to ensure request idempotency. Requests with identical BD-TraceID within a 24 hour window would fail."

**Issue:** ⚠️ **POTENTIAL PROBLEM**
- Your format: `1776229789475fa629dfd85ea79776d71d5` (timestamp + hex)
- This is alphanumeric and 35 chars ✓
- BUT: Starts with timestamp, which might not be unique enough for concurrent requests

**Recommendation:**
```javascript
function getBillDeskTraceId() {
  // UUID-like format without dashes, 32 chars
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}
```

---

## 🔍 WHITELIST REQUEST REVIEW

### Your Submitted Details:

```
1. Public Static IPs (Outbound):
   74.220.48.0/24
   74.220.56.0/24

2. Webhook HTTPS URL: 
   https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook

3. Frontend URL: 
   https://jammu-municipal-corporation.vercel.app

4. Backend API Base URL: 
   https://jammu-municipal-corporation.onrender.com/api

5. Payment API Endpoints:
   - Create Order: POST /billdesk/create-order
   - Verify Payment: POST /billdesk/verify

6. Return URL (Frontend): 
   https://jammu-municipal-corporation.vercel.app/payment-status
```

### ✅ Whitelist Request is CORRECT

**What BillDesk Needs:**
1. ✅ **Outbound IPs** - For API calls from your backend to BillDesk
   - Your IPs: `74.220.48.0/24` and `74.220.56.0/24` ✓
   
2. ✅ **Webhook URL** - For BillDesk to send transaction updates
   - Your URL: `https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook` ✓
   - Must be HTTPS ✓
   - Must return 200 OK immediately ✓

3. ✅ **Return URL** - Where customers are redirected after payment
   - Your URL: `https://jammu-municipal-corporation.vercel.app/payment-status` ✓
   - This is configured in your `.env` as `BILLDESK_RETURN_URL` ✓

**Note:** BillDesk doesn't need to whitelist your frontend or backend base URLs - those are for your internal reference.

---

## 🚨 ROOT CAUSE OF EMPTY RESPONSE

Based on the documentation review, the **BD-Timestamp format is WRONG**. This is likely causing BillDesk's edge security to reject your requests silently.

### Why Empty 200 Instead of Error?
- BillDesk edge validation might be failing **before** reaching the API layer
- Edge security policies often return empty responses for malformed requests
- The TS cookie being set suggests edge processing occurred, but request was rejected

### Evidence:
1. ✅ Invalid token probe returns proper 401 JSON (edge accepts request format)
2. ❌ Authenticated call with wrong timestamp returns empty 200 (edge rejects silently)

---

## 🔧 IMMEDIATE FIX REQUIRED

### Change 1: Fix BD-Timestamp Header
**File:** `jammu-municipal-corporation-/cms/src/api/billdesk/services/billdesk.js`

**Replace:**
```javascript
function getBillDeskEpochTimestamp(date = new Date()) {
  const unit = (process.env.BILLDESK_TIMESTAMP_UNIT || "SECONDS").toUpperCase();
  const epochMs = date.getTime();
  return unit === "MILLISECONDS"
    ? String(epochMs)
    : String(Math.floor(epochMs / 1000));
}
```

**With:**
```javascript
function getBillDeskHeaderTimestamp(date = new Date()) {
  // BillDesk expects: YYYYMMDDHHmmss (14 digits)
  // Example: 20210113180403 = 2021-01-13 18:04:03
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
```

**Update calls:**
```javascript
// In callBillDeskCreateOrderWithCookie:
const timestamp = getBillDeskHeaderTimestamp();

// In retrieveTransaction:
const timestamp = getBillDeskHeaderTimestamp();
```

### Change 2: Improve TraceId Generation
```javascript
function getBillDeskTraceId() {
  // Generate 32-char hex string (UUID-like)
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}
```

---

## 📋 UPDATED WHITELIST REQUEST

Send this to BillDesk support:

```
Subject: UAT Whitelist Request - JMC (UATJMC02V2)

Dear BillDesk Team,

We request UAT environment whitelisting for the following:

Merchant Details:
- Merchant ID: UATJMC02V2
- Client ID: uatjmc02v2
- Environment: UAT
- Integration Type: Symmetric JOSE (JWE + JWS)

Outbound IP Addresses (for API calls to BillDesk):
- 74.220.48.0/24
- 74.220.56.0/24

Webhook Configuration:
- Webhook URL: https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
- Protocol: HTTPS
- Response: 200 OK (immediate acknowledgment)

Return URL (customer redirect after payment):
- https://jammu-municipal-corporation.vercel.app/payment-status

API Endpoints Used:
- Create Order: POST /u2/payments/ve1_2/orders/create
- Transaction Status: POST /u2/payments/ve1_2/transactions/get

Please confirm:
1. IP whitelist is active
2. Webhook URL is configured
3. Expected BD-Timestamp format (we're using YYYYMMDDHHmmss)
4. Any additional security requirements

Thank you,
JMC Development Team
```

---

## 🎯 NEXT STEPS

1. **Apply the timestamp fix** (see Change 1 above)
2. **Deploy to Render**
3. **Test create-order immediately**
4. **If still fails**, send the updated whitelist request with timestamp format confirmation
5. **Monitor logs** for diagnostic output

The timestamp format mismatch is the most likely root cause of your empty response issue.
