import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of design and marketing services including Product Ad Design, Brand Identity, Clothing Design, AI Model Generation, Digital Marketing, Favicon Creation, Hero Section Creations, Copywriting, and Video Ad Creations."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. Simple designs like favicons can be completed in 1-2 days, while comprehensive brand identity projects may take 2-4 weeks. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes! We include up to 3 rounds of revisions with all our design packages. Additional revisions can be requested for a small fee. We want to ensure you're completely satisfied with the final result."
  },
  {
    question: "What's your pricing structure?",
    answer: "Our pricing varies by service and project complexity. We offer both fixed-price packages and custom quotes for larger projects. Contact us for a detailed quote tailored to your specific needs."
  },
  {
    question: "Can you work with my existing brand guidelines?",
    answer: "Absolutely! We can work within your existing brand guidelines or help you develop new ones. Our team is experienced in maintaining brand consistency across all design elements."
  },
  {
    question: "Do you provide source files?",
    answer: "Yes, we provide all source files upon project completion. This includes AI, PSD, SVG, and other relevant file formats depending on your project requirements."
  },
  {
    question: "How do you handle rush orders?",
    answer: "We offer expedited services for urgent projects. Rush orders typically incur a 50% surcharge and are subject to availability. Contact us to discuss your timeline requirements."
  },
  {
    question: "What makes Manifest Illusions different?",
    answer: "We combine cutting-edge design with innovative digital marketing strategies. Our team stays ahead of trends, uses AI-powered tools, and focuses on creating designs that not only look great but also drive results for your business."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 px-6 bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating blur elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`faq-blur-${i}`}
            className="absolute rounded-full blur-xl opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              background: [
                'linear-gradient(45deg, #8B5CF6, #A78BFA)',
                'linear-gradient(45deg, #F97316, #FB923C)',
                'linear-gradient(45deg, #3B82F6, #60A5FA)',
                'linear-gradient(45deg, #EF4444, #F87171)',
                'linear-gradient(45deg, #10B981, #34D399)',
                'linear-gradient(45deg, #F59E0B, #FBBF24)'
              ][i % 6]
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Glowing particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`faq-particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
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

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-light text-blue-400 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">
            Get answers to the most common questions about our services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden"
              style={{
                outline: openIndex === index ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
              }}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="text-white font-medium text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 pt-2"
                    >
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Still have questions? We're here to help!
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;