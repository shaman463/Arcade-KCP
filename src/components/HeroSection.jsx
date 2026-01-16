import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../Authentication/LoginForm';
import SignUpForm from '../Authentication/SignUpForm';


const HeroSection = () => {
  const title = "ARCADE GAME";
  const navigate = useNavigate();
  const { playAsGuest } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handlePlayAsGuest = () => {
    playAsGuest();
    navigate('/games');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1632765743329-3b257fe779a6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
        }}>
      </div>

      {/* Login & SignUp Buttons - Top Right */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Button 
          onClick={() => setShowLogin(true)}
          className="text-white font-semibold px-6 py-2.5 text-sm rounded-lg border-2 border-cyan-400 bg-transparent hover:bg-cyan-500/30 transition-all duration-300"
          style={{          }}
        >
          Login
        </Button>
        <Button 
          onClick={() => setShowSignUp(true)}
          className="text-white font-semibold px-6 py-2.5 text-sm rounded-lg border-2 border-pink-500 bg-pink-500/20 hover:bg-pink-500/40 transition-all duration-300"
          style={{    }}
        >
          SignUp
        </Button>
      </div>
      
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Animated Title */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-6 flex flex-wrap justify-center gap-2 md:gap-4"
        >
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block neon-text-cyan"
              style={{
                textShadow: char === ' ' ? 'none' : '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF, 0 0 40px #00D9FF'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl text-gray-200 mb-12 neon-text-magenta"
          style={{
            textShadow: '0 0 10px #FF006E, 0 0 20px #FF006E'
          }}
        >
          Experience the Ultimate Gaming Adventure
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div>
            <Button
              onClick={handlePlayAsGuest}
              className="neon-button-cyan text-white font-bold px-8 py-6 text-lg rounded-xl border-2 border-cyan-400 bg-transparent hover:bg-cyan-500/20 transition-all duration-300"
              style={{
                boxShadow: '0 0 15px #00D9FF, 0 0 30px #00D9FF, inset 0 0 15px rgba(0, 217, 255, 0.2)'
              }}
            >
              Play Now As a Guest
            </Button>
          </div>

          <div>
            <Button
              className="neon-button-magenta text-white font-bold px-8 py-6 text-lg rounded-xl border-2 border-pink-500 bg-transparent hover:bg-pink-500/20 transition-all duration-300"
              style={{
                boxShadow: '0 0 15px #FF006E, 0 0 30px #FF006E, inset 0 0 15px rgba(255, 0, 110, 0.2)'
              }}
            >
              Explore Games
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-cyan-500/20 blur-xl"
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-pink-500/20 blur-xl"
      />

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl mx-4">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-cyan-400 transition-colors z-10"
            >
              &times;
            </button>
            <LoginForm 
              onClose={() => setShowLogin(false)}
              onSwitchToSignUp={() => {
                setShowLogin(false);
                setShowSignUp(true);
              }}
            />
          </div>
        </div>
      )}

      {/* SignUp Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl mx-4">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-pink-400 transition-colors z-10"
            >
              &times;
            </button>
            <SignUpForm 
              onClose={() => setShowSignUp(false)}
              onSwitchToLogin={() => {
                setShowSignUp(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;