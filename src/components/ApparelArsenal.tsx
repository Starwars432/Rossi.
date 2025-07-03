import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApparelArsenal: React.FC = () => {
  const navigate = useNavigate();
  const [currentCollection, setCurrentCollection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const collections = [
    {
      id: 1,
      name: "SIGNATURE",
      subtitle: "Architectural Minimalism",
      description: "Clean lines meet bold statements. Designed for those who understand the power of restraint.",
      color: "from-slate-900 via-slate-800 to-slate-700",
      accent: "bg-white text-slate-900"
    },
    {
      id: 2,
      name: "URBAN FLUX",
      subtitle: "Contemporary Streetwear",
      description: "Where art meets street culture. Each piece tells a story of modern rebellion.",
      color: "from-zinc-900 via-neutral-800 to-stone-700",
      accent: "bg-orange-400 text-black"
    },
    {
      id: 3,
      name: "ETHEREAL",
      subtitle: "Conceptual Luxury",
      description: "Beyond fashion. These are wearable sculptures for the discerning individual.",
      color: "from-gray-900 via-gray-800 to-slate-800",
      accent: "bg-emerald-400 text-black"
    },
    {
      id: 4,
      name: "NOIR ESSENCE",
      subtitle: "Timeless Sophistication",
      description: "Classic silhouettes reimagined. Elegance that transcends trends.",
      color: "from-black via-gray-900 to-slate-900",
      accent: "bg-gold-400 text-black"
    }
  ];

  // Auto-rotate collections
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentCollection((prev) => (prev + 1) % collections.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, collections.length]);

  const currentCol = collections[currentCollection];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentCol.color} transition-all duration-1000`}>
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-2xl"></div>
        </div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white transform rotate-45"></div>
          <div className="absolute top-1/3 right-32 w-24 h-24 border border-white transform -rotate-12"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 border border-white transform rotate-30"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-50 p-8">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBackToHome}
            className="flex items-center text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-light tracking-wide">BACK</span>
          </button>
          
          <div className="text-right">
            <div className="text-2xl font-light tracking-widest">APPAREL</div>
            <div className="text-sm text-white/60 tracking-wider">ARSENAL</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 -mt-20">
        <div className="max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Typography */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCollection}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {/* Collection number */}
                  <div className="text-sm font-mono text-white/40 tracking-wider">
                    0{currentCol.id}/04
                  </div>
                  
                  {/* Collection name */}
                  <h1 className="text-6xl md:text-7xl font-light tracking-tighter leading-none">
                    {currentCol.name}
                  </h1>
                  
                  {/* Subtitle */}
                  <div className={`inline-block px-4 py-2 text-sm font-medium tracking-wide ${currentCol.accent}`}>
                    {currentCol.subtitle}
                  </div>
                  
                  {/* Description */}
                  <p className="text-xl font-light text-white/80 leading-relaxed max-w-md">
                    {currentCol.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Collection Navigation */}
              <div className="flex items-center space-x-6 pt-8">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center text-white/60 hover:text-white transition-colors"
                >
                  {isAutoPlaying ? (
                    <Pause className="w-5 h-5 mr-2" />
                  ) : (
                    <Play className="w-5 h-5 mr-2" />
                  )}
                  <span className="text-sm font-mono">{isAutoPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                
                <div className="flex space-x-2">
                  {collections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCollection(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentCollection ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Side - Visual Display */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCollection}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Main showcase area */}
                  <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center relative overflow-hidden">
                    {/* Placeholder for clothing mockup */}
                    <div className="w-48 h-48 bg-white/20 rounded-lg flex items-center justify-center">
                      <div className="text-4xl font-light text-white/60">
                        {currentCol.name.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                  </div>
                  
                  {/* Side elements */}
                  <div className="absolute -right-8 top-1/4 w-32 h-1 bg-white/20"></div>
                  <div className="absolute -left-8 bottom-1/4 w-24 h-1 bg-white/20"></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-8">
        <div className="flex items-center justify-between text-sm font-mono text-white/40">
          <div>EST. 2024</div>
          <div className="flex space-x-8">
            <span>DESIGN</span>
            <span>CONCEPT</span>
            <span>PRODUCTION</span>
          </div>
          <div>NYC</div>
        </div>
      </div>

      {/* Vertical text decoration */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs font-mono text-white/20 tracking-widest">
        WEARABLE ART
      </div>
    </div>
  );
};

export default ApparelArsenal;