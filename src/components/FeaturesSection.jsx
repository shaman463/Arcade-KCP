import React from 'react';
import { Gamepad2, Zap, Trophy, Gauge } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Instant Play',
      description: 'Jump right into action. No downloads, no waiting. Just pure gaming excitement.',
      color: 'cyan'
    },
    {
      icon: <Gamepad2 className="w-12 h-12" />,
      title: 'Retro & Modern Games',
      description: 'From classic arcade hits to cutting-edge titles. Something for every gamer.',
      color: 'magenta'
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'Compete & Win',
      description: 'Challenge players worldwide. Climb leaderboards and earn epic rewards.',
      color: 'cyan'
    },
    {
      icon: <Gauge className="w-12 h-12" />,
      title: 'Smooth Performance',
      description: 'Optimized gameplay with stunning graphics. Experience gaming at its finest.',
      color: 'magenta'
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-[#1A0033] to-[#0A001A]">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl"
        />
        <div
          className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-pink-500/5 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 neon-text-cyan"
          style={{
            textShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF'
          }}
        >
          Why Choose Us
        </h2>

        <p
          className="text-center text-gray-300 mb-16 text-lg"
        >
          Discover what makes our gaming platform extraordinary
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card p-6 rounded-xl shadow-lg backdrop-blur-sm ${
                feature.color === 'cyan' ? 'feature-card-cyan' : 'feature-card-magenta'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(26, 0, 51, 0.8), rgba(10, 0, 26, 0.9))',
                border: '2px solid transparent'
              }}
            >
              <div
                className={`mb-4 ${
                  feature.color === 'cyan' ? 'text-cyan-400' : 'text-pink-400'
                }`}
              >
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;