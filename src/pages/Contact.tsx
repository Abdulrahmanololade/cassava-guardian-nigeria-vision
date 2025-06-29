
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Star, 
  Send,
  Clock,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    review: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    });
    setFormData({ name: "", email: "", rating: 5, review: "" });
  };

  const existingReviews = [
    {
      name: "Dr. Aisha Bello",
      location: "Agricultural Extension Officer, Kaduna",
      rating: 5,
      date: "2 weeks ago",
      text: "Exceptional accuracy in pest identification. The app has revolutionized how we approach cassava disease management in our region. Highly recommend to all agricultural professionals."
    },
    {
      name: "Musa Ibrahim",
      location: "Commercial Farmer, Niger State",
      rating: 5,
      date: "1 month ago",
      text: "Saved my 10-hectare cassava farm from total loss. Early detection of cassava brown streak disease helped me take immediate action. The treatment recommendations were spot-on!"
    },
    {
      name: "Prof. Olumide Adebayo",
      location: "University of Ibadan, Plant Pathology",
      rating: 5,
      date: "3 weeks ago",
      text: "Outstanding research-backed recommendations. The AI accuracy matches our laboratory findings. This tool is invaluable for both researchers and farmers."
    },
    {
      name: "Blessing Okoro",
      location: "Women Farmers Association, Enugu",
      rating: 4,
      date: "2 months ago",
      text: "User-friendly interface perfect for field use. The offline capability is great for remote areas. Has helped our cooperative improve crop yields significantly."
    },
    {
      name: "Engr. Taiwo Ogundimu",
      location: "Agtech Consultant, Lagos",
      rating: 5,
      date: "1 week ago",
      text: "The most comprehensive agricultural AI tool I've encountered. Integration of disease progression tracking is brilliant. Perfect for precision agriculture applications."
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Cassava Guard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our agricultural experts and join our community of satisfied farmers
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600 mb-2">+234 803 123 4567</p>
              <p className="text-sm text-gray-500 mb-2">24/7 Emergency Hotline</p>
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Always Available
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-gray-900 mb-1">Fountain University</p>
              <p className="text-gray-600 mb-2">Osogbo, Osun State</p>
              <p className="text-gray-600 mb-2">Nigeria</p>
              <Badge variant="outline" className="text-xs">
                Research Center
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900 mb-2">support@cassavaguard.ng</p>
              <p className="text-sm text-gray-500 mb-2">Technical Support</p>
              <Badge variant="outline" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                Expert Team
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {existingReviews.map((review, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {review.name}
                        </CardTitle>
                        <CardDescription className="text-green-600 font-medium">
                          {review.location}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.date}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Review Submission Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Share Your Experience
            </h2>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Submit Your Review</CardTitle>
                <CardDescription>
                  Help other farmers by sharing your experience with Cassava Guard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= formData.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        ({formData.rating} star{formData.rating !== 1 ? 's' : ''})
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <Textarea
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      placeholder="Share your experience with Cassava Guard..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
