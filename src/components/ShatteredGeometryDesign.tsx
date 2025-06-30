// Hero.tsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Spline 3D Embed */}
      <iframe
        src="https://my.spline.design/abstractshapeembedlink"
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
      ></iframe>

      {/* Floating Blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-2xl opacity-25 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Create Beyond Limits
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-2xl"
        >
          Design. Animate. Build. Everything your imagination can touch — now live.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex space-x-4"
        >
          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Get Started
          </button>
          <button className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition">
            See It In Action
          </button>
        </motion.div>
      </div>
    </div>
  );
}
