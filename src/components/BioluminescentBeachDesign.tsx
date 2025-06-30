import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BioluminescentBeachDesignProps {
  isVisible: boolean;
  onClose?: () => void;
}

const BioluminescentBeachDesign: React.FC<BioluminescentBeachDesignProps> = ({ isVisible }) => {
  const [wavePhase, setWavePhase] = useState<'incoming' | 'glowing' | 'receding'>('incoming');

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setWavePhase(prev => {
          switch (prev) {
            case 'incoming': return 'glowing';
            case 'glowing': return 'receding';
            case 'receding': return 'incoming';
            default: return 'incoming';
          }
        });
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Generate bioluminescent wave particles
  const generateWaveParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const type = Math.random();
      let particleType = 'foam';
      
      if (type < 0.2) particleType = 'glow';
      else if (type < 0.35) particleType = 'sparkle';
      else if (type < 0.5) particleType = 'bubble';
      else if (type < 0.65) particleType = 'ripple';
      
      return {
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40, // Focus on beach/wave area
        size: Math.random() * 3 + 1,
        type: particleType,
        speed: Math.random() * 12 + 6,
        opacity: Math.random() * 0.9 + 0.4,
        color: [
          '#00FFFF', // Electric Cyan
          '#0080FF', // Electric Blue
          '#40E0D0', // Turquoise
          '#00CED1', // Dark Turquoise
          '#20B2AA', // Light Sea Green
          '#48D1CC', // Medium Turquoise
          '#87CEEB', // Sky Blue
          '#4169E1', // Royal Blue
        ][Math.floor(Math.random() * 8)],
        delay: Math.random() * 8,
      };
    });
  };

  const waveParticles = generateWaveParticles(150);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-transparent overflow-hidden">
      {/* Sunset Sky Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom,
                #FF6B35 0%,
                #F7931E 15%,
                #FFD700 30%,
                #FFA500 45%,
                #FF8C00 60%,
                #1e3a8a 75%,
                #1e1b4b 85%,
                #000000 100%
              )
            `
          }}
          animate={{
            background: [
              `linear-gradient(to bottom, #FF6B35 0%, #F7931E 15%, #FFD700 30%, #FFA500 45%, #FF8C00 60%, #1e3a8a 75%, #1e1b4b 85%, #000000 100%)`,
              `linear-gradient(to bottom, #FF4500 0%, #FF6347 15%, #FFD700 30%, #FF8C00 45%, #FFA500 60%, #1e40af 75%, #1e1b4b 85%, #000000 100%)`,
              `linear-gradient(to bottom, #FF6B35 0%, #F7931E 15%, #FFD700 30%, #FFA500 45%, #FF8C00 60%, #1e3a8a 75%, #1e1b4b 85%, #000000 100%)`,
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Ocean Horizon */}
      <div 
        className="absolute w-full h-1/3"
        style={{
          top: '40%',
          background: 'linear-gradient(to bottom, rgba(30, 58, 138, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)'
        }}
      />

      {/* Distant City Lights */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`city-light-${i}`}
          className="absolute w-1 h-2 bg-yellow-300"
          style={{
            left: `${20 + i * 5}%`,
            top: '42%',
            boxShadow: '0 0 4px rgba(255, 255, 0, 0.8)'
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Main Bioluminescent Waves - SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="beachGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongBeachGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.9)" />
            <stop offset="25%" stopColor="rgba(0, 128, 255, 0.8)" />
            <stop offset="50%" stopColor="rgba(64, 224, 208, 0.7)" />
            <stop offset="75%" stopColor="rgba(32, 178, 170, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 206, 209, 0.5)" />
          </linearGradient>

          <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(72, 209, 204, 0.8)" />
            <stop offset="30%" stopColor="rgba(0, 255, 255, 0.7)" />
            <stop offset="60%" stopColor="rgba(0, 128, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(65, 105, 225, 0.5)" />
          </linearGradient>

          <radialGradient id="foamGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="30%" stopColor="rgba(0, 255, 255, 0.7)" />
            <stop offset="70%" stopColor="rgba(0, 128, 255, 0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Primary Bioluminescent Wave */}
        <motion.path
          d="M-50,200 Q100,180 200,190 Q300,200 450,185 L450,300 L-50,300 Z"
          fill="url(#waveGradient1)"
          filter="url(#strongBeachGlow)"
          animate={{
            d: [
              "M-50,200 Q100,180 200,190 Q300,200 450,185 L450,300 L-50,300 Z",
              "M-50,195 Q100,175 200,185 Q300,195 450,180 L450,300 L-50,300 Z",
              "M-50,205 Q100,185 200,195 Q300,205 450,190 L450,300 L-50,300 Z",
              "M-50,200 Q100,180 200,190 Q300,200 450,185 L450,300 L-50,300 Z",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary Wave Layer */}
        <motion.path
          d="M-50,220 Q150,200 250,210 Q350,220 450,205 L450,300 L-50,300 Z"
          fill="url(#waveGradient2)"
          filter="url(#beachGlow)"
          opacity={0.8}
          animate={{
            d: [
              "M-50,220 Q150,200 250,210 Q350,220 450,205 L450,300 L-50,300 Z",
              "M-50,215 Q150,195 250,205 Q350,215 450,200 L450,300 L-50,300 Z",
              "M-50,225 Q150,205 250,215 Q350,225 450,210 L450,300 L-50,300 Z",
              "M-50,220 Q150,200 250,210 Q350,220 450,205 L450,300 L-50,300 Z",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Wave Foam Effects */}
        <motion.ellipse
          cx="100"
          cy="195"
          rx="40"
          ry="8"
          fill="url(#foamGradient)"
          filter="url(#beachGlow)"
          animate={{
            rx: [40, 60, 45, 40],
            ry: [8, 12, 10, 8],
            opacity: [0.7, 1, 0.8, 0.7]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.ellipse
          cx="300"
          cy="200"
          rx="35"
          ry="6"
          fill="url(#foamGradient)"
          filter="url(#beachGlow)"
          animate={{
            rx: [35, 50, 40, 35],
            ry: [6, 10, 8, 6],
            opacity: [0.6, 0.9, 0.7, 0.6]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Bioluminescent Wave Crests */}
        <motion.path
          d="M0,190 Q200,170 400,185"
          stroke="rgba(0, 255, 255, 0.9)"
          strokeWidth="3"
          fill="none"
          filter="url(#strongBeachGlow)"
          animate={{
            d: [
              "M0,190 Q200,170 400,185",
              "M0,185 Q200,165 400,180",
              "M0,195 Q200,175 400,190",
              "M0,190 Q200,170 400,185",
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Beach Sand */}
      <div 
        className="absolute bottom-0 w-full h-1/4"
        style={{
          background: 'linear-gradient(to top, #8B4513 0%, #D2691E 30%, #F4A460 60%, rgba(244, 164, 96, 0.8) 100%)'
        }}
      />

      {/* Bioluminescent Wave Particles */}
      {waveParticles.map((particle) => (
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
            x: particle.type === 'foam' ? [0, Math.sin(particle.id) * 60] : 
               particle.type === 'ripple' ? [0, Math.cos(particle.id) * 40] :
               [0, Math.sin(particle.id) * 20],
            y: particle.type === 'foam' ? [0, Math.cos(particle.id) * 30] : 
               particle.type === 'bubble' ? [0, -Math.abs(Math.sin(particle.id)) * 50] :
               [0, Math.cos(particle.id) * 15],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: particle.type === 'bubble' ? "easeOut" : "easeInOut",
            delay: particle.delay,
          }}
        >
          {particle.type === 'foam' && (
            <div
              className="rounded-full"
              style={{
                width: `${particle.size * 2}px`,
                height: `${particle.size * 2}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 6}px ${particle.color}`,
              }}
            />
          )}
          
          {particle.type === 'glow' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 4}px`,
                height: `${particle.size * 4}px`,
                background: `radial-gradient(circle, ${particle.color}70 0%, ${particle.color}40 40%, transparent 70%)`,
                filter: 'blur(2px)',
              }}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          
          {particle.type === 'sparkle' && (
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div
                className="absolute w-1 h-4 bg-white rounded-full"
                style={{
                  boxShadow: `0 0 8px ${particle.color}`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <div
                className="absolute w-4 h-1 bg-white rounded-full"
                style={{
                  boxShadow: `0 0 8px ${particle.color}`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </motion.div>
          )}

          {particle.type === 'bubble' && (
            <motion.div
              className="rounded-full border"
              style={{
                width: `${particle.size * 3}px`,
                height: `${particle.size * 3}px`,
                borderColor: particle.color,
                backgroundColor: `${particle.color}20`,
                boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
              }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {particle.type === 'ripple' && (
            <motion.div
              className="rounded-full border-2"
              style={{
                width: `${particle.size * 6}px`,
                height: `${particle.size * 6}px`,
                borderColor: `${particle.color}60`,
                backgroundColor: 'transparent',
              }}
              animate={{
                scale: [0.5, 2, 0.5],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Floating Bioluminescent Orbs */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`beach-orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 9}%`,
            top: `${65 + (i % 3) * 10}%`,
            width: `${30 + i * 8}px`,
            height: `${30 + i * 8}px`,
            background: `radial-gradient(circle, ${
              ['rgba(0, 255, 255, 0.5)', 'rgba(0, 128, 255, 0.5)', 'rgba(64, 224, 208, 0.5)', 'rgba(32, 178, 170, 0.5)'][i % 4]
            } 0%, transparent 70%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Sunset Reflection on Water */}
      <motion.div
        className="absolute"
        style={{
          left: '30%',
          top: '45%',
          width: '40%',
          height: '15%',
          background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.6) 0%, rgba(255, 140, 0, 0.4) 50%, transparent 100%)',
          filter: 'blur(3px)',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scaleY: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Atmospheric Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`atmosphere-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -100],
            opacity: [0.6, 0, 0.6],
            scale: [1, 0.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Subtle Content Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 50%, rgba(0, 0, 0, 0.05) 100%)',
        }}
      />
    </div>
  );
};

export default BioluminescentBeachDesign;