import { motion } from "framer-motion";

export default function ShatteredGeometryDesign() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      {/* Spline 3D Scene */}
      <iframe
        src="https://my.spline.design/abstractfloating" // Replace with your Spline scene
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
      ></iframe>

      {/* Animated Blobs */}
      <div className="absolute top-[20%] left-[25%] w-96 h-96 bg-purple-400 rounded-full blur-[100px] opacity-30 animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-indigo-500 rounded-full blur-[80px] opacity-25 animate-pulse" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Shape the Impossible
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-2xl text-white/80"
        >
          A fusion of geometry, creativity, and motion — built to wow across all industries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 flex flex-col md:flex-row gap-4"
        >
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Launch Experience
          </button>
          <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
            Explore Designs
          </button>
        </motion.div>
      </div>
    </div>
  );
}
