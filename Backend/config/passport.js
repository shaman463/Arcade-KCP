import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Ensure env vars are available when this module loads
dotenv.config();

// Passport configuration
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

// Google OAuth Strategy (enabled if credentials present)
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } = process.env;

console.log('📋 [Passport] Checking Google OAuth credentials:');
console.log('  GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID ? `${GOOGLE_CLIENT_ID.substring(0, 20)}...` : 'NOT SET');
console.log('  GOOGLE_CLIENT_SECRET:', GOOGLE_CLIENT_SECRET ? `${GOOGLE_CLIENT_SECRET.substring(0, 10)}...` : 'NOT SET');
console.log('  BACKEND_URL:', BACKEND_URL || 'NOT SET');

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: BACKEND_URL
            ? `${BACKEND_URL}/api/auth/google/callback`
            : 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

            // Try to find existing user by oauthId or email
            let user = await User.findOne({ oauthProvider: 'google', oauthId: profile.id });
            if (!user && email) {
              user = await User.findOne({ email });
            }

            if (user) {
              // Update provider info if missing
              if (!user.oauthProvider || !user.oauthId) {
                user.oauthProvider = 'google';
                user.oauthId = profile.id;
              }
              if (!user.emailVerified) {
                user.emailVerified = true;
              }
              await user.save();
              return done(null, user);
            }

            // Create a unique username
            let baseUsername = (profile.displayName || (email ? email.split('@')[0] : 'user')).replace(/\s+/g, '').slice(0, 20);
            let uniqueUsername = baseUsername;
            let suffix = 1;
            while (await User.findOne({ username: uniqueUsername })) {
              uniqueUsername = `${baseUsername}${suffix}`;
              suffix += 1;
            }

            const newUser = new User({
              username: uniqueUsername,
              email,
              oauthProvider: 'google',
              oauthId: profile.id,
              emailVerified: true,
            });
            await newUser.save();
            return done(null, newUser);
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );
    console.log('✅ [Passport] Google OAuth strategy initialized successfully');
  } catch (strategyErr) {
    console.error('❌ [Passport] Error initializing Google OAuth strategy:', strategyErr.message);
    console.error(strategyErr.stack);
  }
} else {
  console.warn('⚠️  [Passport] Google OAuth not initialized: missing credentials');
  if (!GOOGLE_CLIENT_ID) console.warn('  → GOOGLE_CLIENT_ID is missing');
  if (!GOOGLE_CLIENT_SECRET) console.warn('  → GOOGLE_CLIENT_SECRET is missing');
}

export default passport;
