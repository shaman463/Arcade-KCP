import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#0A001A] to-[#1A0033]">
      {/* Animated background particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            i % 2 === 0 ? 'bg-cyan-400' : 'bg-pink-400'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],   // This is the animatoin for the small dots that are moving up and down
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full border-4 border-cyan-400/30"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full border-4 border-pink-400/30"
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1]
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Sparkles icon */}
        <motion.div
          className="inline-block mb-6"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Sparkles className="w-16 h-16 text-yellow-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6 neon-text-gradient"
          style={{
            background: 'linear-gradient(90deg, #00D9FF 0%, #FF006E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(0, 217, 255, 0.5)'
          }}
        >
          Ready to Start Playing?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Join thousands of players worldwide and experience gaming like never before. 
          Your next adventure awaits!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-block"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(255, 0, 110, 0.5)',
                '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(255, 0, 110, 0.8)',
                '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(255, 0, 110, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="rounded-xl"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="text-white font-bold px-12 py-8 text-2xl rounded-xl border-2 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(255, 0, 110, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                }}
              >
                Join the Game Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-gray-400 text-sm"
        >
          No credit card required • Instant access • Free to start
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;