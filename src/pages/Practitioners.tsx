
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Video, 
  Phone,
  Clock,
  Award,
  Users,
  Filter,
  Heart,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

interface Practitioner {
  id: string;
  name: string;
  specialty: string;
  city: string;
  experience: number;
  rating: number;
  reviews: number;
  languages: string[];
  consultationFee: number;
  availability: string;
  image: string;
  verified: boolean;
  onlineConsultation: boolean;
  inPersonConsultation: boolean;
  specialties: string[];
  about: string;
}

const Practitioners = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const practitioners: Practitioner[] = [
    {
      id: '1',
      name: 'Hakeem Dr. Ahmad Hassan',
      specialty: 'General Medicine & Digestive Health',
      city: 'Karachi',
      experience: 15,
      rating: 4.9,
      reviews: 234,
      languages: ['Urdu', 'English', 'Sindhi'],
      consultationFee: 2000,
      availability: 'Available Today',
      image: '/placeholder.svg',
      verified: true,
      onlineConsultation: true,
      inPersonConsultation: true,
      specialties: ['Digestive Issues', 'Respiratory Problems', 'Joint Pain', 'Skin Conditions'],
      about: 'Experienced Hakeem specializing in traditional Unani medicine with modern diagnostic approaches.'
    },
    {
      id: '2',
      name: 'Hakeem Dr. Fatima Ali',
      specialty: "Women's Health & Pediatrics",
      city: 'Lahore',
      experience: 12,
      rating: 4.8,
      reviews: 189,
      languages: ['Urdu', 'English', 'Punjabi'],
      consultationFee: 1800,
      availability: 'Available Tomorrow',
      image: '/placeholder.svg',
      verified: true,
      onlineConsultation: true,
      inPersonConsultation: true,
      specialties: ['Women Health', 'Child Care', 'Pregnancy Care', 'Hormonal Issues'],
      about: 'Specialized in traditional remedies for women and children with 12+ years of practice.'
    },
    {
      id: '3',
      name: 'Hakeem Dr. Muhammad Yusuf',
      specialty: 'Cardiac & Mental Health',
      city: 'Islamabad',
      experience: 20,
      rating: 4.9,
      reviews: 312,
      languages: ['Urdu', 'English', 'Arabic'],
      consultationFee: 2500,
      availability: 'Available Now',
      image: '/placeholder.svg',
      verified: true,
      onlineConsultation: true,
      inPersonConsultation: false,
      specialties: ['Heart Conditions', 'Anxiety & Stress', 'Blood Pressure', 'Sleep Disorders'],
      about: 'Senior Hakeem with expertise in cardiovascular and mental health through Tibb-e-Unani.'
    },
    {
      id: '4',
      name: 'Hakeem Dr. Zainab Malik',
      specialty: 'Dermatology & Beauty',
      city: 'Karachi',
      experience: 8,
      rating: 4.7,
      reviews: 156,
      languages: ['Urdu', 'English'],
      consultationFee: 1500,
      availability: 'Available Today',
      image: '/placeholder.svg',
      verified: true,
      onlineConsultation: true,
      inPersonConsultation: true,
      specialties: ['Skin Problems', 'Hair Loss', 'Acne Treatment', 'Beauty Enhancement'],
      about: 'Expert in herbal treatments for skin and beauty enhancement using natural remedies.'
    },
    {
      id: '5',
      name: 'Hakeem Dr. Imran Sheikh',
      specialty: 'Orthopedic & Pain Management',
      city: 'Faisalabad',
      experience: 18,
      rating: 4.8,
      reviews: 203,
      languages: ['Urdu', 'Punjabi'],
      consultationFee: 2200,
      availability: 'Available Tomorrow',
      image: '/placeholder.svg',
      verified: true,
      onlineConsultation: false,
      inPersonConsultation: true,
      specialties: ['Joint Pain', 'Back Pain', 'Arthritis', 'Sports Injuries'],
      about: 'Specialist in bone and joint health with traditional massage and herbal therapies.'
    },
    {
      id: '6',
      name: 'Hakeem Dr. Ayesha Qureshi',
      specialty: 'Nutrition & Weight Management',
      city: 'Lahore',
      experience: 10,
      rating: 4.6,
      reviews: 128,
      languages: ['Urdu', 'English'],
      consultationFee: 1600,
      availability: 'Available Today',
      image: '/placeholder.svg',
      verified: true,
      onlineConsultation: true,
      inPersonConsultation: true,
      specialties: ['Weight Loss', 'Diabetes', 'Diet Planning', 'Metabolic Disorders'],
      about: 'Certified nutritionist combining modern dietary science with traditional Tibb principles.'
    }
  ];

  const cities = ['all', 'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi'];
  const specialties = ['all', 'General Medicine', 'Women\'s Health', 'Cardiac Health', 'Dermatology', 'Orthopedic', 'Nutrition'];

  const filteredPractitioners = practitioners.filter(practitioner => {
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCity = selectedCity === 'all' || practitioner.city === selectedCity;
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            practitioner.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    
    return matchesSearch && matchesCity && matchesSpecialty;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      case 'fee':
        return a.consultationFee - b.consultationFee;
      default:
        return 0;
    }
  });

  const handleBookConsultation = (practitioner: Practitioner) => {
    navigate('/telemedicine', { state: { selectedPractitioner: practitioner } });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 bg-gradient-to-br from-sage/10 to-earth/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Your <span className="text-sage">Trusted Hakeem</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with verified traditional medicine practitioners across Pakistan. 
              Book online or in-person consultations with certified Hakeems.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-sage/30 focus:border-sage"
                />
              </div>
              
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="border-sage/30 focus:border-sage">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="border-sage/30 focus:border-sage">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-sage/30 focus:border-sage">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="fee">Lowest Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredPractitioners.length} Hakeems Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Showing verified practitioners only</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPractitioners.map((practitioner) => (
              <Card key={practitioner.id} className="group hover:shadow-xl transition-all duration-300 border-sage/20 bg-white">
                <CardHeader className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-sage" />
                      </div>
                      {practitioner.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-sage transition-colors">
                            {practitioner.name}
                          </CardTitle>
                          <CardDescription className="text-sage font-medium mt-1">
                            {practitioner.specialty}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={practitioner.availability === 'Available Now' ? 'default' : 'secondary'}
                          className={practitioner.availability === 'Available Now' ? 'bg-green-500' : 'bg-yellow-500'}
                        >
                          {practitioner.availability}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{practitioner.city}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{practitioner.experience} years</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{practitioner.rating} ({practitioner.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {practitioner.about}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {practitioner.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-sage/30 text-sage">
                          {specialty}
                        </Badge>
                      ))}
                      {practitioner.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs border-sage/30 text-sage">
                          +{practitioner.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">Languages: </span>
                    <span className="text-sm font-medium text-foreground">
                      {practitioner.languages.join(', ')}
                    </span>
                  </div>

                  {/* Consultation Options & Fee */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {practitioner.onlineConsultation && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Video className="w-4 h-4" />
                          <span className="text-sm">Online</span>
                        </div>
                      )}
                      {practitioner.inPersonConsultation && (
                        <div className="flex items-center space-x-1 text-blue-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">In-Person</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-sage">Rs. {practitioner.consultationFee}</div>
                      <div className="text-xs text-muted-foreground">per consultation</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      className="flex-1 bg-sage hover:bg-dark-sage text-white"
                      onClick={() => handleBookConsultation(practitioner)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-sage/30 text-sage hover:bg-sage hover:text-white"
                      onClick={() => navigate(`/practitioner/${practitioner.id}`)}
                    >
                      View Profile
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPractitioners.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-sage" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">No Hakeems Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or browse all available practitioners.
              </p>
              <Button 
                variant="outline" 
                className="border-sage text-sage hover:bg-sage hover:text-white"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('all');
                  setSelectedSpecialty('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Practitioners;
