# Enhanced Authentication Setup Guide

## 🎉 Features Implemented

### ✅ Email Verification
- Users receive verification email upon signup
- Email verification required before login
- Resend verification email functionality

### ✅ Password Reset
- Forgot password functionality with email link
- Secure token-based password reset
- 1-hour expiration for reset links

### ✅ Google OAuth Login
- One-click login with Google account
- Automatic email verification for OAuth users
- Seamless account linking

### ✅ Two-Factor Authentication (2FA)
- TOTP-based 2FA using authenticator apps
- QR code generation for easy setup
- Enable/disable 2FA from settings page

---

## 📋 Prerequisites

Before running the application, you need to set up the following:

### 1. Email Service Setup (Gmail Example)

#### Option A: Gmail with App Password (Recommended)
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this password in your .env file

#### Option B: Gmail with Less Secure Apps (Not Recommended)
1. Enable "Less secure app access" in Gmail settings
2. Use your regular Gmail password

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - Application name: "Arcade Game"
   - Authorized domains: localhost (for development)
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret

---

## ⚙️ Backend Setup

### 1. Install Dependencies

```bash
cd Backend
npm install express-session
```

(Other packages already installed: nodemailer, passport, passport-google-oauth20, speakeasy, qrcode)

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/arcade-game

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Session Secret
SESSION_SECRET=your-super-secret-session-key-change-this

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Arcade Game

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### 3. Start Backend Server

```bash
cd Backend
npm start
```

Or if using nodemon:
```bash
npm run dev
```

---

## 🎨 Frontend Setup

### 1. No Additional Packages Needed
All frontend dependencies are already installed.

### 2. Start Frontend

```bash
npm run dev
```

---

## 🧪 Testing the Features

### Email Verification
1. Sign up with a new account
2. Check your email for verification link
3. Click the link to verify
4. Try logging in (should work after verification)

### Password Reset
1. Go to login page
2. Click "Forgot Password?"
3. Enter your email
4. Check email for reset link
5. Click link and set new password

### Google OAuth
1. Go to login page
2. Click "Continue with Google"
3. Select your Google account
4. You'll be automatically logged in

### Two-Factor Authentication
1. Log in to your account
2. Go to Settings page (`/settings`)
3. Click "Enable 2FA"
4. Scan QR code with authenticator app (Google Authenticator, Authy, etc.)
5. Enter the 6-digit code to verify
6. From now on, you'll need the code to login

---

## 📱 Recommended Authenticator Apps

- **Google Authenticator** (iOS/Android)
- **Microsoft Authenticator** (iOS/Android)
- **Authy** (iOS/Android/Desktop)
- **1Password** (Premium feature)

---

## 🔒 Security Best Practices

1. **Never commit .env file** - Already added to .gitignore
2. **Use strong JWT_SECRET** - Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
3. **Enable 2FA** - Always enable 2FA on production accounts
4. **Use App Passwords** - Never use your main Gmail password
5. **HTTPS in Production** - Always use HTTPS in production environment

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback

### Two-Factor Authentication
- `POST /api/2fa/setup` - Setup 2FA (get QR code)
- `POST /api/2fa/verify` - Verify and enable 2FA
- `POST /api/2fa/validate` - Validate 2FA token
- `POST /api/2fa/disable` - Disable 2FA
- `GET /api/2fa/status` - Check 2FA status

---

## 🐛 Troubleshooting

### Email Not Sending
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Make sure 2FA is enabled on Gmail and you're using App Password
- Check SMTP settings (host, port)
- Look at backend console for error messages

### Google OAuth Not Working
- Check redirect URIs in Google Cloud Console
- Make sure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Verify BACKEND_URL and FRONTEND_URL in .env
- Check browser console for errors

### 2FA QR Code Not Showing
- Check backend logs for errors
- Make sure speakeasy and qrcode packages are installed
- Verify JWT token is being sent with requests

---

## 🎯 Next Steps

Consider implementing:
- Email verification reminder notifications
- Social login with more providers (Facebook, GitHub)
- Account recovery options for 2FA
- Security event logging
- Rate limiting for auth endpoints
- Session management page

---

## 📞 Support

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify all environment variables are set correctly
3. Make sure MongoDB is running
4. Check that all npm packages are installed

Happy coding! 🚀
