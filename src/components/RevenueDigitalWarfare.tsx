import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Target, BarChart3, Zap, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RevenueDigitalWarfare: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    website: '',
    revenue: '',
    adBudget: '',
    triedAds: 'no',
    mainProblem: '',
    email: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      brand: '',
      website: '',
      revenue: '',
      adBudget: '',
      triedAds: 'no',
      mainProblem: '',
      email: '',
      notes: ''
    });
  };

  const arsenal = [
    {
      title: 'Strategic Audit',
      icon: '🧠',
      description: 'We analyze every point of friction — your offer, funnel, hooks, creatives, and analytics'
    },
    {
      title: 'Paid Media Execution',
      icon: '🧲',
      description: 'Meta, TikTok, Google — planned, launched, and iterated by conversion logic'
    },
    {
      title: 'Retargeting & Sequencing',
      icon: '🔁',
      description: 'Intelligent retargeting, full-cycle ad sequences, and segment logic'
    },
    {
      title: 'Creative Production',
      icon: '✍️',
      description: 'Ad scripts, motion-graphic assets, shortform copy, UGC creative coordination'
    },
    {
      title: 'Live Dashboards',
      icon: '📈',
      description: 'Real-time performance tracking + growth diagnostics'
    },
    {
      title: 'Revenue Engineering',
      icon: '💥',
      description: 'Landing page frameworks, upsells, cart structures — rebuilt for velocity'
    }
  ];

  const processSteps = [
    {
      title: 'Recon',
      description: 'Deep data audit: offers, performance, customer behavior'
    },
    {
      title: 'Build',
      description: 'Creatives, funnel, retargeting sequences'
    },
    {
      title: 'Deploy',
      description: 'Full-scale ad launch across chosen platforms'
    },
    {
      title: 'Optimize',
      description: 'Weekly iterations, KPI pivots, and profit levers'
    }
  ];

  const caseStudies = [
    {
      client: 'AuraSkin Co.',
      transformation: 'ROAS 2.1 → 4.7 in 30 days, product relaunch + UGC loop'
    },
    {
      client: 'ByteBlend AI',
      transformation: '4.3% CTR Reels campaign + $30K ARR jump'
    },
    {
      client: 'Dripwear',
      transformation: '$11K → $92K in 60 days through full rebuild + daily iteration'
    }
  ];

  const faqs = [
    {
      question: "What's your minimum ad spend requirement?",
      answer: "We work with brands spending at least $5,000/month on paid media. Below this threshold, we recommend our standalone creative services."
    },
    {
      question: "Do you handle the ad account directly?",
      answer: "Yes. We require admin access to your ad accounts for direct management and optimization. We can either use your existing accounts or set up new ones under our agency structure."
    },
    {
      question: "What platforms do you work with?",
      answer: "We specialize in Meta (Facebook/Instagram), TikTok, and Google/YouTube. We can also integrate with Snapchat, Pinterest, and programmatic display networks as needed."
    },
    {
      question: "How long until we see results?",
      answer: "Initial performance indicators appear within 7-14 days. Significant ROAS improvements typically emerge within 30 days as we optimize campaigns and creative assets."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
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
      <section className="relative py-24 px-6 bg-[#0F0F0F] overflow-hidden">
        {/* Tactical background elements */}
        <div className="absolute inset-0 opacity-10">
          {/* Radar ping effect */}
          <div className="absolute inset-0">
            <motion.div
              className="w-full h-full rounded-full border border-red-600/20"
              style={{ 
                background: 'radial-gradient(circle, transparent 60%, rgba(220, 38, 38, 0.1) 100%)'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Revenue-Driven Digital Warfare
            </h1>
            
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We don't "run ads."<br />
              We run digital combat operations that seize attention, engineer belief, and convert velocity into revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-light mb-8 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              This Is Not Marketing.<br />
              This Is Tactical Brand Domination.
            </h2>
            
            <div className="text-xl text-gray-300 space-y-6 leading-relaxed">
              <p>
                You've run ads before. Maybe a freelancer built you a funnel. Maybe you tried "boosting a post."
                What you didn't have was a war room.
              </p>
              
              <p>
                We build and deploy campaigns that are psychologically weaponized, fast to execute, and ruthlessly optimized for return. This isn't guesswork — it's a structured takedown of your market category.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Arsenal Section */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              The Arsenal You Get Access To
            </h2>
          </motion.div>

          <div className="space-y-6">
            {arsenal.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center bg-black/50 p-6 rounded-lg border border-red-900/20 hover:border-red-900/40 transition-all"
              >
                <div className="text-3xl mr-6">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
              Not Managed. Orchestrated.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0F0F0F] p-6 rounded-lg border border-red-900/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center text-red-500 mr-4">
                    {index === 0 && <Target className="w-5 h-5" />}
                    {index === 1 && <Layers className="w-5 h-5" />}
                    {index === 2 && <Zap className="w-5 h-5" />}
                    {index === 3 && <BarChart3 className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {index + 1}. {step.title}
                  </h3>
                </div>
                <p className="text-gray-400 pl-14">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-300 italic">
              Every campaign is tracked, versioned, and scored. Nothing is left to chance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Past Operations
            </h2>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black p-6 rounded-lg border border-red-900/20"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-xl font-semibold mb-2 md:mb-0 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {study.client}
                  </h3>
                  <div className="bg-red-900/20 text-red-500 px-4 py-2 rounded-lg text-sm font-medium inline-block">
                    {study.transformation}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready for Your Growth Operation?
            </h2>
            <p className="text-xl text-gray-300">
              This service is limited. We only work with brands we know we can scale.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0F0F0F] p-12 rounded-lg border border-red-900/20 text-center"
              >
                <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  We've received your request
                </h3>
                <p className="text-gray-300 mb-8">
                  If you're accepted, we'll reach out to begin war prep.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-red-900/20 hover:bg-red-900/30 text-red-500 px-6 py-3 rounded-lg transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#0F0F0F] p-8 rounded-lg border border-red-900/20"
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Brand / Website
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Revenue Bracket
                      </label>
                      <select
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      >
                        <option value="">Select Revenue</option>
                        <option value="0-10k">$0 - $10k/month</option>
                        <option value="10k-50k">$10k - $50k/month</option>
                        <option value="50k-100k">$50k - $100k/month</option>
                        <option value="100k-500k">$100k - $500k/month</option>
                        <option value="500k+">$500k+/month</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ad Budget (Monthly)
                      </label>
                      <select
                        name="adBudget"
                        value={formData.adBudget}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      >
                        <option value="">Select Budget</option>
                        <option value="5k-10k">$5k - $10k/month</option>
                        <option value="10k-25k">$10k - $25k/month</option>
                        <option value="25k-50k">$25k - $50k/month</option>
                        <option value="50k-100k">$50k - $100k/month</option>
                        <option value="100k+">$100k+/month</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Have You Tried Paid Ads?
                      </label>
                      <select
                        name="triedAds"
                        value={formData.triedAds}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      >
                        <option value="yes">Yes, currently running</option>
                        <option value="past">Yes, in the past</option>
                        <option value="no">No, never</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Main Problem Right Now
                      </label>
                      <input
                        type="text"
                        name="mainProblem"
                        value={formData.mainProblem}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                        placeholder="e.g., Low ROAS, High CPA, etc."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Tell us more about your goals or challenges..."
                  />
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-red-900 text-white py-3 px-6 rounded-lg font-medium text-lg ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-800'
                    } transition-colors`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
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
                className="bg-black rounded-lg border border-red-900/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-red-900/10 transition-colors"
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

      {/* Footer Note */}
      <section className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 text-sm"
          >
            Every brand has a limit — until it's broken.<br />
            This isn't marketing. This is manipulation, measured in revenue.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default RevenueDigitalWarfare;