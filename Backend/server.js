import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import scoresRoutes from './routes/scores.js';
import twoFactorRoutes from './routes/twoFactor.js';
import passportConfig from './config/passport.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// Trust proxy for correct secure cookies on Render/hosted environments
if (isProd) {
  app.set('trust proxy', 1);
}

// Connect to MongoDB
connectDB();

// Session middleware (required for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passportConfig.initialize());
app.use(passportConfig.session());
// Debug strategies loaded
try {
  const loaded = Object.keys(passportConfig._strategies || {});
  console.log('🛠️ Passport strategies loaded:', loaded);
} catch (e) {
  console.warn('⚠️ Unable to list passport strategies:', e.message);
}

// CORS: restrict to allowed origins
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// Always allow localhost dev by default
['http://localhost:5173', 'http://localhost:3000'].forEach(devOrigin => {
  if (!allowedOrigins.includes(devOrigin)) allowedOrigins.push(devOrigin);
});

app.use(cors({
  origin(origin, callback) {
    // allow non-browser requests (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/2fa', twoFactorRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Debug route to verify passport strategies in runtime
app.get('/api/debug/strategies', (req, res) => {
  res.json({ strategies: Object.keys(passportConfig._strategies || {}) });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
