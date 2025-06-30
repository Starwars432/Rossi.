// src/components/ShatteredGeometryDesign.tsx
import React from 'react';
import { motion } from 'framer-motion';

const streaks = Array.from({ length: 300 }, (_, i) => ({
  id: i,
  angle: Math.random() * 360,
  distance: Math.random() * 100,
  speed: 1 + Math.random() * 2,
  color: ['#A3E4FF', '#E3D1FF', '#FFFFFF', '#B0FFFA'][i % 4],
  length: 40 + Math.random() * 60,
  delay: Math.random() * 4,
}));

const ShatteredGeometryDesign: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Central flare */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Star streaks with motion blur */}
      {streaks.map((streak) => {
        const angleRad = (streak.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * streak.distance;
        const y = Math.sin(angleRad) * streak.distance;

        return (
          <motion.div
            key={streak.id}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `2px`,
              height: `${streak.length}px`,
              background: `linear-gradient(to bottom, ${streak.color}AA, transparent)`,
              transform: `translate(-50%, -50%) rotate(${streak.angle}deg) translate(${x}px, ${y}px)`
            }}
            animate={{
              y: [0, -500],
              opacity: [0, 1, 0],
              scaleY: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + streak.speed,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: streak.delay,
            }}
          />
        );
      })}

      {/* 3D depth sparkle stars */}
      {Array.from({ length: 100 }).map((_, i) => {
        const depth = Math.random() * 300;
        const xOffset = Math.random() * 100 - 50;
        const yOffset = Math.random() * 100 - 50;
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              left: `50%`,
              top: `50%`,
              transform: `translate(${xOffset}%, ${yOffset}%) translateZ(-${depth}px)`,
              width: '1.5px',
              height: '1.5px',
              backgroundColor: '#FFFFFF',
              opacity: 0.3,
              boxShadow: '0 0 6px #FFFFFFAA',
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 4,
            }}
          />
        );
      })}

      {/* Lens flare gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.02), transparent 80%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Camera shake effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, 1, -1, 0.5, -0.5, 0],
          y: [0, -1, 1, -0.5, 0.5, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default ShatteredGeometryDesign;
