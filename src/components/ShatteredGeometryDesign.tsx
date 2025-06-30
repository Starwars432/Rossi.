import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ShatteredGeometryDesign() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-[#0e0d0a]"
    >
      {/* Gold Ripple Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2e2b25_0%,#0e0d0a_100%)] pointer-events-none z-0" />

      {/* Animated Ripple / Shine Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full bg-[url('/luxury-texture.gif')] bg-cover bg-center mix-blend-soft-light opacity-20" />
      </div>

      {/* Parallax Ornamental Shapes */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-[url('/ornament-gold.svg')] bg-contain bg-no-repeat opacity-30"
      />
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute bottom-10 right-1/5 w-64 h-64 bg-[url('/ornament-gold.svg')] bg-contain bg-no-repeat opacity-20"
      />

      {/* Gold Frame Border */}
      <div className="absolute inset-0 border-2 border-[#c1a875] rounded-[30px] m-4 pointer-events-none z-20" />

      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#c1a875] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      {/* Reserved Space (no content) */}
      <div className="relative z-10 h-full w-full" />
    </div>
  );
}
