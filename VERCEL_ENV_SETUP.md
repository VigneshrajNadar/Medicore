# Vercel Environment Variables Setup

After deploying to Vercel, you need to add these environment variables:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

## Required Variables:

**MONGODB_URI**
```
mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/medicore?retryWrites=true&w=majority
```
*Replace `<username>`, `<password>`, and `<your-cluster>` with your actual MongoDB Atlas credentials*

**JWT_SECRET**
```
your_super_secret_key_change_in_production_use_something_random
```

**NODE_ENV**
```
production
```

## Important Notes:
- Make sure to add these to ALL environments (Production, Preview, Development)
- After adding, redeploy your application for changes to take effect
- The MongoDB URI should match exactly what's in your .env file
