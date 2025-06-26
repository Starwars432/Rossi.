import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 px-6">
      {/* Rich Red/Dark Crimson Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/60 via-black to-black">
        {/* Animated background elements */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`contact-glow-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              left: `${25 + i * 20}%`,
              top: `${20 + i * 15}%`,
              width: `${120 + i * 30}px`,
              height: `${120 + i * 30}px`,
              background: 'linear-gradient(45deg, #DC2626, #EF4444, #F87171)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-light text-blue-400 mb-2">Get in Touch</h2>
          <p className="text-gray-400">
            Have questions or ready to start your project? Reach out to us and we'll get back to you as
            soon as possible.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto bg-black/40 backdrop-blur-lg border border-red-400/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            <h3 className="text-2xl text-blue-400 mb-6 text-center">Send Us a Message</h3>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
                aria-label="Name"
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
                aria-label="Email"
              />
              <input
                type="text"
                placeholder="What is this regarding?"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
                aria-label="Subject"
              />
              <textarea
                placeholder="Your message here..."
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
                aria-label="Message"
              />
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                    "0 0 30px rgba(239, 68, 68, 0.5)",
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                  ]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="w-full bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all font-medium"
                type="submit"
              >
                Start Now
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;