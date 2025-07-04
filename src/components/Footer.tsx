import React from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName: string) => {
    if (serviceName === 'The First Impression Weapon: Hypnotic Hero Sections') {
      navigate('/products/hypnotic-hero-sections');
    } else if (serviceName === 'Conversion Copy Command') {
      navigate('/services/conversion-copy-command');
    } else if (serviceName === 'Apparel Arsenal: Clothing Design') {
      navigate('/services/apparel-arsenal');
    } else if (serviceName === 'Favicon Fingerprints') {
      navigate('/services/favicon-fingerprints');
    } else if (serviceName === 'Visual Warfare: Product Ad Design') {
      navigate('/services/visual-warfare');
    } else if (serviceName === 'Digital Doppelgänger') {
      navigate('/services/digital-doppelganger');
    } else if (serviceName === 'Shortform Ad Killshots') {
      navigate('/services/shortform-ad-killshots');
    } else if (serviceName === 'Revenue-Driven Digital Warfare') {
      navigate('/services/revenue-digital-warfare');
    }
    // Add more service navigation here as you build more product pages
  };

  return (
    <footer className="bg-black/50 backdrop-blur-lg py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="text-xl text-blue-400 italic">Manifest Illusions</span>
          </div>
          <p className="text-gray-400 mb-6">
            What your competitors envy and your audience can't ignore, we build.
            Yours will scream conversion.
            We don't just design, we deploy digital weapons that hijack attention, manipulate desire, and turn first impressions into obsession.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => handleServiceClick('Visual Warfare: Product Ad Design')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                Visual Warfare: Product Ad Design
              </button>
            </li>
            <li>
              <span className="text-gray-400">
                Custom AI Chatbot
              </span>
            </li>
            <li>
              <button 
                onClick={() => handleServiceClick('Apparel Arsenal: Clothing Design')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                Apparel Arsenal: Clothing Design
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleServiceClick('Digital Doppelgänger')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                Digital Doppelgänger
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleServiceClick('Revenue-Driven Digital Warfare')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                Revenue-Driven Digital Warfare
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleServiceClick('Favicon Fingerprints')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                Favicon Fingerprints
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleServiceClick('The First Impression Weapon: Hypnotic Hero Sections')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                The First Impression Weapon: Hypnotic Hero Sections
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleServiceClick('Conversion Copy Command')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                Conversion Copy Command
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleServiceClick('Shortform Ad Killshots')}
                className="text-gray-400 hover:text-blue-400 transition-colors text-left"
              >
                Shortform Ad Killshots
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="portfolio"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="custom-design"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Custom Design
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Contact
              </Link>
            </li>
            <li>
              <RouterLink to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </RouterLink>
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
              aria-label="Email address for newsletter"
            />
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
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
  );
};

export default Footer;