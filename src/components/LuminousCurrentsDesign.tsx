import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LuminousCurrentsDesignProps {
  isVisible: boolean;
  onClose?: () => void;
}

const LuminousCurrentsDesign: React.FC<LuminousCurrentsDesignProps> = ({ isVisible }) => {
  const [animationPhase, setAnimationPhase] = useState<'flowing' | 'pulse' | 'shift'>('flowing');

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => {
          switch (prev) {
            case 'flowing': return 'pulse';
            case 'pulse': return 'shift';
            case 'shift': return 'flowing';
            default: return 'flowing';
          }
        });
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  // Generate cosmic particles with different behaviors
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const type = Math.random();
      let particleType = 'star';
      
      if (type < 0.15) particleType = 'nebula';
      else if (type < 0.25) particleType = 'comet';
      else if (type < 0.35) particleType = 'energy';
      else if (type < 0.45) particleType = 'glow';
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        type: particleType,
        speed: Math.random() * 20 + 10,
        opacity: Math.random() * 0.8 + 0.3,
        color: [
          '#FFD700', // Gold
          '#FFA500', // Orange
          '#FF6B35', // Red-Orange
          '#8A2BE2', // Blue-Violet
          '#4169E1', // Royal Blue
          '#00CED1', // Dark Turquoise
          '#FF1493', // Deep Pink
          '#32CD32', // Lime Green
        ][Math.floor(Math.random() * 8)],
        delay: Math.random() * 8,
      };
    });
  };

  const particles = generateParticles(120);

  return (
    <div className="absolute inset-0 bg-transparent overflow-hidden">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-black opacity-90" />
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 105, 180, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 20%, rgba(255, 215, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 30% 60%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 90%, rgba(255, 105, 180, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.18) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(138, 43, 226, 0.18) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(255, 105, 180, 0.18) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main Flowing Currents - Multiple Layers */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="currentGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.6)" />
            <stop offset="25%" stopColor="rgba(255, 165, 0, 0.5)" />
            <stop offset="50%" stopColor="rgba(255, 107, 53, 0.4)" />
            <stop offset="75%" stopColor="rgba(138, 43, 226, 0.5)" />
            <stop offset="100%" stopColor="rgba(65, 105, 225, 0.4)" />
          </linearGradient>
          
          <linearGradient id="currentGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(138, 43, 226, 0.4)" />
            <stop offset="30%" stopColor="rgba(255, 20, 147, 0.5)" />
            <stop offset="60%" stopColor="rgba(255, 165, 0, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 206, 209, 0.3)" />
          </linearGradient>

          <filter id="luminousGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Primary Flowing Wave */}
        <motion.path
          d="M-50,150 Q100,80 200,140 T450,120 L450,350 L-50,350 Z"
          fill="url(#currentGradient1)"
          filter="url(#luminousGlow)"
          animate={{
            d: [
              "M-50,150 Q100,80 200,140 T450,120 L450,350 L-50,350 Z",
              "M-50,120 Q100,200 200,110 T450,160 L450,350 L-50,350 Z",
              "M-50,180 Q100,60 200,170 T450,90 L450,350 L-50,350 Z",
              "M-50,150 Q100,80 200,140 T450,120 L450,350 L-50,350 Z",
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary Flowing Wave */}
        <motion.path
          d="M-50,200 Q150,120 250,180 T450,160 L450,350 L-50,350 Z"
          fill="url(#currentGradient2)"
          filter="url(#luminousGlow)"
          opacity={0.7}
          animate={{
            d: [
              "M-50,200 Q150,120 250,180 T450,160 L450,350 L-50,350 Z",
              "M-50,170 Q150,250 250,150 T450,200 L450,350 L-50,350 Z",
              "M-50,230 Q150,100 250,210 T450,130 L450,350 L-50,350 Z",
              "M-50,200 Q150,120 250,180 T450,160 L450,350 L-50,350 Z",
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Flowing Current Lines */}
        <motion.path
          d="M0,100 Q200,60 400,90"
          stroke="rgba(255, 215, 0, 0.8)"
          strokeWidth="3"
          fill="none"
          filter="url(#strongGlow)"
          animate={{
            d: [
              "M0,100 Q200,60 400,90",
              "M0,120 Q200,180 400,110",
              "M0,80 Q200,40 400,70",
              "M0,100 Q200,60 400,90",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M0,180 Q200,220 400,190"
          stroke="rgba(138, 43, 226, 0.6)"
          strokeWidth="2"
          fill="none"
          filter="url(#luminousGlow)"
          animate={{
            d: [
              "M0,180 Q200,220 400,190",
              "M0,160 Q200,100 400,170",
              "M0,200 Q200,260 400,210",
              "M0,180 Q200,220 400,190",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        <motion.path
          d="M0,140 Q200,100 400,130"
          stroke="rgba(255, 20, 147, 0.5)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#luminousGlow)"
          animate={{
            d: [
              "M0,140 Q200,100 400,130",
              "M0,160 Q200,200 400,150",
              "M0,120 Q200,80 400,110",
              "M0,140 Q200,100 400,130",
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </svg>

      {/* Cosmic Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, particle.opacity, particle.opacity, 0],
            x: particle.type === 'comet' ? [0, 150] : 
               particle.type === 'energy' ? [0, Math.sin(particle.id) * 60] :
               [0, Math.sin(particle.id) * 20],
            y: particle.type === 'comet' ? [0, -80] : 
               particle.type === 'energy' ? [0, Math.cos(particle.id) * 40] :
               [0, Math.cos(particle.id) * 20],
            rotate: particle.type === 'energy' ? [0, 360] : 0,
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: particle.type === 'glow' ? "easeInOut" : "linear",
            delay: particle.delay,
          }}
        >
          {particle.type === 'star' && (
            <div
              className="rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              }}
            />
          )}
          
          {particle.type === 'nebula' && (
            <div
              className="rounded-full blur-sm"
              style={{
                width: `${particle.size * 6}px`,
                height: `${particle.size * 6}px`,
                background: `radial-gradient(circle, ${particle.color}60 0%, ${particle.color}30 40%, transparent 70%)`,
              }}
            />
          )}
          
          {particle.type === 'comet' && (
            <div className="relative">
              <div
                className="rounded-full"
                style={{
                  width: `${particle.size * 1.5}px`,
                  height: `${particle.size * 1.5}px`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
                }}
              />
              <div
                className="absolute top-1/2 left-full h-px origin-left"
                style={{
                  width: `${particle.size * 20}px`,
                  background: `linear-gradient(to right, ${particle.color}, ${particle.color}80, transparent)`,
                  transform: 'translateY(-50%) rotate(30deg)',
                }}
              />
            </div>
          )}

          {particle.type === 'energy' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 2}px`,
                height: `${particle.size * 2}px`,
                background: `radial-gradient(circle, ${particle.color}, ${particle.color}60, transparent)`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {particle.type === 'glow' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 4}px`,
                height: `${particle.size * 4}px`,
                background: `radial-gradient(circle, ${particle.color}40, transparent)`,
                filter: 'blur(2px)',
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Floating Energy Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + (i % 4) * 20}%`,
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            background: `radial-gradient(circle, ${
              ['rgba(255, 215, 0, 0.3)', 'rgba(138, 43, 226, 0.3)', 'rgba(255, 20, 147, 0.3)', 'rgba(0, 206, 209, 0.3)'][i % 4]
            } 0%, transparent 70%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 30, 0],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Central Luminous Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '300px',
          height: '150px',
          background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.25) 0%, rgba(138, 43, 226, 0.2) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.5, 1.2, 1],
          opacity: [0.4, 0.8, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Cosmic Dust Clouds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute blur-2xl"
          style={{
            left: `${i * 18}%`,
            top: `${20 + i * 15}%`,
            width: `${200 + i * 50}px`,
            height: `${100 + i * 30}px`,
            background: `linear-gradient(${60 + i * 40}deg, 
              rgba(255, 215, 0, 0.1) 0%, 
              rgba(138, 43, 226, 0.1) 30%,
              rgba(255, 20, 147, 0.1) 60%,
              rgba(0, 206, 209, 0.1) 100%)`,
            borderRadius: '50%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 40 + i * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, 300],
            y: [0, -150],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 12 + Math.random() * 15,
            ease: "easeOut",
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full">
            <div 
              className="absolute top-0 left-0 w-40 h-px bg-gradient-to-r from-white to-transparent transform -rotate-45 origin-left"
              style={{
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Subtle Content Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)',
        }}
      />
    </div>
  );
};

export default LuminousCurrentsDesign;