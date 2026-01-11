# ⚡ QUICK FIX - Database Error

## 🚨 Current Error

```
Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`.
```

## ✅ Solution (3 Steps)

### Step 1: Create `.env` File

Create a file named `.env` in the `ai-career-coach` folder with this content:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### Step 2: Get Database URL

**Option A: Neon PostgreSQL (Recommended)**
1. Go to https://console.neon.tech/
2. Create account/login
3. Create new project
4. Copy connection string
5. Paste into `.env` as `DATABASE_URL`

**Option B: Local PostgreSQL**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_career_coach?sslmode=require
```

### Step 3: Restart Server

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

## ✅ Verification

After creating `.env` and restarting, the error should be gone!

If you still see errors, check:
1. `.env` file is in `ai-career-coach/` folder (not parent folder)
2. `DATABASE_URL` starts with `postgresql://`
3. No extra spaces or quotes around the URL
4. Server was restarted after creating `.env`

## 📚 More Help

See `SETUP_GUIDE.md` for complete setup instructions.
