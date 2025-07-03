import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApparelArsenal: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const services = [
    {
      icon: '🧢',
      name: 'Streetwear & Drops',
      description: 'Apparel designed for culture, hype, and narrative'
    },
    {
      icon: '🧥',
      name: 'Creator Brandwear',
      description: 'Personal brand pieces with depth and artistic direction'
    },
    {
      icon: '🧣',
      name: 'Capsule Collections',
      description: 'Full-line launch strategy, aesthetic cohesion, and packaging design'
    },
    {
      icon: '🎨',
      name: 'Concept Development',
      description: 'We start from story, not templates. Moodboards, references, and visual psychology included.'
    },
    {
      icon: '📦',
      name: 'Production-Ready Files',
      description: 'Tech packs, mockups, and print-ready exports for manufacturers'
    }
  ];

  const processSteps = [
    "You submit a brand prompt or inspiration",
    "We craft concepts: moodboards + sketches",
    "You approve the direction",
    "We design full mockups & production-ready files",
    "Optional: packaging, lookbook, or ecom presentation assets"
  ];

  const benefits = [
    {
      title: 'Strategic',
      description: 'Every design is part of a story. We start with market, mood, and meaning.'
    },
    {
      title: 'Original',
      description: 'No templates. No recycled fonts. Every collection is custom.'
    },
    {
      title: 'Production-Aware',
      description: 'Files built for real-world manufacturers, not just mockups.'
    },
    {
      title: 'Brand-First',
      description: 'Whether you\'re a solo creator or a label — we elevate your message'
    }
  ];

  const testimonials = [
    {
      name: 'L.R.',
      title: 'Fashion Startup Founder',
      quote: "They turned a Pinterest board into a full line. We dropped in 6 weeks — sold out in 12 hours."
    },
    {
      name: 'C.D.',
      title: 'Creator',
      quote: "It's not merch. It's identity. I've never worn something that felt more like 'me.'"
    }
  ];

  const faqs = [
    {
      question: "What if I don't have a full brand yet?",
      answer: "We'll help guide tone, color, and message even from scratch."
    },
    {
      question: "Do you provide mockups or files for printing?",
      answer: "Yes — we deliver .AI, .PDF, .PNG, or full tech packs on request."
    },
    {
      question: "Can I do just one design to start?",
      answer: "Absolutely. One-off designs or full capsules are both available."
    },
    {
      question: "What's the turnaround time?",
      answer: "Concept to delivery typically takes 7–10 business days."
    }
  ];

  const mockupItems = [
    {
      title: 'Oversized Statement Tee',
      description: 'Abstract text placement with strategic brand positioning'
    },
    {
      title: 'Designer Hoodie Collection',
      description: 'Left chest + back design with cohesive visual narrative'
    },
    {
      title: 'Signature Cap & Patch Set',
      description: 'Unique emblem design with premium finishing details'
    }
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
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gray-300 rounded-lg transform rotate-12"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-gray-300 rounded-lg transform -rotate-6"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-gray-300 rounded-lg transform rotate-45"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light mb-6 text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Design That Wears Authority
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            From subtle flexes to statement silhouettes, we create concept-first clothing designs that tell your story without saying a word.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-all shadow-lg"
          >
            🔘 Start Your Apparel Concept
          </motion.button>
          
          {/* Scroll Cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <div className="w-px h-16 bg-gradient-to-b from-gray-300 to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* What We Design Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              More Than Merch. This Is Messagewear.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our designs don't just fill a shelf — they forge identity. Built to connect, provoke, and sell.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {service.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              From Moodboard to Merch Drop
            </h2>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 pt-1">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Visual Taste, Designed for Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockupItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder for mockup image */}
                  <div className="w-24 h-24 bg-gray-300 rounded-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-gray-500 mt-12 text-sm italic"
          >
            Sample mockups coming soon. We're currently designing for private-label clients.
          </motion.p>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-8 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Not a Print Shop. A Design Studio.
            </h2>
            
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're not here to upload logos to hoodies. We're here to build visual systems for your body, not your browser.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Clients Say
            </h2>
          </motion.div>

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
              Questions? We've Got You Covered.
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
            className="text-4xl font-light mb-6 text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            You Don't Need Another T-Shirt.<br />
            You Need a Design That Speaks.
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-all shadow-lg mb-6"
          >
            🔘 Start Your Apparel Concept
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600"
          >
            Send us a vibe, a sketch, or just your idea. We'll handle the rest.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default ApparelArsenal;