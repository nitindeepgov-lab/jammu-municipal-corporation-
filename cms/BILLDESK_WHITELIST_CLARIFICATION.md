# BillDesk Whitelist Request - Clarification

## ⚠️ CRITICAL MISUNDERSTANDING

The email sent on Apr 6, 2026 contains **YOUR backend API endpoints**, but BillDesk doesn't need those. BillDesk needs to know:
1. **Your outbound IPs** (for when YOU call THEIR APIs) ✅ CORRECT
2. **Your webhook URL** (for when THEY call YOUR API) ✅ CORRECT
3. **Your return URL** (for customer redirects) ✅ CORRECT

## What BillDesk Actually Needs

### ✅ CORRECT Information (Keep These)

#### 1. Outbound IP Addresses
```
74.220.48.0/24
74.220.56.0/24
```
**Purpose**: BillDesk whitelists these IPs so your backend can call their APIs
**Used for**: 
- POST https://uat1.billdesk.com/u2/payments/ve1_2/orders/create
- POST https://uat1.billdesk.com/u2/payments/ve1_2/transactions/get

#### 2. Webhook URL
```
https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
```
**Purpose**: BillDesk sends transaction updates to this URL
**Your endpoint**: POST /api/billdesk/webhook

#### 3. Return URL
```
https://jammu-municipal-corporation.vercel.app/payment-status
```
**Purpose**: Where customers are redirected after payment
**Your frontend page**: /payment-status

---

## ❌ INCORRECT Information (Remove These)

### These Are YOUR APIs, Not BillDesk's

#### ❌ Frontend URL
```
https://jammu-municipal-corporation.vercel.app
```
**Why remove**: BillDesk doesn't need your frontend URL. They only need the specific return URL (payment-status page).

#### ❌ Backend API Base URL
```
https://jammu-municipal-corporation.onrender.com/api
```
**Why remove**: BillDesk doesn't call your backend APIs (except webhook). This is just your internal API base.

#### ❌ Payment API Endpoints
```
Create Order: POST /billdesk/create-order
Verify Payment: POST /billdesk/verify
```
**Why remove**: These are YOUR backend endpoints that YOUR frontend calls. BillDesk never calls these. These are for your internal architecture only.

---

## Corrected Whitelist Request

### Email Template for BillDesk

```
Subject: UAT Whitelist Request - JMC (UATJMC02V2)

Dear BillDesk Team,

We request UAT environment configuration for the Jammu Municipal Corporation (JMC) project.

Merchant Details:
- Merchant ID: UATJMC02V2
- Client ID: uatjmc02v2
- Environment: UAT
- Integration Type: Symmetric JOSE (JWE + JWS)
- Integration Method: Web SDK / Hosted Payment Page

Required Configuration:

1. Outbound IP Whitelist (for API calls from our backend to BillDesk):
   - 74.220.48.0/24
   - 74.220.56.0/24

2. Webhook Configuration (for BillDesk to send transaction updates):
   - Webhook URL: https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
   - Protocol: HTTPS
   - Method: POST
   - Content-Type: application/jose
   - Response: 200 OK (immediate acknowledgment)

3. Return URL (for customer redirect after payment):
   - https://jammu-municipal-corporation.vercel.app/payment-status

BillDesk API Endpoints We Will Call:
- Create Order: POST /u2/payments/ve1_2/orders/create
- Transaction Status: POST /u2/payments/ve1_2/transactions/get

Please confirm:
1. IP whitelist is active for merchant UATJMC02V2
2. Webhook URL is configured and active
3. Return URL is registered
4. Any additional security requirements or configuration needed

Current Issue:
We are currently receiving HTTP 200 with empty body from the create-order endpoint. 
We suspect the IP whitelist may not be active yet.

Sample request details:
- Source IP: 74.220.48.243 (within 74.220.48.0/24 range)
- BD-Timestamp format: YYYYMMDDHHmmss (14 digits)
- Latest test timestamp: 20260415055326

Thank you,
JMC Development Team
```

---

## Understanding the Flow

### 1. Create Order Flow
```
[Your Frontend] 
    ↓ (calls)
[Your Backend: /api/billdesk/create-order]
    ↓ (calls with IP 74.220.48.x)
[BillDesk API: /u2/payments/ve1_2/orders/create]
    ↓ (returns)
[Your Backend]
    ↓ (returns SDK config)
[Your Frontend]
    ↓ (loads BillDesk SDK)
[BillDesk Payment Page]
```

### 2. Payment Completion Flow
```
[Customer completes payment on BillDesk]
    ↓ (redirects to)
[Your Frontend: /payment-status]
    ↓ (calls)
[Your Backend: /api/billdesk/verify]
    ↓ (verifies JOSE token)
[Your Backend]
    ↓ (returns result)
[Your Frontend: shows success/failure]
```

### 3. Webhook Flow (Async)
```
[BillDesk Backend]
    ↓ (sends transaction update)
[Your Backend: /api/billdesk/webhook]
    ↓ (verifies and processes)
[Your Backend]
    ↓ (returns 200 OK)
[BillDesk Backend]
```

---

## What BillDesk Needs to Whitelist

### For API Calls (Your Backend → BillDesk)
- **Whitelist**: Your outbound IPs (74.220.48.0/24, 74.220.56.0/24)
- **Purpose**: Allow your backend to call BillDesk APIs
- **Endpoints affected**: create-order, transaction-status

### For Webhooks (BillDesk → Your Backend)
- **Configure**: Your webhook URL
- **Purpose**: BillDesk sends transaction updates
- **Endpoint**: https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook

### For Customer Redirects (BillDesk → Your Frontend)
- **Register**: Your return URL
- **Purpose**: Redirect customers after payment
- **URL**: https://jammu-municipal-corporation.vercel.app/payment-status

---

## Your Internal Architecture (BillDesk Doesn't Need This)

### Your Backend APIs (Internal Use Only)
```
POST /api/billdesk/create-order
  ↳ Called by: Your frontend
  ↳ Purpose: Create BillDesk order
  ↳ Calls: BillDesk create-order API

POST /api/billdesk/verify
  ↳ Called by: Your frontend
  ↳ Purpose: Verify payment response
  ↳ Calls: Nothing (verifies JOSE token locally)

POST /api/billdesk/transaction-status
  ↳ Called by: Your frontend/admin
  ↳ Purpose: Check transaction status
  ↳ Calls: BillDesk transaction-status API

POST /api/billdesk/webhook
  ↳ Called by: BillDesk
  ↳ Purpose: Receive transaction updates
  ↳ Calls: Nothing (processes and stores)
```

---

## Summary

### ✅ Send to BillDesk:
1. Outbound IPs: 74.220.48.0/24, 74.220.56.0/24
2. Webhook URL: https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
3. Return URL: https://jammu-municipal-corporation.vercel.app/payment-status

### ❌ Don't Send to BillDesk:
1. Your frontend base URL
2. Your backend API base URL
3. Your internal API endpoints (/api/billdesk/create-order, /api/billdesk/verify)

### 🔍 Current Issue:
The empty 200 response suggests your IPs may not be whitelisted yet. Follow up with BillDesk to confirm the whitelist is active.
