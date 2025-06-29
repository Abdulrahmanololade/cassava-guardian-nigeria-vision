import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Sprout, 
  Shield, 
  TrendingUp, 
  Stethoscope, 
  Phone, 
  MapPin, 
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const services = [
    {
      title: "Disease Identification",
      description: "Advanced AI-powered disease detection for accurate plant health assessment",
      icon: Stethoscope,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Pest Detection",
      description: "Early pest identification to prevent crop damage and yield loss",
      icon: Shield,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Disease Progression",
      description: "Monitor and track disease development over time",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Treatment Recommendation",
      description: "Customized treatment solutions for optimal crop recovery",
      icon: Sprout,
      color: "bg-green-100 text-green-600"
    }
  ];

  const reviews = [
    {
      name: "Adebayo Ogundimu",
      location: "Oyo State",
      rating: 5,
      text: "Cassava Guard helped me identify early blight on my cassava farm. The treatment recommendations saved my entire harvest!"
    },
    {
      name: "Fatima Mohammed",
      location: "Kwara State",
      text: "Amazing accuracy in pest detection. The app identified cassava mealybug before I could even see it clearly.",
      rating: 5
    },
    {
      name: "Chief Samuel Adeyemi",
      location: "Osun State",
      text: "As a large-scale cassava farmer, this tool is invaluable. Quick, accurate, and easy to use even in the field.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Advanced Agricultural Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Protect Your Cassava Crops with
            <span className="block text-yellow-300">AI-Powered Detection</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Advanced agricultural information system for detecting and controlling cassava pests and diseases. 
            Get instant analysis and treatment recommendations to maximize your harvest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/plant-analysis">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold">
                Start Plant Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Crop Protection Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology provides complete crop health monitoring and protection solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-gray-900">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-600 mb-2">Nigerian Helpline</p>
                <p className="text-2xl font-bold text-green-600">+234 803 123 4567</p>
                <p className="text-sm text-gray-500 mt-2">Available 24/7 for emergency crop issues</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-gray-900">Our Location</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-600 mb-2">Headquarters</p>
                <p className="text-xl font-semibold text-gray-900">Fountain University</p>
                <p className="text-lg text-gray-600">Osogbo, Osun State</p>
                <p className="text-sm text-gray-500 mt-2">Research & Development Center</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Farmers Across Nigeria
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about Cassava Guard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{review.name}</CardTitle>
                  <CardDescription className="text-green-600 font-medium">{review.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Protect Your Cassava Crops?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who trust Cassava Guard for their crop protection needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/plant-analysis">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold">
                <CheckCircle className="mr-2 h-5 w-5" />
                Start Free Analysis
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
