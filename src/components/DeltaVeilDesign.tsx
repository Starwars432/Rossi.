import React from 'react';
import { motion } from 'framer-motion';

// Generate shards with subtle randomness
const shards = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  size: 40 + Math.random() * 30,
  blur: 2 + Math.random() * 4,
  color: ['#3B82F6', '#A855F7', '#0EA5E9', '#FFFFFF'][i % 4],
  delay: Math.random() * 4,
}));

const DeltaVeilDesign: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#0f0f0f]">
      {/* Ambient glow background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.08), transparent 60%)',
          backgroundSize: '200% 200%',
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating translucent shards */}
      {shards.map((shard) => (
        <motion.div
          key={shard.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: `${shard.x}%`,
            top: `${shard.y}%`,
            width: `${shard.size}px`,
            height: `${shard.size}px`,
            background: `linear-gradient(135deg, ${shard.color}33, ${shard.color}11)`,
            backdropFilter: `blur(${shard.blur}px)`,
            boxShadow: `0 0 30px ${shard.color}33`,
            border: `1px solid ${shard.color}22`,
            opacity: 0.9,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shard.delay,
          }}
        />
      ))}

      {/* Hero title and tagline */}
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center px-6">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          Manifest Illusions
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.4 }}
        >
          Where design becomes mythology.
        </motion.p>
      </div>

      {/* Soft center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[500px] h-[500px] rounded-full z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle radial light rays */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute left-1/2 top-1/2 w-1 h-[200px] bg-gradient-to-b from-white/60 via-purple-400/30 to-transparent"
          style={{
            transform: `rotate(${i * 60}deg) translateX(-50%)`,
            transformOrigin: 'top center',
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default DeltaVeilDesign;
