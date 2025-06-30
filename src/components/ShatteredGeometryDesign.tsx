import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ShatteredGeometryDesign() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setRevealed(true), 3000); // Wait 3s before reveal
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">

      {/* === CURTAINS === */}
      {!revealed && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-1/2 z-50 bg-gradient-to-r from-[#5b1a1a] via-[#7b2c2c] to-[#5b1a1a] shadow-2xl"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 right-0 h-full w-1/2 z-50 bg-gradient-to-l from-[#5b1a1a] via-[#7b2c2c] to-[#5b1a1a] shadow-2xl"
          />
        </>
      )}

      {/* === BACKGROUND === */}
      {revealed && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2e2b25_0%,#0e0d0a_100%)] z-0" />

          {/* Luxury motion shimmer layer */}
          <div className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light opacity-10 bg-gradient-to-br from-white/10 to-transparent animate-pulse" />

          {/* Center Glow */}
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#c1a875] rounded-full blur-[120px] opacity-10 -translate-x-1/2 -translate-y-1/2 z-10" />

          {/* Fake 3D Object */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-[#f8e2b5] to-[#c1a875] shadow-[0_0_60px_rgba(193,168,117,0.5)] border-[3px] border-[#b99762] -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-[2px] border border-white/10" />
          </motion.div>

          {/* Optional: Subtle gold frame border */}
          <div className="absolute inset-0 border-2 border-[#c1a875] rounded-[30px] m-4 pointer-events-none z-20" />
        </>
      )}
    </div>
  );
}
