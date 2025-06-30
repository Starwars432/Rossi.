import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BioluminescentBloomDesignProps {
  isVisible: boolean;
  onClose?: () => void;
}

const BioluminescentBloomDesign: React.FC<BioluminescentBloomDesignProps> = ({ isVisible }) => {
  const [animationPhase, setAnimationPhase] = useState<'growing' | 'blooming' | 'pulsing'>('growing');

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => {
          switch (prev) {
            case 'growing': return 'blooming';
            case 'blooming': return 'pulsing';
            case 'pulsing': return 'growing';
            default: return 'growing';
          }
        });
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Generate bioluminescent particles
  const generateBioParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const type = Math.random();
      let particleType = 'spore';
      
      if (type < 0.15) particleType = 'bloom';
      else if (type < 0.25) particleType = 'tendril';
      else if (type < 0.35) particleType = 'pulse';
      else if (type < 0.45) particleType = 'glow';
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        type: particleType,
        speed: Math.random() * 15 + 8,
        opacity: Math.random() * 0.9 + 0.3,
        color: [
          '#00FFFF', // Cyan
          '#0080FF', // Electric Blue
          '#4169E1', // Royal Blue
          '#8A2BE2', // Blue Violet
          '#9400D3', // Violet
          '#00CED1', // Dark Turquoise
          '#20B2AA', // Light Sea Green
          '#48D1CC', // Medium Turquoise
        ][Math.floor(Math.random() * 8)],
        delay: Math.random() * 6,
      };
    });
  };

  const bioParticles = generateBioParticles(100);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-transparent overflow-hidden">
      {/* Deep Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black opacity-95" />
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(0, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(138, 43, 226, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(0, 206, 209, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 30%, rgba(0, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 206, 209, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 60%, rgba(0, 255, 255, 0.18) 0%, transparent 50%), radial-gradient(circle at 80% 40%, rgba(138, 43, 226, 0.18) 0%, transparent 50%), radial-gradient(circle at 30% 20%, rgba(0, 206, 209, 0.18) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main Bioluminescent Blooms - SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="bioGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongBioGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="bloomGradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.8)" />
            <stop offset="30%" stopColor="rgba(0, 128, 255, 0.6)" />
            <stop offset="70%" stopColor="rgba(138, 43, 226, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="bloomGradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(138, 43, 226, 0.8)" />
            <stop offset="30%" stopColor="rgba(0, 206, 209, 0.6)" />
            <stop offset="70%" stopColor="rgba(0, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Central Bloom - Main Feature */}
        <motion.path
          d="M200,150 Q180,120 160,140 Q140,160 160,180 Q180,200 200,180 Q220,160 240,180 Q260,160 240,140 Q220,120 200,150 Z"
          fill="url(#bloomGradient1)"
          filter="url(#strongBioGlow)"
          animate={{
            d: [
              "M200,150 Q180,120 160,140 Q140,160 160,180 Q180,200 200,180 Q220,160 240,180 Q260,160 240,140 Q220,120 200,150 Z",
              "M200,150 Q190,110 170,130 Q130,170 170,190 Q190,210 200,190 Q210,170 230,190 Q270,170 230,130 Q210,110 200,150 Z",
              "M200,150 Q185,125 165,145 Q135,165 165,185 Q185,205 200,185 Q215,165 235,185 Q265,165 235,145 Q215,125 200,150 Z",
              "M200,150 Q180,120 160,140 Q140,160 160,180 Q180,200 200,180 Q220,160 240,180 Q260,160 240,140 Q220,120 200,150 Z",
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary Blooms */}
        <motion.ellipse
          cx="120"
          cy="80"
          rx="25"
          ry="35"
          fill="url(#bloomGradient2)"
          filter="url(#bioGlow)"
          animate={{
            rx: [25, 35, 30, 25],
            ry: [35, 25, 40, 35],
            opacity: [0.6, 0.9, 0.7, 0.6]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.ellipse
          cx="320"
          cy="220"
          rx="30"
          ry="20"
          fill="url(#bloomGradient1)"
          filter="url(#bioGlow)"
          animate={{
            rx: [30, 20, 35, 30],
            ry: [20, 30, 15, 20],
            opacity: [0.5, 0.8, 0.6, 0.5]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Organic Tendrils */}
        <motion.path
          d="M200,150 Q250,120 280,160 Q300,200 270,230"
          stroke="rgba(0, 255, 255, 0.6)"
          strokeWidth="3"
          fill="none"
          filter="url(#bioGlow)"
          animate={{
            d: [
              "M200,150 Q250,120 280,160 Q300,200 270,230",
              "M200,150 Q260,110 290,150 Q310,190 280,220",
              "M200,150 Q240,130 270,170 Q290,210 260,240",
              "M200,150 Q250,120 280,160 Q300,200 270,230",
            ]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.path
          d="M200,150 Q150,180 120,140 Q100,100 130,70"
          stroke="rgba(138, 43, 226, 0.6)"
          strokeWidth="2"
          fill="none"
          filter="url(#bioGlow)"
          animate={{
            d: [
              "M200,150 Q150,180 120,140 Q100,100 130,70",
              "M200,150 Q140,190 110,150 Q90,110 120,80",
              "M200,150 Q160,170 130,130 Q110,90 140,60",
              "M200,150 Q150,180 120,140 Q100,100 130,70",
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </svg>

      {/* Bioluminescent Particles */}
      {bioParticles.map((particle) => (
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
            x: particle.type === 'tendril' ? [0, Math.sin(particle.id) * 80] : 
               particle.type === 'pulse' ? [0, Math.cos(particle.id) * 40] :
               [0, Math.sin(particle.id) * 20],
            y: particle.type === 'tendril' ? [0, Math.cos(particle.id) * 60] : 
               particle.type === 'pulse' ? [0, Math.sin(particle.id) * 30] :
               [0, Math.cos(particle.id) * 15],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: particle.type === 'pulse' ? "easeInOut" : "linear",
            delay: particle.delay,
          }}
        >
          {particle.type === 'spore' && (
            <div
              className="rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
              }}
            />
          )}
          
          {particle.type === 'bloom' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 3}px`,
                height: `${particle.size * 3}px`,
                background: `radial-gradient(circle, ${particle.color}60 0%, ${particle.color}30 40%, transparent 70%)`,
                filter: 'blur(1px)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          
          {particle.type === 'tendril' && (
            <div className="relative">
              <div
                className="rounded-full"
                style={{
                  width: `${particle.size * 1.5}px`,
                  height: `${particle.size * 1.5}px`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 6}px ${particle.color}`,
                }}
              />
              <div
                className="absolute top-1/2 left-full h-px origin-left"
                style={{
                  width: `${particle.size * 15}px`,
                  background: `linear-gradient(to right, ${particle.color}, ${particle.color}60, transparent)`,
                  transform: 'translateY(-50%)',
                }}
              />
            </div>
          )}

          {particle.type === 'pulse' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 2}px`,
                height: `${particle.size * 2}px`,
                background: `radial-gradient(circle, ${particle.color}, ${particle.color}40, transparent)`,
                filter: 'blur(2px)',
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {particle.type === 'glow' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 5}px`,
                height: `${particle.size * 5}px`,
                background: `radial-gradient(circle, ${particle.color}30, transparent)`,
                filter: 'blur(3px)',
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Floating Bio-Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`bio-orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + (i % 4) * 20}%`,
            width: `${50 + i * 15}px`,
            height: `${50 + i * 15}px`,
            background: `radial-gradient(circle, ${
              ['rgba(0, 255, 255, 0.4)', 'rgba(138, 43, 226, 0.4)', 'rgba(0, 206, 209, 0.4)', 'rgba(65, 105, 225, 0.4)'][i % 4]
            } 0%, transparent 70%)`,
            filter: 'blur(2px)',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.sin(i) * 40, 0],
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Central Pulsing Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '400px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(0, 255, 255, 0.3) 0%, rgba(138, 43, 226, 0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.6, 1.2, 1],
          opacity: [0.5, 0.9, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Organic Growth Patterns */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`growth-${i}`}
          className="absolute blur-2xl"
          style={{
            left: `${i * 18}%`,
            top: `${20 + i * 15}%`,
            width: `${150 + i * 40}px`,
            height: `${80 + i * 25}px`,
            background: `linear-gradient(${45 + i * 30}deg, 
              rgba(0, 255, 255, 0.15) 0%, 
              rgba(138, 43, 226, 0.15) 30%,
              rgba(0, 206, 209, 0.15) 60%,
              rgba(65, 105, 225, 0.15) 100%)`,
            borderRadius: '50%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Bioluminescent Waves */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`bio-wave-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 4 + Math.random() * 8,
            ease: "easeOut",
          }}
        >
          <div 
            className="w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
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

export default BioluminescentBloomDesign;