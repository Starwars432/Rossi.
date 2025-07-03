import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, Shield, Check, X, Info, Eye, Lock, Download, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ModelType {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  previewUrl: string;
}

interface PlacementOption {
  id: string;
  name: string;
  label: string;
}

const DigitalDoppelganger: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [placement, setPlacement] = useState<string>('chest');
  const [size, setSize] = useState<number>(50);
  const [isPreviewReady, setIsPreviewReady] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Models data
  const models: ModelType[] = [
    {
      id: 'model-1',
      name: 'Urban Streetwear',
      type: 't-shirt',
      imageUrl: 'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=800',
      previewUrl: 'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'model-2',
      name: 'Minimalist Style',
      type: 'hoodie',
      imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      previewUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'model-3',
      name: 'Casual Elegance',
      type: 'jacket',
      imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      previewUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'model-4',
      name: 'Athletic Wear',
      type: 't-shirt',
      imageUrl: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800',
      previewUrl: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'model-5',
      name: 'Business Casual',
      type: 'shirt',
      imageUrl: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800',
      previewUrl: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'model-6',
      name: 'Vintage Style',
      type: 'jacket',
      imageUrl: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
      previewUrl: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // Placement options
  const placementOptions: PlacementOption[] = [
    { id: 'chest', name: 'Chest', label: 'Front Chest' },
    { id: 'back', name: 'Back', label: 'Full Back' },
    { id: 'all-over', name: 'All-over', label: 'All-over Print' }
  ];

  // Packages
  const packages = [
    {
      id: 'standard',
      name: 'Standard Download',
      price: 49,
      description: 'High-resolution PNG + JPG files',
      features: ['1 selected mockup', 'Web-ready files', 'Commercial usage rights']
    },
    {
      id: 'premium',
      name: 'PSD/Figma Template',
      price: 89,
      description: 'Layered design files with smart objects',
      features: ['1 selected mockup', 'Layered PSD/Figma files', 'Commercial usage rights', 'Editable elements', 'Multiple angles']
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "How realistic are these AI models?",
      answer: "Our AI models are designed to be hyper-realistic while not representing any real individuals. They're perfect for mockups, presentations, and marketing materials."
    },
    {
      question: "Can I use these mockups commercially?",
      answer: "Yes! Once purchased, you have full commercial rights to use the mockups in your marketing, social media, and e-commerce."
    },
    {
      question: "What file formats will I receive?",
      answer: "Standard package includes high-resolution PNG and JPG files. The Premium package includes layered PSD or Figma files with smart objects for easy editing."
    },
    {
      question: "How quickly will I receive my files?",
      answer: "Immediately after purchase, you'll receive an email with download links to your files."
    }
  ];

  useEffect(() => {
    // Generate a session ID for tracking
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    
    // Add event listeners for screenshot protection
    document.addEventListener('visibilitychange', handleVisibilityChange);
    previewContainerRef.current?.addEventListener('mouseleave', handleMouseLeave);
    previewContainerRef.current?.addEventListener('mouseenter', handleMouseEnter);
    
    // Disable right-click on preview
    if (previewContainerRef.current) {
      previewContainerRef.current.oncontextmenu = e => e.preventDefault();
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      previewContainerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      previewContainerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    if (selectedModel && uploadedImageUrl) {
      renderPreview();
    }
  }, [selectedModel, uploadedImageUrl, placement, size]);

  const handleBackToHome = () => {
    navigate('/#home');
  };

  const handleModelSelect = (model: ModelType) => {
    setSelectedModel(model);
    
    // Log selection to Supabase
    logUserAction('model_selected', { model_id: model.id, model_name: model.name });
    
    // Scroll to upload section if on mobile
    if (window.innerWidth < 768) {
      const uploadSection = document.getElementById('upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file type
    if (!file.type.match('image/(jpeg|jpg|png|gif)')) {
      alert('Please upload an image file (JPG, PNG, or GIF)');
      return;
    }
    
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    
    setUploadedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
    
    // Log upload to Supabase
    logUserAction('image_uploaded', { 
      file_name: file.name, 
      file_size: file.size, 
      file_type: file.type 
    });
    
    // If model is already selected, render preview
    if (selectedModel) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsPreviewReady(true);
        setIsProcessing(false);
      }, 1500);
    }
  };

  const handlePlacementChange = (newPlacement: string) => {
    setPlacement(newPlacement);
    logUserAction('placement_changed', { placement: newPlacement });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setSize(newSize);
    logUserAction('size_changed', { size: newSize });
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden' && isPreviewReady) {
      setIsBlurred(true);
    }
  };

  const handleMouseLeave = () => {
    if (isPreviewReady) {
      setIsBlurred(true);
    }
  };

  const handleMouseEnter = () => {
    setIsBlurred(false);
  };

  const renderPreview = () => {
    if (!canvasRef.current || !selectedModel || !uploadedImageUrl) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Load model image
    const modelImage = new Image();
    modelImage.crossOrigin = 'anonymous';
    modelImage.src = selectedModel.previewUrl;
    
    modelImage.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = modelImage.width;
      canvas.height = modelImage.height;
      
      // Draw model image
      ctx.drawImage(modelImage, 0, 0, canvas.width, canvas.height);
      
      // Load uploaded design
      const designImage = new Image();
      designImage.crossOrigin = 'anonymous';
      designImage.src = uploadedImageUrl;
      
      designImage.onload = () => {
        // Calculate dimensions based on placement and size
        let designWidth, designHeight, x, y;
        
        switch (placement) {
          case 'chest':
            designWidth = canvas.width * (size / 100) * 0.3;
            designHeight = (designImage.height / designImage.width) * designWidth;
            x = canvas.width * 0.5 - designWidth / 2;
            y = canvas.height * 0.3;
            break;
          case 'back':
            designWidth = canvas.width * (size / 100) * 0.6;
            designHeight = (designImage.height / designImage.width) * designWidth;
            x = canvas.width * 0.5 - designWidth / 2;
            y = canvas.height * 0.4;
            break;
          case 'all-over':
            // Create pattern
            const pattern = ctx.createPattern(designImage, 'repeat');
            if (pattern) {
              ctx.globalAlpha = 0.3; // Make pattern semi-transparent
              ctx.fillStyle = pattern;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.globalAlpha = 1.0;
            }
            return; // Skip the normal drawing
          default:
            designWidth = canvas.width * (size / 100) * 0.3;
            designHeight = (designImage.height / designImage.width) * designWidth;
            x = canvas.width * 0.5 - designWidth / 2;
            y = canvas.height * 0.3;
        }
        
        // Draw design on model
        ctx.drawImage(designImage, x, y, designWidth, designHeight);
        
        // Add watermark
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';
        ctx.fillText('Manifest Mockup Preview', canvas.width / 2, canvas.height - 20);
        
        // Draw diagonal watermark
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.textAlign = 'center';
        ctx.fillText('PREVIEW ONLY', 0, 0);
        ctx.restore();
        
        setIsPreviewReady(true);
      };
    };
  };

  const handlePurchase = async () => {
    if (!selectedModel || !uploadedImage) return;
    
    setIsProcessing(true);
    
    try {
      // In a real implementation, this would integrate with Stripe
      // For now, we'll simulate the payment process
      
      // 1. Upload image to Supabase Storage
      const fileName = `${sessionId}_${uploadedImage.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('mockup-designs')
        .upload(fileName, uploadedImage);
      
      if (uploadError) throw uploadError;
      
      // 2. Create a record of the purchase
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: user?.id || null,
          amount: selectedPackage === 'standard' ? 49 : 89,
          items: [
            {
              type: 'digital_mockup',
              model_id: selectedModel.id,
              model_name: selectedModel.name,
              package: selectedPackage,
              design_file: fileName,
              placement,
              size
            }
          ],
          status: 'completed'
        });
      
      if (purchaseError) throw purchaseError;
      
      // 3. Log the purchase action
      await logUserAction('purchase_completed', {
        package: selectedPackage,
        amount: selectedPackage === 'standard' ? 49 : 89,
        model_id: selectedModel.id
      });
      
      // 4. Show success message (in a real app, this would redirect to a success page)
      alert('Purchase successful! Your mockup has been sent to your email.');
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('There was an error processing your purchase. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const logUserAction = async (action: string, metadata: any = {}) => {
    try {
      // Add session ID and user info to metadata
      const enhancedMetadata = {
        ...metadata,
        session_id: sessionId,
        user_id: user?.id || null,
        email: user?.email || null,
        timestamp: new Date().toISOString()
      };
      
      // Log to Supabase
      await supabase
        .from('user_actions')
        .insert({
          user_id: user?.id || null,
          email: user?.email || null,
          action,
          metadata: enhancedMetadata
        });
    } catch (error) {
      console.warn('Failed to log user action:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Vision. Our AI Models. Total Visual Control.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Upload your design, apply it to hyper-realistic models, and purchase your mockups for use in ads, lookbooks, or store previews.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all shadow-lg"
            onClick={() => {
              const modelsSection = document.getElementById('models-section');
              if (modelsSection) {
                modelsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Model Selection Grid */}
      <section id="models-section" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Select Your Model
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect AI-generated model to showcase your design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className={`relative rounded-lg overflow-hidden cursor-pointer group ${
                  selectedModel?.id === model.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleModelSelect(model)}
              >
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <img 
                    src={model.imageUrl} 
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Try On</span>
                    </div>
                  </div>
                  
                  {/* Selected indicator */}
                  {selectedModel?.id === model.id && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-white border-t border-gray-100">
                  <h3 className="font-medium text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{model.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Upload Your Design
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your logo, pattern, or design to see it on your selected model.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Upload Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="text-2xl font-light mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Design Upload
              </h3>
              
              {!selectedModel ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Please select a model first</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Your Design
                    </label>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        uploadedImage ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      } transition-colors cursor-pointer`}
                      onClick={() => document.getElementById('design-upload')?.click()}
                    >
                      {uploadedImage ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={uploadedImageUrl || ''} 
                            alt="Uploaded design" 
                            className="max-h-32 max-w-full mb-4 rounded"
                          />
                          <p className="text-sm text-gray-600">{uploadedImage.name}</p>
                          <button 
                            className="mt-4 text-red-500 text-sm flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedImage(null);
                              setUploadedImageUrl(null);
                              setIsPreviewReady(false);
                            }}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-4" />
                          <p className="text-gray-500 mb-2">Drag & drop or click to upload</p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF (max 10MB)</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        id="design-upload" 
                        className="hidden" 
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placement
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {placementOptions.map(option => (
                        <button
                          key={option.id}
                          className={`p-4 rounded-lg border text-center ${
                            placement === option.id 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          } transition-colors`}
                          onClick={() => handlePlacementChange(option.id)}
                        >
                          <div className="text-lg mb-1">{option.name}</div>
                          <div className="text-xs text-gray-500">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size: {size}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={size}
                      onChange={handleSizeChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
            
            {/* Preview Canvas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
              ref={previewContainerRef}
            >
              <h3 className="text-2xl font-light mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Live Preview
              </h3>
              
              <div className="relative">
                {!selectedModel || !uploadedImage ? (
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {!selectedModel 
                          ? 'Select a model to see preview' 
                          : 'Upload your design to see preview'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    {isProcessing ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-700">Generating preview...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <canvas 
                          ref={canvasRef} 
                          className={`w-full h-full object-contain ${isBlurred ? 'blur-md' : ''}`}
                        />
                        
                        {/* Watermark overlay */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                          <div className="transform rotate-45 text-white/30 text-2xl font-bold">
                            PREVIEW ONLY
                          </div>
                        </div>
                        
                        {isBlurred && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="text-center text-white p-4">
                              <Lock className="w-12 h-12 mx-auto mb-4" />
                              <p className="text-lg font-medium mb-2">Preview Protected</p>
                              <p className="text-sm">Move your cursor back to the preview to continue</p>
                            </div>
                          </div>
                        )}
                        
                        {isPreviewReady && (
                          <div className="absolute bottom-4 right-4">
                            <div className="bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center">
                              <Shield className="w-3 h-3 mr-1" />
                              <span>Preview Protected</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Want to Use This? Secure Your Mockup Now.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purchase your high-resolution, watermark-free mockup for commercial use.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: pkg.id === 'standard' ? 0 : 0.2 }}
                className={`bg-white p-8 rounded-lg border-2 ${
                  selectedPackage === pkg.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all cursor-pointer`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">${pkg.price}</div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-gray-100 flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${
                    selectedPackage === pkg.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  } mr-3 flex-shrink-0`}>
                    {selectedPackage === pkg.id && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700">
                    {selectedPackage === pkg.id ? 'Selected' : 'Select this package'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="mb-6">
              <label className="flex items-center justify-center text-gray-700">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 mr-2" 
                />
                I confirm I own the rights to the uploaded design and agree to the terms of visual use.
              </label>
            </div>
            
            <button
              onClick={handlePurchase}
              disabled={!isPreviewReady || isProcessing}
              className={`flex items-center justify-center mx-auto bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all ${
                !isPreviewReady || isProcessing
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-700 shadow-lg'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy My Mockup
                </>
              )}
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Secure payment via Stripe. You'll receive your files instantly after purchase.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-500 max-w-2xl mx-auto"
          >
            <p className="mb-4">
              All models are AI-generated and not intended to resemble any real individual. 
              Previews are for brand visualization only. Designs remain the property of the uploader.
            </p>
            <p>
              By using this service, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalDoppelganger;