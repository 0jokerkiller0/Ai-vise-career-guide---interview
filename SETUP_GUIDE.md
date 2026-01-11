# 🚀 Setup Guide - ai-career-coach

## ⚠️ CRITICAL: Database Configuration Error Fix

### Current Error:
```
Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`.
```

### Root Cause:
The `DATABASE_URL` environment variable is **missing or incorrectly formatted**.

---

## 📋 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
cd ai-career-coach
npm install
```

This will automatically run `prisma generate` after installation (via postinstall script).

### Step 2: Create `.env` File

Create a `.env` file in the `ai-career-coach` root directory:

```env
# Database Configuration (REQUIRED)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# Example for Neon PostgreSQL:
# DATABASE_URL=postgresql://username:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Clerk Authentication (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Google Gemini AI (REQUIRED)
GEMINI_API_KEY=AIzaSyYour_Gemini_API_Key_Here

# Optional: Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Optional: Inngest (for background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### Step 3: Get Your Database URL

#### Option A: Using Neon (Recommended)
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project or select existing one
3. Copy the connection string
4. Format: `postgresql://username:password@ep-xxxx-xxxx.region.aws.neon.tech/dbname?sslmode=require`

#### Option B: Using Other PostgreSQL
1. Format: `postgresql://user:password@host:port/database?sslmode=require`
2. Replace with your actual credentials

### Step 4: Run Database Migrations

```bash
# Generate Prisma Client (if not done automatically)
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev

# Or if you want to push schema without migrations
npx prisma db push
```

### Step 5: Verify Database Connection

```bash
# Open Prisma Studio to verify connection
npx prisma studio
```

If Prisma Studio opens successfully, your database connection is working!

### Step 6: Start Development Server

```bash
npm run dev
```

---

## 🔍 Troubleshooting

### Error: "DATABASE_URL must start with postgresql://"

**Solution**: 
1. Check your `.env` file exists in `ai-career-coach/` directory
2. Verify `DATABASE_URL` starts with `postgresql://` or `postgres://`
3. Make sure there are no extra spaces or quotes around the URL
4. Restart your dev server after adding `.env` file

### Error: "PrismaClientInitializationError"

**Solution**:
1. Run `npx prisma generate` to regenerate Prisma Client
2. Check your database URL is correct
3. Verify database server is accessible
4. Check firewall/network settings

### Error: "Module not found" or Missing Dependencies

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Error: "Cannot find module '@prisma/client'"

**Solution**:
```bash
npx prisma generate
npm install @prisma/client
```

---

## ✅ Verification Checklist

- [ ] `.env` file created in `ai-career-coach/` directory
- [ ] `DATABASE_URL` is set and starts with `postgresql://`
- [ ] Clerk keys are configured
- [ ] Gemini API key is configured
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma Client generated (`npx prisma generate`)
- [ ] Database migrations run (`npx prisma migrate dev`)
- [ ] Development server starts without errors

---

## 📝 Required Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ Yes | Clerk secret key |
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key |
| `UPSTASH_REDIS_REST_URL` | ⚠️ Optional | For rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | ⚠️ Optional | For rate limiting |
| `INNGEST_EVENT_KEY` | ⚠️ Optional | For background jobs |
| `INNGEST_SIGNING_KEY` | ⚠️ Optional | For background jobs |

---

## 🎯 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (copy from above template)

# 3. Generate Prisma Client
npx prisma generate

# 4. Run migrations
npx prisma migrate dev

# 5. Start dev server
npm run dev
```

---

**Note**: After creating `.env` file, **restart your development server** for changes to take effect!
