
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageSquare,
  User,
  MapPin,
  ChevronRight,
  Plus
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const MyAppointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Mock appointments data
  const appointments = {
    upcoming: [
      {
        id: '1',
        practitioner: 'Hakeem Dr. Ahmad Hassan',
        specialty: 'General Medicine',
        date: '2025-07-20',
        time: '2:00 PM',
        type: 'video',
        status: 'confirmed',
        fee: 2000
      },
      {
        id: '2',
        practitioner: 'Hakeem Dr. Fatima Ali',
        specialty: 'Women\'s Health',
        date: '2025-07-25',
        time: '10:00 AM',
        type: 'audio',
        status: 'pending',
        fee: 1800
      }
    ],
    past: [
      {
        id: '3',
        practitioner: 'Hakeem Dr. Muhammad Yusuf',
        specialty: 'Cardiac Health',
        date: '2025-07-10',
        time: '3:30 PM',
        type: 'video',
        status: 'completed',
        fee: 2500
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'audio':
        return Phone;
      case 'chat':
        return MessageSquare;
      default:
        return Video;
    }
  };

  const AppointmentCard = ({ appointment, isPast = false }: { appointment: any; isPast?: boolean }) => {
    const ConsultationIcon = getConsultationIcon(appointment.type);
    
    return (
      <Card className="border-sage/20 bg-white hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-sage" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{appointment.practitioner}</h3>
                <p className="text-sage text-sm">{appointment.specialty}</p>
              </div>
            </div>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <ConsultationIcon className="w-4 h-4" />
              <span className="capitalize">{appointment.type} Consultation</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span className="text-sage font-medium">Rs. {appointment.fee}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            {!isPast && appointment.status === 'confirmed' && (
              <Button className="bg-sage hover:bg-dark-sage text-white">
                <Video className="w-4 h-4 mr-2" />
                Join Consultation
              </Button>
            )}
            {!isPast && appointment.status === 'pending' && (
              <Button variant="outline" className="border-sage/30 text-sage hover:bg-sage hover:text-white">
                Reschedule
              </Button>
            )}
            <Button 
              variant="outline" 
              className="border-sage/30 text-sage hover:bg-sage hover:text-white"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Appointments</h1>
              <p className="text-muted-foreground">Manage your consultations and bookings</p>
            </div>
            <Button 
              className="bg-sage hover:bg-dark-sage text-white"
              onClick={() => navigate('/practitioners')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Book New Consultation
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 border border-sage/20 w-fit">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-sage text-white'
                  : 'text-muted-foreground hover:text-sage'
              }`}
            >
              Upcoming ({appointments.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-sage text-white'
                  : 'text-muted-foreground hover:text-sage'
              }`}
            >
              Past ({appointments.past.length})
            </button>
          </div>

          {/* Appointments List */}
          <div className="space-y-6">
            {activeTab === 'upcoming' ? (
              appointments.upcoming.length > 0 ? (
                appointments.upcoming.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <Card className="border-sage/20 bg-white">
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-sage/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Appointments</h3>
                    <p className="text-muted-foreground mb-6">
                      You don't have any scheduled consultations. Book your first appointment with a trusted Hakeem.
                    </p>
                    <Button 
                      className="bg-sage hover:bg-dark-sage text-white"
                      onClick={() => navigate('/practitioners')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              )
            ) : (
              appointments.past.length > 0 ? (
                appointments.past.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} isPast />
                ))
              ) : (
                <Card className="border-sage/20 bg-white">
                  <CardContent className="p-12 text-center">
                    <Clock className="w-16 h-16 text-sage/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Past Appointments</h3>
                    <p className="text-muted-foreground">
                      Your consultation history will appear here once you complete your first appointment.
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyAppointments;
