import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  X, 
  Check,
  ArrowRight,
  Crosshair,
  Brain
} from 'lucide-react';

interface HeroPreview {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  features: string[];
}

interface Package {
  name: string;
  description: string;
  price: number;
  features: string[];
  deliverables: string[];
}

const HypnoticHeroSections: React.FC = () => {
  const [selectedPreview, setSelectedPreview] = useState<HeroPreview | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isTargeting, setIsTargeting] = useState(false);

  // Mouse tracking for crosshair effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroPreviewsData: HeroPreview[] = [
    {
      id: 'reactor-x',
      name: 'REACTOR-X',
      description: 'Built for SaaS launches. Fast. Direct. Emotionally loaded.',
      preview: '/api/placeholder/600/400',
      category: 'SaaS',
      features: ['Animated CTAs', 'Scroll Triggers', 'Mobile Optimized', 'Conversion Focused']
    },
    {
      id: 'arc-7',
      name: 'ARC-7',
      description: 'E-commerce weapon. Designed to eliminate hesitation.',
      preview: '/api/placeholder/600/400',
      category: 'E-commerce',
      features: ['Product Showcase', 'Trust Signals', 'Urgency Elements', 'Social Proof']
    },
    {
      id: 'delta-veil',
      name: 'DELTA VEIL',
      description: 'Agency stealth mode. Sophisticated. Commanding.',
      preview: '/api/placeholder/600/400',
      category: 'Agency',
      features: ['Portfolio Integration', 'Case Studies', 'Client Logos', 'Authority Building']
    }
  ];

  const packagesData: Package[] = [
    {
      name: 'Precision Base',
      description: 'Core weapon deployment',
      price: 2500,
      features: ['Strategic copywriting', 'Visual design', 'Basic animations'],
      deliverables: ['Figma design file', 'Copy document', 'Style guide', '1 revision round']
    },
    {
      name: 'Conversion Engine',
      description: 'Full tactical implementation',
      price: 4500,
      features: ['Everything in Base', 'Advanced animations', 'A/B test variants', 'Mobile optimization'],
      deliverables: ['HTML/CSS code', 'React components', 'Animation library', '2 revision rounds', 'Performance optimization']
    },
    {
      name: 'Full Weaponization',
      description: 'Complete domination package',
      price: 7500,
      features: ['Everything in Engine', 'Custom interactions', 'Analytics setup', 'Conversion tracking'],
      deliverables: ['Complete codebase', 'CMS integration', 'Analytics dashboard', '3 revision rounds', '30-day support']
    }
  ];

  const faqData = [
    {
      question: 'Is it mobile-optimized?',
      answer: 'Every weapon is forged for all devices. Mobile-first design ensures your first impression dominates on every screen size.'
    },
    {
      question: 'How long does it take to deliver?',
      answer: 'Precision Base: 5-7 days. Conversion Engine: 10-14 days. Full Weaponization: 14-21 days. Quality over speed, but we move fast.'
    },
    {
      question: 'Can I integrate this into Framer/Webflow?',
      answer: 'Absolutely. We deliver in multiple formats: Figma, HTML/CSS, React components, and platform-specific exports.'
    },
    {
      question: 'Can I request revisions?',
      answer: 'Revisions are included based on your package. We refine until it\'s lethal. Additional rounds available if needed.'
    },
    {
      question: 'Do I get code or just visuals?',
      answer: 'Depends on your package. Precision Base includes design files. Higher tiers include production-ready code.'
    },
    {
      question: 'Do you offer fully custom hero sections?',
      answer: 'Yes. Full Weaponization includes custom interactions and unique elements tailored to your specific mission.'
    }
  ];

  const scrollToShowcase = () => {
    const showcaseElement = document.getElementById('showcase');
    showcaseElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom Crosshair Cursor */}
      {isTargeting && (
        <div 
          className="fixed pointer-events-none z-[9999] w-8 h-8"
          style={{
            left: cursorPosition.x - 16,
            top: cursorPosition.y - 16,
            transition: 'all 0.1s ease-out'
          }}
        >
          <Crosshair className="w-8 h-8 text-red-500" />
        </div>
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* SECTION 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            onMouseEnter={() => setIsTargeting(true)}
            onMouseLeave={() => setIsTargeting(false)}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              THE FIRST IMPRESSION
              <br />
              <span className="text-red-500">WEAPON</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Forget design. This is strategy. Built to hijack attention and hardwire desire in the first 2.7 seconds.
            </p>

            <motion.button
              onClick={scrollToShowcase}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-blue-600 to-red-600 text-white px-12 py-4 rounded-lg text-xl font-semibold flex items-center space-x-3 mx-auto"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(239, 68, 68, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Brain className="w-6 h-6" />
              <span>Deploy My Hero Section</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </motion.div>
      </section>

      {/* SECTION 2: Pain Agitation */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-red-500">
              You're Losing Before You Even Begin
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              If your hero section doesn't hook them immediately, you're invisible. 
              Templates can't manipulate behavior. Ours can.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-600 opacity-60">
                <h3 className="text-gray-500 mb-4">Generic Template</h3>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-600 rounded w-1/3"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span className="text-red-400 font-bold text-lg">IGNORED</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-black border border-blue-400 p-8 rounded-lg">
                <h3 className="text-blue-400 mb-4">Manifest Illusions Weapon</h3>
                <motion.div 
                  className="space-y-3"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.6)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded"
                    animate={{ width: ['75%', '85%', '75%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded"
                    animate={{ width: ['50%', '60%', '50%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="h-8 bg-gradient-to-r from-blue-500 to-red-500 rounded"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 10px rgba(59, 130, 246, 0.5)",
                        "0 0 20px rgba(239, 68, 68, 0.7)",
                        "0 0 10px rgba(59, 130, 246, 0.5)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                CONVERTS
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: What Makes Ours Different */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Not Pretty. <span className="text-blue-400">Precise.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              We build digital seduction engines. Every headline. Every image. Every line of code. 
              Tuned to capture attention and convert.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, label: 'Curiosity Trigger', desc: 'Headlines that hijack attention' },
              { icon: Zap, label: 'Friction-Free CTA', desc: 'Buttons that demand action' },
              { icon: Eye, label: 'Scroll Hook', desc: 'Animations that pull deeper' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-black/50 border border-blue-400/30 p-8 rounded-lg text-center group hover:border-blue-400/60 transition-all"
              >
                <item.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3 text-blue-400">{item.label}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Preview Arsenal */}
      <section id="showcase" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Live Weapons in the <span className="text-red-500">Field</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Select your target. Preview your impression. Each one forged with strategic precision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {heroPreviewsData.map((preview, index) => (
              <motion.div
                key={preview.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedPreview(preview)}
              >
                <div className="relative bg-black border border-blue-400/30 rounded-lg overflow-hidden group-hover:border-red-500/60 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-blue-400 mx-auto mb-4 group-hover:text-red-400 transition-colors" />
                      <h3 className="text-2xl font-bold text-blue-400 group-hover:text-red-400 transition-colors">
                        {preview.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-300 mb-4">{preview.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {preview.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold">
                      Tap to Deploy
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Elite FAQ */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              What You Should <span className="text-blue-400">Know</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-lg border border-blue-400/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-blue-500/10 transition-colors"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-2">
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent mb-4" />
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Final CTA */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Your First Impression Is the Only One That <span className="text-red-500">Matters</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              This isn't about design. It's about dominance. Stop being forgettable. Start being unignorable.
            </p>

            <motion.button
              onClick={scrollToShowcase}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-12 py-4 rounded-lg text-xl font-semibold flex items-center space-x-3 mx-auto"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(239, 68, 68, 0.4)",
                  "0 0 50px rgba(59, 130, 246, 0.6)",
                  "0 0 30px rgba(239, 68, 68, 0.4)",
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Brain className="w-6 h-6" />
              <span>Start My Build</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black border border-blue-400/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-blue-400/20 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-blue-400">{selectedPreview.name}</h3>
                <button
                  onClick={() => setSelectedPreview(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-300">Live Preview Animation</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{selectedPreview.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {packagesData.map((pkg, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPackage?.name === pkg.name
                          ? 'border-blue-400 bg-blue-500/10'
                          : 'border-gray-600 hover:border-blue-400/50'
                      }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <h4 className="font-semibold text-blue-400 mb-2">{pkg.name}</h4>
                      <p className="text-2xl font-bold mb-2">${pkg.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-400 mb-3">{pkg.description}</p>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center">
                            <Check className="w-3 h-3 text-green-400 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {selectedPackage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-t border-blue-400/20 pt-6"
                  >
                    <h4 className="text-lg font-semibold mb-4">Deliverables:</h4>
                    <ul className="grid md:grid-cols-2 gap-2 mb-6">
                      {selectedPackage.deliverables.map((item, i) => (
                        <li key={i} className="text-gray-300 flex items-center">
                          <Check className="w-4 h-4 text-green-400 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex space-x-4">
                      <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Pay with Stripe
                      </button>
                      <button className="flex-1 bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                        Pay with PayPal
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HypnoticHeroSections;