
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Globe,
  Heart,
  Shield,
  Award,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Find a Hakeem', path: '/practitioners' },
    { name: 'Telemedicine', path: '/telemedicine' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Health Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'Online Consultations', path: '/telemedicine' },
    { name: 'Herbal Medicines', path: '/marketplace' },
    { name: 'Health Assessments', path: '/assessments' },
    { name: 'Wellness Plans', path: '/wellness' },
    { name: 'Emergency Care', path: '/emergency' },
    { name: 'Nutrition Guidance', path: '/nutrition' }
  ];

  const trustIndicators = [
    { icon: Shield, text: 'Certified Practitioners' },
    { icon: Award, text: 'Quality Assured' },
    { icon: Clock, text: '24/7 Support' },
    { icon: Heart, text: 'Patient First' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-sage/20">
      {/* Trust Indicators */}
      <div className="bg-sage/5 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-3 text-center md:text-left">
                <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <indicator.icon className="w-5 h-5 text-sage" />
                </div>
                <span className="text-sm font-medium text-foreground">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">TibbCare</h1>
                <p className="text-sm text-muted-foreground">Traditional Wellness</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Bridging traditional Desi medicine with modern healthcare technology. 
              Your trusted platform for authentic Tibb consultations and herbal remedies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-sage flex-shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-sage flex-shrink-0" />
                <span>support@tibbcare.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-sage flex-shrink-0" />
                <span>Karachi, Lahore, Islamabad</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-sage/30 hover:bg-sage hover:text-white">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-sage/30 hover:bg-sage hover:text-white">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-sage/30 hover:bg-sage hover:text-white">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-muted-foreground hover:text-sage transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(service.path)}
                    className="text-muted-foreground hover:text-sage transition-colors text-sm"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest health tips, herbal remedies, and wellness guidance delivered to your inbox.
            </p>
            
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="border-sage/30 focus:border-sage"
              />
              <Button className="w-full bg-sage hover:bg-dark-sage text-white">
                Subscribe to Newsletter
              </Button>
            </div>

            <div className="mt-6 p-4 bg-sage/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4 text-sage" />
                <span className="text-sm font-medium text-foreground">Available Languages</span>
              </div>
              <p className="text-xs text-muted-foreground">
                English, اردو, العربية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sage/20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} TibbCare. All rights reserved. | Traditional Medicine Platform
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-muted-foreground hover:text-sage transition-colors">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-sage transition-colors">
                Terms of Service
              </button>
              <button className="text-muted-foreground hover:text-sage transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
