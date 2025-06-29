import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-light text-gray-900">Terms of Service</h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: June 29, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              Welcome to Manifest Illusions. By accessing our website or purchasing any of our digital products or services, you agree to the following Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Overview</h2>
            <p className="text-gray-700 mb-6">
              Manifest Illusions provides digital design services, creative assets, and conversion-optimized brand materials. All content on this site and all deliverables are protected under applicable copyright and trademark law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Use of Our Services</h2>
            <p className="text-gray-700 mb-6">
              You agree to use our services in accordance with applicable laws and not for any unlawful purpose. You may not resell or redistribute our digital products unless explicitly licensed.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Purchases and Payments</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>All purchases are processed securely via Stripe and PayPal.</li>
              <li>You agree to pay the listed price at checkout.</li>
              <li>Taxes, if applicable, will be calculated at checkout.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Delivery</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Digital products are delivered via download or email link within 1–5 business days, depending on the service.</li>
              <li>You must provide a valid email address and accurate information during checkout.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Refunds and Revisions</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Due to the custom and digital nature of our services, all sales are final.</li>
              <li>Revisions may be included depending on the service.</li>
              <li>If you experience any issues, please contact support and we will make a reasonable effort to resolve them.</li>
            </ul>
            <div className="my-6">
              <button 
                onClick={handleContactClick}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>We retain ownership of all content, designs, and code until full payment is received.</li>
              <li>Upon purchase and delivery, you are granted a non-exclusive, royalty-free license to use your custom assets for personal or commercial use.</li>
              <li>You may not copy, replicate, or resell our original content, frameworks, or templates without permission.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. AI & Automation Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              Some services may include AI-generated components. All outputs are reviewed and refined by a human before delivery. By purchasing, you acknowledge and accept the use of AI-enhanced tools.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-700 mb-6">
              We may use external platforms such as Netlify, Supabase, Google Cloud, Stripe, and others to process or host portions of our services. These providers have their own terms which you agree to by using our site.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services, including but not limited to loss of data, revenue, or business opportunities.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Termination</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to refuse service or terminate your access to the site at any time, without notice, for any reason, including breach of these terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We may update these terms from time to time. Your continued use of the site indicates your acceptance of the latest version.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact</h2>
            <p className="text-gray-700 mb-4">If you have questions about these terms, contact us:</p>
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

export default TermsOfService;