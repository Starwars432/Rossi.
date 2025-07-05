import React, { useState } from 'react';
import { Upload, Zap, Star, CheckCircle, Camera, Palette, Sparkles, Send, ArrowRight } from 'lucide-react';

const VisualWarfare = () => {
  const [formData, setFormData] = useState({
    productName: '',
    email: '',
    phone: '',
    backgroundStyle: '',
    brandColors: '',
    targetAudience: '',
    productDescription: '',
    inspiration: '',
    timeline: '',
    additionalRequests: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData, selectedFiles);
    alert('Your project has been submitted! We\'ll get back to you within 24 hours.');
  };

  const backgroundStyles = [
    'Minimal Studio',
    'Luxury Gradient',
    'Neon/Cyberpunk',
    'Natural/Organic',
    'Abstract Geometric',
    'Vintage/Retro',
    'Dark/Moody',
    'Bright/Colorful',
    'Textured/Grunge',
    'Custom (describe below)'
  ];

  const exampleProjects = [
    {
      title: 'Luxury Skincare',
      beforeStyle: 'Plain white background',
      afterStyle: 'Marble texture with gold accents',
      impact: 'Increased premium perception',
      category: 'Beauty'
    },
    {
      title: 'Tech Gadget',
      beforeStyle: 'Basic product photo',
      afterStyle: 'Futuristic neon environment',
      impact: 'Boosted modern appeal',
      category: 'Electronics'
    },
    {
      title: 'Fitness Supplement',
      beforeStyle: 'Generic background',
      afterStyle: 'Dynamic energy burst effect',
      impact: 'Enhanced energy perception',
      category: 'Health'
    },
    {
      title: 'Artisan Coffee',
      beforeStyle: 'Simple product shot',
      afterStyle: 'Rustic wood with steam effects',
      impact: 'Strengthened artisan brand',
      category: 'Food & Beverage'
    },
    {
      title: 'Fashion Accessory',
      beforeStyle: 'Standard catalog style',
      afterStyle: 'Abstract colorful backdrop',
      impact: 'Increased style appeal',
      category: 'Fashion'
    },
    {
      title: 'Home Decor',
      beforeStyle: 'Plain background',
      afterStyle: 'Lifestyle room setting',
      impact: 'Better context visualization',
      category: 'Home'
    }
  ];

  const processSteps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Submit Your Product',
      description: 'Upload product photos and tell us your vision'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Design Magic',
      description: 'We create stunning backgrounds that make your product pop'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Delivery',
      description: 'Receive high-resolution files ready for marketing'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Navigation */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Visual Warfare
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
              <a href="#custom-design" className="text-gray-300 hover:text-white transition-colors">Custom Design</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <a href="#login" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Login</a>
            </div>
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-6 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Visual Warfare
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Transform Your Products with Stunning Backgrounds
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            We create eye-catching product backgrounds that make your items stand out in any market. From e-commerce to social media, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('examples').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg transform hover:scale-105"
            >
              View Our Work
            </button>
            <button 
              onClick={() => document.getElementById('submit-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
            >
              Submit Your Product
            </button>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Before & After Transformations
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how we transform ordinary product photos into extraordinary marketing assets
            </p>
          </div>
          
          <div className="space-y-12">
            {/* First Row with Arrow */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Camera className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {exampleProjects[0].category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{exampleProjects[0].title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-red-400 text-sm mr-2">Before:</span>
                      <span className="text-gray-400 text-sm">{exampleProjects[0].beforeStyle}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 text-sm mr-2">After:</span>
                      <span className="text-gray-300 text-sm">{exampleProjects[0].afterStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-purple-400">
                    <Zap className="w-4 h-4 mr-1" />
                    {exampleProjects[0].impact}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Camera className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {exampleProjects[1].category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{exampleProjects[1].title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-red-400 text-sm mr-2">Before:</span>
                      <span className="text-gray-400 text-sm">{exampleProjects[1].beforeStyle}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 text-sm mr-2">After:</span>
                      <span className="text-gray-300 text-sm">{exampleProjects[1].afterStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-purple-400">
                    <Zap className="w-4 h-4 mr-1" />
                    {exampleProjects[1].impact}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row with Arrow */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Camera className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {exampleProjects[2].category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{exampleProjects[2].title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-red-400 text-sm mr-2">Before:</span>
                      <span className="text-gray-400 text-sm">{exampleProjects[2].beforeStyle}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 text-sm mr-2">After:</span>
                      <span className="text-gray-300 text-sm">{exampleProjects[2].afterStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-purple-400">
                    <Zap className="w-4 h-4 mr-1" />
                    {exampleProjects[2].impact}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Camera className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {exampleProjects[3].category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{exampleProjects[3].title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-red-400 text-sm mr-2">Before:</span>
                      <span className="text-gray-400 text-sm">{exampleProjects[3].beforeStyle}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 text-sm mr-2">After:</span>
                      <span className="text-gray-300 text-sm">{exampleProjects[3].afterStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-purple-400">
                    <Zap className="w-4 h-4 mr-1" />
                    {exampleProjects[3].impact}
                  </div>
                </div>
              </div>
            </div>

            {/* Third Row with Arrow */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Camera className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {exampleProjects[4].category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{exampleProjects[4].title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-red-400 text-sm mr-2">Before:</span>
                      <span className="text-gray-400 text-sm">{exampleProjects[4].beforeStyle}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 text-sm mr-2">After:</span>
                      <span className="text-gray-300 text-sm">{exampleProjects[4].afterStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-purple-400">
                    <Zap className="w-4 h-4 mr-1" />
                    {exampleProjects[4].impact}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Camera className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {exampleProjects[5].category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{exampleProjects[5].title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-red-400 text-sm mr-2">Before:</span>
                      <span className="text-gray-400 text-sm">{exampleProjects[5].beforeStyle}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 text-sm mr-2">After:</span>
                      <span className="text-gray-300 text-sm">{exampleProjects[5].afterStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-purple-400">
                    <Zap className="w-4 h-4 mr-1" />
                    {exampleProjects[5].impact}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="services" className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-gray-400">Simple process, stunning results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Form Section */}
      <section id="submit-form" className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Submit Your Product</h2>
            <p className="text-xl text-gray-400">Tell us about your project and we'll create something amazing</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Luxury Face Cream"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Background Style</label>
                <select
                  name="backgroundStyle"
                  value={formData.backgroundStyle}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select a style...</option>
                  {backgroundStyles.map((style) => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Brand Colors</label>
                <input
                  type="text"
                  name="brandColors"
                  value={formData.brandColors}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Blue, Gold, White"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Young professionals, Luxury buyers"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Description</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="Tell us about your product - what it does, key features, etc."
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Inspiration/References</label>
              <textarea
                name="inspiration"
                value={formData.inspiration}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="Share any inspiration images, competitor examples, or specific ideas you have in mind"
              ></textarea>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select timeline...</option>
                  <option value="24-48 hours">Rush (24-48 hours)</option>
                  <option value="3-5 days">Standard (3-5 days)</option>
                  <option value="1-2 weeks">Flexible (1-2 weeks)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Product Photos</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Requests</label>
              <textarea
                name="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="Any specific requirements, multiple angles needed, file formats, etc."
              ></textarea>
            </div>
            {selectedFiles.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Files:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <span key={index} className="bg-purple-