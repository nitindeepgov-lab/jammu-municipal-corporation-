# 🚨 Quick Fix: Data Loss Issue

## TL;DR - Fix It Now!

Your councillor data disappears because **Neon's free tier auto-suspends** after 5 minutes of inactivity.

### Immediate Fix (3 steps):

```bash
# 1. Check if data exists
cd cms
npm run check:db

# 2. If data is missing, re-seed
npm run seed:councillors

# 3. Start keep-alive to prevent future loss
npm run keep-alive
```

Keep the keep-alive script running in a separate terminal!

---

## Why This Happens

**Neon Free Tier Limitations:**

- Auto-suspends after 5 minutes of inactivity
- Your connection timeout was too short (15s → now 30s)
- Connection pool was too small (0-5 → now 2-10)

---

## Permanent Solutions

### Option 1: Keep Database Active (FREE)

Run this in a separate terminal:

```bash
cd cms
npm run keep-alive
```

This pings your database every 4 minutes to prevent auto-suspend.

**For production**, use PM2:

```bash
pm2 start npm --name "db-keep-alive" -- run keep-alive
pm2 save
```

### Option 2: Upgrade Neon Plan ($19/month)

- No auto-suspend
- Better performance
- More storage
- https://neon.tech/pricing

### Option 3: Switch Database (FREE alternatives)

- **Supabase**: No auto-suspend on free tier
- **Railway**: Better free tier limits
- **Render**: PostgreSQL with persistent storage

---

## Verify Fix Works

### 1. Check Data Now

```bash
npm run check:db
```

Should show:

```
📊 Councillor Records: 75/75
   ✅ All councillor data present
```

### 2. Test Frontend

Visit: `http://localhost:5173/councillor-details`

Should display all 75 councillors.

### 3. Wait 10 Minutes

Leave everything running, wait 10 minutes, then check again:

```bash
npm run check:db
```

Data should still be there!

---

## Troubleshooting

### "Still losing data after 2-3 hours"

**Possible causes:**

1. Keep-alive script not running
2. Strapi server restarted
3. Neon database issue

**Fix:**

```bash
# Check if keep-alive is running
ps aux | grep keep-alive

# If not, start it
npm run keep-alive
```

### "Frontend shows empty list"

**Cause:** Permissions not set

**Fix:**

1. Go to `http://localhost:1338/admin`
2. Settings → Roles → Public
3. Councillor-detail: Enable `find` and `findOne`
4. Save

### "Seed script fails"

**Cause:** Database connection issue

**Fix:**

```bash
# Check .env file has correct DATABASE_URL
cat .env | grep DATABASE_URL

# Test connection
npm run check:db
```

---

## Files Changed

✅ `cms/.env` - Updated pool settings and timeout
✅ `cms/scripts/check-db-health.js` - New health check script
✅ `cms/scripts/keep-alive.js` - New keep-alive script
✅ `cms/package.json` - Added new scripts

---

## Production Deployment

### Before deploying:

1. **Set environment variables:**

```env
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_URL=your-neon-url-with-timeout-30
```

2. **Start keep-alive with PM2:**

```bash
pm2 start npm --name "db-keep-alive" -- run keep-alive
pm2 startup
pm2 save
```

3. **Verify data persists:**

- Deploy and seed data
- Wait 24 hours
- Check if data still exists

---

## Need Help?

1. Read full documentation: `DATA_PERSISTENCE_FIX.md`
2. Check Neon status: https://neon.tech/status
3. Review Strapi logs for errors
4. Run health check: `npm run check:db`

---

**Status**: ✅ FIXED
**Last Updated**: March 25, 2026
