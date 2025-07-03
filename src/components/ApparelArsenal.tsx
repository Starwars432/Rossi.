import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApparelArsenal: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/#home');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <button 
            onClick={handleBackToHome}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          
          {/* Product 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Essential Tee</h3>
              <p className="text-gray-600 text-sm font-light">Premium cotton blend</p>
              <p className="text-black font-light tracking-wide">$85</p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Signature Hoodie</h3>
              <p className="text-gray-600 text-sm font-light">Heavyweight fleece</p>
              <p className="text-black font-light tracking-wide">$195</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Minimal Jacket</h3>
              <p className="text-gray-600 text-sm font-light">Weather-resistant shell</p>
              <p className="text-black font-light tracking-wide">$285</p>
            </div>
          </div>

          {/* Product 4 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Classic Pants</h3>
              <p className="text-gray-600 text-sm font-light">Tailored fit</p>
              <p className="text-black font-light tracking-wide">$165</p>
            </div>
          </div>

          {/* Product 5 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Logo Cap</h3>
              <p className="text-gray-600 text-sm font-light">Structured six-panel</p>
              <p className="text-black font-light tracking-wide">$65</p>
            </div>
          </div>

          {/* Product 6 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Oversized Shirt</h3>
              <p className="text-gray-600 text-sm font-light">Relaxed cotton twill</p>
              <p className="text-black font-light tracking-wide">$125</p>
            </div>
          </div>

          {/* Product 7 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Denim Jacket</h3>
              <p className="text-gray-600 text-sm font-light">Vintage wash</p>
              <p className="text-black font-light tracking-wide">$225</p>
            </div>
          </div>

          {/* Product 8 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Knit Sweater</h3>
              <p className="text-gray-600 text-sm font-light">Merino wool blend</p>
              <p className="text-black font-light tracking-wide">$245</p>
            </div>
          </div>

          {/* Product 9 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs font-light tracking-widest">PRODUCT</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-black font-light text-lg tracking-wide">Track Shorts</h3>
              <p className="text-gray-600 text-sm font-light">Technical fabric</p>
              <p className="text-black font-light tracking-wide">$95</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-24">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400 text-sm font-light tracking-wide">
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApparelArsenal;