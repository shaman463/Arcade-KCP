import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../services/api';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithOAuth } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get('token');
    const redirectTo = searchParams.get('redirect') || 'games';
    
    if (token) {
      localStorage.setItem('token', token);
      
      // Fetch user info from backend
      const fetchUserInfo = async () => {
        try {
          const response = await authAPI.getCurrentUser();
          localStorage.setItem('user', JSON.stringify(response));
          
          // Update context
          loginWithOAuth(response);
          
          setTimeout(() => {
            navigate(`/${redirectTo}`);
          }, 1000);
        } catch (err) {
          console.error('Failed to fetch user info:', err);
          // Still redirect even if user fetch fails
          setTimeout(() => {
            navigate(`/${redirectTo}`);
            window.location.reload();
          }, 1000);
        }
      };
      
      fetchUserInfo();
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
