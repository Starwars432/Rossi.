import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setIsSigningOut(true);
      setError(null);
      await signOut();
      
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]';
      toast.textContent = 'Successfully signed out';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
      
      onClose();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign out');
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[998]" 
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 top-16 w-64 bg-black/90 border border-blue-400/30 rounded-lg shadow-lg py-1 z-[999]"
          >
            <div className="px-4 py-2 border-b border-blue-400/30">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300 truncate">{user?.email}</span>
              </div>
            </div>

            {error && (
              <div className="px-4 py-2 text-sm text-red-400 bg-red-500/10">
                {error}
              </div>
            )}

            <button
              onClick={handleNavigation('/profile')}
              className="block w-full px-4 py-2 text-sm text-white hover:bg-blue-500/20 transition-colors text-left"
            >
              View Profile
            </button>

            <button
              onClick={handleNavigation('/purchases')}
              className="block w-full px-4 py-2 text-sm text-white hover:bg-blue-500/20 transition-colors flex items-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Purchase History</span>
            </button>

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="block w-full px-4 py-2 text-sm text-white hover:bg-blue-500/20 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;