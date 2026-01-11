# 🚨 URGENT FIX - Database & Clerk Configuration

## ❌ Current Errors

1. **Database Error**: `Can't reach database server at localhost:5432`
   - Your `.env` has `DATABASE_URL=postgresql://user:password@localhost:5432/...`
   - You don't have PostgreSQL running locally
   - **Solution**: Use Neon (free cloud PostgreSQL) instead

2. **Clerk Error**: `Publishable key not valid`
   - Your `.env` has placeholder keys: `pk_test_your_clerk_publishable_key_here`
   - **Solution**: Get real keys from Clerk dashboard

---

## ✅ Quick Fix Steps

### Step 1: Get Neon Database (FREE - 2 minutes)

1. Go to **https://console.neon.tech/**
2. Sign up with GitHub/Google (free)
3. Click **"Create Project"**
4. Choose a name and region
5. Click **"Create Project"**
6. On the project page, find **"Connection string"**
7. Click **"Copy"** - it looks like:
   ```
   postgresql://username:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Get Clerk Keys (FREE - 2 minutes)

1. Go to **https://dashboard.clerk.com/**
2. Sign up/Login
3. Click **"Create Application"**
4. Choose authentication method (Email, Google, etc.)
5. After creation, go to **"API Keys"** in sidebar
6. Copy:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### Step 3: Update .env File

Open `ai-career-coach/.env` and replace:

```env
# Replace this line with your Neon connection string:
DATABASE_URL=postgresql://your_neon_connection_string_here

# Replace with your actual Clerk keys:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_key_here

# Get from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_gemini_key_here
```

### Step 4: Restart Server

```bash
# Stop server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Run Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev
```

---

## 🎯 Example .env File (After Updates)

```env
# Database - Neon PostgreSQL
DATABASE_URL=postgresql://neondb_owner:npg_abc123xyz@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_51AbC123XyZ456...
CLERK_SECRET_KEY=sk_test_51AbC123XyZ456...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Gemini AI
GEMINI_API_KEY=AIzaSyAbC123XyZ456...
```

---

## ⚠️ Important Notes

1. **Don't use localhost** - You need a cloud database (Neon is free)
2. **Real keys required** - Placeholder keys won't work
3. **Restart after changes** - Always restart server after updating `.env`
4. **No spaces** - Make sure no spaces around `=` in `.env` file

---

## ✅ Verification

After fixing, you should see:
- ✅ No "Can't reach database server" errors
- ✅ No "Publishable key not valid" errors
- ✅ Server starts without errors
- ✅ Pages load successfully

---

**Time needed**: ~5 minutes to get Neon + Clerk keys and update .env
