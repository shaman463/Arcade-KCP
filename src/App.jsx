import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';

function App() {
  return (
    <>
      <Helmet>
        <title>Arcade Game - Ultimate Gaming Experience</title>
        <meta name="description" content="Experience the ultimate gaming adventure with instant play, retro and modern games, competitive gameplay, and smooth performance. Join thousands of players worldwide!" />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A0033] overflow-x-hidden relative">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </>
  );
}

export default App;