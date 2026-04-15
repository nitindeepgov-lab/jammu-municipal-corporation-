# Render Environment Variables Configuration

## Required Environment Variables for Render

Copy these exact values to your Render dashboard:

### BillDesk Configuration
```
BILLDESK_MERCHANT_ID=UATJMC02V2
BILLDESK_CLIENT_ID=uatjmc02v2
BILLDESK_KEY_ID=zko4MMjzjvXY
```

### Security Keys
```
BILLDESK_ENCRYPTION_PASSWORD=9j4giX7RyanufaFacyY0UV1TlQxWMuUJ
BILLDESK_SIGNING_PASSWORD=ZqSFQCwyLQL2MDY5L2RXB8EPyr8ZtvKP
```

### URLs
```
BILLDESK_BASE_URL=https://uat1.billdesk.com
BILLDESK_WEBHOOK_URL=https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
BILLDESK_RETURN_URL=https://jammu-municipal-corporation.vercel.app/payment-status
```

### Environment
```
BILLDESK_ENV=UAT
```

## How to Add to Render

1. Go to https://dashboard.render.com
2. Select your service: `jammu-municipal-corporation`
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable above (one at a time)
6. Click **Save Changes**

## Variables to Remove (if present)

These are no longer needed:
```
BILLDESK_SIGNING_KEY  # OLD - now BILLDESK_SIGNING_PASSWORD
BILLDESK_ENCRYPTION_KEY  # OLD - now BILLDESK_ENCRYPTION_PASSWORD
BILLDESK_SIGNING_KEY_ID  # Not used in V2
BILLDESK_ENCRYPTION_KEY_ID  # Not used in V2
BILLDESK_JOSE_MODE  # Not needed
BILLDESK_KEY_FORMAT  # Not needed
BILLDESK_DIAGNOSTIC_PROBE  # Not needed
```

## Variable Mapping

| Old Variable | New Variable | Notes |
|--------------|--------------|-------|
| BILLDESK_SIGNING_KEY | BILLDESK_SIGNING_PASSWORD | Renamed |
| BILLDESK_ENCRYPTION_KEY | BILLDESK_ENCRYPTION_PASSWORD | Renamed |
| BILLDESK_SIGNING_KEY_ID | BILLDESK_KEY_ID | Single key ID |
| BILLDESK_ENCRYPTION_KEY_ID | (removed) | Not needed |
| (new) | BILLDESK_BASE_URL | Explicit base URL |
| (new) | BILLDESK_WEBHOOK_URL | Explicit webhook URL |

## Verification

After adding variables, verify they're set correctly:

1. Check Render logs for startup messages
2. Look for "BillDesk credentials missing" errors
3. If no errors, variables are configured correctly

## For Production

When moving to production, update these:

```
BILLDESK_ENV=PRODUCTION
BILLDESK_MERCHANT_ID=<production_merchant_id>
BILLDESK_CLIENT_ID=<production_client_id>
BILLDESK_KEY_ID=<production_key_id>
BILLDESK_ENCRYPTION_PASSWORD=<production_encryption_password>
BILLDESK_SIGNING_PASSWORD=<production_signing_password>
BILLDESK_BASE_URL=https://api.billdesk.com
BILLDESK_RETURN_URL=<production_return_url>
```

## Quick Copy-Paste for Render

```
BILLDESK_MERCHANT_ID=UATJMC02V2
BILLDESK_CLIENT_ID=uatjmc02v2
BILLDESK_KEY_ID=zko4MMjzjvXY
BILLDESK_ENCRYPTION_PASSWORD=9j4giX7RyanufaFacyY0UV1TlQxWMuUJ
BILLDESK_SIGNING_PASSWORD=ZqSFQCwyLQL2MDY5L2RXB8EPyr8ZtvKP
BILLDESK_BASE_URL=https://uat1.billdesk.com
BILLDESK_WEBHOOK_URL=https://jammu-municipal-corporation.onrender.com/api/billdesk/webhook
BILLDESK_RETURN_URL=https://jammu-municipal-corporation.vercel.app/payment-status
BILLDESK_ENV=UAT
```
