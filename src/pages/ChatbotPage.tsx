
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  User,
  Send,
  Leaf,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
  MessageSquare,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  feedback?: 'good' | 'bad' | null;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActive: Date;
}

const ChatbotPage = () => {
  const { user } = useAuth();
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setChatHistory(parsedHistory.map((session: any) => ({
        ...session,
        lastActive: new Date(session.lastActive),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      })));
    }

    // Create initial session if none exists
    if (!currentSession) {
      createNewSession();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [{
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
      }],
      lastActive: new Date()
    };

    setCurrentSession(newSession);
    const updatedHistory = [newSession, ...chatHistory];
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
  };

  const saveChatHistory = (history: ChatSession[]) => {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  };

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
    if (!currentSession) return;
    
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    const updatedMessages = [...currentSession.messages, userMessage];
    const updatedSession = {
      ...currentSession,
      messages: updatedMessages,
      lastActive: new Date(),
      title: currentSession.title === 'New Chat' ? messageText.slice(0, 30) + '...' : currentSession.title
    };

    setCurrentSession(updatedSession);
    updateSessionInHistory(updatedSession);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      const finalMessages = [...updatedMessages, botResponse];
      const finalSession = {
        ...updatedSession,
        messages: finalMessages,
        lastActive: new Date()
      };

      setCurrentSession(finalSession);
      updateSessionInHistory(finalSession);
      setIsTyping(false);
    }, 1500);
  };

  const updateSessionInHistory = (updatedSession: ChatSession) => {
    const updatedHistory = chatHistory.map(session => 
      session.id === updatedSession.id ? updatedSession : session
    );
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
  };

  const handleFeedback = (messageId: string, feedback: 'good' | 'bad') => {
    if (!currentSession) return;

    const updatedMessages = currentSession.messages.map(msg =>
      msg.id === messageId ? { ...msg, feedback } : msg
    );

    const updatedSession = { ...currentSession, messages: updatedMessages };
    setCurrentSession(updatedSession);
    updateSessionInHistory(updatedSession);

    toast({
      title: "Feedback received",
      description: `Thank you for your ${feedback === 'good' ? 'positive' : 'constructive'} feedback!`,
    });
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Message copied to clipboard",
    });
  };

  const handleRegenerateResponse = (messageIndex: number) => {
    if (!currentSession || messageIndex <= 0) return;

    const userMessage = currentSession.messages[messageIndex - 1];
    if (!userMessage || userMessage.isBot) return;

    // Remove the bot response and regenerate
    const messagesUpToUser = currentSession.messages.slice(0, messageIndex);
    const updatedSession = { ...currentSession, messages: messagesUpToUser };
    setCurrentSession(updatedSession);
    setIsTyping(true);

    setTimeout(() => {
      const newBotResponse = generateBotResponse(userMessage.text);
      const finalMessages = [...messagesUpToUser, newBotResponse];
      const finalSession = { ...updatedSession, messages: finalMessages };
      
      setCurrentSession(finalSession);
      updateSessionInHistory(finalSession);
      setIsTyping(false);
    }, 1500);
  };

  const selectSession = (session: ChatSession) => {
    setCurrentSession(session);
  };

  const deleteSession = (sessionId: string) => {
    const updatedHistory = chatHistory.filter(session => session.id !== sessionId);
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);

    if (currentSession?.id === sessionId) {
      if (updatedHistory.length > 0) {
        setCurrentSession(updatedHistory[0]);
      } else {
        createNewSession();
      }
    }

    toast({
      title: "Chat deleted",
      description: "Chat session has been deleted",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="pt-16 flex h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-sage/20 overflow-hidden`}>
          <div className="p-4 border-b border-sage/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
              <Button
                onClick={createNewSession}
                size="sm"
                className="bg-sage hover:bg-dark-sage text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {chatHistory.map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                    currentSession?.id === session.id
                      ? 'bg-sage/10 border border-sage/20'
                      : 'hover:bg-sage/5'
                  }`}
                  onClick={() => selectSession(session)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-sage flex-shrink-0" />
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {session.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(session.lastActive)} • {session.messages.length} messages
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-sage/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-muted-foreground"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Tibb Assistant</h1>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {currentSession && (
              <div className="space-y-4 max-w-4xl mx-auto">
                {currentSession.messages.map((message, index) => (
                  <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] ${message.isBot ? 'bg-white border border-sage/20' : 'bg-sage text-white'} rounded-2xl p-4 shadow-sm`}>
                      <div className="flex items-start space-x-3 mb-2">
                        {message.isBot && (
                          <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Leaf className="w-4 h-4 text-sage" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <span className={`text-xs ${message.isBot ? 'text-muted-foreground' : 'text-white/70'} mt-2 block`}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        {!message.isBot && (
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Bot message actions */}
                      {message.isBot && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-sage/10">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`p-2 ${message.feedback === 'good' ? 'text-green-600 bg-green-50' : 'text-muted-foreground hover:text-green-600'}`}
                              onClick={() => handleFeedback(message.id, 'good')}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`p-2 ${message.feedback === 'bad' ? 'text-red-600 bg-red-50' : 'text-muted-foreground hover:text-red-600'}`}
                              onClick={() => handleFeedback(message.id, 'bad')}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 text-muted-foreground hover:text-foreground"
                              onClick={() => handleCopyMessage(message.text)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 text-muted-foreground hover:text-foreground"
                              onClick={() => handleRegenerateResponse(index)}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs border-sage/30 text-sage hover:bg-sage hover:text-white"
                              onClick={() => handleSendMessage(suggestion)}
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
                    <div className="bg-white border border-sage/20 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                          <Leaf className="w-4 h-4 text-sage" />
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
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 bg-white border-t border-sage/20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3">
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
                  className="bg-sage hover:bg-dark-sage text-white px-6"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground text-center">
                Powered by Traditional Medicine Knowledge Base
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
