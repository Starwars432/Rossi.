import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShatteredGeometryDesignProps {
  isVisible: boolean;
  onClose?: () => void;
}

const ShatteredGeometryDesign: React.FC<ShatteredGeometryDesignProps> = ({ isVisible }) => {
  const [rotationPhase, setRotationPhase] = useState<'assembling' | 'floating' | 'reconstructing'>('assembling');

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setRotationPhase(prev => {
          switch (prev) {
            case 'assembling': return 'floating';
            case 'floating': return 'reconstructing';
            case 'reconstructing': return 'assembling';
            default: return 'assembling';
          }
        });
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Generate premium glass shards with realistic properties
  const generateGlassShards = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const shardType = Math.random();
      let type = 'cube';
      
      if (shardType < 0.3) type = 'triangle';
      else if (shardType < 0.6) type = 'rectangle';
      else if (shardType < 0.8) type = 'diamond';
      
      return {
        id: i,
        x: 30 + Math.random() * 40, // Center cluster
        y: 30 + Math.random() * 40,
        z: Math.random() * 100,
        size: 15 + Math.random() * 25,
        type,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.7 + Math.random() * 0.3,
        reflectionIntensity: 0.6 + Math.random() * 0.4,
        delay: Math.random() * 4,
      };
    });
  };

  const glassShards = generateGlassShards(24);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-transparent overflow-hidden">
      {/* Premium Dark Background with Subtle Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        {/* Atmospheric lighting */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 20%, rgba(59, 130, 246, 0.18) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(14, 165, 233, 0.1) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(circle at 90% 30%, rgba(168, 85, 247, 0.18) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.12) 0%, transparent 60%)',
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Premium Glass Shards with 3D CSS Transforms */}
      <div className="absolute inset-0" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        {glassShards.map((shard) => (
          <motion.div
            key={shard.id}
            className="absolute"
            style={{
              left: `${shard.x}%`,
              top: `${shard.y}%`,
              width: `${shard.size}px`,
              height: `${shard.size}px`,
              transformStyle: 'preserve-3d',
            }}
            initial={{
              rotateX: shard.rotationX,
              rotateY: shard.rotationY,
              rotateZ: shard.rotationZ,
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              rotateX: [shard.rotationX, shard.rotationX + 360],
              rotateY: [shard.rotationY, shard.rotationY + 180],
              rotateZ: [shard.rotationZ, shard.rotationZ + 90],
              scale: [0.5, 1, 1.1, 1],
              opacity: [0, shard.opacity, shard.opacity, shard.opacity],
              x: [0, Math.sin(shard.id) * 20, 0],
              y: [0, Math.cos(shard.id) * 15, 0],
              z: [0, shard.z, 0],
            }}
            transition={{
              duration: 12 + shard.speed * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shard.delay,
            }}
          >
            {/* Glass Shard with Premium Styling */}
            <div
              className="w-full h-full relative"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, ${0.9 * shard.reflectionIntensity}) 0%,
                    rgba(59, 130, 246, ${0.6 * shard.reflectionIntensity}) 15%,
                    rgba(168, 85, 247, ${0.4 * shard.reflectionIntensity}) 35%,
                    rgba(14, 165, 233, ${0.7 * shard.reflectionIntensity}) 55%,
                    rgba(255, 255, 255, ${0.3 * shard.reflectionIntensity}) 75%,
                    rgba(59, 130, 246, ${0.5 * shard.reflectionIntensity}) 100%
                  )
                `,
                backdropFilter: 'blur(1px)',
                border: `1px solid rgba(255, 255, 255, ${0.4 * shard.reflectionIntensity})`,
                borderRadius: shard.type === 'cube' ? '2px' : 
                             shard.type === 'triangle' ? '0' : '4px',
                boxShadow: `
                  0 0 ${shard.size * 0.8}px rgba(59, 130, 246, ${0.6 * shard.reflectionIntensity}),
                  inset 0 0 ${shard.size * 0.4}px rgba(255, 255, 255, ${0.3 * shard.reflectionIntensity}),
                  0 ${shard.size * 0.2}px ${shard.size * 0.6}px rgba(0, 0, 0, 0.3)
                `,
                clipPath: shard.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                         shard.type === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                         'none',
                transform: `translateZ(${shard.z}px)`,
              }}
            >
              {/* Inner Reflection Highlights */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(45deg, 
                      transparent 0%,
                      rgba(255, 255, 255, ${0.8 * shard.reflectionIntensity}) 20%,
                      transparent 40%,
                      rgba(255, 255, 255, ${0.4 * shard.reflectionIntensity}) 60%,
                      transparent 80%
                    )
                  `,
                  borderRadius: 'inherit',
                  clipPath: 'inherit',
                }}
              />
              
              {/* Edge Highlights */}
              <div
                className="absolute inset-0"
                style={{
                  border: `1px solid rgba(255, 255, 255, ${0.6 * shard.reflectionIntensity})`,
                  borderRadius: 'inherit',
                  clipPath: 'inherit',
                }}
              />
            </div>

            {/* Light Refraction Effects */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `conic-gradient(from ${shard.rotationZ}deg, 
                  transparent 0deg,
                  rgba(59, 130, 246, ${0.3 * shard.reflectionIntensity}) 60deg,
                  transparent 120deg,
                  rgba(168, 85, 247, ${0.3 * shard.reflectionIntensity}) 180deg,
                  transparent 240deg,
                  rgba(14, 165, 233, ${0.3 * shard.reflectionIntensity}) 300deg,
                  transparent 360deg
                )`,
                borderRadius: 'inherit',
                clipPath: 'inherit',
                filter: 'blur(2px)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Central Assembly Point - Implied Reconstruction */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '200px',
          height: '200px',
          background: `
            radial-gradient(circle,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(59, 130, 246, 0.15) 30%,
              rgba(168, 85, 247, 0.1) 60%,
              transparent 100%
            )
          `,
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Light Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`light-particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            backgroundColor: ['#3B82F6', '#A855F7', '#0EA5E9', '#FFFFFF'][i % 4],
            boxShadow: `0 0 8px ${['#3B82F6', '#A855F7', '#0EA5E9', '#FFFFFF'][i % 4]}`,
          }}
          animate={{
            x: [0, Math.sin(i) * 50, 0],
            y: [0, Math.cos(i) * 40, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Premium Light Rays */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`light-ray-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: '2px',
            height: '150px',
            background: `linear-gradient(to bottom, 
              rgba(255, 255, 255, 0.8) 0%,
              rgba(59, 130, 246, 0.6) 50%,
              transparent 100%
            )`,
            transformOrigin: 'top center',
            transform: `rotate(${i * 60}deg) translateX(-50%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Atmospheric Depth Layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`depth-layer-${i}`}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${30 + i * 20}% ${40 + i * 15}%, 
              rgba(59, 130, 246, ${0.05 + i * 0.02}) 0%, 
              transparent 50%
            )`,
            filter: `blur(${10 + i * 5}px)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Precision Geometric Grid (Subtle) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content Overlay for Clean Placement */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 50%, rgba(0, 0, 0, 0.02) 100%)',
        }}
      />
    </div>
  );
};

export default ShatteredGeometryDesign;