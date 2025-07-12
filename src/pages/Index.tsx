
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  MessageCircle, 
  Users, 
  ShoppingBag, 
  Calendar, 
  BookOpen,
  Star,
  Shield,
  Clock,
  Award,
  Heart,
  Leaf,
  Phone,
  Video,
  Search,
  ChevronRight,
  CheckCircle,
  Globe
} from 'lucide-react';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "AI Tibb Assistant",
      description: "Get instant guidance on Desi medicine and herbal remedies from our intelligent assistant",
      action: () => console.log("Open chat")
    },
    {
      icon: Users,
      title: "Find a Hakeem",
      description: "Connect with certified traditional medicine practitioners in your area",
      action: () => navigate('/practitioners')
    },
    {
      icon: Video,
      title: "Telemedicine",
      description: "Secure online consultations with experienced Hakeems from home",
      action: () => navigate('/telemedicine')
    },
    {
      icon: ShoppingBag,
      title: "Herbal Marketplace",
      description: "Shop authentic Desi medicines and herbal ingredients with detailed guidance",
      action: () => navigate('/marketplace')
    }
  ];

  const stats = [
    { number: "500+", label: "Certified Hakeems" },
    { number: "10,000+", label: "Happy Patients" },
    { number: "2,500+", label: "Herbal Products" },
    { number: "50+", label: "Cities Covered" }
  ];

  const testimonials = [
    {
      name: "Dr. Ahmed Khan",
      role: "Certified Hakeem",
      content: "This platform has revolutionized how I connect with patients seeking traditional healing.",
      rating: 5
    },
    {
      name: "Fatima Ali",
      role: "Patient",
      content: "Found the perfect herbal treatment for my condition. The guidance was exceptional.",
      rating: 5
    },
    {
      name: "Mohammad Hassan",
      role: "Practitioner",
      content: "The telemedicine feature allows me to help patients across the country effectively.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/10 to-earth/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-6">
                <Badge variant="secondary" className="bg-sage/20 text-sage border-sage/30">
                  <Leaf className="w-3 h-3 mr-1" />
                  Traditional Healing Reimagined
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your Gateway to{' '}
                <span className="text-sage bg-gradient-to-r from-sage to-dark-sage bg-clip-text text-transparent">
                  Authentic Tibb
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Connect with certified Hakeems, explore traditional remedies, and embrace holistic wellness 
                through our comprehensive digital healthcare platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-sage hover:bg-dark-sage text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate('/practitioners')}
                >
                  Find a Hakeem
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-sage text-sage hover:bg-sage hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300"
                  onClick={() => navigate('/marketplace')}
                >
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Explore Medicines
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center animate-float">
                  <Heart className="w-12 h-12 text-sage" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-sage" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Holistic Care</h3>
                      <p className="text-sm text-muted-foreground">Mind, Body & Soul</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm italic">"Transformed my approach to wellness through traditional wisdom"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-sage mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for{' '}
              <span className="text-sage">Traditional Wellness</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform brings together centuries of traditional healing wisdom 
              with modern technology for accessible, authentic healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white hover:bg-sage/5 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={feature.action}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sage group-hover:text-white transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-sage group-hover:text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-sage transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by <span className="text-sage">Healthcare Professionals</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community of practitioners and patients have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-sage/5 border-sage/20 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-sage" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sage to-dark-sage text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands who have discovered the power of traditional medicine combined with modern convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-sage hover:bg-cream px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/practitioners')}
            >
              Get Started Today
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-sage px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Index;
