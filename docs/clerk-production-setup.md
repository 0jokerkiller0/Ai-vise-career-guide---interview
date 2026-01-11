# Clerk Production Setup Checklist

## 1. Create Production Clerk Application
1. Go to https://clerk.com/dashboard
2. Create a new application for production
3. Select "Next.js" as the framework
4. Note down the production API keys

## 2. Configure Production URLs
- Set your production domain (e.g., https://yourdomain.com)
- Update redirect URLs in Clerk dashboard:
  - Sign-in redirect: https://yourdomain.com/onboarding  
  - Sign-up redirect: https://yourdomain.com/onboarding
  - Sign-out redirect: https://yourdomain.com

## 3. Update Environment Variables in AWS Amplify
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_key
CLERK_SECRET_KEY=sk_live_your_actual_secret

## 4. Configure Authentication Methods
- Enable/disable social logins as needed
- Set up password policies
- Configure email templates
- Set up webhooks if needed