import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const PrivacyPolicy: React.FC = () => {
  const [showOptOutModal, setShowOptOutModal] = useState(false);
  const [optOutForm, setOptOutForm] = useState({
    email: '',
    fullName: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  const handleOptOutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Store opt-out request in database
      const { error } = await supabase
        .from('privacy_requests')
        .insert({
          email: optOutForm.email,
          full_name: optOutForm.fullName,
          request_type: 'opt_out_sale',
          reason: optOutForm.reason,
          user_id: user?.id || null,
          status: 'pending'
        });

      if (error) throw error;

      // If user is logged in, update their profile
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ opted_out_of_sale: true })
          .eq('id', user.id);

        if (profileError) console.warn('Profile update failed:', profileError);
      }

      setSubmitStatus('success');
      setOptOutForm({ email: '', fullName: '', reason: '' });
      
      // Auto-close modal after success
      setTimeout(() => {
        setShowOptOutModal(false);
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Opt-out request failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const OptOutModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowOptOutModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Do Not Sell My Information</h3>
          <button
            onClick={() => setShowOptOutModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Request Submitted</h4>
            <p className="text-gray-600">
              We'll process your opt-out request within 15 business days as required by CCPA/CPRA.
            </p>
          </div>
        ) : (
          <form onSubmit={handleOptOutSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={optOutForm.email}
                onChange={(e) => setOptOutForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={optOutForm.fullName}
                onChange={(e) => setOptOutForm(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason (Optional)
              </label>
              <textarea
                value={optOutForm.reason}
                onChange={(e) => setOptOutForm(prev => ({ ...prev, reason: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Tell us why you're opting out (optional)"
              />
            </div>

            {submitStatus === 'error' && (
              <div className="text-red-600 text-sm">
                Failed to submit request. Please try again or contact us directly.
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowOptOutModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Homepage
          </Link>
          
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-light text-gray-900">Privacy Policy</h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: January 6, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              At Manifest Illusions we respect your privacy. This Privacy Policy explains how we collect, use, share, and protect your information when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">We may collect the following categories of personal information:</p>
            
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">a. Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Name, email address, payment information (processed by Stripe/PayPal)</li>
              <li>Any files or data you upload to our platform for design services</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">b. Information Collected Automatically</h3>
            <p className="text-gray-700 mb-2">Our third-party services may collect:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>IP address</li>
              <li>Browser and device type</li>
              <li>Approximate location (city, country)</li>
              <li>Session data (login times, usage patterns)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">c. Payment Data</h3>
            <p className="text-gray-700 mb-6">We use Stripe and PayPal to process payments. We do not store your credit card data directly.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Provide and deliver services</li>
              <li>Authenticate and manage user accounts</li>
              <li>Communicate with users</li>
              <li>Fulfill transactions and process payments</li>
              <li>Analyze trends and optimize site performance</li>
              <li>Ensure the security of our platform</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Sharing of Information</h2>
            <p className="text-gray-700 mb-2">We do not sell your personal data.</p>
            <p className="text-gray-700 mb-2">We may share your information with:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Service providers (e.g., Supabase, Netlify, Stripe, Google Cloud)</li>
              <li>Legal authorities when required by law</li>
              <li>Business transfers in case of a merger or acquisition</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Cookies & Tracking</h2>
            <p className="text-gray-700 mb-2">We use cookies and similar technologies (via Netlify, Stripe, and Google) for:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Authentication</li>
              <li>Website analytics</li>
              <li>Improving user experience</li>
            </ul>
            <p className="text-gray-700 mb-6">You may disable cookies in your browser, but some features may not function correctly.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-2">We implement industry-standard security measures.</p>
            <p className="text-gray-700 mb-6">However, no system is 100% secure. Please use strong passwords and logout when finished.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy — including legal, operational, and security obligations. Account data (e.g., login, transaction history) may be retained for internal analysis or fraud prevention.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Legal Basis for Processing (EU/EEA)</h2>
            <p className="text-gray-700 mb-2">If you are located in the EU or EEA, we process your personal data under the following legal bases:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Performance of a contract (e.g., delivering purchased services)</li>
              <li>Legitimate interest (e.g., site functionality, fraud prevention)</li>
              <li>Consent (e.g., email opt-ins, cookie tracking)</li>
              <li>Legal obligation (e.g., tax documentation)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Your Rights</h2>
            <p className="text-gray-700 mb-2">You may:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Request to access, correct, or delete your data</li>
              <li>Opt-out of data sharing for personalized advertising</li>
            </ul>
            <div className="my-6">
              <Link 
                to="/#contact" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-gray-700 mb-6">If you're a California resident, you have additional rights under the CCPA and CPRA.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Do Not Track & Opt-Out</h2>
            <p className="text-gray-700 mb-2">We do not currently respond to "Do Not Track" signals.</p>
            <p className="text-gray-700 mb-6">
              We will respond to verified opt-out requests within 15 business days, as required by the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">Our services are not intended for children under 13. We do not knowingly collect data from children.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to this Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. The most recent version will always be available at ManifestIllusions.com/privacy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact</h2>
            <p className="text-gray-700 mb-4">If you have questions about this Privacy Policy, contact us:</p>
            <div className="mb-8">
              <Link 
                to="/#contact" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Do Not Sell Button */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">California Privacy Rights</h3>
              <p className="text-gray-700 mb-4">
                California residents have the right to opt-out of the sale or sharing of personal information for targeted advertising purposes.
              </p>
              <button
                onClick={() => setShowOptOutModal(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Do Not Sell My Information
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Opt-Out Modal */}
      {showOptOutModal && <OptOutModal />}
    </div>
  );
};

export default PrivacyPolicy;