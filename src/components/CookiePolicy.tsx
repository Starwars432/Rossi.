import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookiePolicy: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleContactClick = () => {
    navigate('/#contact');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <button 
            onClick={handleReturnHome}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Homepage
          </button>
          
          <div className="flex items-center space-x-3">
            <Cookie className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-light text-gray-900">Cookie Policy</h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: June 28, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              This Cookie Policy explains how Manifest Illusions uses cookies and similar technologies on our website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-700 mb-6">
              Cookies are small text files placed on your device to store data that helps enhance your browsing experience. Some cookies are essential; others are used for performance, analytics, and personalization.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. What Cookies We Use</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">a. Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              Used for login, payment checkout, and session continuity. These cookies are required for basic functionality.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">b. Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              We may use analytics tools (e.g., Netlify logs or Google) to monitor site traffic and improve performance.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">c. Functional Cookies</h3>
            <p className="text-gray-700 mb-6">
              Cookies that remember user preferences or support optional features (like saving login info).
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Cookies</h2>
            <p className="text-gray-700 mb-2">We use cookies to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Enable secure authentication</li>
              <li>Process payments via Stripe and PayPal</li>
              <li>Monitor performance and user behavior (non-personalized)</li>
              <li>Improve site functionality and customer experience</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can disable cookies via your browser settings. However, disabling essential cookies may limit functionality such as login or checkout.
            </p>
            <p className="text-gray-700 mb-2">For instructions:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>
                <a 
                  href="https://support.google.com/chrome/answer/95647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear cookies in Chrome
                </a>
              </li>
              <li>
                <a 
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear cookies in Safari
                </a>
              </li>
              <li>
                <a 
                  href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear cookies in Firefox
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Do Not Track (DNT)</h2>
            <p className="text-gray-700 mb-6">
              We do not currently respond to "Do Not Track" browser signals. However, you may manually manage cookies using the methods above.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Cookie Policy at any time. The latest version will always be available on this page.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Contact</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions or concerns regarding our use of cookies, contact us:
            </p>
            <div className="mb-8">
              <button 
                onClick={handleContactClick}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;