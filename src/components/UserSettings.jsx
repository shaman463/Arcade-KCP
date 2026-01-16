import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TwoFactorSetup from './TwoFactorSetup';
import Navbar from './Navbar';
import Footer from './Footer';

const UserSettings = () => {
  const { user } = useContext(AuthContext);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    checkTwoFactorStatus();
  }, []);

  const checkTwoFactorStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/2fa/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTwoFactorEnabled(data.twoFactorEnabled);
      }
    } catch (err) {
      console.error('Failed to check 2FA status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    const password = prompt('Enter your password to disable 2FA:');
    const token = prompt('Enter your current 2FA code:');

    if (!password || !token) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/2fa/disable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ password, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setTwoFactorEnabled(false);
        setSuccess('2FA has been disabled successfully');
      } else {
        setError(data.error || 'Failed to disable 2FA');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#1A0033] to-[#0A001A] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center" 
              style={{ textShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF' }}>
            Account Settings
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border-2 border-green-500 rounded-lg text-green-300">
              {success}
            </div>
          )}

          {/* User Info Section */}
          <div className="bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Username:</span>
                <span className="text-white ml-3">{user?.username || 'Not logged in'}</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="text-white ml-3">{user?.email || 'Not logged in'}</span>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Security</h2>
            
            <div className="border-b border-gray-700 pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl text-white font-semibold mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-400 text-sm">
                    Add an extra layer of security to your account
                  </p>
                  {twoFactorEnabled && (
                    <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 border border-green-500 text-green-300 rounded-full text-sm">
                      ✓ Enabled
                    </span>
                  )}
                </div>
                <div>
                  {loading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
                  ) : twoFactorEnabled ? (
                    <button
                      onClick={handleDisable2FA}
                      className="bg-red-500/20 border-2 border-red-500 text-red-300 px-6 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                    >
                      Disable 2FA
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowTwoFactorSetup(true)}
                      className="bg-cyan-500/20 border-2 border-cyan-500 text-cyan-300 px-6 py-2 rounded-lg hover:bg-cyan-500/30 transition-all duration-300"
                    >
                      Enable 2FA
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-white font-semibold mb-2">Password</h3>
              <p className="text-gray-400 text-sm mb-4">
                Change your password to keep your account secure
              </p>
              <a
                href="/forgot-password"
                className="inline-block bg-purple-500/20 border-2 border-purple-500 text-purple-300 px-6 py-2 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
              >
                Change Password
              </a>
            </div>
          </div>

          {/* Back to Games */}
          <div className="text-center">
            <a
              href="/games"
              className="inline-block bg-transparent border-2 border-cyan-400 text-white font-bold rounded-lg py-3 px-8 hover:bg-cyan-500/20 transition-all duration-300"
              style={{ boxShadow: '0 0 15px rgba(0, 217, 255, 0.3)' }}
            >
              ← Back to Games
            </a>
          </div>
        </div>

        {/* 2FA Setup Modal */}
        {showTwoFactorSetup && (
          <TwoFactorSetup
            onClose={() => {
              setShowTwoFactorSetup(false);
              checkTwoFactorStatus();
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserSettings;
