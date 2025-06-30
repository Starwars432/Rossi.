import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface HyperspaceHeroProps {
  isVisible: boolean;
}

const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: Math.random() * 360,
    speed: 0.5 + Math.random() * 1.5,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3,
    color: ['#A5F3FC', '#FACC15', '#C084FC', '#FFFFFF'][i % 4]
  }));
};

const stars = generateStars(200);

const HyperspaceHero: React.FC<HyperspaceHeroProps> = ({ isVisible }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        scale: [1, 1.2, 1],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    }
  }, [isVisible, controls]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
      {/* Star streaks */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            left: '50%',
            top: '50%',
            transformOrigin: 'center center',
          }}
          animate={{
            x: [0, Math.cos((star.angle * Math.PI) / 180) * 2000],
            y: [0, Math.sin((star.angle * Math.PI) / 180) * 2000],
            opacity: [1, 0],
            scaleX: [1, 6],
          }}
          transition={{
            duration: 3 + star.speed,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeIn',
            delay: star.delay,
          }}
        />
      ))}

      {/* Light tunnel core glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dim atmospheric stars in the background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '1px',
              height: '1px',
              backgroundColor: '#ffffff22',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HyperspaceHero;
