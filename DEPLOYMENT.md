# MediCore - Full-Stack Vercel Deployment Guide

## 🚀 Complete Deployment (Frontend + Backend + Database)

### What's Deployed

✅ **Frontend**: React application  
✅ **Backend**: Serverless API functions  
✅ **Database**: SQLite (auto-initialized on first request)

---

## Quick Deploy Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Add full-stack Vercel deployment configuration"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import `VigneshrajNadar/Medicore`
5. Configure:
   - **Framework**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
6. Click **Deploy**

### 3. Wait for Deployment (2-3 minutes)

Vercel will:
- Install dependencies
- Build React frontend
- Deploy serverless API functions
- Initialize database on first API call

---

## API Endpoints

Your deployed API will be available at:

```
https://your-app.vercel.app/api/doctors
https://your-app.vercel.app/api/appointments
https://your-app.vercel.app/api/users
```

---

## Database

**SQLite** database is automatically initialized on first API request.

> **Note**: SQLite on Vercel is ephemeral (resets periodically). For production, consider upgrading to:
> - **Supabase** (PostgreSQL) - Free tier available
> - **PlanetScale** (MySQL) - Free tier available
> - **MongoDB Atlas** - Free tier available

---

## Environment Variables (Optional)

Add in Vercel Dashboard → Settings → Environment Variables:

```
NODE_ENV=production
```

---

## Testing Your Deployment

After deployment:

1. **Frontend**: Visit your Vercel URL
2. **API Test**: Visit `https://your-app.vercel.app/api/doctors`
3. **Login**: Test authentication
4. **Book Appointment**: Test full flow

---

## What Works

✅ All frontend pages and UI  
✅ User authentication (localStorage)  
✅ Doctor listings (API)  
✅ Appointment booking (API)  
✅ User management (API)  
✅ Responsive design  
✅ All diagrams and images  

---

## Automatic Deployments

- Every push to `main` → Production deployment
- Pull requests → Preview deployments
- Instant rollback from Vercel dashboard

---

## Troubleshooting

**Build fails**: Check Vercel build logs  
**API errors**: Check Vercel function logs  
**Database issues**: Database reinitializes on cold starts

---

## Upgrade to Production Database (Later)

When ready for persistent data:

1. Create free database on Supabase/PlanetScale
2. Update API functions to use cloud database
3. Add database URL to Vercel environment variables
4. Redeploy

---

**Your app will be live at**: `https://medicore-[random].vercel.app`

🎉 **Full-stack deployment complete!**
