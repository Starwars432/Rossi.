import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApparelArsenal: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/#home');
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBackToHome}
              className="flex items-center text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Product Showcase 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 1</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 2</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 3 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 3</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 4 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 4</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 5 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 5</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 6 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 6</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 7 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 7</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 8 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 8</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

          {/* Product Showcase 9 */}
          <div className="group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-4 relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/30 text-sm font-mono">PRODUCT 9</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Product Name</h3>
              <p className="text-white/60 text-sm">Brief description</p>
              <p className="text-white font-mono">$XXX</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApparelArsenal;