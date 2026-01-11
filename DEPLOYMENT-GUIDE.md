# 🚀 AWS Amplify Deployment Guide - Step by Step

## Prerequisites
- AWS Account with billing enabled
- GitHub/GitLab repository with your code
- Production API keys ready

## Step 1: Push Code to Repository
```bash
git add .
git commit -m "Prepare for AWS deployment"
git push origin main
```

## Step 2: AWS Amplify Setup
1. **Login to AWS Console**
   - Go to https://console.aws.amazon.com
   - Search for "Amplify" in services

2. **Create New App**
   - Click "Create new app"
   - Choose "Host web app"
   - Connect your Git provider (GitHub/GitLab)
   - Select your repository
   - Select branch: `main`

3. **Build Settings**
   - Amplify will detect Next.js automatically
   - Use the provided amplify.yml file
   - Set Node.js version: 18.x or higher

## Step 3: Environment Variables
Add these in Amplify Console > Environment Variables:

### Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Database
```
DATABASE_URL=postgresql://your_production_neon_url
```

### AI Services
```
GEMINI_API_KEY=your_production_gemini_key
```

### Background Jobs
```
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_ENV=production
```

### System
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Step 4: Deploy
1. Click "Save and deploy"
2. Wait for build to complete (5-10 minutes)
3. Your app will be available at the provided URL

## Step 5: Custom Domain (Optional)
1. Go to Domain management
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

## Step 6: Post-Deployment
1. Test all authentication flows
2. Verify database connections
3. Test Inngest webhook endpoint
4. Monitor application logs
5. Set up CloudWatch alarms

## Troubleshooting
- **Build fails**: Check build logs for missing environment variables
- **Database connection**: Verify DATABASE_URL is correct
- **Authentication issues**: Check Clerk production keys and URLs
- **500 errors**: Review CloudWatch logs for detailed errors

## Cost Estimation
- **AWS Amplify**: $0.01/GB served + $0.01/build minute
- **Expected monthly cost**: $5-15 for small to medium traffic
- **Free tier**: 1000 builds minutes and 5GB served per month