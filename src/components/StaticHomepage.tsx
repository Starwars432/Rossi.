export default function StaticHomepage() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cosmic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)'
          }} />

          {/* Static Cosmic Particles */}
          <div className="absolute" style={{ left: '10%', top: '20%' }}>
            <div className="w-1 h-1 bg-blue-400 rounded-full" style={{ boxShadow: '0 0 4px #60A5FA' }} />
          </div>
          <div className="absolute" style={{ left: '80%', top: '30%' }}>
            <div className="w-2 h-2 bg-purple-400 rounded-full" style={{ boxShadow: '0 0 6px #A78BFA' }} />
          </div>
          <div className="absolute" style={{ left: '60%', top: '70%' }}>
            <div className="w-1 h-1 bg-pink-400 rounded-full" style={{ boxShadow: '0 0 4px #F472B6' }} />
          </div>
          <div className="absolute" style={{ left: '30%', top: '80%' }}>
            <div className="w-3 h-3 bg-cyan-400 rounded-full opacity-60" style={{ boxShadow: '0 0 8px #06B6D4' }} />
          </div>
          <div className="absolute" style={{ left: '90%', top: '60%' }}>
            <div className="w-1 h-1 bg-emerald-400 rounded-full" style={{ boxShadow: '0 0 4px #34D399' }} />
          </div>

          {/* Floating Energy Orbs */}
          <div className="absolute rounded-full" style={{
            left: '15%',
            top: '25%',
            width: '30px',
            height: '30px',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 70%)'
          }} />
          <div className="absolute rounded-full" style={{
            left: '70%',
            top: '40%',
            width: '50px',
            height: '50px',
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, transparent 70%)'
          }} />
          <div className="absolute rounded-full" style={{
            left: '40%',
            top: '60%',
            width: '40px',
            height: '40px',
            background: 'radial-gradient(circle, rgba(244, 114, 182, 0.25) 0%, transparent 70%)'
          }} />

          {/* Cosmic Dust Clouds */}
          <div className="absolute blur-xl" style={{
            left: '0%',
            top: '15%',
            width: '180px',
            height: '90px',
            background: 'linear-gradient(45deg, rgba(96, 165, 250, 0.15) 0%, rgba(167, 139, 250, 0.15) 30%, rgba(244, 114, 182, 0.15) 60%, rgba(52, 211, 153, 0.15) 100%)',
            borderRadius: '50%',
            opacity: '0.3'
          }} />
          <div className="absolute blur-xl" style={{
            left: '60%',
            top: '10%',
            width: '220px',
            height: '115px',
            background: 'linear-gradient(75deg, rgba(96, 165, 250, 0.15) 0%, rgba(167, 139, 250, 0.15) 30%, rgba(244, 114, 182, 0.15) 60%, rgba(52, 211, 153, 0.15) 100%)',
            borderRadius: '50%',
            opacity: '0.4'
          }} />

          {/* Distant Galaxy Spiral */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-15">
            <div className="w-full h-full rounded-full" style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(96, 165, 250, 0.4) 60deg, transparent 120deg, rgba(167, 139, 250, 0.4) 180deg, transparent 240deg, rgba(244, 114, 182, 0.4) 300deg, transparent 360deg)'
            }} />
          </div>

          {/* Cosmic Rings */}
          <div className="absolute rounded-full border opacity-10" style={{
            left: '30%',
            top: '20%',
            width: '200px',
            height: '200px',
            borderColor: '#60A5FA',
            borderWidth: '2px'
          }} />
          <div className="absolute rounded-full border opacity-10" style={{
            left: '50%',
            top: '45%',
            width: '300px',
            height: '300px',
            borderColor: '#A78BFA',
            borderWidth: '2px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-8xl italic">Manifest</h1>
            <h1 className="text-8xl italic text-blue-400">Illusions</h1>
          </div>

          <p className="text-xl text-gray-300 mt-8 mb-12 max-w-3xl mx-auto text-center">
            What your competitors envy and your audience can't ignore, we build.
            Yours will scream conversion.
            We don't just design, we deploy digital weapons that hijack attention, manipulate desire, and turn first impressions into obsession.
          </p>

          <div className="flex justify-center gap-6">
            <a href="#services">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all">
                Explore Services
              </button>
            </a>
            <a href="#custom-design">
              <button className="bg-blue-500/10 border border-blue-400/30 text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-500/20 transition-all">
                Custom Design
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-light text-blue-400 mb-2">Tools for Total Digital Domination</h2>
            <p className="text-gray-400">Assets forged to make you unforgettable, untouchable, and unstoppable—precision-crafted tools to obliterate mediocrity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Visual Warfare: Product Ad Photoshoot</h3>
              <p className="text-gray-300">Not pretty—powerful. These visuals are engineered for dopamine, not decoration. We craft thumb-breaking ad creatives designed to hijack attention, burn into memory, and drive action across all digital fronts.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Custom Ai Chatbot</h3>
              <p className="text-gray-300">Coming Soon!.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Apparel Arsenal: Clothing Design</h3>
              <p className="text-gray-300">Streetwear meets storytelling. We design clothing that says more than your bio ever could—crafted for conversion, culture, and clout. Full-scale design + merchandising strategies for streetwear, creator drops, and brandwear with meaning.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Digital Doppelgänger</h3>
              <p className="text-gray-300">Unleash hyper-real AI assets and personas—trained and tuned to your niche, look, and message. Influence without hiring. Scale without burnout. Deploy them for content, mockups, storytelling, or complete digital dominance.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Revenue-Driven Digital Warfare</h3>
              <p className="text-gray-300">This isn't marketing. This is tactical manipulation of attention and conversion. We craft and execute surgical digital operations—ads, funnels, and content—built to seize attention and steal market share.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Favicon Fingerprints</h3>
              <p className="text-gray-300">It's not a pixel—it's your presence. Our favicons are iconic, instantly recognizable, and built to brand you on every browser bar, commanding recognition from the corner of their eye.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">The First Impression Weapon: Hypnotic Hero Sections</h3>
              <p className="text-gray-300">Your homepage either captivates—or evaporates. Our hero sections are high-performance visuals that stop users and seduce clicks, turning fleeting curiosity into concrete conversions.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Conversion Copy Command</h3>
              <p className="text-gray-300">Copy should punch. We write psychologically-driven language that manipulates belief, creates urgency, and closes without asking. This isn't just writing—it's tactical persuasion. Every word placed with purpose, every line engineered for decisive results.</p>
            </div>

            <div className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <div className="mb-4 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Shortform Ad Killshots</h3>
              <p className="text-gray-300">No fluff. No filler. 15–30 second digital ads designed for short attention spans with long-term memory impact. Optimized for TikTok, Reels, YouTube Shorts, and high-conversion ad platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section id="custom-design" className="relative py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-light text-blue-400 mb-2">Custom Design Request</h2>
            <p className="text-gray-400">Tell us about your project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
              />
              <textarea
                placeholder="Describe your project..."
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-blue-400/30 rounded-lg">
              <div className="text-center">
                <svg className="w-12 h-12 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Drag & drop images here, or click to select files</p>
                <p className="text-sm text-gray-400 mt-2">
                  Accepted file types: .jpg, .png, .gif. Max size: 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button className="text-blue-400 px-8 py-3 rounded-lg hover:text-blue-300 transition-all">
              Reset
            </button>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all">
              Submit Request
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl text-blue-400 mb-6 text-center">Send Us a Message</h3>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
                />
                <textarea
                  placeholder="Your message here..."
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
                />
                <button
                  className="w-full bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-lg py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
              </svg>
              <span className="text-xl text-blue-400 italic">Manifest Illusions</span>
            </div>
            <p className="text-gray-400 mb-6">
              What your competitors envy and your audience can't ignore, we build.
              Yours will scream conversion.
              We don't just design, we deploy digital weapons that hijack attention, manipulate desire, and turn first impressions into obsession.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Visual Warfare: Product Ad Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Brand Identity Engineering
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Apparel Arsenal: Clothing Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Digital Doppelgänger
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Revenue-Driven Digital Warfare
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Favicon Fingerprints
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  The First Impression Weapon: Hypnotic Hero Sections
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Conversion Copy Command
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Shortform Ad Killshots
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#custom-design" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Custom Design
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
              />
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Subscribe</span>
              </button>
              <p className="text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Manifest Illusions. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}