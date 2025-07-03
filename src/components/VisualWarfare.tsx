import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Monitor, Smartphone, Layers, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VisualWarfare: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const deliverables = [
    {
      icon: '🧠',
      title: 'Conversion Ad Design',
      description: 'Scroll-stopping visuals for Facebook, TikTok, YouTube, Google'
    },
    {
      icon: '📱',
      title: 'Mobile-First Design',
      description: 'Native ratios, platform-optimized layouts (9:16, 1:1, 16:9)'
    },
    {
      icon: '✏️',
      title: 'Headline & Hook Copy',
      description: 'Shortform psychological copy embedded into the ad design'
    },
    {
      icon: '🎨',
      title: 'Brand-Aligned Style',
      description: 'Seamlessly integrates with your identity + product visuals'
    },
    {
      icon: '🧪',
      title: 'A/B Variant Creatives',
      description: 'Two options for split-testing visual strategy (optional tier)'
    }
  ];

  const mockupShowcase = [
    {
      title: 'Deodorant Redesign',
      metric: 'CTR +178%',
      platform: 'Facebook',
      type: 'Static Ad'
    },
    {
      title: 'AI SaaS App',
      metric: '$24k revenue in 2 days',
      platform: 'TikTok',
      type: 'Video Frame'
    },
    {
      title: 'Jewelry Rebrand',
      metric: 'Scroll rate dropped by 48%',
      platform: 'YouTube',
      type: 'Thumbnail'
    }
  ];

  const differentiators = [
    {
      title: 'Conversion First',
      description: 'Designed for results, not for aesthetics'
    },
    {
      title: 'Platform-Specific',
      description: 'Built for Facebook, TikTok, Reels, Shorts, etc.'
    },
    {
      title: 'Scroll-Interruptive',
      description: 'Uses asymmetry, motion triggers, and optical rhythm'
    },
    {
      title: 'Copy-Integrated',
      description: 'No guessing. Every design includes optimized hook text'
    }
  ];

  const processSteps = [
    {
      title: 'Brand/Product Brief',
      description: 'You upload visual assets, links, or raw text'
    },
    {
      title: 'Strategy + Mockup',
      description: 'We draft visual wireframes & 2–3 hook concepts'
    },
    {
      title: 'Final Delivery',
      description: 'You receive web-ready ad designs + copy, in native formats'
    }
  ];

  const testimonials = [
    {
      name: 'M.P.',
      title: 'DTC Brand Owner',
      quote: "We dropped one ad set from them and broke our previous record in 48 hours."
    },
    {
      name: 'J.T.',
      title: 'Performance Marketer',
      quote: "They think like a strategist, design like a killer. Clean, tight, and results-focused."
    }
  ];

  const faqs = [
    {
      question: "What platforms do you design for?",
      answer: "TikTok, Instagram, Facebook, YouTube, Google Display, and more."
    },
    {
      question: "What formats do I receive?",
      answer: "PNG, JPG, optional layered PSD or Figma. Mobile + desktop formats."
    },
    {
      question: "Do I need to supply a product photo?",
      answer: "It helps, but we can work with references or render one for you."
    },
    {
      question: "Do you offer animated versions?",
      answer: "Not yet — but it's coming. Static high-converting ads only for now."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Design That Commands Attention. And Action.
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our ad creatives aren't made to decorate — they're built to disrupt scrolls, spike dopamine, and drive response across every channel.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-red-700 transition-all shadow-lg"
              >
                🔘 Get Ad Creatives That Convert
              </motion.button>
            </motion.div>

            {/* 3D-style screen stack mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, x: -5 }}
              className="relative"
            >
              <div className="relative">
                {/* TikTok mockup */}
                <div className="absolute top-0 right-0 w-48 h-80 bg-gray-800 rounded-lg shadow-2xl transform rotate-3 translate-x-4 -translate-y-2 overflow-hidden border border-gray-700">
                  <div className="h-full w-full bg-gradient-to-br from-purple-900 to-pink-800 opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-xs text-white">TikTok Ad</div>
                </div>
                
                {/* Facebook mockup */}
                <div className="absolute top-10 right-10 w-64 h-48 bg-gray-800 rounded-lg shadow-2xl transform -rotate-2 translate-x-2 translate-y-2 overflow-hidden border border-gray-700">
                  <div className="h-full w-full bg-gradient-to-br from-blue-900 to-blue-700 opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-xs text-white">Facebook Ad</div>
                </div>
                
                {/* YouTube mockup */}
                <div className="relative w-72 h-40 bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
                  <div className="h-full w-full bg-gradient-to-br from-red-900 to-red-700 opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-xs text-white">YouTube Thumbnail</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Engineered for Attention, Built for Performance
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
                className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-red-500/30 transition-all"
              >
                <div className="text-3xl mb-4">{deliverable.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {deliverable.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {deliverable.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Mockup Showcase */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              This Is What Disruption Looks Like
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockupShowcase.map((mockup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700 group-hover:border-red-500/50 transition-all">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {mockup.platform === 'Facebook' && <Monitor className="w-12 h-12 text-blue-500/30" />}
                    {mockup.platform === 'TikTok' && <Smartphone className="w-12 h-12 text-pink-500/30" />}
                    {mockup.platform === 'YouTube' && <Layers className="w-12 h-12 text-red-500/30" />}
                  </div>
                  
                  {/* Metric Badge */}
                  <div className="absolute top-4 right-4 bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded">
                    {mockup.metric}
                  </div>
                  
                  {/* Platform Badge */}
                  <div className="absolute bottom-4 left-4 bg-gray-800/90 text-white text-xs px-2 py-1 rounded flex items-center">
                    <span className="mr-1">{mockup.platform}</span>
                    <span className="text-gray-400">• {mockup.type}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {mockup.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-light mb-8 text-white text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              You Don't Need a Graphic Designer. You Need a Visual Strategist.
            </h2>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Our ad designs aren't built in Canva.<br />
                Every line, shape, and shadow is placed with intention — to make the viewer stop, feel something, and click.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                This is performance-focused creative. Trained on high-converting patterns, movement psychology, and fast-scroll behavior.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-red-600/20 p-3 rounded-lg">
                  {index === 0 && <Target className="w-6 h-6 text-red-500" />}
                  {index === 1 && <Smartphone className="w-6 h-6 text-red-500" />}
                  {index === 2 && <Zap className="w-6 h-6 text-red-500" />}
                  {index === 3 && <Layers className="w-6 h-6 text-red-500" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {diff.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {diff.description}
                  </p>
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
            <blockquote className="text-xl italic text-gray-300">
              "The goal isn't to be seen. It's to be remembered."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our 3-Day Ad Design Turnaround
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
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold z-10 relative">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} md:w-1/2`}>
                      <h3 className="text-xl font-semibold mb-2 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
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
            <div className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-medium">
              Delivered in 72 hours or less
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 p-8 rounded-lg border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-semibold text-gray-300">
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
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Tactical Questions, Precise Answers
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
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
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-light mb-4 text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Pretty Doesn't Perform. Precision Does.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Let's turn your product into a scroll-stopping machine.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-red-700 transition-all shadow-lg"
          >
            🔘 Start Your Visual Warfare Campaign
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default VisualWarfare;