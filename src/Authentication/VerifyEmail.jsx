import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid or missing verification token');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/auth/verify-email/${token}`, {
          method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        {status === 'verifying' && (
          <>
            <div className="mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Verifying Email...</h2>
            <p className="text-gray-600">Please wait while we verify your email address</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-4 text-green-500 text-6xl">✓</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-gray-500">Redirecting you to the home page...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-4 text-red-500 text-6xl">✕</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Verification Failed</h2>
            <p className="text-red-600 mb-6">{message}</p>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300"
            >
              Go to Home
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
