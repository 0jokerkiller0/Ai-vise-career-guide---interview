# 🔧 Fix Database Connection Error

## ❌ Current Error
```
Can't reach database server at `localhost:5432`
```

## 🔍 Root Cause

Your `.env` file has a Neon database URL, but Next.js might be:
1. **Caching old environment variables**
2. **Not reading the .env file properly**
3. **The DATABASE_URL has `&channel_binding=require` which might cause issues**

## ✅ Solution Steps

### Step 1: Clean Next.js Cache

```bash
# Stop your dev server (Ctrl+C)

# Delete Next.js cache
rm -rf .next

# On Windows PowerShell:
Remove-Item -Recurse -Force .next
```

### Step 2: Verify .env File

Make sure your `.env` file is in `ai-career-coach/` directory (not parent folder).

Check DATABASE_URL format:
```env
DATABASE_URL=postgresql://neondb_owner:npg_xFD51VfOklZY@ep-falling-cell-a1y5x77s-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

**Remove `&channel_binding=require` if present** - it can cause connection issues.

### Step 3: Restart Server

```bash
# Make sure server is completely stopped
# Then restart:
npm run dev
```

### Step 4: Test Database Connection

```bash
# Test Prisma connection
npx prisma db pull

# Or generate client
npx prisma generate
```

## 🔍 Alternative: Check if .env is Loading

Create a test file to verify:

```bash
# In ai-career-coach directory
node -e "require('dotenv').config(); console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50))"
```

## ⚠️ If Still Not Working

1. **Check .env file location**: Must be in `ai-career-coach/` (same level as `package.json`)
2. **Check for .env.local**: If you have `.env.local`, it overrides `.env`
3. **Restart terminal**: Close and reopen your terminal
4. **Check for typos**: Make sure no spaces around `=` sign
5. **Verify Neon database**: Make sure your Neon database is active

## 🎯 Quick Fix Command

```bash
# Stop server, then run:
cd "C:\Users\susha\Desktop\collage PROJECT\AI vise\ai-career-coach"
Remove-Item -Recurse -Force .next
npm run dev
```

---

**The .env file looks correct - the issue is likely Next.js cache. Delete `.next` folder and restart!**
