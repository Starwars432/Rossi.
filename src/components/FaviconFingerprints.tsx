import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Star, CheckCircle, Monitor, Smartphone, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FaviconFingerprints: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const reasons = [
    {
      icon: '🧠',
      title: 'Memory Imprint',
      description: 'Subconscious brand reinforcement every time they tab back'
    },
    {
      icon: '💻',
      title: 'Visual Consistency',
      description: 'Cohesive look across browser, mobile, and bookmarks'
    },
    {
      icon: '🔒',
      title: 'Brand Credibility',
      description: 'A missing favicon makes your brand feel unfinished'
    },
    {
      icon: '🎯',
      title: 'Micro-Messaging',
      description: 'A favicon is your brand boiled down to one moment of recognition'
    }
  ];

  const deliverables = [
    {
      icon: '🔍',
      title: 'Custom Favicon Design',
      description: '2–3 initial concepts based on your logo, vibe, and use case'
    },
    {
      icon: '📁',
      title: 'Exported Assets',
      description: 'Full favicon pack: .ico, .png (32x32, 64x64, 180x180, etc.)'
    },
    {
      icon: '⚙️',
      title: 'Dark/Light Mode Variants',
      description: 'Optimized for every tab bar background'
    },
    {
      icon: '🔄',
      title: 'Revisions',
      description: 'One round of adjustments included'
    },
    {
      icon: '📖',
      title: 'Usage Guide',
      description: 'How to implement on any platform (HTML, Shopify, WordPress, Webflow)'
    }
  ];

  const differentiators = [
    {
      title: 'We understand grid math',
      description: 'We don\'t just shrink logos — we redesign them for micro form'
    },
    {
      title: 'We focus on psychological impact',
      description: 'Shape, color, and negative space are engineered for recall'
    },
    {
      title: 'We protect the brand\'s essence',
      description: 'Your favicon won\'t feel like an afterthought — it\'ll feel like a seal'
    }
  ];

  const testimonials = [
    {
      name: 'B.D.',
      title: 'Startup Co-Founder',
      quote: "Our entire brand felt more real the moment the favicon hit the tab. It's subtle, but it's felt."
    },
    {
      name: 'N.J.',
      title: 'Personal Brand Creator',
      quote: "The favicon they made got noticed in meetings before our deck did."
    }
  ];

  const faqs = [
    {
      question: "Can you design a favicon without an existing logo?",
      answer: "Yes — we can design standalone favicon iconography from scratch."
    },
    {
      question: "Do you provide the code to embed it?",
      answer: "Yes — we provide copy/paste HTML + full image file pack."
    },
    {
      question: "What platforms does it work on?",
      answer: "Shopify, WordPress, Webflow, Squarespace, and any custom site."
    },
    {
      question: "Can I update my existing logo into a better favicon?",
      answer: "Yes. We specialize in logo-to-favicon reengineering."
    }
  ];

  // Mock favicon examples for demonstration
  const mockFavicons = [
    { name: 'Notion', color: '#000000', letter: 'N' },
    { name: 'Stripe', color: '#635BFF', letter: 'S' },
    { name: 'Nike', color: '#FF6900', letter: '✓' },
    { name: 'Apple', color: '#007AFF', letter: '' },
    { name: 'Your Brand', color: '#0077FF', letter: 'Y' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light mb-6 text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Icons That Live in Memory
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Subtle. Strategic. Unmistakable. Your favicon is more than a pixel — it's your signature in the browser world.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all shadow-lg"
          >
            🔘 Design My Favicon
          </motion.button>

          {/* Mock Browser Tab Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-gray-100 rounded-t-lg p-4 max-w-2xl mx-auto"
          >
            <div className="flex space-x-2">
              {mockFavicons.map((favicon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center bg-white rounded-t-lg px-3 py-2 border-t border-l border-r border-gray-200 min-w-[120px]"
                >
                  <div 
                    className="w-4 h-4 rounded-sm mr-2 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: favicon.color }}
                  >
                    {favicon.letter}
                  </div>
                  <span className="text-sm text-gray-700 truncate">{favicon.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Favicons Matter Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-8 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              The Corner of the Screen Is Prime Real Estate
            </h2>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                The tab bar is the most crowded piece of real estate on your audience's screen.
                Brands that win attention even at 16x16 pixels? Those are the ones that stick.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We design favicons that feel like logos — but hit faster, sharper, and cleaner.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-4">{reason.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Precision-Crafted Digital Icons, Built for Presence
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
              >
                <div className="text-2xl mb-4">{deliverable.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {deliverable.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {deliverable.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockup Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-light mb-8 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              A Favicon Says More Than a Footer
            </h2>
          </motion.div>

          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Blurred/Forgettable */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-100 p-8 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-600">Forgettable</h3>
              <div className="flex space-x-2 justify-center">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex items-center bg-white rounded px-3 py-2 border border-gray-200">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2 blur-sm"></div>
                    <span className="text-sm text-gray-400">Site {index + 1}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Clear/Memorable */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-blue-50 p-8 rounded-lg border border-blue-100"
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Memorable</h3>
              <div className="flex space-x-2 justify-center">
                {mockFavicons.slice(0, 4).map((favicon, index) => (
                  <div key={index} className="flex items-center bg-white rounded px-3 py-2 border border-gray-200">
                    <div 
                      className="w-4 h-4 rounded mr-2 flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: favicon.color }}
                    >
                      {favicon.letter}
                    </div>
                    <span className="text-sm text-gray-700">{favicon.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 italic"
          >
            Your brand deserves to be seen — even when minimized.
          </motion.p>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-8 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Built By Designers Who Understand Iconography
            </h2>
          </motion.div>

          <div className="space-y-8">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Why It Matters
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{diff.title}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                    What We Do
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{diff.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <blockquote className="text-xl italic text-gray-700 border-l-4 border-blue-600 pl-6">
              "The difference between a favicon and a pixel blob? Design intention."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                    {testimonial.name}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.title}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Common Questions, Clear Answers
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-light mb-8 text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            The Tab Is Where Your Brand Lives
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all shadow-lg mb-6"
          >
            🔘 Design My Favicon
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600"
          >
            You obsess over logos, palettes, and fonts — don't leave the tab blank.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default FaviconFingerprints;