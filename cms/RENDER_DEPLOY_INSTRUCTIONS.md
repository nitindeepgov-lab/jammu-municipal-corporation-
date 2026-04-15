# Render Deployment Instructions

## Current Status
✅ Code changes committed and pushed to GitHub (commit: c4b7d3c)
❌ Render has NOT deployed the new code yet
❌ Still getting "empty response body" error

## Why You're Still Seeing the Error
The timestamp fix is in your code locally and on GitHub, but **Render hasn't redeployed yet**. You need to manually trigger a deployment.

## How to Deploy on Render

### Option 1: Manual Deploy (Recommended)
1. Go to https://dashboard.render.com
2. Find your service: `jammu-municipal-corporation`
3. Click on the service
4. Click the **"Manual Deploy"** button (top right)
5. Select **"Deploy latest commit"**
6. Wait for deployment to complete (usually 2-5 minutes)

### Option 2: Trigger via Git
If auto-deploy is enabled but not working:
```bash
# Make a small change to trigger deploy
cd jammu-municipal-corporation-/cms
echo "# Deploy trigger" >> README.md
git add README.md
git commit -m "chore: trigger Render redeploy"
git push origin main
```

### Option 3: Check Auto-Deploy Settings
1. Go to Render dashboard
2. Click on your service
3. Go to **Settings** tab
4. Scroll to **Build & Deploy** section
5. Ensure **"Auto-Deploy"** is set to **"Yes"**
6. Check **"Branch"** is set to **"main"**

## How to Verify Deployment

### Step 1: Check Render Logs
1. Go to Render dashboard → Your service → **Logs** tab
2. Look for deployment messages:
   ```
   ==> Building...
   ==> Deploying...
   ==> Your service is live 🎉
   ```

### Step 2: Test the API
Once deployed, test immediately:
```bash
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

### Step 3: Check Logs for Diagnostic Output
Look for these log entries (if `BILLDESK_DIAGNOSTIC_PROBE=true`):
```
BillDesk runtime diagnostics: {
  egress: { ok: true, ip: "74.220.48.243" },
  invalidTokenProbe: { ... }
}

BillDesk createOrder response format: {
  attempt: 1,
  status: 200,
  timestamp: "20260415..." ← Should be 14 digits!
  ...
}
```

## Expected Results After Deployment

### ✅ Success Indicators
- `timestamp` in logs shows 14 digits (e.g., `20260415110236`)
- Response has non-empty body
- `bodyBytes` > 0
- No "empty response body" error

### ❌ Still Failing
If still getting empty body after deployment:
1. Check logs to confirm timestamp is 14 digits
2. Verify `BD-Timestamp` header in logs
3. If timestamp is correct but still failing, escalate to BillDesk with:
   - Confirmed timestamp format: YYYYMMDDHHmmss
   - Sample trace IDs from logs
   - Request IP whitelist verification

## Environment Variables to Check on Render

Make sure these are set:
```
BILLDESK_MERCHANT_ID=UATJMC02V2
BILLDESK_CLIENT_ID=uatjmc02v2
BILLDESK_SIGNING_KEY=ZqSFQCwyLQL2MDY5L2RXB8EPyr8ZtvKP
BILLDESK_ENCRYPTION_KEY=9j4giX7RyanufaFacyY0UV1TlQxWMuUJ
BILLDESK_SIGNING_KEY_ID=zko4MMjzjvXY
BILLDESK_ENCRYPTION_KEY_ID=zko4MMjzjvXY
BILLDESK_JOSE_MODE=SYMMETRIC
BILLDESK_KEY_FORMAT=RAW
BILLDESK_ENV=UAT
BILLDESK_RETURN_URL=https://jammu-municipal-corporation.vercel.app/payment-status
BILLDESK_DIAGNOSTIC_PROBE=true
```

**Remove this if it exists:**
```
BILLDESK_TIMESTAMP_UNIT=SECONDS  ← DELETE THIS (obsolete)
```

## Troubleshooting

### Deployment Fails
- Check Render logs for build errors
- Verify `package.json` has correct dependencies
- Check Node.js version compatibility

### Deployment Succeeds But Still Empty Body
- Verify timestamp in logs is 14 digits
- Check if BillDesk IP whitelist is active
- Contact BillDesk support with trace IDs

### Can't Access Render Dashboard
- Check your Render account login
- Verify you have access to the service
- Ask team admin for access if needed

---

**Next Action:** Go to Render dashboard NOW and manually deploy the latest commit.
