
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Leaf,
  Heart,
  HelpCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'السلام علیکم! I am your Tibb Assistant. I can help you with information about traditional Desi medicine, herbal remedies, and connect you with certified Hakeems. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        'Find remedy for headache',
        'What is good for digestion?',
        'Connect me with a Hakeem',
        'Tell me about turmeric benefits'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const knowledgeBase = {
    greetings: [
      'hello', 'hi', 'salam', 'السلام علیکم', 'adab', 'namaste'
    ],
    headache: {
      keywords: ['headache', 'head pain', 'migraine', 'سر درد'],
      response: 'For headaches, traditional Tibb recommends:\n\n🌿 **Peppermint oil** - Apply diluted oil to temples\n🫖 **Ginger tea** - Helps reduce inflammation\n🌸 **Rose water** - Apply cool compress\n🥒 **Cucumber slices** on forehead\n\nWould you like me to connect you with a certified Hakeem for personalized treatment?',
      suggestions: ['Find a Hakeem near me', 'More headache remedies', 'What causes headaches?']
    },
    digestion: {
      keywords: ['digestion', 'stomach', 'acidity', 'gas', 'bloating', 'ہاضمہ'],
      response: 'For digestive issues, Tibb suggests these natural remedies:\n\n🌿 **Fennel seeds** - Chew after meals\n🫖 **Mint tea** - Soothes stomach\n🧄 **Ginger** - Improves digestion\n🥄 **Ajwain** - Reduces gas and bloating\n🍯 **Honey with warm water** - Morning ritual\n\nShall I help you find digestive medicines in our marketplace?',
      suggestions: ['Show digestive medicines', 'Book consultation', 'Diet tips for digestion']
    },
    turmeric: {
      keywords: ['turmeric', 'haldi', 'curcumin', 'ہلدی'],
      response: 'Turmeric (Haldi) is a powerful healing herb in Tibb:\n\n✨ **Benefits:**\n• Anti-inflammatory properties\n• Boosts immunity\n• Aids digestion\n• Wound healing\n• Joint pain relief\n\n🥛 **Usage:** Golden milk, cooking, face masks\n⚠️ **Caution:** Consult Hakeem if taking blood thinners\n\nWould you like to explore turmeric products in our marketplace?',
      suggestions: ['Buy turmeric products', 'More about golden milk', 'Turmeric for skin']
    },
    hakeem: {
      keywords: ['hakeem', 'doctor', 'practitioner', 'consultation', 'حکیم'],
      response: 'I can help you find the right Hakeem for your needs:\n\n👨‍⚕️ **500+ Certified Practitioners**\n🏥 Specializations available\n📍 Multiple cities covered\n💻 Online & in-person consultations\n⭐ Verified reviews and ratings\n\nWhat type of consultation are you looking for?',
      suggestions: ['Find Hakeem near me', 'Online consultation', 'View specializations']
    }
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (knowledgeBase.greetings.some(greeting => lowerMessage.includes(greeting))) {
      return {
        id: Date.now().toString(),
        text: 'وعلیکم السلام! Welcome to TibbCare. I\'m here to guide you through traditional healing wisdom. What health concern can I help you with today?',
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Common remedies', 'Find a Hakeem', 'Browse medicines', 'Health tips']
      };
    }

    // Check knowledge base
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (key !== 'greetings' && 'keywords' in data) {
        if (data.keywords.some((keyword: string) => lowerMessage.includes(keyword))) {
          return {
            id: Date.now().toString(),
            text: data.response,
            isBot: true,
            timestamp: new Date(),
            suggestions: data.suggestions
          };
        }
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: 'I understand you\'re looking for guidance on traditional medicine. While I can provide general information about Tibb and herbal remedies, I recommend consulting with one of our certified Hakeems for personalized treatment.\n\nWould you like me to help you find a qualified practitioner?',
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Find certified Hakeem', 'Browse herbal medicines', 'Read health articles', 'Emergency contacts']
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-sage hover:bg-dark-sage text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-float"
            size="lg"
          >
            <div className="relative">
              <MessageCircle className="w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask Tibb Assistant
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw] h-[500px] max-h-[80vh]">
          <Card className="h-full flex flex-col shadow-2xl border-sage/20">
            {/* Header */}
            <CardHeader className="flex-row items-center justify-between p-4 bg-gradient-to-r from-sage to-dark-sage text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Tibb Assistant</CardTitle>
                  <div className="flex items-center space-x-2 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {!isMinimized && (
              <>
                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-cream/50 to-white">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] ${message.isBot ? 'bg-white border border-sage/20' : 'bg-sage text-white'} rounded-2xl p-3 shadow-sm`}>
                        <div className="flex items-start space-x-2 mb-2">
                          {message.isBot && (
                            <div className="w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Leaf className="w-3 h-3 text-sage" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            <span className={`text-xs ${message.isBot ? 'text-muted-foreground' : 'text-white/70'} mt-1 block`}>
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          {!message.isBot && (
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        
                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs border-sage/30 text-sage hover:bg-sage hover:text-white"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-sage/20 rounded-2xl p-3 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center">
                            <Leaf className="w-3 h-3 text-sage" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-sage rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input */}
                <div className="p-4 border-t border-sage/20 bg-white">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about Tibb remedies..."
                      className="flex-1 border-sage/30 focus:border-sage"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-sage hover:bg-dark-sage text-white p-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground text-center">
                    Powered by Traditional Medicine Knowledge Base
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
