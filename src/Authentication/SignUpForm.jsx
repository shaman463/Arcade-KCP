import React, { useState } from 'react';

const SignUpForm = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Handle signup logic here
    console.log('SignUp submitted:', formData);
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

      {/* Right: SignUp Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-4xl font-bold mb-8 text-white text-center neon-text-magenta" 
            style={{ textShadow: '0 0 10px #FF006E, 0 0 20px #FF006E' }}>
          Sign Up
        </h1>
        
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-pink-300 mb-2 font-medium">
              Name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border-2 border-pink-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-400 transition-all duration-300"
              style={{ boxShadow: '0 0 5px rgba(255, 0, 110, 0.2)' }}
              autoComplete="off"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-pink-300 mb-2 font-medium">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border-2 border-pink-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-400 transition-all duration-300"
              style={{ boxShadow: '0 0 5px rgba(255, 0, 110, 0.2)' }}
              autoComplete="off"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-pink-300 mb-2 font-medium">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border-2 border-pink-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-400 transition-all duration-300"
              style={{ boxShadow: '0 0 5px rgba(255, 0, 110, 0.2)' }}
              autoComplete="off"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-pink-300 mb-2 font-medium">
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border-2 border-pink-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-400 transition-all duration-300"
              style={{ boxShadow: '0 0 5px rgba(255, 0, 110, 0.2)' }}
              autoComplete="off"
              required
            />
          </div>

          {/* SignUp Button */}
          <button 
            type="submit" 
            className="w-full bg-transparent border-2 border-pink-500 text-white font-bold rounded-lg py-3 px-4 hover:bg-pink-500/20 transition-all duration-300"
            style={{ boxShadow: '0 0 15px rgba(255, 0, 110, 0.3)' }}
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-gray-300 text-center">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold transition-colors"
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;