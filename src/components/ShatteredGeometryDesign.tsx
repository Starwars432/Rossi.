import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ShatteredGeometryDesign() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setRevealed(true), 3000); // Delay before reveal
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* === 1. CURTAINS === */}
      {!revealed && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-1/2 z-50 bg-[url('/curtain-left.jpg')] bg-cover bg-center"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 right-0 h-full w-1/2 z-50 bg-[url('/curtain-right.jpg')] bg-cover bg-center"
          />
        </>
      )}

      {/* === 2. LUXURY BACKGROUND === */}
      {revealed && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2e2b25_0%,#0e0d0a_100%)] pointer-events-none z-0" />

          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="w-full h-full bg-[url('/luxury-texture.gif')] bg-cover bg-center mix-blend-soft-light opacity-20" />
          </div>

          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#c1a875] rounded-full blur-[150px] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* === 3. 3D CENTERPIECE === */}
          <iframe
            src="https://my.spline.design/goldbustscene" // Replace with your scene
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>

          {/* Optional gold frame */}
          <div className="absolute inset-0 border-2 border-[#c1a875] rounded-[30px] m-4 pointer-events-none z-30" />
        </>
      )}
    </div>
  );
}
