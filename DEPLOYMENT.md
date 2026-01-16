# 🚀 Backend Deployment Guide

## Your Backend is Live on Render! 
**URL:** https://arcade-game-22cw.onrender.com

## Testing Your Backend

### 1. Health Check
Open in browser or use curl:
```bash
curl https://arcade-game-22cw.onrender.com/api/health
```

Should return: `{ "message": "Backend is running!" }`

### 2. Test with Local Frontend
Your local frontend (http://localhost:5173) can now use the live backend:

In development mode, it will use: `http://localhost:5000` (local backend)
In production mode, it will use: `https://arcade-game-22cw.onrender.com` (live backend)

### 3. Test Live Backend from Anywhere
You can test API endpoints using tools like:
- **Postman**
- **Insomnia**
- **curl**

Example:
```bash
# Test signup
curl -X POST https://arcade-game-22cw.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","confirmPassword":"test123"}'
```

## Current Configuration

### Environment Files:
- `.env.development` - Uses `http://localhost:5000` (local backend)
- `.env.production` - Uses `https://arcade-game-22cw.onrender.com` (live backend)

### Backend Features:
- ✅ MongoDB Atlas connected
- ✅ User authentication (JWT)
- ✅ Email verification
- ✅ Password reset
- ✅ Google OAuth
- ✅ Two-Factor Authentication
- ✅ Game scores API
- ✅ CORS enabled for all origins

## Required Environment Variables on Render

Make sure these are set in your Render dashboard:
- `MONGO_URI`
- `JWT_SECRET`
- `SESSION_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `NODE_ENV=production`

## Updating Backend

To deploy updates:
```bash
git add .
git commit -m "your update message"
git push origin main
```

Render will automatically detect the push and redeploy!

## Troubleshooting

### Backend is slow on first request:
- Render free tier "sleeps" after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- Subsequent requests are fast

### OAuth callback errors:
Update Google Cloud Console:
1. Go to **Credentials** → Your OAuth App
2. Add to **Authorized redirect URIs**:
   - `https://arcade-game-22cw.onrender.com/api/auth/google/callback`

---

**Note:** Frontend deployment to Vercel will be done later. For now, backend is fully functional!
