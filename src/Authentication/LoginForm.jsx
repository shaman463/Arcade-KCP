import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = ({ onClose, onSwitchToSignUp }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      onClose();
      navigate('/games');
    } catch (err) {
      setError(err.error || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1A0033] to-[#0A001A] flex justify-center items-center min-h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block relative">
        <img 
          src="https://images.unsplash.com/photo-1632765743329-3b257fe779a6?q=80&w=1074&auto=format&fit=crop" 
          alt="Arcade Games" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0033] to-transparent opacity-60"></div>
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-4xl font-bold mb-8 text-white text-center neon-text-cyan" 
            style={{ textShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF' }}>
          Login
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-cyan-300 mb-2 font-medium">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
              style={{ boxShadow: '0 0 5px rgba(0, 217, 255, 0.2)' }}
              autoComplete="off"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-cyan-300 mb-2 font-medium">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
              style={{ boxShadow: '0 0 5px rgba(0, 217, 255, 0.2)' }}
              autoComplete="off"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              name="remember" 
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-500 bg-gray-900 border-cyan-500 rounded focus:ring-cyan-400"
            />
            <label htmlFor="remember" className="text-gray-300 ml-2">
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-pink-400">
            <a href="/forgot-password" className="hover:text-pink-300 hover:underline transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-transparent border-2 border-cyan-400 text-white font-bold rounded-lg py-3 px-4 hover:bg-cyan-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 0 15px rgba(0, 217, 255, 0.3)' }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#1A0033] text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'https://arcade-game-22cw.onrender.com'}/api/auth/google`}
          className="w-full bg-white text-gray-800 font-semibold rounded-lg py-3 px-4 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Sign up Link */}
        <div className="mt-6 text-gray-300 text-center">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignUp}
            className="text-pink-400 hover:text-pink-300 hover:underline font-semibold transition-colors"
          >
            Sign up Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;