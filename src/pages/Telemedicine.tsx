
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Video, 
  Phone, 
  MessageSquare,
  Clock,
  Star,
  Shield,
  Users,
  CheckCircle,
  AlertCircle,
  Heart,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

const Telemedicine = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPractitioner = location.state?.selectedPractitioner;

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    symptoms: '',
    medicalHistory: '',
    urgency: 'routine'
  });

  const consultationTypes = [
    {
      id: 'video',
      name: 'Video Consultation',
      icon: Video,
      description: 'Face-to-face consultation via video call',
      duration: '30 minutes',
      price: 2000
    },
    {
      id: 'audio',
      name: 'Audio Call',
      icon: Phone,  
      description: 'Voice-only consultation call',
      duration: '20 minutes',
      price: 1500
    },
    {
      id: 'chat',
      name: 'Text Consultation',
      icon: MessageSquare,
      description: 'Written consultation via secure chat',
      duration: '24 hours response',
      price: 1000
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  const urgencyLevels = [
    { value: 'routine', label: 'Routine Consultation', color: 'bg-green-100 text-green-800' },
    { value: 'urgent', label: 'Urgent (Within 24 hours)', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'emergency', label: 'Emergency (Immediate)', color: 'bg-red-100 text-red-800' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking Details:', {
      practitioner: selectedPractitioner?.name || 'General Consultation',
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      details: bookingDetails
    });
    
    setStep(4); // Move to confirmation step
  };

  const getCurrentStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Choose Consultation Type</h2>
              <p className="text-muted-foreground">Select your preferred method of consultation</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {consultationTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    consultationType === type.id 
                      ? 'border-sage bg-sage/5 shadow-lg' 
                      : 'border-sage/20 hover:border-sage/40'
                  }`}
                  onClick={() => setConsultationType(type.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      consultationType === type.id ? 'bg-sage text-white' : 'bg-sage/20 text-sage'
                    }`}>
                      <type.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{type.duration}</span>
                      </div>
                      <div className="text-2xl font-bold text-sage">Rs. {type.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                className="bg-sage hover:bg-dark-sage text-white px-8"
                onClick={() => setStep(2)}
                disabled={!consultationType}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Select Date & Time</h2>
              <p className="text-muted-foreground">Choose your preferred appointment slot</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-sage/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-sage" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border border-sage/20"
                  />
                </CardContent>
              </Card>

              <Card className="border-sage/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-sage" />
                    Available Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          className={`${
                            selectedTime === time 
                              ? 'bg-sage text-white' 
                              : 'border-sage/30 text-sage hover:bg-sage hover:text-white'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Please select a date first</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="border-sage/30 text-sage hover:bg-sage hover:text-white"
              >
                Back
              </Button>
              <Button 
                className="bg-sage hover:bg-dark-sage text-white"
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Patient Information</h2>
              <p className="text-muted-foreground">Please provide your details for the consultation</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-sage/20">
                <CardHeader>
                  <CardTitle className="text-lg">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label>
                    <Input
                      value={bookingDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="border-sage/30 focus:border-sage"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email Address *</label>
                    <Input
                      type="email"
                      value={bookingDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="border-sage/30 focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone Number *</label>
                    <Input
                      value={bookingDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+92 300 1234567"
                      className="border-sage/30 focus:border-sage"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Age</label>
                      <Input
                        type="number"
                        value={bookingDetails.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="25"
                        className="border-sage/30 focus:border-sage"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Gender</label>
                      <Select value={bookingDetails.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className="border-sage/30 focus:border-sage">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sage/20">
                <CardHeader>
                  <CardTitle className="text-lg">Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Current Symptoms *</label>
                    <Textarea
                      value={bookingDetails.symptoms}
                      onChange={(e) => handleInputChange('symptoms', e.target.value)}
                      placeholder="Describe your current symptoms or health concerns..."
                      className="border-sage/30 focus:border-sage min-h-20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Medical History</label>
                    <Textarea
                      value={bookingDetails.medicalHistory}
                      onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                      placeholder="Any relevant medical history, allergies, or current medications..."
                      className="border-sage/30 focus:border-sage min-h-20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Urgency Level</label>
                    <div className="space-y-2">
                      {urgencyLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => handleInputChange('urgency', level.value)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            bookingDetails.urgency === level.value
                              ? 'border-sage bg-sage/10'
                              : 'border-sage/20 hover:border-sage/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{level.label}</span>
                            <Badge className={level.color}>
                              {level.value}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="border-sage/30 text-sage hover:bg-sage hover:text-white"
              >
                Back
              </Button>
              <Button 
                className="bg-sage hover:bg-dark-sage text-white"
                onClick={handleBooking}
                disabled={!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.symptoms}
              >
                Book Consultation
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Consultation Booked Successfully!</h2>
              <p className="text-xl text-muted-foreground">Your appointment has been confirmed</p>
            </div>

            <Card className="max-w-2xl mx-auto border-sage/20 bg-sage/5">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                    <p className="font-semibold text-foreground">
                      {selectedDate?.toLocaleDateString()} at {selectedTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Consultation Type</label>
                    <p className="font-semibold text-foreground capitalize">{consultationType} Call</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Patient Name</label>
                    <p className="font-semibold text-foreground">{bookingDetails.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact</label>
                    <p className="font-semibold text-foreground">{bookingDetails.phone}</p>
                  </div>
                </div>
                
                <div className="border-t border-sage/20 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-sage">
                      Rs. {consultationTypes.find(t => t.id === consultationType)?.price}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>You will receive a confirmation email and SMS shortly</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-sage hover:bg-dark-sage text-white"
                  onClick={() => navigate('/my-appointments')}
                >
                  View My Appointments
                </Button>
                <Button 
                  variant="outline" 
                  className="border-sage/30 text-sage hover:bg-sage hover:text-white"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 bg-gradient-to-br from-sage/10 to-earth/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Online <span className="text-sage">Telemedicine</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with experienced Hakeems from the comfort of your home. 
            Secure, convenient, and authentic traditional medicine consultations.
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-sage text-white' 
                    : 'bg-sage/20 text-sage'
                }`}>
                  {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step > stepNumber ? 'bg-sage' : 'bg-sage/20'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            Step {step} of 4: {
              step === 1 ? 'Choose Consultation Type' :
              step === 2 ? 'Select Date & Time' :
              step === 3 ? 'Patient Information' :
              'Confirmation'
            }
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {getCurrentStepContent()}
        </div>
      </section>

      {/* Features Section */}
      {step < 4 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Our <span className="text-sage">Telemedicine Service?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">End-to-end encrypted consultations ensuring complete privacy and confidentiality.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Certified Hakeems</h3>
                <p className="text-muted-foreground">Consult with verified traditional medicine practitioners with years of experience.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Holistic Care</h3>
                <p className="text-muted-foreground">Comprehensive treatment approach focusing on mind, body, and spiritual wellness.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Telemedicine;
