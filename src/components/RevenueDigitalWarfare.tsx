import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Target, BarChart2, Zap, Crosshair, Layers, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  brand: string;
  description: string;
  revenue: string;
  budget: string;
  triedAds: string;
  mainProblem: string;
  email: string;
  notes: string;
}

const RevenueDigitalWarfare: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    brand: '',
    description: '',
    revenue: '',
    budget: '',
    triedAds: '',
    mainProblem: '',
    email: '',
    notes: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    try {
      // Store form data in Supabase
      const { error } = await supabase
        .from('ad_requests')
        .insert({
          user_id: user?.id || null,
          email: formData.email,
          name: formData.name,
          business: formData.brand,
          industry: formData.description,
          ad_goal: formData.mainProblem,
          has_footage: formData.triedAds === 'Yes',
          notes: `Revenue: ${formData.revenue}\nBudget: ${formData.budget}\nAdditional Notes: ${formData.notes}`,
          tone: 'Strategic',
          status: 'pending'
        });

      if (error) throw error;

      // Success
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        brand: '',
        description: '',
        revenue: '',
        budget: '',
        triedAds: '',
        mainProblem: '',
        email: '',
        notes: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const weapons = [
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: 'Strategic Audit',
      description: 'We analyze every point of friction — your offer, funnel, hooks, creatives, and analytics'
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-red-500" />,
      title: 'Paid Media Execution',
      description: 'Meta, TikTok, Google — planned, launched, and iterated by conversion logic'
    },
    {
      icon: <Zap className="w-8 h-8 text-red-500" />,
      title: 'Retargeting & Sequencing',
      description: 'Intelligent retargeting, full-cycle ad sequences, and segment logic'
    },
    {
      icon: <Layers className="w-8 h-8 text-red-500" />,
      title: 'Creative Production',
      description: 'Ad scripts, motion-graphic assets, shortform copy, UGC creative coordination'
    },
    {
      icon: <Crosshair className="w-8 h-8 text-red-500" />,
      title: 'Live Dashboards',
      description: 'Real-time performance tracking + growth diagnostics'
    },
    {
      icon: <Send className="w-8 h-8 text-red-500" />,
      title: 'Revenue Engineering',
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

  const revenueBrackets = [
    '$0 - $10K/month',
    '$10K - $50K/month',
    '$50K - $100K/month',
    '$100K - $500K/month',
    '$500K+/month'
  ];

  const budgetBrackets = [
    '$1K - $5K/month',
    '$5K - $10K/month',
    '$10K - $25K/month',
    '$25K - $50K/month',
    '$50K+/month'
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
      <section className="relative py-24 px-6 bg-black overflow-hidden">
        {/* Tactical background elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Radar ping effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/30"
            animate={{ 
              scale: [0, 1.5],
              opacity: [0.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Digital noise */}
          <motion.div
            className="absolute inset-0 bg-red-900/5"
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
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
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We don't "run ads."<br />
              We run digital combat operations that seize attention, engineer belief, and convert velocity into revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
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
            
            <div className="space-y-6 text-lg">
              <p className="text-gray-300 leading-relaxed">
                You've run ads before. Maybe a freelancer built you a funnel. Maybe you tried "boosting a post."
                What you didn't have was a war room.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                We build and deploy campaigns that are psychologically weaponized, fast to execute, and ruthlessly optimized for return. This isn't guesswork — it's a structured takedown of your market category.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Arsenal Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
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

          <div className="grid md:grid-cols-2 gap-8">
            {weapons.map((weapon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-start space-x-6 p-6 rounded-lg ${index % 2 === 0 ? 'bg-[#0F0F0F]' : 'bg-black border border-gray-800'}`}
              >
                <div className="bg-red-900/20 p-3 rounded-lg flex-shrink-0">
                  {weapon.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {weapon.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {weapon.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
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

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-red-900/30 text-red-500 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connecting line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-red-900/30 -mb-6"></div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 text-lg">
              Every campaign is tracked, versioned, and scored. Nothing is left to chance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-6 bg-black">
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
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#0F0F0F] p-6 rounded-lg border border-gray-800"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-xl font-semibold mb-2 md:mb-0 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {study.client}
                  </h3>
                  <div className="bg-red-900/20 text-red-500 px-4 py-2 rounded text-sm font-medium">
                    {study.transformation}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
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
            <p className="text-xl text-gray-400">
              This service is limited. We only work with brands we know we can scale.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-900 p-12 rounded-lg border border-gray-800 text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  We've received your request
                </h3>
                <p className="text-gray-300 mb-8">
                  If you're accepted, we'll reach out to begin war prep.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black p-8 rounded-lg border border-gray-800"
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
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Product or Service Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Revenue Bracket</option>
                        {revenueBrackets.map((bracket, index) => (
                          <option key={index} value={bracket}>{bracket}</option>
                        ))}
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
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Budget Range</option>
                        {budgetBrackets.map((bracket, index) => (
                          <option key={index} value={bracket}>{bracket}</option>
                        ))}
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
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Answer</option>
                        <option value="Yes">Yes, with mixed results</option>
                        <option value="Yes, successful">Yes, with good results</option>
                        <option value="Yes, unsuccessful">Yes, with poor results</option>
                        <option value="No">No, never tried</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Main Problem Right Now
                      </label>
                      <select
                        name="mainProblem"
                        value={formData.mainProblem}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Main Problem</option>
                        <option value="High CAC">High customer acquisition cost</option>
                        <option value="Low conversion">Low conversion rate</option>
                        <option value="Poor scaling">Can't scale profitably</option>
                        <option value="Ad fatigue">Ad creative fatigue</option>
                        <option value="Audience targeting">Poor audience targeting</option>
                        <option value="ROAS">Low return on ad spend</option>
                        <option value="Other">Other (explain in notes)</option>
                      </select>
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
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Additional details about your business, goals, or specific challenges..."
                  />
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Past Creatives or Reports (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.zip"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-6 bg-gray-800 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:bg-gray-700 hover:text-gray-300 transition-colors text-center"
                    >
                      Click to upload files (PDF, JPG, PNG, ZIP)
                    </button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-red-800 text-white py-3 px-6 rounded-lg font-medium text-lg ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
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

      {/* Footer Note */}
      <section className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 mb-4"
          >
            Every brand has a limit — until it's broken.<br />
            This isn't marketing. This is manipulation, measured in revenue.
          </motion.p>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Contact</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RevenueDigitalWarfare;