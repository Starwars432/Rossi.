import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DeltaVeilDesignProps {
  isVisible: boolean;
  onClose?: () => void;
}

const DeltaVeilDesign: React.FC<DeltaVeilDesignProps> = ({ isVisible }) => {
  const [luxuryPhase, setLuxuryPhase] = useState<'unveiling' | 'gleaming' | 'ethereal'>('unveiling');

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setLuxuryPhase(prev => {
          switch (prev) {
            case 'unveiling': return 'gleaming';
            case 'gleaming': return 'ethereal';
            case 'ethereal': return 'unveiling';
            default: return 'unveiling';
          }
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Generate luxury particles with old-world elegance
  const generateLuxuryParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const type = Math.random();
      let particleType = 'gold_dust';
      
      if (type < 0.15) particleType = 'silk_fiber';
      else if (type < 0.25) particleType = 'marble_fragment';
      else if (type < 0.35) particleType = 'crystal_shard';
      else if (type < 0.45) particleType = 'velvet_mote';
      else if (type < 0.55) particleType = 'pearl_essence';
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        type: particleType,
        speed: Math.random() * 20 + 8,
        opacity: Math.random() * 0.8 + 0.4,
        color: [
          '#FFD700', // Pure Gold
          '#F4E4BC', // Champagne
          '#E6E6FA', // Lavender (silk)
          '#F5F5DC', // Beige (marble)
          '#FFFAF0', // Floral White
          '#FFF8DC', // Cornsilk
          '#F0E68C', // Khaki Gold
          '#FFEFD5', // Papaya Whip
        ][Math.floor(Math.random() * 8)],
        delay: Math.random() * 8,
      };
    });
  };

  const luxuryParticles = generateLuxuryParticles(120);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-transparent overflow-hidden">
      {/* Opulent Palace Background */}
      <div className="absolute inset-0">
        {/* Base luxury gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg,
                #1a1a2e 0%,
                #16213e 15%,
                #0f3460 30%,
                #533483 45%,
                #7209b7 60%,
                #2d1b69 75%,
                #0f0c29 90%,
                #000000 100%
              )
            `
          }}
        />
        
        {/* Animated luxury overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 25% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(244, 228, 188, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255, 248, 220, 0.08) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 20%, rgba(255, 215, 0, 0.18) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(244, 228, 188, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(255, 248, 220, 0.1) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 60%, rgba(255, 215, 0, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(244, 228, 188, 0.18) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 248, 220, 0.12) 0%, transparent 60%)',
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Marble Columns and Architecture */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Premium Gradients */}
          <linearGradient id="marbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="15%" stopColor="rgba(245, 245, 220, 0.8)" />
            <stop offset="30%" stopColor="rgba(255, 248, 220, 0.7)" />
            <stop offset="50%" stopColor="rgba(240, 230, 140, 0.6)" />
            <stop offset="70%" stopColor="rgba(255, 215, 0, 0.5)" />
            <stop offset="85%" stopColor="rgba(244, 228, 188, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
          </linearGradient>

          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.9)" />
            <stop offset="25%" stopColor="rgba(255, 223, 0, 0.8)" />
            <stop offset="50%" stopColor="rgba(255, 235, 59, 0.7)" />
            <stop offset="75%" stopColor="rgba(255, 193, 7, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 215, 0, 0.6)" />
          </linearGradient>

          <radialGradient id="silkGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 248, 220, 0.8)" />
            <stop offset="30%" stopColor="rgba(230, 230, 250, 0.6)" />
            <stop offset="60%" stopColor="rgba(255, 240, 245, 0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Luxury Filters */}
          <filter id="luxuryGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="marbleTexture" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.02" numOctaves="4" result="noise"/>
            <feColorMatrix in="noise" type="saturate" values="0"/>
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5"/>
            </feComponentTransfer>
            <feComposite operator="multiply" in2="SourceGraphic"/>
          </filter>

          <filter id="goldShimmer" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Marble Architectural Elements */}
        <motion.rect
          x="50"
          y="50"
          width="20"
          height="200"
          fill="url(#marbleGradient)"
          filter="url(#marbleTexture)"
          animate={{
            opacity: [0.6, 0.9, 0.6],
            height: [200, 210, 200],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.rect
          x="330"
          y="60"
          width="20"
          height="190"
          fill="url(#marbleGradient)"
          filter="url(#marbleTexture)"
          animate={{
            opacity: [0.7, 0.9, 0.7],
            height: [190, 200, 190],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Golden Ornamental Details */}
        <motion.ellipse
          cx="200"
          cy="80"
          rx="60"
          ry="15"
          fill="url(#goldGradient)"
          filter="url(#goldShimmer)"
          animate={{
            rx: [60, 70, 65, 60],
            ry: [15, 18, 16, 15],
            opacity: [0.7, 1, 0.8, 0.7]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.ellipse
          cx="200"
          cy="220"
          rx="80"
          ry="20"
          fill="url(#goldGradient)"
          filter="url(#goldShimmer)"
          animate={{
            rx: [80, 90, 85, 80],
            ry: [20, 25, 22, 20],
            opacity: [0.6, 0.9, 0.7, 0.6]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Silk Drapery Effects */}
        <motion.path
          d="M100,50 Q150,80 200,70 Q250,60 300,90 Q350,120 380,100 L380,150 Q350,130 300,140 Q250,150 200,130 Q150,110 100,120 Z"
          fill="url(#silkGradient)"
          filter="url(#luxuryGlow)"
          animate={{
            d: [
              "M100,50 Q150,80 200,70 Q250,60 300,90 Q350,120 380,100 L380,150 Q350,130 300,140 Q250,150 200,130 Q150,110 100,120 Z",
              "M100,45 Q150,75 200,65 Q250,55 300,85 Q350,115 380,95 L380,145 Q350,125 300,135 Q250,145 200,125 Q150,105 100,115 Z",
              "M100,55 Q150,85 200,75 Q250,65 300,95 Q350,125 380,105 L380,155 Q350,135 300,145 Q250,155 200,135 Q150,115 100,125 Z",
              "M100,50 Q150,80 200,70 Q250,60 300,90 Q350,120 380,100 L380,150 Q350,130 300,140 Q250,150 200,130 Q150,110 100,120 Z",
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Ornate Patterns */}
        <motion.circle
          cx="200"
          cy="150"
          r="40"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          filter="url(#luxuryGlow)"
          animate={{
            r: [40, 45, 42, 40],
            strokeWidth: [3, 4, 3.5, 3],
            opacity: [0.6, 0.9, 0.7, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Decorative Flourishes */}
        <motion.path
          d="M180,130 Q190,120 200,130 Q210,140 220,130 Q210,120 200,130 Q190,140 180,130"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#luxuryGlow)"
          animate={{
            strokeWidth: [2, 3, 2.5, 2],
            opacity: [0.7, 1, 0.8, 0.7]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>

      {/* Luxury Particles */}
      {luxuryParticles.map((particle) => (
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
            x: particle.type === 'silk_fiber' ? [0, Math.sin(particle.id) * 60] : 
               particle.type === 'marble_fragment' ? [0, Math.cos(particle.id) * 30] :
               [0, Math.sin(particle.id) * 20],
            y: particle.type === 'silk_fiber' ? [0, Math.cos(particle.id) * 40] : 
               particle.type === 'gold_dust' ? [0, -Math.abs(Math.sin(particle.id)) * 30] :
               [0, Math.cos(particle.id) * 15],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: particle.type === 'gold_dust' ? "easeOut" : "easeInOut",
            delay: particle.delay,
          }}
        >
          {particle.type === 'gold_dust' && (
            <div
              className="rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 6}px ${particle.color}, 0 0 ${particle.size * 12}px rgba(255, 215, 0, 0.4)`,
              }}
            />
          )}
          
          {particle.type === 'silk_fiber' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 4}px`,
                height: `${particle.size * 4}px`,
                background: `radial-gradient(circle, ${particle.color}80 0%, ${particle.color}40 40%, transparent 70%)`,
                filter: 'blur(1px)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          
          {particle.type === 'marble_fragment' && (
            <div
              className="rounded-sm"
              style={{
                width: `${particle.size * 2}px`,
                height: `${particle.size * 1.5}px`,
                background: `linear-gradient(45deg, ${particle.color}, rgba(255, 255, 255, 0.8))`,
                boxShadow: `0 0 ${particle.size * 4}px rgba(255, 255, 255, 0.6)`,
                transform: `rotate(${particle.id * 15}deg)`,
              }}
            />
          )}

          {particle.type === 'crystal_shard' && (
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div
                className="absolute w-1 h-6 bg-white rounded-full"
                style={{
                  boxShadow: `0 0 12px ${particle.color}`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <div
                className="absolute w-6 h-1 bg-white rounded-full"
                style={{
                  boxShadow: `0 0 12px ${particle.color}`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </motion.div>
          )}

          {particle.type === 'velvet_mote' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 3}px`,
                height: `${particle.size * 3}px`,
                background: `radial-gradient(circle, ${particle.color}60, ${particle.color}20, transparent)`,
                filter: 'blur(2px)',
              }}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {particle.type === 'pearl_essence' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${particle.size * 2}px`,
                height: `${particle.size * 2}px`,
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), ${particle.color}60, ${particle.color}20)`,
                boxShadow: `0 0 ${particle.size * 8}px rgba(255, 255, 255, 0.6)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Floating Luxury Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`luxury-orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + (i % 4) * 20}%`,
            width: `${60 + i * 15}px`,
            height: `${60 + i * 15}px`,
            background: `radial-gradient(circle, ${
              ['rgba(255, 215, 0, 0.4)', 'rgba(244, 228, 188, 0.4)', 'rgba(255, 248, 220, 0.4)', 'rgba(230, 230, 250, 0.4)'][i % 4]
            } 0%, transparent 70%)`,
            filter: 'blur(3px)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Central Opulent Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '500px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.3) 0%, rgba(244, 228, 188, 0.2) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.4, 1.2, 1],
          opacity: [0.5, 0.9, 0.7, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Luxury Dust Clouds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`luxury-dust-${i}`}
          className="absolute blur-3xl"
          style={{
            left: `${i * 18}%`,
            top: `${20 + i * 15}%`,
            width: `${200 + i * 50}px`,
            height: `${100 + i * 30}px`,
            background: `linear-gradient(${60 + i * 40}deg, 
              rgba(255, 215, 0, 0.15) 0%, 
              rgba(244, 228, 188, 0.15) 30%,
              rgba(255, 248, 220, 0.15) 60%,
              rgba(230, 230, 250, 0.15) 100%)`,
            borderRadius: '50%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30 + i * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Ethereal Light Beams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`light-beam-${i}`}
          className="absolute"
          style={{
            left: `${25 + i * 20}%`,
            top: '0%',
            width: '3px',
            height: '100%',
            background: `linear-gradient(to bottom, 
              rgba(255, 215, 0, 0.6) 0%,
              rgba(244, 228, 188, 0.4) 30%,
              rgba(255, 248, 220, 0.3) 60%,
              transparent 100%
            )`,
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Atmospheric Luxury Haze */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`luxury-haze-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#FFD700', '#F4E4BC', '#FFFAF0', '#FFF8DC'][i % 4],
            opacity: 0.4,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -80],
            opacity: [0.4, 0.8, 0],
            scale: [1, 1.5, 0.5],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
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

export default DeltaVeilDesign;