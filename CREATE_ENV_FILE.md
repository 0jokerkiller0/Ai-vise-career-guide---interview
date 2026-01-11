# 📝 Create .env File - Quick Copy & Paste

## ✅ Ready-to-Use .env Template

Copy and paste this into a new file named `.env` in the `ai-career-coach` directory:

```env
# AI Career Coach - Environment Variables

# Database Configuration (REQUIRED)
# Format: postgresql://username:password@host:port/database?sslmode=require
# For Neon PostgreSQL: Get connection string from https://console.neon.tech/
DATABASE_URL=postgresql://user:password@localhost:5432/ai_career_coach?sslmode=require

# Clerk Authentication (REQUIRED)
# Get keys from: https://dashboard.clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Google Gemini AI (REQUIRED)
# Get API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=AIzaSyYour_Gemini_API_Key_Here
```

## 🎯 Quick Steps

1. **Create file**: In `ai-career-coach` folder, create a new file named `.env`
2. **Copy content**: Copy the template above
3. **Paste**: Paste into the `.env` file
4. **Update values**: Replace placeholder values with your actual credentials
5. **Save**: Save the file

## 📋 What to Update

### 1. DATABASE_URL (Most Important!)
Replace with your actual database connection string:

**For Neon (Free PostgreSQL):**
- Go to https://console.neon.tech/
- Create project
- Copy connection string
- Replace `DATABASE_URL` value

**Example:**
```env
DATABASE_URL=postgresql://username:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 2. Clerk Keys
- Go to https://dashboard.clerk.com/
- Create application
- Copy keys

### 3. Gemini API Key
- Go to https://makersuite.google.com/app/apikey
- Create API key
- Copy and paste

## ✅ After Creating .env

1. Save the file
2. Restart your dev server: `npm run dev`
3. Run: `npx prisma generate`
4. Run: `npx prisma migrate dev`

The database error should be fixed! 🎉
