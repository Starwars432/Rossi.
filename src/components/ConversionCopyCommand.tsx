import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConversionCopyCommand: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [beforeAfterSlide, setBeforeAfterSlide] = useState(0);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const services = [
    {
      icon: '🖥️',
      name: 'Landing Page Copy',
      description: 'Strategically structured messaging that drives clicks and scrolls.'
    },
    {
      icon: '📦',
      name: 'Product Descriptions',
      description: 'Clear, benefit-rich copy built to explain and persuade.'
    },
    {
      icon: '📣',
      name: 'Ad Copy & Social',
      description: 'Punchy hooks and captions that stop the scroll and sell fast.'
    },
    {
      icon: '✉️',
      name: 'Email Campaigns',
      description: 'Sequence writing that turns curiosity into conversions.'
    },
    {
      icon: '🎤',
      name: 'Brand Voice Guidelines',
      description: 'Your voice, documented — so every touchpoint feels like you.'
    }
  ];

  const beforeAfterExamples = [
    {
      before: "Affordable web design for small businesses.",
      after: "Your website's first impression is either credible — or forgettable."
    },
    {
      before: "Click here to get started.",
      after: "Book your free strategy call — and stop losing traffic."
    },
    {
      before: "We offer the best marketing services.",
      after: "Marketing that actually moves the needle — not just vanity metrics."
    }
  ];

  const testimonials = [
    {
      name: 'A.D.',
      title: 'SaaS Founder',
      quote: "I sent them bullet points — and they returned a landing page that reads like a $10,000 funnel."
    },
    {
      name: 'R.J.',
      title: 'Ecom Brand Owner',
      quote: "We swapped in their copy. Click-throughs went up 38%. ROI was basically instant."
    },
    {
      name: 'Anonymous',
      title: 'Agency Partner',
      quote: "This is the most confident I've felt about our message in 5 years."
    }
  ];

  const faqs = [
    {
      question: "How fast will I receive my copy?",
      answer: "Typical delivery is 3–5 business days, depending on scope."
    },
    {
      question: "What if I don't like the first draft?",
      answer: "We include one round of refinement with every project."
    },
    {
      question: "Do you write in UK or US English?",
      answer: "Both. You'll choose your preferred region/tone during onboarding."
    },
    {
      question: "Do you offer copy for full websites?",
      answer: "Yes — homepage, product pages, about, FAQ, contact, and more."
    },
    {
      question: "Can you match my brand voice?",
      answer: "Absolutely. You can submit samples, links, and tone references."
    }
  ];

  const processSteps = [
    "Fill out our brief (2 minutes)",
    "We audit your current copy or build from scratch",
    "You receive your professionally written messaging within 3–5 business days",
    "1 round of refinements included"
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
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Copy That Sells. Clarity That Converts.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Professionally crafted messaging built to grab attention, establish trust, and drive action — across landing pages, ads, and email.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-yellow-700 transition-all shadow-lg"
          >
            🔘 Request a Copy Audit
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

      {/* Service Modules Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What We Write — and Why It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Clean, conversion-driven copy tailored to your offer, audience, and voice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
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

      {/* Differentiator Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Clients Choose Us Over Freelancers
            </h2>
            
            <div className="text-left max-w-3xl mx-auto mb-8">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Most freelance writers give you words.<br />
                We give you strategy — structured, persuasive messaging that's engineered for attention, trust, and action.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every line we write follows human psychology, sales science, and high-conversion frameworks. No filler. No guesswork. Just clarity, every time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                'Built for real conversion',
                'Brand-consistent, tone-specific',
                'Delivered clearly and fast',
                'Based on frameworks, not gut instinct'
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              How We Upgrade Your Words
            </h2>
          </motion.div>

          <div className="space-y-8">
            {beforeAfterExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="bg-gray-100 p-8 rounded-lg border-l-4 border-gray-400">
                  <div className="text-sm font-medium text-gray-500 mb-2">BEFORE</div>
                  <p className="text-lg text-gray-600 italic">"{example.before}"</p>
                </div>
                
                <div className="bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-600">
                  <div className="text-sm font-medium text-yellow-700 mb-2">AFTER</div>
                  <p className="text-lg text-gray-900 font-medium">"{example.after}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-gray-600 mt-12 text-lg italic"
          >
            Copy that's cleaner, clearer, and more convincing — instantly.
          </motion.p>
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
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              How It Works
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
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 pt-1">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked Questions
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
            className="text-4xl font-light mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Website Doesn't Need More Words. It Needs the Right Ones.
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-yellow-700 transition-all shadow-lg mb-6"
          >
            🔘 Request a Copy Audit
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600"
          >
            We'll audit your current copy and return a short report — free, no obligation.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConversionCopyCommand;