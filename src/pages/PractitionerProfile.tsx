
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Video, 
  Phone,
  Clock,
  Award,
  Users,
  Heart,
  CheckCircle,
  ChevronLeft,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const PractitionerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock practitioner data - in real app, fetch based on ID
  const practitioner = {
    id: id,
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
    about: 'Experienced Hakeem specializing in traditional Unani medicine with modern diagnostic approaches. Dr. Ahmad Hassan has been practicing traditional medicine for over 15 years and has helped thousands of patients with various health conditions using natural remedies and holistic treatment approaches.',
    education: [
      'Bachelor of Unani Medicine & Surgery (BUMS) - Karachi University',
      'Diploma in Traditional Medicine - Pakistan Council of Traditional Medicine',
      'Advanced Certificate in Herbal Medicine'
    ],
    timings: {
      morning: '9:00 AM - 12:00 PM',
      evening: '2:00 PM - 8:00 PM'
    },
    address: 'Clifton Block 2, Karachi, Pakistan'
  };

  const handleBookConsultation = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book a consultation.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    navigate('/telemedicine', { state: { selectedPractitioner: practitioner } });
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah Khan',
      rating: 5,
      comment: 'Excellent treatment for my digestive issues. Dr. Hassan prescribed natural remedies that worked wonderfully.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Ali Ahmed',
      rating: 5,
      comment: 'Very knowledgeable and patient. Explained everything in detail and the herbal medicines really helped.',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Fatima Sheikh',
      rating: 4,
      comment: 'Good experience overall. The online consultation was smooth and convenient.',
      date: '2 months ago'
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Back Button */}
      <section className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/practitioners')}
            className="border-sage/30 text-sage hover:bg-sage hover:text-white mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Practitioners
          </Button>
        </div>
      </section>

      {/* Practitioner Profile */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <Card className="border-sage/20 bg-white mb-6">
                <CardHeader className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center">
                        <Users className="w-12 h-12 text-sage" />
                      </div>
                      {practitioner.verified && (
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-3xl font-bold text-foreground mb-2">
                            {practitioner.name}
                          </CardTitle>
                          <CardDescription className="text-sage font-medium text-lg">
                            {practitioner.specialty}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={practitioner.availability === 'Available Now' ? 'default' : 'secondary'}
                          className={`${practitioner.availability === 'Available Now' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                        >
                          {practitioner.availability}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="w-5 h-5" />
                          <span>{practitioner.city}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Award className="w-5 h-5" />
                          <span>{practitioner.experience} years experience</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span>{practitioner.rating} ({practitioner.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="w-5 h-5" />
                          <span>Usually responds in 1 hour</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-6">
                        {practitioner.onlineConsultation && (
                          <div className="flex items-center space-x-2 text-green-600">
                            <Video className="w-5 h-5" />
                            <span>Online</span>
                          </div>
                        )}
                        {practitioner.inPersonConsultation && (
                          <div className="flex items-center space-x-2 text-blue-600">
                            <Users className="w-5 h-5" />
                            <span>In-Person</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          className="bg-sage hover:bg-dark-sage text-white flex-1"
                          onClick={handleBookConsultation}
                        >
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Consultation - Rs. {practitioner.consultationFee}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-sage/30 text-sage hover:bg-sage hover:text-white"
                        >
                          <MessageSquare className="w-5 h-5 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* About Section */}
              <Card className="border-sage/20 bg-white mb-6">
                <CardHeader>
                  <CardTitle>About Dr. {practitioner.name.split(' ').pop()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {practitioner.about}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {practitioner.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-sage/30 text-sage">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Languages</h4>
                    <p className="text-muted-foreground">{practitioner.languages.join(', ')}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Education & Qualifications</h4>
                    <ul className="space-y-2">
                      {practitioner.education.map((edu, index) => (
                        <li key={index} className="flex items-start space-x-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card className="border-sage/20 bg-white">
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>
                    {practitioner.reviews} reviews with an average rating of {practitioner.rating}/5
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-sage/10 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="font-medium text-foreground">{review.name}</h5>
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-sage/20 bg-white mb-6">
                <CardHeader>
                  <CardTitle>Consultation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span className="font-bold text-sage text-lg">Rs. {practitioner.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">30 minutes</span>
                  </div>
                  <div className="border-t border-sage/10 pt-4">
                    <h4 className="font-medium text-foreground mb-2">Available Timings</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>Morning: {practitioner.timings.morning}</div>
                      <div>Evening: {practitioner.timings.evening}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sage/20 bg-white">
                <CardHeader>
                  <CardTitle>Clinic Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-sage mt-1" />
                    <div>
                      <p className="text-muted-foreground">{practitioner.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default PractitionerProfile;
