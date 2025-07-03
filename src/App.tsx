import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import { ServicesToFAQDivider } from './components/ScrollDividers';
import Services from './components/Services';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import CustomDesign from './components/CustomDesign';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ProfilePage from './components/ProfilePage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import HypnoticHeroSections from './components/HypnoticHeroSections';
import ConversionCopyCommand from './components/ConversionCopyCommand';
import ApparelArsenal from './components/ApparelArsenal';
import FaviconFingerprints from './components/FaviconFingerprints';
import VisualWarfare from './components/VisualWarfare';
import BrandIdentityEngineering from './components/BrandIdentityEngineering';
import DigitalDoppelganger from './components/DigitalDoppelganger';
import ShortformAdKillshots from './components/ShortformAdKillshots';
import RevenueDigitalWarfare from './components/RevenueDigitalWarfare';
import Cipher from './components/Cipher';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const AppContent = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative font-serif overflow-x-hidden">
      <Navigation 
        onLoginClick={() => setIsLoginOpen(true)}
      />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Services />
            <ServicesToFAQDivider />
            <FAQ />
            <CTASection />
            <CustomDesign />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/purchases" element={<ProfilePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/products/hypnotic-hero-sections" element={<HypnoticHeroSections />} />
        <Route path="/services/conversion-copy-command" element={<ConversionCopyCommand />} />
        <Route path="/services/apparel-arsenal" element={<ApparelArsenal />} />
        <Route path="/services/favicon-fingerprints" element={<FaviconFingerprints />} />
        <Route path="/services/visual-warfare" element={<VisualWarfare />} />
        <Route path="/services/brand-identity-engineering" element={<BrandIdentityEngineering />} />
        <Route path="/services/digital-doppelganger" element={<DigitalDoppelganger />} />
        <Route path="/services/shortform-ad-killshots" element={<ShortformAdKillshots />} />
        <Route path="/services/revenue-digital-warfare" element={<RevenueDigitalWarfare />} />
      </Routes>
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      
      {/* Cipher AI Assistant - Global */}
      <Cipher />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;