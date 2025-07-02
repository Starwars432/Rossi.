import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2, Download, Code } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface DesignInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl?: string;
  colors: string[];
  techniques: string[];
}

const designs: Record<string, DesignInfo> = {
  'luminous-currents': {
    id: 'luminous-currents',
    name: 'Luminous Currents',
    tagline: 'Serene, innovative fluid dynamics',
    description: 'A soft, flowing, translucent wave design with gentle currents that move elegantly across the screen. Perfect for innovative brands seeking sophisticated, fluid aesthetics.',
    imageUrl: '/src/assets/@manifestillusions.png',
    colors: ['#FFD700', '#FFA500', '#FF6B35', '#8A2BE2', '#4169E1'],
    techniques: ['Fluid SVG animations', 'Cosmic particle systems', 'Multi-layer gradients', 'Flowing current paths']
  },
  'reactor-x': {
    id: 'reactor-x',
    name: 'Reactor-X',
    tagline: 'Bio-luminescent organic growth',
    description: 'Organic, asymmetrical shapes that bloom from central points with soft, pulsating bioluminescent glow. Perfect for innovative tech and natural futurism brands.',
    colors: ['#00FFFF', '#0080FF', '#8A2BE2', '#00CED1', '#34D399'],
    techniques: ['Organic growth patterns', 'Bioluminescent effects', 'SVG morphing paths', 'Pulsating animations']
  },
  'arc-7': {
    id: 'arc-7',
    name: 'Arc-7',
    tagline: 'Shattered geometry precision',
    description: 'Premium 3D glass shards suspended in space with realistic light reflections and refractions. Perfect for luxury brands and sophisticated agency presence.',
    colors: ['#3B82F6', '#A855F7', '#0EA5E9', '#FFFFFF'],
    techniques: ['3D glass effects', 'Light reflections', 'Precision geometry', 'Crystal formations']
  },
  'delta-veil': {
    id: 'delta-veil',
    name: 'Delta Veil',
    tagline: 'Old-world luxury and opulence',
    description: 'Museum-quality design featuring impeccable marble textures, burnished gold details, and fine silk elements. Embodies timeless sophistication of old money estates.',
    colors: ['#C1A875', '#F8E2B5', '#B99762', '#2E2B25'],
    techniques: ['Marble textures', 'Gold accents', 'Silk effects', 'Luxury aesthetics']
  },
  'bioluminescent-beach': {
    id: 'bioluminescent-beach',
    name: 'Bioluminescent Beach',
    tagline: 'Magical coastal bioluminescence',
    description: 'Breathtaking sunset beach scene with glowing bioluminescent waves. Creates an otherworldly coastal experience with realistic wave animations.',
    colors: ['#00FFFF', '#0080FF', '#FF6B35', '#FFD700'],
    techniques: ['Wave animations', 'Sunset gradients', 'Bioluminescent effects', 'Beach textures']
  }
};

const DesignShowcase: React.FC = () => {
  const navigate = useNavigate();
  const { designId } = useParams<{ designId: string }>();
  
  const design = designId ? designs[designId] : null;

  const handleBackToHome = () => {
    navigate('/#home');
  };

  if (!design) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Design not found</h1>
          <button
            onClick={handleBackToHome}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Full-Screen Design Image */}
      <div className="absolute inset-0">
        {design.imageUrl ? (
          <img 
            src={design.imageUrl} 
            alt={design.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-lg mx-auto mb-4"></div>
              <p className="text-white">Design Preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay Controls */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-6 pointer-events-auto">
          <motion.button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </motion.button>

          <div className="flex items-center space-x-3">
            <motion.button
              className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-black/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-black/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-black/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="View Code"
            >
              <Code className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Info Panel */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 backdrop-blur-lg rounded-xl p-6 max-w-md"
          >
            <h1 className="text-2xl font-semibold text-white mb-2">{design.name}</h1>
            <p className="text-blue-400 text-sm mb-3">{design.tagline}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {design.description}
            </p>
            
            {/* Color Palette */}
            <div className="mb-4">
              <h3 className="text-white text-xs font-medium mb-2">Color Palette</h3>
              <div className="flex space-x-2">
                {design.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Techniques */}
            <div>
              <h3 className="text-white text-xs font-medium mb-2">Techniques Used</h3>
              <div className="flex flex-wrap gap-2">
                {design.techniques.map((technique, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default DesignShowcase;