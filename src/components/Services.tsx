import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, FileText, Palette, Brain, ShoppingBag, BarChart3, Sparkles, Video, PenTool } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fieldPath?: string;
  index: number;
  onClick?: () => void;
  isClickable?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  fieldPath, 
  index, 
  onClick,
  isClickable = false 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(96, 165, 250, 0.15)"
      }}
      className={`service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 group ${
        isClickable ? 'cursor-pointer hover:bg-blue-500/10' : ''
      }`}
      data-sb-field-path={fieldPath}
      onClick={onClick}
    >
      <motion.div 
        className="mb-4 text-blue-400"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-blue-400 group-hover:text-blue-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
        {description}
      </p>
      {isClickable && (
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm text-blue-400 font-medium">Click to explore →</span>
        </div>
      )}
    </motion.div>
  );
};

const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleHeroSectionsClick = () => {
    console.log('Navigating to hero sections page...');
    navigate('/products/hypnotic-hero-sections');
  };

  const handleCopyCommandClick = () => {
    console.log('Navigating to conversion copy command page...');
    navigate('/services/conversion-copy-command');
  };

  const handleApparelArsenalClick = () => {
    console.log('Navigating to apparel arsenal page...');
    navigate('/services/apparel-arsenal');
  };

  const handleFaviconFingerprintsClick = () => {
    console.log('Navigating to favicon fingerprints page...');
    navigate('/services/favicon-fingerprints');
  };

  const handleVisualWarfareClick = () => {
    console.log('Navigating to visual warfare page...');
    navigate('/services/visual-warfare');
  };
  
  const handleDigitalDoppelgangerClick = () => {
    console.log('Navigating to digital doppelganger page...');
    navigate('/services/digital-doppelganger');
  };
  
  const handleShortformAdClick = () => {
    console.log('Navigating to shortform ad killshots page...');
    navigate('/services/shortform-ad-killshots');
  };

  const handleRevenueWarfareClick = () => {
    console.log('Navigating to revenue digital warfare page...');
    navigate('/services/revenue-digital-warfare');
  };

  return (
    <section id="services" className="relative py-20 px-6" data-sb-field-path="sections.1">
      {/* Enhanced Background with Gradient and Floating Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-950/50 to-black">
        {/* Floating blur elements behind cards */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`service-blur-${i}`}
            className="absolute rounded-full blur-2xl opacity-30"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 20}%`,
              width: `${100 + i * 15}px`,
              height: `${100 + i * 15}px`,
              background: i % 2 === 0 
                ? 'linear-gradient(45deg, #8B5CF6, #A78BFA)' 
                : 'linear-gradient(45deg, #F97316, #FB923C)'
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-light text-blue-400 mb-2" data-sb-field-path="sections.1.title">
            Tools for Total Digital Domination
          </h2>
          <p className="text-gray-400" data-sb-field-path="sections.1.content">
            Assets forged to make you unforgettable, untouchable, and unstoppable. Precision-crafted tools to obliterate mediocrity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<ImageIcon className="w-8 h-8" />}
            title="Visual Warfare: Product Ad Design"
            description="Not pretty, powerful. These visuals are engineered for dopamine, not decoration. We craft thumb-breaking ad creatives designed to hijack attention, burn into memory, and drive action across all digital fronts."
            fieldPath="sections.2"
            index={0}
            onClick={handleVisualWarfareClick}
            isClickable={true}
          />
          <ServiceCard
            icon={<Palette className="w-8 h-8" />}
            title="Custom Ai chatbot"
            description="Coming Soon"
            fieldPath="sections.3"
            index={1}
          />
          <ServiceCard
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Apparel Arsenal: Clothing Design"
            description="Streetwear meets storytelling. We design clothing that says more than your bio ever could. Crafted for conversion, culture, and clout. Full-scale design + merchandising strategies for streetwear, creator drops, and brandwear with meaning."
            fieldPath="sections.4"
            index={2}
            onClick={handleApparelArsenalClick}
            isClickable={true}
          />
          <ServiceCard
            icon={<Brain className="w-8 h-8" />}
            title="Digital Doppelgänger"
            description="Unleash hyper-real AI assets and personas, trained and tuned to your niche, look, and message. Influence without hiring. Scale without burnout. Deploy them for content, mockups, storytelling, or complete digital dominance."
            fieldPath="sections.5"
            index={3}
            onClick={handleDigitalDoppelgangerClick}
            isClickable={true}
          />
          <ServiceCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Revenue-Driven Digital Warfare"
            description="This isn't marketing. This is tactical manipulation of attention and conversion. We craft and execute surgical digital operations—ads, funnels, and content—built to seize attention and steal market share."
            fieldPath="sections.6"
            index={4}
            onClick={handleRevenueWarfareClick}
            isClickable={true}
          />
          <ServiceCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Favicon Fingerprints"
            description="It's not a pixel, it's your presence. Our favicons are iconic, instantly recognizable, and built to brand you on every browser bar, commanding recognition from the corner of their eye."
            fieldPath="sections.7"
            index={5}
            onClick={handleFaviconFingerprintsClick}
            isClickable={true}
          />
          <ServiceCard
            icon={<FileText className="w-8 h-8" />}
            title="The First Impression Weapon: Hypnotic Hero Sections"
            description="Your homepage either captivates or evaporates. Our hero sections are high-performance visuals that stop users and seduce clicks, turning fleeting curiosity into concrete conversions."
            fieldPath="sections.8"
            index={6}
            onClick={handleHeroSectionsClick}
            isClickable={true}
          />
          <ServiceCard
            icon={<PenTool className="w-8 h-8" />}
            title="Conversion Copy Command"
            description="Copy should punch. We write psychologically-driven language that manipulates belief, creates urgency, and closes without asking. This isn't just writing—it's tactical persuasion. Every word placed with purpose, every line engineered for decisive results."
            fieldPath="sections.9"
            index={7}
            onClick={handleCopyCommandClick}
            isClickable={true}
          />
          <ServiceCard
            icon={<Video className="w-8 h-8" />}
            title="Shortform Ad Killshots"
            description="No fluff. No filler. 15–30 second digital ads designed for short attention spans with long-term memory impact. Optimized for TikTok, Reels, YouTube Shorts, and high-conversion ad platforms."
            fieldPath="sections.10"
            index={8}
            onClick={handleShortformAdClick}
            isClickable={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;