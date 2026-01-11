# 🔧 Environment Variables Setup

## ✅ .env File Created!

I've created a `.env` file in the `ai-career-coach` directory with a properly formatted `DATABASE_URL`.

## 📝 What You Need to Do

### 1. Update DATABASE_URL

The `.env` file currently has a template:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ai_career_coach?sslmode=require
```

**Replace this with your actual database URL:**

#### Option A: Neon PostgreSQL (Recommended - Free)
1. Go to https://console.neon.tech/
2. Sign up/Login (free account)
3. Click "Create Project"
4. Copy the connection string
5. Replace `DATABASE_URL` in `.env` file

**Example Neon URL format:**
```
DATABASE_URL=postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

#### Option B: Local PostgreSQL
If you have PostgreSQL installed locally:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/ai_career_coach?sslmode=require
```

#### Option C: Other PostgreSQL Hosting
Use your provider's connection string format:
```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

### 2. Update Clerk Keys

1. Go to https://dashboard.clerk.com/
2. Create account or login
3. Create a new application
4. Copy the keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_`)
5. Replace in `.env` file

### 3. Update Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create API key
4. Copy and replace `GEMINI_API_KEY` in `.env` file

### 4. Optional: Upstash Redis (for rate limiting)

Only needed if you want rate limiting features:
1. Go to https://console.upstash.com/
2. Create free Redis database
3. Copy URL and token
4. Uncomment and fill in `.env` file

### 5. Optional: Inngest (for background jobs)

Only needed for background job processing:
1. Go to https://www.inngest.com/
2. Sign up
3. Get keys from dashboard
4. Uncomment and fill in `.env` file

## ✅ After Updating .env

1. **Save the `.env` file**
2. **Restart your development server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

3. **Run Prisma migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## 🔍 Verify It's Working

After restarting, you should see:
- ✅ No database connection errors
- ✅ Server starts successfully
- ✅ No "DATABASE_URL must start with postgresql://" errors

## 📋 Quick Checklist

- [ ] Updated `DATABASE_URL` with actual database connection string
- [ ] Updated `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] Updated `CLERK_SECRET_KEY`
- [ ] Updated `GEMINI_API_KEY`
- [ ] Saved `.env` file
- [ ] Restarted development server
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma migrate dev`

## 🆘 Still Having Issues?

1. **Check `.env` file location**: Must be in `ai-career-coach/` directory (not parent folder)
2. **Check DATABASE_URL format**: Must start with `postgresql://` or `postgres://`
3. **No spaces**: Make sure there are no spaces around the `=` sign
4. **No quotes**: Don't wrap values in quotes (unless needed for special characters)
5. **Restart server**: Always restart after changing `.env` file

---

**The `.env` file is ready! Just update the values with your actual credentials.**
