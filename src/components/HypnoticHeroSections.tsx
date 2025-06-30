import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, X, Check, Star, Download, Code, Figma } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CrystalHeroDesign from './CrystalHeroDesign';

interface HeroProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  preview: string;
  category: string;
  price: number;
  formats: string[];
  features: string[];
  designComponent?: React.ComponentType<{ isVisible: boolean }>;
}

const HypnoticHeroSections: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<HeroProduct | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const products: HeroProduct[] = [
    {
      id: 'crystal',
      name: 'Crystal',
      tagline: 'Crystalline precision for SaaS launches',
      description: 'Built for SaaS launches. Fast. Direct. Emotionally loaded with animated glass panels that form perfect symmetry.',
      preview: '/api/placeholder/400/300',
      category: 'SaaS',
      price: 149,
      formats: ['Figma', 'HTML/CSS', 'React'],
      features: ['Animated glass panels', 'Mobile responsive', 'Copy included', '3 color variants'],
      designComponent: CrystalHeroDesign
    },
    {
      id: 'reactor-x',
      name: 'Reactor-X',
      tagline: 'High-energy conversion engine',
      description: 'E-commerce weapon designed to eliminate hesitation with pulsing energy effects and urgency triggers.',
      preview: '/api/placeholder/400/300',
      category: 'E-commerce',
      price: 179,
      formats: ['Figma', 'HTML/CSS', 'Shopify'],
      features: ['Energy animations', 'Trust signals', 'Urgency elements', 'A/B tested copy']
    },
    {
      id: 'arc-7',
      name: 'Arc-7',
      tagline: 'Sophisticated agency presence',
      description: 'Agency stealth mode. Sophisticated and commanding with portfolio integration and authority building elements.',
      preview: '/api/placeholder/400/300',
      category: 'Agency',
      price: 199,
      formats: ['Figma', 'HTML/CSS', 'Webflow'],
      features: ['Portfolio showcase', 'Case studies', 'Client logos', 'Authority building']
    },
    {
      id: 'delta-veil',
      name: 'Delta Veil',
      tagline: 'Minimalist conversion focus',
      description: 'Clean, minimal design that focuses purely on conversion with subtle animations and clear value propositions.',
      preview: '/api/placeholder/400/300',
      category: 'Startup',
      price: 129,
      formats: ['Figma', 'HTML/CSS'],
      features: ['Minimal design', 'Clear CTAs', 'Fast loading', 'Mobile first']
    },
    {
      id: 'nexus-prime',
      name: 'Nexus Prime',
      tagline: 'Tech-forward innovation showcase',
      description: 'Perfect for tech companies and innovative startups with futuristic elements and interactive components.',
      preview: '/api/placeholder/400/300',
      category: 'Tech',
      price: 219,
      formats: ['Figma', 'HTML/CSS', 'React', 'Vue'],
      features: ['Interactive elements', 'Futuristic design', 'Tech animations', 'Dark mode ready']
    },
    {
      id: 'velocity',
      name: 'Velocity',
      tagline: 'Speed-optimized performance',
      description: 'Built for speed and performance with lightweight animations and optimized loading for maximum conversion.',
      preview: '/api/placeholder/400/300',
      category: 'Performance',
      price: 159,
      formats: ['HTML/CSS', 'React'],
      features: ['Ultra-fast loading', 'Lightweight', 'Performance optimized', 'Core Web Vitals ready']
    }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleProductClick = (product: HeroProduct) => {
    setSelectedProduct(product);
  };

  const handlePurchase = (product: HeroProduct) => {
    // Handle purchase logic here
    console.log('Purchasing:', product.name);
    // This would integrate with Stripe/PayPal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">Hypnotic Hero Sections</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              First impressions engineered to convert. Professional hero sections that capture attention and drive action.
            </p>
          </div>
          
          <div className="w-24 h-px bg-gray-300 mx-auto mt-8"></div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
              onClick={() => handleProductClick(product)}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Preview Area */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {product.designComponent && hoveredCard === product.id ? (
                  <product.designComponent isVisible={true} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Play className="w-12 h-12 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">View Details</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{product.tagline}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedProduct.name}</h2>
                  <p className="text-gray-600">{selectedProduct.tagline}</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8 p-6">
                {/* Preview */}
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                    {selectedProduct.designComponent ? (
                      <selectedProduct.designComponent isVisible={true} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <Play className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {selectedProduct.formats.map((format) => (
                      <span key={format} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {format === 'Figma' && <Figma className="w-3 h-3 mr-1" />}
                        {format === 'HTML/CSS' && <Code className="w-3 h-3 mr-1" />}
                        {format === 'React' && <Code className="w-3 h-3 mr-1" />}
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">${selectedProduct.price}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => handlePurchase(selectedProduct)}
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                      >
                        Purchase Now
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Add to Cart
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Instant download • 30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HypnoticHeroSections;