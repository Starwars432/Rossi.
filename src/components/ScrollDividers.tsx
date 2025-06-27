import React from 'react';
import { motion } from 'framer-motion';

// Hero → Services Divider: Blurred gradient pulse
export const HeroToServicesDivider: React.FC = () => {
  return (
    <div className="relative h-32 overflow-hidden">
      {/* Gradient pulse effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(147, 51, 234, 0.3) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Rising power effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${20 + i * 12}%`,
            bottom: '-20px',
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -120],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  );
};

// Services → FAQ Divider: Vapor-like smoke
export const ServicesToFAQDivider: React.FC = () => {
  return (
    <div className="relative h-40 overflow-hidden">
      {/* SVG Wave Background */}
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="smokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.4)" />
            <stop offset="50%" stopColor="rgba(79, 70, 229, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
          fill="url(#smokeGradient)"
          animate={{
            d: [
              "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
              "M0,80 C300,40 900,100 1200,40 L1200,120 L0,120 Z",
              "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Floating vapor particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`vapor-${i}`}
          className="absolute rounded-full blur-md"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 60}px`,
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '147, 51, 234' : '79, 70, 229'}, 0.4) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 50],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// FAQ → CTA Divider: Vignette fade with noise
export const FAQToCTADivider: React.FC = () => {
  return (
    <div className="relative h-48 overflow-hidden">
      {/* Vignette fade effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 1) 100%),
            linear-gradient(to bottom, rgba(31, 41, 55, 0.8) 0%, rgba(0, 0, 0, 1) 100%)
          `,
        }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tension-building particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`tension-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
            width: '2px',
            height: '2px',
            background: '#EF4444',
            borderRadius: '50%',
            boxShadow: '0 0 10px #EF4444',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Climactic energy buildup */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: '200px',
          height: '100px',
          background: 'radial-gradient(ellipse, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};