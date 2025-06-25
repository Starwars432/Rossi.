import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import CustomDesign from './components/CustomDesign';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ProfilePage from './components/ProfilePage';
import AdminEditor from './components/AdminEditor';
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
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative font-serif overflow-x-hidden">
      <Navigation 
        onLoginClick={() => setIsLoginOpen(true)}
        onEditorClick={() => setIsEditorOpen(true)}
      />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Services />
            <CustomDesign />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/purchases" element={<ProfilePage />} />
      </Routes>
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <AdminEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
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