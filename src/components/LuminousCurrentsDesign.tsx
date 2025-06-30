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
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-transparent overflow-hidden">
      {/* Main Luminous Current */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(99, 102, 241, 0.1) 0%,
              rgba(168, 85, 247, 0.15) 25%,
              rgba(59, 130, 246, 0.2) 50%,
              rgba(147, 51, 234, 0.15) 75%,
              rgba(79, 70, 229, 0.1) 100%
            )
          `,
          filter: 'blur(1px)',
        }}
        animate={{
          background: [
            `linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.15) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(147, 51, 234, 0.15) 75%, rgba(79, 70, 229, 0.1) 100%)`,
            `linear-gradient(225deg, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(147, 51, 234, 0.15) 50%, rgba(79, 70, 229, 0.1) 75%, rgba(99, 102, 241, 0.1) 100%)`,
            `linear-gradient(315deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.15) 25%, rgba(79, 70, 229, 0.1) 50%, rgba(99, 102, 241, 0.1) 75%, rgba(168, 85, 247, 0.15) 100%)`,
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Flowing Wave Shape */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="currentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
            <stop offset="25%" stopColor="rgba(168, 85, 247, 0.4)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="75%" stopColor="rgba(147, 51, 234, 0.4)" />
            <stop offset="100%" stopColor="rgba(79, 70, 229, 0.3)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M0,150 Q100,50 200,150 T400,150 L400,300 L0,300 Z"
          fill="url(#currentGradient)"
          filter="url(#glow)"
          animate={{
            d: [
              "M0,150 Q100,50 200,150 T400,150 L400,300 L0,300 Z",
              "M0,120 Q100,200 200,120 T400,120 L400,300 L0,300 Z",
              "M0,180 Q100,80 200,180 T400,180 L400,300 L0,300 Z",
              "M0,150 Q100,50 200,150 T400,150 L400,300 L0,300 Z",
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Secondary Flowing Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`flow-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
            width: `${60 + i * 20}px`,
            height: `${30 + i * 10}px`,
            background: `radial-gradient(ellipse, rgba(${i % 2 === 0 ? '99, 102, 241' : '168, 85, 247'}, 0.3) 0%, transparent 70%)`,
            filter: 'blur(2px)',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.4, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Luminous Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: [
              'rgba(99, 102, 241, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(147, 51, 234, 0.8)',
            ][i % 4],
            boxShadow: `0 0 6px ${[
              'rgba(99, 102, 241, 0.6)',
              'rgba(168, 85, 247, 0.6)',
              'rgba(59, 130, 246, 0.6)',
              'rgba(147, 51, 234, 0.6)',
            ][i % 4]}`,
          }}
          animate={{
            x: [0, Math.sin(i) * 40, Math.cos(i) * 30, 0],
            y: [0, Math.cos(i) * 30, Math.sin(i) * 40, 0],
            opacity: [0.4, 1, 0.6, 0.4],
            scale: [1, 1.5, 1.2, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Flowing Current Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M0,100 Q200,50 400,100"
          stroke="rgba(99, 102, 241, 0.4)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          animate={{
            d: [
              "M0,100 Q200,50 400,100",
              "M0,120 Q200,180 400,120",
              "M0,80 Q200,20 400,80",
              "M0,100 Q200,50 400,100",
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M0,200 Q200,250 400,200"
          stroke="rgba(168, 85, 247, 0.4)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          animate={{
            d: [
              "M0,200 Q200,250 400,200",
              "M0,180 Q200,120 400,180",
              "M0,220 Q200,280 400,220",
              "M0,200 Q200,250 400,200",
            ]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>

      {/* Central Glow Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '200px',
          height: '100px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.3, 1.1, 1],
          opacity: [0.3, 0.6, 0.4, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle Overlay for Content Readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)',
        }}
      />
    </div>
  );
};

export default LuminousCurrentsDesign;