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
          filter: 'blur(100px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.7, 0.2] }}
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
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: `2px`,
              height: `${streak.length}px`,
              background: `linear-gradient(to bottom, ${streak.color}, transparent)`,
              transform: `rotate(${streak.angle}deg)`
            }}
            animate={{
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
      {Array.from({ length: 120 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random()}px`,
            height: `${1 + Math.random()}px`,
            backgroundColor: '#FFFFFF',
            opacity: 0.2 + Math.random() * 0.4,
            boxShadow: `0 0 6px 2px rgba(255,255,255,0.3)`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.4, 1.3, 0.4],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Lens Flare Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gradient edges for luxury framing */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black opacity-30" />
      </div>
    </div>
  );
};

export default ShatteredGeometryDesign;
