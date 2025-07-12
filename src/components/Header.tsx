
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Stethoscope, 
  Globe, 
  ChevronDown,
  Users,
  ShoppingBag,
  Video,
  BookOpen,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Find Hakeem', 
      path: '/practitioners',
      icon: Users,
      description: 'Search certified practitioners'
    },
    { 
      name: 'Telemedicine', 
      path: '/telemedicine',
      icon: Video,
      description: 'Online consultations'
    },
    { 
      name: 'Marketplace', 
      path: '/marketplace',
      icon: ShoppingBag,
      description: 'Herbal medicines & ingredients'
    },
    { 
      name: 'Learn', 
      path: '/blog',
      icon: BookOpen,
      description: 'Health tips & articles'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-sage/20 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center group-hover:bg-dark-sage transition-colors">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TibbCare</h1>
              <p className="text-xs text-muted-foreground -mt-1">Traditional Wellness</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-sage bg-sage/10'
                      : 'text-foreground hover:text-sage hover:bg-sage/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.description}
                </div>
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-2 border-sage/30 text-sage hover:bg-sage hover:text-white"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'عربی' : 'English'}</span>
            </Button>

            {/* Book Appointment */}
            <Button 
              className="hidden sm:inline-flex bg-sage hover:bg-dark-sage text-white"
              onClick={() => navigate('/telemedicine')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-sage/20 bg-white">
            <div className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-sage bg-sage/10'
                      : 'text-foreground hover:text-sage hover:bg-sage/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </button>
              ))}
              
              <div className="pt-4 border-t border-sage/20 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-sage/30 text-sage hover:bg-sage hover:text-white"
                  onClick={toggleLanguage}
                >
                  <Globe className="w-4 h-4 mr-3" />
                  Switch to {language === 'en' ? 'اردو' : 'English'}
                </Button>
                
                <Button 
                  className="w-full justify-start bg-sage hover:bg-dark-sage text-white"
                  onClick={() => {
                    navigate('/telemedicine');
                    setIsMenuOpen(false);
                  }}
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
