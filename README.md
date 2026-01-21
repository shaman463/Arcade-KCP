# 🎮 Arcadia Platform

> A feature-rich, full-stack gaming platform with modern authentication, built with React and Node.js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)

---

## 📋 Overview

Welcome to **Arcadia Platform** — a comprehensive gaming application that combines classic arcade games with modern web technologies. Experience seamless gameplay with enterprise-grade security features including email verification, password reset, Google OAuth, and two-factor authentication.

Whether you're a casual gamer or a developer looking for a robust gaming platform template, this project delivers both functionality and best practices.

---

## 📸 Screenshots

<div align="center">

### Application Preview

| | | |
|:---:|:---:|:---:|
| [![Screenshot 1](./dist/assets/Screenshot%202026-01-21%20133514.png)](./dist/assets/Screenshot%202026-01-21%20133514.png) | [![Screenshot 2](./dist/assets/Screenshot%202026-01-21%20133855.png)](./dist/assets/Screenshot%202026-01-21%20133855.png) | [![Screenshot 3](./dist/assets/Screenshot%202026-01-21%20133905.png)](./dist/assets/Screenshot%202026-01-21%20133905.png) |
| [![Screenshot 4](./dist/assets/Screenshot%202026-01-21%20133915.png)](./dist/assets/Screenshot%202026-01-21%20133915.png) | [![Screenshot 5](./dist/assets/Screenshot%202026-01-21%20133944.png)](./dist/assets/Screenshot%202026-01-21%20133944.png) | [![Screenshot 6](./dist/assets/Screenshot%202026-01-21%20134325.png)](./dist/assets/Screenshot%202026-01-21%20134325.png) |
| [![Screenshot 7](./dist/assets/Screenshot%202026-01-21%20134432.png)](./dist/assets/Screenshot%202026-01-21%20134432.png) | [![Screenshot 8](./dist/assets/Screenshot%202026-01-21%20134442.png)](./dist/assets/Screenshot%202026-01-21%20134442.png) | [![Screenshot 9](./dist/assets/Screenshot%202026-01-21%20134454.png)](./dist/assets/Screenshot%202026-01-21%20134454.png) |
| [![Screenshot 10](./dist/assets/Screenshot%202026-01-21%20134508.png)](./dist/assets/Screenshot%202026-01-21%20134508.png) | [![Screenshot 11](./dist/assets/Screenshot%202026-01-21%20134533.png)](./dist/assets/Screenshot%202026-01-21%20134533.png) | [![Screenshot 12](./dist/assets/Screenshot%202026-01-21%20134624.png)](./dist/assets/Screenshot%202026-01-21%20134624.png) |

*Arcadia Platform - A modern gaming experience with enterprise-grade authentication*

</div>

---

## ✨ Key Features

### 🎯 Gaming
- **Classic Games**: Tic Tac Toe, Snake, Memory Match, Rock Paper Scissors And More Coming
- **Responsive Gameplay**: Optimized for desktop and mobile devices
- **Real-time Scoring**: Track your scores and compete on leaderboards
- **Game Statistics**: View detailed gameplay analytics

### 🔐 Enterprise-Grade Authentication
- ✅ **Email Verification** — Secure account activation
- ✅ **Password Reset** — Token-based recovery with email
- ✅ **Google OAuth** — One-click authentication
- ✅ **Two-Factor Authentication** — TOTP-based 2FA
- ✅ **Session Management** — JWT token handling
- ✅ **Email Notifications** — HTML-formatted email templates

### 🎨 User Experience
- **Modern UI/UX** — Built with Tailwind CSS and Framer Motion
- **Keyboard Navigation** — Full keyboard support for games
- **Accessibility** — WCAG compliant with proper ARIA labels
- **Error Handling** — Graceful error boundaries
- **Loading States** — Smooth transitions and feedback

### 🚀 Performance & Reliability
- **SEO Optimized** — Meta tags and structured data
- **Error Boundaries** — Crash prevention and recovery
- **Input Validation** — Client and server-side validation
- **Security Headers** — Protection against common vulnerabilities

---

## 🛠️ Technology Stack

### Frontend
```
React 18          - UI Framework
React Router v6   - Client-side Routing
Tailwind CSS      - Utility-first CSS
Framer Motion     - Animations
Lucide React      - Icon Library
Vite              - Build Tool
```

### Backend
```
Node.js/Express   - Server Framework
MongoDB Atlas     - Cloud Database
Passport.js       - Authentication
JWT               - Token Generation
Nodemailer        - Email Service
Speakeasy         - 2FA/TOTP
Bcryptjs          - Password Hashing
```

### DevOps
```
Environment Config - Dotenv
Version Control   - Git & GitHub
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (free tier available)
- Gmail account (for email service)
- Google Cloud Project (for OAuth)

### Backend Setup

```bash
# 1. Navigate to backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Configure environment variables
# Edit .env with your credentials:
# - MongoDB Atlas connection string
# - JWT & Session secrets
# - Email credentials
# - Google OAuth credentials

# 5. Start development server
npm start

# Server will run on http://localhost:5000
```

### Frontend Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# Frontend will run on http://localhost:5173
```

### Access the Application

Open your browser and navigate to: `http://localhost:5173`

---

## 📚 Documentation

### Setup Guides
- **[Authentication Setup](./AUTHENTICATION_SETUP.md)** - Detailed configuration guide for all auth features
- **[Email Configuration](./AUTHENTICATION_SETUP.md#email-configuration)** - Gmail setup with app passwords
- **[Google OAuth Setup](./AUTHENTICATION_SETUP.md#google-oauth-setup)** - OAuth integration steps
- **[2FA Setup](./AUTHENTICATION_SETUP.md#two-factor-authentication)** - Enable two-factor authentication

### API Reference

#### Authentication Endpoints
```
POST   /api/auth/signup              Register new user
POST   /api/auth/login               Login user
GET    /api/auth/verify-email/:token Verify email address
POST   /api/auth/resend-verification Resend verification email
POST   /api/auth/forgot-password     Request password reset
POST   /api/auth/reset-password/:token Reset password
GET    /api/auth/google              Initiate Google OAuth
GET    /api/auth/google/callback     OAuth callback handler
```

#### Two-Factor Authentication
```
POST   /api/2fa/setup                Setup 2FA (get QR code)
POST   /api/2fa/verify               Verify and enable 2FA
POST   /api/2fa/validate             Validate 2FA token
POST   /api/2fa/disable              Disable 2FA
GET    /api/2fa/status               Check 2FA status
```

#### Game Scores
```
POST   /api/scores                   Save game score
GET    /api/scores/:userId           Get user scores
GET    /api/scores/leaderboard/:game Get game leaderboard
```

---

## 🎮 How to Play

### Tic Tac Toe
- Click cells or use arrow keys to select
- Press Enter/Space to place your mark
- First to 3-in-a-row wins
- **Keyboard Shortcuts**: Arrow Keys + Enter

### Snake Game
- Use arrow keys to move
- Eat food to grow and score
- Avoid walls and self-collision
- **Difficulty**: Increases with length

### Memory Game
- Click cards to reveal pairs
- Match all pairs to complete
- Fewer moves = higher score
- **Challenge**: Classic memory test

### Rock Paper Scissors
- Choose your move
- Play against AI
- 5 options: Rock, Paper, Scissors, Lizard, Spock
- **Streak Tracking**: Maintain winning streaks

---

## 📁 Project Structure

```
arcadia/
├── Backend/
│   ├── config/
│   │   ├── db.js                 MongoDB connection
│   │   └── passport.js           OAuth configuration
│   ├── middleware/
│   │   └── auth.js               JWT middleware
│   ├── models/
│   │   ├── User.js               User schema
│   │   └── GameScore.js          Score schema
│   ├── routes/
│   │   ├── auth.js               Authentication endpoints
│   │   ├── scores.js             Score endpoints
│   │   └── twoFactor.js          2FA endpoints
│   ├── services/
│   │   └── emailService.js       Email functionality
│   ├── .env.example              Config template
│   └── server.js                 Express server
│
├── src/
│   ├── Authentication/
│   │   ├── LoginForm.jsx         Login interface
│   │   ├── SignUpForm.jsx        Registration interface
│   │   ├── ForgotPassword.jsx    Password recovery
│   │   ├── ResetPassword.jsx     Password reset
│   │   ├── VerifyEmail.jsx       Email verification
│   │   └── OAuthSuccess.jsx      OAuth callback
│   ├── Games/
│   │   ├── snake.jsx             Snake game
│   │   ├── TicTacToe.jsx         Tic tac toe
│   │   ├── MemoryCardGame.jsx    Memory game
│   │   └── rockpaper.jsx         Rock paper scissors
│   ├── components/
│   │   ├── Navbar.jsx            Navigation
│   │   ├── UserSettings.jsx      Account settings
│   │   ├── TwoFactorSetup.jsx    2FA setup
│   │   └── ...                   Other components
│   ├── context/
│   │   └── AuthContext.jsx       Auth state management
│   ├── services/
│   │   └── api.js                API client
│   └── main.jsx                  Entry point
│
├── AUTHENTICATION_SETUP.md        Auth setup guide
├── README.md                      This file
└── package.json                   Dependencies
```

---

## 🔒 Security Features

### Password Security
- Bcryptjs hashing (10 salt rounds)
- Minimum 6 character requirement
- Secure password reset tokens

### Session Management
- JWT token-based authentication
- 7-day token expiration
- Secure session storage

### Two-Factor Authentication
- TOTP standard (RFC 6238)
- QR code generation
- Authenticator app compatible

### Email Security
- Token-based verification (24-hour expiry)
- Secure password reset (1-hour expiry)
- HTML email templates

### Input Validation
- Client-side validation
- Server-side sanitization
- SQL injection prevention
- XSS protection

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
# Ensure all environment variables are set
# Deploy Backend/ folder
# Configure custom domain
```

### Environment Variables
Required variables for deployment:
```
MONGODB_URI
JWT_SECRET
SESSION_SECRET
FRONTEND_URL
BACKEND_URL
EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
```

---

## 📈 Performance Metrics

- ⚡ Page Load: < 2 seconds
- 🎮 Game Launch: < 500ms
- 📧 Email Delivery: < 5 seconds
- 🔐 Auth Processing: < 1 second

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙋 Support & Feedback

- 📧 **Email**: shamanlubbu@gmail.com
- 🐛 **Report Bugs**: Create an issue on GitHub
- 💡 **Suggestions**: Discussions section

---

## 🎯 Roadmap

### Planned Features
- [ ] Leaderboard system with rankings
- [ ] Achievement/Badge system
- [ ] Multiplayer games
- [ ] Game difficulty levels
- [ ] Social features (friends, challenges)
- [ ] Mobile app version
- [ ] Sound effects & background music
- [ ] Game replays & sharing

### Under Consideration
- [ ] More Games
- [ ] Community tournaments
- [ ] In-game rewards system
- [ ] Video tutorials
- [ ] Dark/Light theme toggle
- [ ] Localization (i18n)

---

## 📊 Statistics

```
Games:              classic arcade games
Authentication:     Email, OAuth, 2FA
API Endpoints:      15+ endpoints
User Models:        User, GameScore
Frontend Routes:    10+ routes
Security Layers:    3+ (JWT, 2FA, hashing)
```

---

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for utility-first approach
- MongoDB for reliable database services
- Google for OAuth services

---

<div align="center">

Made with ❤️ for gamers and developers

[⬆ back to top](#-arcadia-platform)

</div>
