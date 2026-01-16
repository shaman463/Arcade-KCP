import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      setTimeout(() => {
        navigate('/');
        window.location.reload(); // Refresh to update auth state
      }, 1500);
    } else {
      navigate('/?error=oauth_failed');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Login Successful!</h2>
        <p className="text-gray-600">Redirecting you to the home page...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
