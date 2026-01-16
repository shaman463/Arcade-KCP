import React, { useState } from 'react';

const LoginForm = ({ onClose, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', formData);
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
            <a href="#" className="hover:text-pink-300 hover:underline transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-transparent border-2 border-cyan-400 text-white font-bold rounded-lg py-3 px-4 hover:bg-cyan-500/20 transition-all duration-300"
            style={{ boxShadow: '0 0 15px rgba(0, 217, 255, 0.3)' }}
          >
            Login
          </button>
        </form>

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