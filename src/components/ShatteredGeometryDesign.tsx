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
      {/* Tunnel glow */}
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

      {/* Star streaks */}
      {streaks.map((streak) => {
        const angleRad = (streak.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * streak.distance;
        const y = Math.sin(angleRad) * streak.distance;

        return (
          <motion.div
            key={streak.id}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `1px`,
              height: `${streak.length}px`,
              backgroundColor: streak.color,
              transform: `translate(-50%, -50%) rotate(${streak.angle}deg)`
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

      {/* Background starfield sparkles */}
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '1px',
            height: '1px',
            backgroundColor: '#FFFFFF',
            opacity: 0.2 + Math.random() * 0.4,
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
};

export default ShatteredGeometryDesign;