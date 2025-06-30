// src/components/DeltaVeilDesign.tsx
import React from 'react';
import { motion } from 'framer-motion';

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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-slate-900">
      {/* Atmospheric Depth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.12), transparent 60%)',
          backgroundSize: '200% 200%',
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Glassy Shards */}
      {shards.map((shard) => (
        <motion.div
          key={shard.id}
          className="absolute rounded-md"
          style={{
            left: `${shard.x}%`,
            top: `${shard.y}%`,
            width: `${shard.size}px`,
            height: `${shard.size}px`,
            background: `linear-gradient(135deg, ${shard.color}33, ${shard.color}11)`,
            backdropFilter: 'blur(3px)',
            boxShadow: `0 0 20px ${shard.color}44`,
            opacity: 0.8,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shard.delay,
          }}
        />
      ))}

      {/* Light Rays */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute left-1/2 top-1/2 w-1 h-[200px] bg-gradient-to-b from-white/70 via-blue-500/40 to-transparent"
          style={{
            transform: `rotate(${i * 36}deg) translateX(-50%)`,
            transformOrigin: 'top center',
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Central Glow Orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default DeltaVeilDesign;
