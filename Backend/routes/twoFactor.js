import express from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { send2FAEnabledEmail } from '../services/emailService.js';

const router = express.Router();

// @route   POST /api/2fa/setup
// @desc    Generate 2FA secret and QR code
// @access  Private
router.post('/setup', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('+twoFactorSecret');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.twoFactorEnabled) {
      return res.status(400).json({ error: '2FA is already enabled' });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Arcade Game (${user.email})`,
      issuer: 'Arcade Game',
    });

    // Save secret temporarily (not enabled until verified)
    user.twoFactorSecret = secret.base32;
    await user.save();

    // Generate QR code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl,
      message: 'Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/2fa/verify
// @desc    Verify 2FA token and enable 2FA
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const user = await User.findById(req.user.userId).select('+twoFactorSecret');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.twoFactorSecret) {
      return res.status(400).json({ error: 'Please setup 2FA first' });
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2, // Allow 2 time steps before and after
    });

    if (!verified) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Enable 2FA
    user.twoFactorEnabled = true;
    await user.save();

    // Send confirmation email
    try {
      await send2FAEnabledEmail(user.email, user.username);
    } catch (emailError) {
      console.error('Failed to send 2FA enabled email:', emailError);
    }

    res.json({
      message: '2FA enabled successfully',
      twoFactorEnabled: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/2fa/validate
// @desc    Validate 2FA token during login
// @access  Private
router.post('/validate', protect, async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const user = await User.findById(req.user.userId).select('+twoFactorSecret');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.twoFactorEnabled) {
      return res.status(400).json({ error: '2FA is not enabled' });
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2,
    });

    if (!verified) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    res.json({
      message: '2FA validation successful',
      valid: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/2fa/disable
// @desc    Disable 2FA
// @access  Private
router.post('/disable', protect, async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      return res.status(400).json({ error: 'Password and token are required' });
    }

    const user = await User.findById(req.user.userId).select('+password +twoFactorSecret');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user uses OAuth (no password)
    if (user.oauthProvider) {
      return res.status(400).json({ error: 'OAuth users need to verify with 2FA token only' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Verify 2FA token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2,
    });

    if (!verified) {
      return res.status(400).json({ error: 'Invalid 2FA token' });
    }

    // Disable 2FA
    user.twoFactorEnabled = false;
    user.twoFactorSecret = undefined;
    await user.save();

    res.json({
      message: '2FA disabled successfully',
      twoFactorEnabled: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/2fa/status
// @desc    Check 2FA status
// @access  Private
router.get('/status', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
