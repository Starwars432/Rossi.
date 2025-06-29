import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface CipherProps {
  isVisible?: boolean;
}

const Cipher: React.FC<CipherProps> = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "I'm Cipher. Your strategic advantage starts here. What brings you to Manifest Illusions?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-suggest after 30 seconds of inactivity
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (messages.length === 1) { // Only initial message
        addCipherMessage("Still deciding? Let me show you what separates winners from wishers. Which weapon interests you most?");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addCipherMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(content, false);
    }, 1000 + Math.random() * 1000); // Realistic typing delay
  };

  const logInteraction = async (userMessage: string, cipherResponse: string) => {
    try {
      await supabase.from('chat_interactions').insert({
        user_id: user?.id || null,
        email: user?.email || null,
        message: userMessage,
        response: cipherResponse,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Failed to log chat interaction:', error);
    }
  };

  const getCipherResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Service inquiries
    if (input.includes('service') || input.includes('what do you do') || input.includes('help')) {
      return "We forge digital weapons that obliterate mediocrity. Visual warfare, brand identity engineering, conversion copy that closes without asking. Which battlefield needs our attention?";
    }

    if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
      return "Investment varies by weapon complexity. Hero sections start at $2,500. Full brand identity systems begin at $8,000. Ready to see what fits your mission?";
    }

    if (input.includes('logo') || input.includes('brand') || input.includes('identity')) {
      return "Brand identity isn't decoration—it's psychological warfare. We build visual systems that anchor memory and command presence. Should I show you our brand engineering process?";
    }

    if (input.includes('ad') || input.includes('marketing') || input.includes('visual')) {
      return "Visual warfare. Not pretty—powerful. We engineer dopamine-driven creatives that hijack attention and burn into memory. Would you like to see how we do that?";
    }

    if (input.includes('website') || input.includes('hero') || input.includes('homepage')) {
      return "Your homepage either captivates or evaporates. Our hero sections are high-performance visuals that stop users and seduce clicks. Ready to build yours?";
    }

    if (input.includes('copy') || input.includes('writing') || input.includes('content')) {
      return "Copy should punch. We write psychologically-driven language that manipulates belief and closes without asking. Every word placed with purpose. Should I show you where to start?";
    }

    if (input.includes('clothing') || input.includes('apparel') || input.includes('merch')) {
      return "Streetwear meets storytelling. We design clothing that says more than your bio ever could. Crafted for conversion, culture, and clout. Would you like to see how we do that?";
    }

    if (input.includes('ai') || input.includes('digital') || input.includes('persona')) {
      return "Digital doppelgängers. Hyper-real AI assets trained to your niche and message. Influence without hiring. Scale without burnout. Ready to build yours?";
    }

    if (input.includes('favicon') || input.includes('icon')) {
      return "It's not a pixel—it's your presence. Our favicons command recognition from the corner of their eye. Iconic, instant, unforgettable. Should I show you where to start?";
    }

    if (input.includes('video') || input.includes('ad') || input.includes('short')) {
      return "15-30 second digital killshots. No fluff, no filler. Designed for short attention spans with long-term memory impact. Would you like to see how we do that?";
    }

    // Process inquiries
    if (input.includes('how long') || input.includes('timeline') || input.includes('delivery')) {
      return "Speed depends on weapon complexity. Simple assets: 3-5 days. Full campaigns: 2-3 weeks. We move fast because hesitation kills momentum. Ready to build yours?";
    }

    if (input.includes('revision') || input.includes('change') || input.includes('edit')) {
      return "Three strategic revisions included. We refine until it's lethal. Additional rounds available if needed. Perfection takes precision. Should I show you our process?";
    }

    if (input.includes('start') || input.includes('begin') || input.includes('get started')) {
      return "Smart. Hesitation is the enemy of progress. First step: define your target. What outcome do you need? Conversions? Brand recognition? Market dominance?";
    }

    // Support/escalation
    if (input.includes('refund') || input.includes('billing') || input.includes('payment') || input.includes('order')) {
      return "That requires direct contact with our operations team. Would you like me to submit a ticket for you?";
    }

    if (input.includes('legal') || input.includes('privacy') || input.includes('data')) {
      return "That requires direct contact with our operations team. Would you like me to submit a ticket for you?";
    }

    // Privacy requests
    if (input.includes('opt out') || input.includes('do not sell') || input.includes('delete my data')) {
      return "Privacy request noted. I'll flag this for immediate processing. You can also submit formal requests through our privacy policy page. Would you like me to direct you there?";
    }

    // Casual/uncertain responses
    if (input.includes('maybe') || input.includes('thinking') || input.includes('not sure')) {
      return "Uncertainty is expensive. While you think, competitors act. What's the real obstacle—budget, timeline, or trust? Let's eliminate it.";
    }

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Pleasantries waste time. You're here because mediocrity isn't working. What needs to change?";
    }

    if (input.includes('thanks') || input.includes('thank you')) {
      return "Results speak louder than gratitude. Ready to build something that converts?";
    }

    // Default strategic response
    return "Interesting. Most people ask the wrong questions. The real question is: what's stopping you from dominating your market? Budget, timeline, or strategy? Let's solve it.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, true);
    setInputValue('');

    // Get Cipher's response
    const response = getCipherResponse(userMessage);
    
    // Log the interaction
    await logInteraction(userMessage, response);
    
    // Add Cipher's response with delay
    addCipherMessage(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactEscalation = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Avatar Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Cipher - Your Strategic Assistant"
            >
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main avatar */}
              <div className="relative w-16 h-16 bg-black rounded-full border-2 border-blue-400 flex items-center justify-center group-hover:border-blue-300 transition-colors">
                {/* Glowing eye/center */}
                <motion.div
                  className="w-3 h-3 bg-blue-400 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(96, 165, 250, 0.8)",
                      "0 0 20px rgba(96, 165, 250, 1)",
                      "0 0 10px rgba(96, 165, 250, 0.8)"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Message icon overlay */}
                <MessageCircle className="absolute w-6 h-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Cipher
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 bg-black/95 backdrop-blur-lg border border-blue-400/30 rounded-lg shadow-2xl ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-400/20">
              <div className="flex items-center space-x-3">
                {/* Cipher Avatar */}
                <div className="w-8 h-8 bg-black rounded-full border border-blue-400 flex items-center justify-center">
                  <motion.div
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 5px rgba(96, 165, 250, 0.8)",
                        "0 0 10px rgba(96, 165, 250, 1)",
                        "0 0 5px rgba(96, 165, 250, 0.8)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium">Cipher</h3>
                  <p className="text-blue-400 text-xs">Strategic Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-gray-100 border border-blue-400/20'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-800 border border-blue-400/20 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-blue-400 rounded-full"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-blue-400/20">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Cipher anything..."
                      className="flex-1 bg-gray-800 border border-blue-400/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => {
                        setInputValue("What services do you offer?");
                        setTimeout(handleSendMessage, 100);
                      }}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-400 px-2 py-1 rounded transition-colors"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => {
                        setInputValue("How much does it cost?");
                        setTimeout(handleSendMessage, 100);
                      }}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-400 px-2 py-1 rounded transition-colors"
                    >
                      Pricing
                    </button>
                    <button
                      onClick={handleContactEscalation}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-400 px-2 py-1 rounded transition-colors"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cipher;