import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-20 px-6 bg-black">
      {/* Dramatic background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black">
        {/* Pulsing energy orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cta-orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-light text-white mb-6">
            Know what's worse than not trying?
          </h2>
          <p className="text-2xl text-gray-300">
            Still being stuck here next week.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="services" smooth={true} duration={500}>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(239, 68, 68, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.4)",
                  "0 0 40px rgba(239, 68, 68, 0.6)",
                  "0 0 20px rgba(239, 68, 68, 0.4)",
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="bg-red-600 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-red-700 transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              <span className="text-2xl">🔘</span>
              <span>I'm Ready to Win</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;