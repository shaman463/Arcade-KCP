import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// Determine the backend URL based on environment
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? process.env.BACKEND_URL || 'https://arcade-game-22cw.onrender.com'
  : process.env.BACKEND_URL || 'http://localhost:5000';

// Only initialize Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ oauthId: profile.id, oauthProvider: 'google' });

        if (user) {
          return done(null, user);
        }

        // Check if email already exists with regular signup
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link OAuth to existing account
          user.oauthProvider = 'google';
          user.oauthId = profile.id;
          user.emailVerified = true; // Google emails are verified
          await user.save();
          return done(null, user);
        }

        // Create new user
        const newUser = new User({
          username: profile.displayName || profile.emails[0].value.split('@')[0],
          email: profile.emails[0].value,
          oauthProvider: 'google',
          oauthId: profile.id,
          emailVerified: true, // Google emails are verified
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        console.error('Google OAuth error:', error);
        done(error, null);
      }
    }
  )
);
  console.log('✅ Google OAuth enabled');
} else {
  console.log('ℹ️  Google OAuth disabled');
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
