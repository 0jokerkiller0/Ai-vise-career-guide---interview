# Inngest Production Deployment Guide

## 1. Inngest Cloud Setup
1. Sign up at https://www.inngest.com
2. Create a production environment
3. Get your production keys:
   - Event Key (for sending events)
   - Signing Key (for webhook verification)

## 2. Configure Inngest in Production
Add these environment variables in AWS Amplify:

```
INNGEST_EVENT_KEY=your_production_event_key
INNGEST_SIGNING_KEY=your_production_signing_key
INNGEST_ENV=production
```

## 3. Webhook Configuration
- Point Inngest webhook to: https://yourdomain.com/api/inngest
- Ensure your deployment includes the inngest API route
- Test webhook connectivity after deployment

## 4. Function Monitoring
- Monitor function executions in Inngest dashboard
- Set up alerts for failed functions
- Review logs for debugging

## Alternative: Self-hosted Inngest
If you prefer to keep everything in AWS:
- Deploy Inngest server on AWS ECS
- Use AWS SQS for job queuing
- Use AWS Lambda for function execution