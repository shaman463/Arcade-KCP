import React, { useState, useEffect } from 'react';

const TwoFactorSetup = ({ onClose }) => {
  const [step, setStep] = useState(1); // 1: Setup, 2: Verify
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setupTwoFactor();
  }, []);

  const setupTwoFactor = async () => {
    setLoading(true);
    setError('');

    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/2fa/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setSecret(data.secret);
      } else {
        setError(data.error || 'Failed to setup 2FA');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyTwoFactor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose && onClose();
        }, 2000);
      } else {
        setError(data.error || 'Invalid token');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="mb-4 text-green-500 text-6xl">✓</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">2FA Enabled!</h2>
          <p className="text-gray-600">Your account is now more secure</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Setup Two-Factor Authentication</h2>
        <p className="text-gray-600 mb-6">Secure your account with 2FA</p>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Step 1: Scan QR Code</h3>
              <p className="text-gray-600 mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.)
              </p>
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
                </div>
              ) : (
                qrCode && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img src={qrCode} alt="QR Code" className="mx-auto" />
                  </div>
                )
              )}
            </div>

            {secret && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Or enter this code manually:</h4>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <code className="text-sm font-mono break-all">{secret}</code>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={loading || !qrCode}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300 disabled:opacity-50"
            >
              Next: Verify Code
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={verifyTwoFactor}>
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Step 2: Verify Code</h3>
              <p className="text-gray-600 mb-4">
                Enter the 6-digit code from your authenticator app
              </p>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || token.length !== 6}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Enable 2FA'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TwoFactorSetup;
