import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ImageIcon, FileText, Palette, Brain, ShoppingBag, BarChart3, Sparkles, Video, PenTool } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fieldPath?: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, fieldPath, index }) => {
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
      className="service-card bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 group"
      data-sb-field-path={fieldPath}
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
    </motion.div>
  );
};

const Services: React.FC = () => {
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
            Our Services
          </h2>
          <p className="text-gray-400" data-sb-field-path="sections.1.content">
            Comprehensive solutions for your brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<ImageIcon className="w-8 h-8" />}
            title="Product Ad Design"
            description="Eye-catching visuals for social media, websites, and email marketing campaigns."
            fieldPath="sections.2"
            index={0}
          />
          <ServiceCard
            icon={<Palette className="w-8 h-8" />}
            title="Brand Identity"
            description="Complete brand identity design including logos, guidelines, and assets."
            fieldPath="sections.3"
            index={1}
          />
          <ServiceCard
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Clothing Design"
            description="Custom apparel design and merchandising solutions."
            fieldPath="sections.4"
            index={2}
          />
          <ServiceCard
            icon={<Brain className="w-8 h-8" />}
            title="AI Model Generation"
            description="Advanced AI-powered design and content generation."
            fieldPath="sections.5"
            index={3}
          />
          <ServiceCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Digital Marketing"
            description="Comprehensive digital marketing strategies and implementation."
            fieldPath="sections.6"
            index={4}
          />
          <ServiceCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Favicon Creation"
            description="Custom favicon design to enhance your brand's web presence."
            fieldPath="sections.7"
            index={5}
          />
          <ServiceCard
            icon={<FileText className="w-8 h-8" />}
            title="Hero Section Creations"
            description="Compelling hero sections that capture attention and drive conversions."
            fieldPath="sections.8"
            index={6}
          />
          <ServiceCard
            icon={<PenTool className="w-8 h-8" />}
            title="Copywriting"
            description="Persuasive copy that converts visitors into customers and builds brand voice."
            fieldPath="sections.9"
            index={7}
          />
          <ServiceCard
            icon={<Video className="w-8 h-8" />}
            title="Video Ad Creations"
            description="Dynamic video advertisements for social media and digital marketing campaigns."
            fieldPath="sections.10"
            index={8}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;