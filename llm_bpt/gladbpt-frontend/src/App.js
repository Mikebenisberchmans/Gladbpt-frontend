import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Welcome! How can I help with your physiotherapy questions today?',
      showButterflies: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [activeButterflies, setActiveButterflies] = useState(null);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setIsLoaded(true), 100);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes butterfly {
        0% {
          transform: translate(0, 0) scale(0.5) rotate(0deg);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translate(var(--tx), var(--ty)) scale(0) rotate(720deg);
          opacity: 0;
        }
      }
      
      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .animate-butterfly {
        --tx: ${Math.random() * 100 - 50}px;
        --ty: ${Math.random() * 100 - 50}px;
        animation: butterfly 1.5s ease-out forwards;
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
        animation-delay: 0.8s;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Replace this URL with your actual backend endpoint
      const response = await fetch('YOUR_BACKEND_API_URL/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Add bot response to chat
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.response || data.message || 'Sorry, I could not process that.',
        showButterflies: true
      };
      
      setActiveButterflies(botMessage.id);
      setMessages(prev => [...prev, botMessage]);
      
      // Hide butterflies after animation completes
      setTimeout(() => {
        setActiveButterflies(null);
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching response:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Sorry, I am having trouble connecting to the server. Please try again later.',
        showButterflies: true
      };
      
      setActiveButterflies(errorMessage.id);
      setMessages(prev => [...prev, errorMessage]);
      
      // Hide butterflies after animation completes
      setTimeout(() => {
        setActiveButterflies(null);
      }, 1500);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-purple-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-20 left-32 w-4 h-4 border-2 border-white rounded-full opacity-60"></div>
      <div className="absolute bottom-32 left-64 w-3 h-3 bg-white rounded-full opacity-40"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 border-2 border-white rounded-full opacity-30"></div>

      {/* Water Bottle - Animates from left */}
      <div 
        className={`absolute left-16 top-1/3 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-32'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <div className="w-16 h-24 bg-gradient-to-b from-pink-300 to-pink-400 rounded-lg relative shadow-lg">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-400 rounded-t-lg"></div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-pink-500"></div>
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-pink-500"></div>
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-pink-500"></div>
        </div>
      </div>

      {/* Measuring Tape - Animates from bottom left */}
      <div 
        className={`absolute left-32 bottom-28 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="relative">
          <div className="w-16 h-16 border-8 border-pink-300 rounded-full"></div>
          <div className="absolute top-12 left-12 w-24 h-2 bg-pink-200 transform rotate-45 rounded-full"></div>
        </div>
      </div>

      {/* Resistance Band - Animates from bottom left */}
      <div 
        className={`absolute left-44 bottom-16 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-32 rotate-45'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        <div className="w-32 h-20 border-8 border-pink-400 rounded-full transform -rotate-12"></div>
      </div>

      {/* Dumbbell Left - Animates from bottom */}
      <div 
        className={`absolute right-40 bottom-20 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="flex items-center gap-1">
          <div className="w-6 h-10 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full"></div>
          <div className="w-12 h-3 bg-pink-400 rounded-full"></div>
          <div className="w-6 h-10 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full"></div>
        </div>
      </div>

      {/* Dumbbell Right - Animates from right */}
      <div 
        className={`absolute right-20 top-1/2 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        <div className="flex items-center gap-1 transform rotate-45">
          <div className="w-5 h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full"></div>
          <div className="w-10 h-2 bg-pink-400 rounded-full"></div>
          <div className="w-5 h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full"></div>
        </div>
      </div>

      {/* Main Chat Container - Animates with scale */}
      <div 
        className={`bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative transition-all duration-1000 flex flex-col ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ transitionDelay: '300ms', maxHeight: '85vh' }}
      >
        {/* Header with medical symbol */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl font-serif text-pink-400">GladBPT</h1>
          <div className="bg-white rounded-full p-4 shadow-lg">
            <svg className="w-8 h-8 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M11 7V13H13V7H11M11 15V17H13V15H11Z" />
            </svg>
          </div>
        </div>

        {/* Knee Icon Badge */}
        <div className="absolute -right-4 top-32 bg-white rounded-full p-4 shadow-xl">
          <svg className="w-12 h-12 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3C10.5 3 9 4 9 6V12C9 13 8.5 14 7.5 15.5C6.5 17 6 18 6 19C6 20.5 7 21 8 21C9 21 10 20.5 10.5 19.5L12 17L13.5 19.5C14 20.5 15 21 16 21C17 21 18 20.5 18 19C18 18 17.5 17 16.5 15.5C15.5 14 15 13 15 12V6C15 4 13.5 3 12 3Z" />
          </svg>
        </div>

        {/* Chat Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2" style={{ maxHeight: '50vh' }}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start gap-4 ${message.type === 'user' ? 'justify-end' : ''} relative`}
            >
              {message.type === 'bot' && (
                <>
                  <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C10.9 2 10 2.9 10 4H8C6.9 4 6 4.9 6 6V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V6C18 4.9 17.1 4 16 4H14C14 2.9 13.1 2 12 2M12 4C12.6 4 13 4.4 13 5C13 5.6 12.6 6 12 6C11.4 6 11 5.6 11 5C11 4.4 11.4 4 12 4M10 8H14V10H10V8M10 12H14V14H10V12Z" />
                    </svg>
                  </div>
                  
                  {/* Butterflies Animation - Only for new messages */}
                  {activeButterflies === message.id && (
                    <div className="absolute left-12 top-0 w-64 h-32 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute animate-butterfly"
                          style={{
                            left: `${Math.random() * 200 - 50}px`,
                            top: `${Math.random() * 100 - 30}px`,
                            animationDelay: `${i * 0.05}s`,
                            animationDuration: '1.5s'
                          }}
                        >
                          <svg 
                            className="w-4 h-4 text-white opacity-90" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            style={{
                              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                            }}
                          >
                            <path d="M12 3C10.9 3 10 3.9 10 5C10 5.4 10.1 5.8 10.3 6.1C9.5 6.4 9 7.1 9 8C9 9.1 9.9 10 11 10C11.1 10 11.2 10 11.3 10C11.1 10.3 11 10.6 11 11C11 12.1 11.9 13 13 13C13.4 13 13.8 12.9 14.1 12.7C14.4 13.5 15.1 14 16 14C17.1 14 18 13.1 18 12C18 11.9 18 11.8 18 11.7C18.3 11.9 18.6 12 19 12C20.1 12 21 11.1 21 10C21 8.9 20.1 8 19 8C18.9 8 18.8 8 18.7 8C18.9 7.7 19 7.4 19 7C19 5.9 18.1 5 17 5C16.6 5 16.2 5.1 15.9 5.3C15.6 4.5 14.9 4 14 4C13.4 4 12.9 4.2 12.5 4.6C12.3 3.7 11.7 3 11 3H12Z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              <div className={`${
                message.type === 'bot' 
                  ? 'bg-gray-50 rounded-2xl rounded-tl-none' 
                  : 'bg-pink-400 text-white rounded-2xl rounded-tr-none'
              } p-4 max-w-md ${activeButterflies === message.id ? 'animate-fadeIn' : ''}`}>
                <p className={message.type === 'bot' ? 'text-gray-700' : 'text-white'}>
                  {message.text}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="bg-pink-200 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C10.9 2 10 2.9 10 4H8C6.9 4 6 4.9 6 6V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V6C18 4.9 17.1 4 16 4H14C14 2.9 13.1 2 12 2M12 4C12.6 4 13 4.4 13 5C13 5.6 12.6 6 12 6C11.4 6 11 5.6 11 5C11 4.4 11.4 4 12 4M10 8H14V10H10V8M10 12H14V14H10V12Z" />
                </svg>
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area with Submit Button */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            disabled={isLoading}
            className="flex-1 bg-gray-50 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-pink-400 hover:bg-pink-500 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Send message"
          >
            <Send className="w-6 h-6 transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>

      {/* Decorative sparkle */}
      <div 
        className={`absolute bottom-16 right-16 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L14.5 8.5L22 11L14.5 13.5L12 21L9.5 13.5L2 11L9.5 8.5L12 1Z" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}