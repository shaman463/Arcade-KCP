import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passport from 'passport';
import User from '../models/User.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/emailService.js';
import { protect } from '../middleware/auth.js';
// Ensure passport config is loaded to register strategies
import '../config/passport.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const newUser = new User({ username: name, email, password });
    
    // Generate email verification token
    const verificationToken = newUser.generateEmailVerificationToken();
    
    // Send verification email - but don't require it for signup to succeed
    try {
      await sendVerificationEmail(email, name, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Mark as verified if email send fails so user can still login
      // This is temporary - user should verify email manually when email service is fixed
      newUser.emailVerified = true;
    }
    
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email and get password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // TEMPORARILY DISABLED: Email verification check while email service is being fixed
    // TODO: Re-enable when email service is working properly
    // if (!user.emailVerified && !user.oauthProvider) {
    //   return res.status(403).json({ 
    //     error: 'Please verify your email before logging in',
    //     emailVerified: false 
    //   });
    // }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/auth/verify-email
// @desc    Verify user email
// @access  Public
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the token to compare with stored hashed token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching token and not expired
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() },
    }).select('+emailVerificationToken +emailVerificationExpire');

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    // Update user
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    res.json({
      message: 'Email verified successfully',
      emailVerified: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Public
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, user.username, verificationToken);

    res.json({
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not
      return res.json({
        message: 'If an account exists with that email, a password reset link has been sent.',
      });
    }

    // Check if user used OAuth
    if (user.oauthProvider) {
      return res.status(400).json({ 
        error: `This account uses ${user.oauthProvider} login. Please use ${user.oauthProvider} to sign in.` 
      });
    }

    // Generate reset token
    const resetToken = user.generateResetPasswordToken();
    await user.save();

    // Send reset email
    try {
      await sendPasswordResetEmail(user.email, user.username, resetToken);
    } catch (emailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ error: 'Failed to send password reset email' });
    }

    res.json({
      message: 'If an account exists with that email, a password reset link has been sent.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password with token
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Hash the token to compare with stored hashed token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching token and not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpire +password');

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Generate new token
    const authToken = generateToken(user._id);

    res.json({
      message: 'Password reset successfully',
      token: authToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Protected
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token - go to games page after success
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}&redirect=games`);
  }
);

export default router;
