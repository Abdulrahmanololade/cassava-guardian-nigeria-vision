
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin } from "lucide-react";

const ContactInfoSection = () => {
  const handlePhoneCall = () => {
    window.location.href = "tel:+2349150821405";
  };

  return (
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
              <button 
                onClick={handlePhoneCall}
                className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors cursor-pointer underline decoration-transparent hover:decoration-current"
                aria-label="Call +234 915 082 1405"
              >
                +234 915 082 1405
              </button>
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
  );
};

export default ContactInfoSection;
