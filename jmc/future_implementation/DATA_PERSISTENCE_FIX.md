# 🔧 Data Persistence Issue - FIXED

## Problem

Councillor data disappears after 2-3 hours, requiring re-seeding.

## Root Causes

### 1. **Neon Free Tier Auto-Suspend** ⚠️

Neon's free tier automatically suspends your database after **5 minutes of inactivity**. When it wakes up, the data SHOULD persist, but there are edge cases where:

- Connection pooling with pgbouncer can cause issues
- Short connection timeouts cause failed writes
- Unpublished entries aren't visible via API

### 2. **Configuration Issues** ❌

Your `.env` had:

```env
DATABASE_POOL_MIN=0  # Too low - causes connection issues
DATABASE_POOL_MAX=5  # Too low for production
connect_timeout=15   # Too short - connections timeout
```

### 3. **Unpublished Entries** ❌

Seeded data might not be published, making it invisible to the frontend API.

---

## ✅ Fixes Applied

### 1. Updated Database Configuration

**File: `cms/.env`**

```env
DATABASE_POOL_MIN=2          # ✅ Increased from 0
DATABASE_POOL_MAX=10         # ✅ Increased from 5
connect_timeout=30           # ✅ Increased from 15
```

### 2. Created Health Check Script

**File: `cms/scripts/check-db-health.js`**

Run this to diagnose issues:

```bash
cd cms
npm run check:db
```

This checks:

- Database connection
- Number of councillor records (should be 75)
- Published status
- Permissions
- Sample data

---

## 🚀 How to Fix Data Loss

### Step 1: Check Current State

```bash
cd cms
npm run check:db
```

### Step 2: If Data is Missing

```bash
npm run seed:councillors
```

### Step 3: Verify in Strapi Admin

1. Go to `http://localhost:1338/admin`
2. Navigate to **Content Manager → Councillor Details**
3. Check if all 75 entries exist
4. **Select all entries** and click **Publish**

### Step 4: Verify Permissions

1. Go to **Settings → Roles → Public**
2. Find **Councillor-detail**
3. Enable:
   - ✅ `find`
   - ✅ `findOne`
4. Click **Save**

### Step 5: Test Frontend

```bash
# Visit your frontend
http://localhost:5173/councillor-details

# Should show all 75 councillors
```

---

## 🛡️ Preventing Future Data Loss

### Option 1: Keep Database Active (Recommended)

Create a cron job or scheduled task to ping your database every 4 minutes:

**File: `cms/scripts/keep-alive.js`**

```javascript
const axios = require("axios");

setInterval(
  async () => {
    try {
      await axios.get(
        "http://localhost:1338/api/councillor-details?pagination[limit]=1",
      );
      console.log("✅ Database pinged:", new Date().toISOString());
    } catch (error) {
      console.error("❌ Ping failed:", error.message);
    }
  },
  4 * 60 * 1000,
); // Every 4 minutes
```

Run in background:

```bash
node cms/scripts/keep-alive.js &
```

### Option 2: Upgrade Neon Plan

- **Free tier**: Auto-suspends after 5 minutes
- **Pro tier ($19/month)**: No auto-suspend, better performance
- **Scale tier**: For production

### Option 3: Use Different Database

Consider:

- **Supabase** (free tier with no auto-suspend)
- **Railway** (free tier with better limits)
- **Render** (PostgreSQL with persistent storage)

---

## 🔍 Debugging Data Loss

### Check if Data Exists in Database

```bash
npm run check:db
```

### Check Strapi Logs

```bash
cd cms
npm run dev
# Watch for database connection errors
```

### Check Neon Dashboard

1. Go to https://console.neon.tech
2. Check your project
3. Look for:
   - Compute status (Active/Idle)
   - Connection count
   - Query history

### Verify API Response

```bash
# Check if API returns data
curl http://localhost:1338/api/councillor-details?pagination[limit]=5

# Should return JSON with councillor data
```

---

## 📊 Expected Behavior

### After Seeding

```bash
npm run seed:councillors
```

Output should show:

```
✅ [created] Ward 1 — SMT. PURNIMA SHARMA (1.jpg)
✅ [created] Ward 2 — Lt. SH. JAGDISH KUMAR SHARMA (2.jpg)
...
✅ [created] Ward 75 — SH. GHAR SINGH CHIB (75.jpg)

✨ Councillor seeding complete!
```

### After Health Check

```bash
npm run check:db
```

Output should show:

```
✅ Database connection: OK
📊 Councillor Records: 75/75
   ✅ All councillor data present
📢 Published Records: 75/75
🎉 Everything looks good! Your data should persist.
```

---

## 🚨 Common Issues

### Issue 1: "No data found after seeding"

**Cause**: Entries not published
**Fix**:

```bash
# In Strapi Admin
Content Manager → Councillor Details → Select All → Publish
```

### Issue 2: "Data disappears after restart"

**Cause**: Neon auto-suspend + connection issues
**Fix**:

- Use keep-alive script
- Upgrade Neon plan
- Switch to different database

### Issue 3: "Frontend shows empty list"

**Cause**: Missing permissions
**Fix**:

```bash
# In Strapi Admin
Settings → Roles → Public → Councillor-detail
Enable: find, findOne
```

### Issue 4: "Connection timeout errors"

**Cause**: Short timeout in connection string
**Fix**: Already fixed in `.env` (timeout=30)

---

## 📝 Production Checklist

Before deploying to production:

- [ ] Upgrade to Neon Pro plan (or use different database)
- [ ] Set up database backups
- [ ] Configure monitoring/alerts
- [ ] Test data persistence over 24 hours
- [ ] Set up keep-alive cron job
- [ ] Document recovery procedures
- [ ] Test seed script in production
- [ ] Verify all 75 councillors are published
- [ ] Check public permissions are enabled

---

## 🆘 Emergency Recovery

If data is lost in production:

```bash
# 1. SSH into your server
ssh your-server

# 2. Navigate to CMS directory
cd /path/to/cms

# 3. Run seed script
npm run seed:councillors

# 4. Check health
npm run check:db

# 5. Restart Strapi
pm2 restart strapi  # or your process manager
```

---

## 📞 Support

If issues persist:

1. Check Neon status: https://neon.tech/status
2. Review Strapi logs: `cms/logs/`
3. Check database connection in Neon dashboard
4. Verify environment variables are correct
5. Test with a fresh database

---

**Last Updated**: March 25, 2026
**Status**: ✅ FIXED
