import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp, Upload, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface VideoItem {
  id: string;
  title: string;
  platform: 'TikTok' | 'Reels' | 'Shorts' | 'YouTube';
  result?: string;
  thumbnailUrl: string;
  videoUrl: string;
}

interface FormData {
  name: string;
  business: string;
  industry: string;
  adGoal: string;
  hasFeedback: boolean;
  logo: File | null;
  adExamples: string;
  tone: string;
  email: string;
  notes: string;
}

const ShortformAdKillshots: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    business: '',
    industry: '',
    adGoal: 'Awareness',
    hasFeedback: false,
    logo: null,
    adExamples: '',
    tone: 'Bold',
    email: '',
    notes: ''
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample video data
  const videos: VideoItem[] = [
    {
      id: 'video-1',
      title: 'NEON-X',
      platform: 'TikTok',
      result: 'CTR +3.1%',
      thumbnailUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video1.mp4'
    },
    {
      id: 'video-2',
      title: 'ZERO GRAVITY',
      platform: 'Reels',
      result: '2.4M views',
      thumbnailUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video2.mp4'
    },
    {
      id: 'video-3',
      title: 'PULSE',
      platform: 'Shorts',
      result: 'ROAS 4.2x',
      thumbnailUrl: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video3.mp4'
    },
    {
      id: 'video-4',
      title: 'MIDNIGHT',
      platform: 'YouTube',
      result: 'VTR +42%',
      thumbnailUrl: 'https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video4.mp4'
    },
    {
      id: 'video-5',
      title: 'VELOCITY',
      platform: 'TikTok',
      result: '87% completion',
      thumbnailUrl: 'https://images.pexels.com/photos/1787235/pexels-photo-1787235.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video5.mp4'
    },
    {
      id: 'video-6',
      title: 'ECHO',
      platform: 'Reels',
      result: 'CPA -32%',
      thumbnailUrl: 'https://images.pexels.com/photos/1684149/pexels-photo-1684149.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video6.mp4'
    },
    {
      id: 'video-7',
      title: 'PRISM',
      platform: 'YouTube',
      thumbnailUrl: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video7.mp4'
    },
    {
      id: 'video-8',
      title: 'QUANTUM',
      platform: 'Shorts',
      result: '12k shares',
      thumbnailUrl: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video8.mp4'
    },
    {
      id: 'video-9',
      title: 'APEX',
      platform: 'TikTok',
      result: 'Conversion +18%',
      thumbnailUrl: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video9.mp4'
    }
  ];

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const openVideoModal = (video: VideoItem) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const closeVideoModal = () => {
    setActiveVideo(null);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload logo to Supabase Storage if provided
      let logoUrl = null;
      if (formData.logo) {
        const fileExt = formData.logo.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('ad-request-assets')
          .upload(filePath, formData.logo);

        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('ad-request-assets')
          .getPublicUrl(filePath);
          
        logoUrl = urlData.publicUrl;
      }

      // Store form data in Supabase
      const { error } = await supabase
        .from('ad_requests')
        .insert({
          user_id: user?.id || null,
          email: formData.email,
          name: formData.name,
          business: formData.business,
          industry: formData.industry,
          ad_goal: formData.adGoal,
          has_footage: formData.hasFeedback,
          logo_url: logoUrl,
          ad_examples: formData.adExamples,
          tone: formData.tone,
          notes: formData.notes,
          status: 'pending'
        });

      if (error) throw error;

      // Success
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        business: '',
        industry: '',
        adGoal: 'Awareness',
        hasFeedback: false,
        logo: null,
        adExamples: '',
        tone: 'Bold',
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

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
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
        {/* Subtle background effects */}
        <div className="absolute inset-0 opacity-20">
          {/* Scanlines effect */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px'
          }}></div>
          
          {/* Subtle flicker animation */}
          <motion.div
            className="absolute inset-0 bg-blue-900/10"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            🎯 Shortform Ad Killshots
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Built to break scrolls and stay in memory.<br />
            15–30 second ads engineered for attention warfare.
          </motion.p>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-20 px-6 bg-[#0E0E0E]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Real Ads. Real Impact.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                }}
                className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openVideoModal(video)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Platform badge */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    {video.platform}
                  </div>
                  
                  {/* Result badge */}
                  {video.result && (
                    <div className="absolute top-4 right-4 bg-red-600/90 text-white text-xs px-3 py-1 rounded-full">
                      {video.result}
                    </div>
                  )}
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/0 group-hover:bg-white/90 transition-all flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                      <Play className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.platform} • {video.result || 'Case Study'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-light mb-6 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Designed for Scrolls. Engineered for Performance.
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every frame is purpose-built: the hook, pacing, caption placement, motion speed — all tuned for neuro-performance.
              No fluff. No templates. Just digital hits designed to convert at first glance.
            </p>
          </motion.div>

          {/* Optional: Side-by-side comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 mt-8"
          >
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="text-sm text-gray-500 uppercase mb-2">Raw Footage</div>
              <div className="aspect-video bg-gray-800 rounded-lg"></div>
              <div className="mt-4 text-gray-400 text-sm">
                <ul className="space-y-2">
                  <li>• Unoptimized pacing</li>
                  <li>• No hook structure</li>
                  <li>• Weak visual hierarchy</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-red-900/30">
              <div className="text-sm text-red-500 uppercase mb-2">Optimized Ad</div>
              <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white text-xs bg-black/70 px-2 py-1 rounded">
                  First 3 seconds optimized for hook
                </div>
              </div>
              <div className="mt-4 text-gray-300 text-sm">
                <ul className="space-y-2">
                  <li>• Attention-optimized first 3 seconds</li>
                  <li>• Strategic caption placement</li>
                  <li>• Conversion-focused ending</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 bg-[#0E0E0E]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Want One Built for Your Brand?
            </h2>
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
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  We've received your request
                </h3>
                <p className="text-gray-300 mb-8">
                  Our team will review and craft your ad weapon shortly.
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
                className="bg-gray-900 p-8 rounded-lg border border-gray-800"
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
                        Business / Brand
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Industry / Product Type
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Industry</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="SaaS">SaaS</option>
                        <option value="Health & Fitness">Health & Fitness</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ad Goal
                      </label>
                      <select
                        name="adGoal"
                        value={formData.adGoal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="Awareness">Awareness</option>
                        <option value="Conversions">Conversions</option>
                        <option value="Retargeting">Retargeting</option>
                        <option value="Brand Building">Brand Building</option>
                        <option value="Lead Generation">Lead Generation</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-300">
                        <input
                          type="checkbox"
                          name="hasFeedback"
                          checked={formData.hasFeedback}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 mr-2 text-red-600 border-gray-700 rounded focus:ring-red-500"
                        />
                        I have existing footage to use
                      </label>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Upload Logo (optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="logo-upload"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="flex items-center justify-center w-full px-4 py-6 bg-gray-800 border border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                        >
                          {formData.logo ? (
                            <div className="flex items-center">
                              <Check className="w-5 h-5 text-green-500 mr-2" />
                              <span className="text-gray-300 text-sm truncate">
                                {formData.logo.name}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="w-8 h-8 text-gray-500 mb-2" />
                              <span className="text-gray-400 text-sm">Click to upload logo</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Any Ad Examples You Like?
                      </label>
                      <textarea
                        name="adExamples"
                        value={formData.adExamples}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="URLs or descriptions welcome"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        What Tone Should the Ad Have?
                      </label>
                      <select
                        name="tone"
                        value={formData.tone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="Bold">Bold</option>
                        <option value="Cool">Cool</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Funny">Funny</option>
                        <option value="Emotional">Emotional</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
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
                    Notes / Custom Request
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Tell us more about your project, goals, or specific requirements..."
                  />
                </div>
                
                <div className="mt-8">
                  <label className="flex items-center text-sm text-gray-400 mb-6">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 mr-2 text-red-600 border-gray-700 rounded focus:ring-red-500"
                    />
                    I confirm that any uploaded materials are owned or licensed by me.
                  </label>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium text-lg ${
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
                      'Submit Brief'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-500"
          >
            All sample videos shown are original creative works produced by Manifest Illusions.<br />
            Uploaded materials remain the intellectual property of the client. No AI footage is used without consent.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">Built for Impact. Released With Precision.</p>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Video player */}
              <div className="aspect-video bg-black relative">
                {/* Placeholder for actual video */}
                <img 
                  src={activeVideo.thumbnailUrl} 
                  alt={activeVideo.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Video controls overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlayPause}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>
                
                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlayPause}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                    
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  <div className="text-white text-sm">
                    {activeVideo.platform} • {activeVideo.title}
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Video info */}
              <div className="p-6">
                <h3 className="text-2xl font-light mb-2 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {activeVideo.title}
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">{activeVideo.platform}</span>
                  {activeVideo.result && (
                    <span className="text-sm bg-red-900/30 text-red-400 px-2 py-1 rounded">
                      {activeVideo.result}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortformAdKillshots;