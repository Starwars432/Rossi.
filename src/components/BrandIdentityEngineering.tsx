import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Layers, Palette, Type, FileText, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrandIdentityEngineering: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const deliverables = [
    {
      icon: '🎯',
      title: 'Primary Logo Design',
      description: 'Handcrafted mark that communicates mission, energy, and category position'
    },
    {
      icon: '🖼️',
      title: 'Logo Variants',
      description: 'Horizontal, vertical, simplified, monochrome, favicon'
    },
    {
      icon: '🎨',
      title: 'Color System',
      description: 'Primary + secondary palette with brand psychology rationale'
    },
    {
      icon: '🔠',
      title: 'Typography System',
      description: 'Heading/body fonts, scale rules, usage instructions'
    },
    {
      icon: '🧾',
      title: 'Brand Guidelines',
      description: 'PDF booklet outlining tone, use, dos/don\'ts, hierarchy'
    },
    {
      icon: '🧩',
      title: 'Application Mockups',
      description: 'Product, apparel, packaging, site UI, or billboard previews'
    }
  ];

  const processSteps = [
    "Identity Discovery Form",
    "Moodboard Alignment",
    "Logo + System Drafts",
    "Full Identity Presentation",
    "Revisions & Final Delivery"
  ];

  const beforeAfter = [
    {
      before: 'Generic nameplate',
      after: 'Precision logo + sharp glyph variant'
    },
    {
      before: 'Misaligned colors',
      after: 'Full color logic based on emotion + context'
    },
    {
      before: 'Inconsistent fonts',
      after: 'Systemized scale, brand-safe use, and clarity'
    },
    {
      before: 'No guidelines',
      after: 'Now: A PDF your entire team can follow'
    }
  ];

  const differentiators = [
    {
      title: 'Strategic Foundation',
      description: 'Every design starts with audience and category analysis'
    },
    {
      title: 'Emotion Meets Utility',
      description: 'Style balanced with scale, placement, and UX needs'
    },
    {
      title: 'Clarity of Control',
      description: 'We design assets and the rules they obey'
    },
    {
      title: 'Designed to Dominate',
      description: 'Brands are chosen subconsciously — we manipulate that moment'
    }
  ];

  const testimonials = [
    {
      name: 'M.S.',
      title: 'DTC CEO',
      quote: "We had a name and a vibe. Now we have a brand that walks into the room before we do."
    },
    {
      name: 'J.L.',
      title: 'SaaS Founder',
      quote: "I realized we didn't need a rebrand. We needed to be built right from the ground up. They nailed it."
    }
  ];

  const faqs = [
    {
      question: "Do I need an existing logo to start?",
      answer: "No. We can build everything from scratch or evolve an existing concept."
    },
    {
      question: "What formats do I get?",
      answer: "You'll receive all logo variants, brand assets, and a PDF style guide."
    },
    {
      question: "What if I want revisions?",
      answer: "Two refinement rounds are included. More can be scoped if needed."
    },
    {
      question: "Will my identity work on merchandise, websites, and social?",
      answer: "Yes — we design for real-world application, not just decks."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-black relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-10">
          {/* Blueprint grid */}
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Floating logos */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gray-800 opacity-20"
              style={{
                width: `${30 + Math.random() * 40}px`,
                height: `${30 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Identity Is the Weapon. We Build It with Precision.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We engineer brand identities that don't just "look good" — they control perception, generate trust, and trigger recognition before a word is read.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-700 to-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg border border-yellow-700/50"
          >
            Begin Brand Engineering
          </motion.button>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-8 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              This Isn't Design. This Is Construction.
            </h2>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                A logo is a symbol.<br />
                A brand identity is a system.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Fonts, colors, motion, placement, language — every atom of your presence becomes memory architecture.
                We don't "design" identities. We engineer them — for memorability, credibility, and dominance.
              </p>
            </div>
          </motion.div>

          {/* Blueprint diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent w-full absolute top-1/2 transform -translate-y-1/2"></div>
            
            <div className="flex justify-between relative">
              {['Logo', 'Color System', 'Typography', 'Iconography', 'Application'].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-gray-800 border border-yellow-600/30 rounded-full flex items-center justify-center mb-4 relative z-10">
                    {index === 0 && <Layers className="w-6 h-6 text-yellow-600" />}
                    {index === 1 && <Palette className="w-6 h-6 text-yellow-600" />}
                    {index === 2 && <Type className="w-6 h-6 text-yellow-600" />}
                    {index === 3 && <FileText className="w-6 h-6 text-yellow-600" />}
                    {index === 4 && <Layout className="w-6 h-6 text-yellow-600" />}
                  </div>
                  <span className="text-sm text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              What You Get
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800 hover:border-yellow-600/30 transition-all"
              >
                <div className="text-3xl mb-4">{deliverable.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {deliverable.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {deliverable.description}
                </p>
                {index === 5 && (
                  <span className="inline-block mt-4 text-xs text-yellow-600 border border-yellow-600/30 px-2 py-1 rounded">
                    + Optional
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Engineered, Not Assembled
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-700 md:hidden"></div>
            <div className="absolute left-1/2 top-4 w-px h-[calc(100%-32px)] bg-gray-700 hidden md:block"></div>

            <div className="space-y-12 md:space-y-0">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Number circle */}
                    <div className="absolute left-0 top-0 md:static">
                      <div className="w-8 h-8 bg-yellow-700 text-white rounded-full flex items-center justify-center font-semibold z-10 relative">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} md:w-1/2`}>
                      <p className="text-lg text-gray-300">
                        {step}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="inline-block bg-yellow-900/20 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium">
              Avg Turnaround: 10–14 business days
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              From Forgettable to Foundational
            </h2>
          </motion.div>

          <div className="space-y-8">
            {beforeAfter.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                  <div className="text-sm font-medium text-gray-500 mb-2">BEFORE</div>
                  <p className="text-lg text-gray-400">{item.before}</p>
                </div>
                
                <div className="bg-gray-900 p-8 rounded-lg border border-yellow-700/30">
                  <div className="text-sm font-medium text-yellow-600 mb-2">AFTER</div>
                  <p className="text-lg text-white font-medium">{item.after}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            {['Web Header', 'Product Label', 'Social Banner'].map((mockup, index) => (
              <div key={index} className="bg-gray-900 aspect-video rounded-lg border border-gray-800 flex items-center justify-center">
                <span className="text-gray-500 text-sm">{mockup} Mockup</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-8 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              We Don't Just Design. We Define.
            </h2>
            
            <blockquote className="text-xl italic text-gray-300 mb-12 max-w-3xl mx-auto">
              "Brands aren't built by visuals. They're built by consistency, system thinking, and timeless marks."
            </blockquote>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black p-8 rounded-lg border border-gray-800"
              >
                <h3 className="text-xl font-semibold mb-3 text-yellow-600" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {diff.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {diff.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Split image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gray-900 aspect-video rounded-lg border border-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Chaotic early brand sketch</span>
            </div>
            <div className="bg-gray-900 aspect-video rounded-lg border border-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Structured logo grid</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-semibold text-gray-400">
                    {testimonial.name}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.title}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Good Questions Build Good Brands
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black rounded-lg border border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-900 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
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
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-light mb-8 text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Identity Is the Silent Salesman of Your Brand.
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-700 to-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg border border-yellow-700/50 mb-6"
          >
            🔘 Start Your Brand Identity Build
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400"
          >
            It's more than a logo. It's how they remember you — or don't.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default BrandIdentityEngineering;