
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Shield, TrendingUp, Stethoscope } from "lucide-react";

const ServicesSection = () => {
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

  return (
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
  );
};

export default ServicesSection;
