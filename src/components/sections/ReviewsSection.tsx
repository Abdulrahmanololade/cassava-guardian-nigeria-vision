
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const ReviewsSection = () => {
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
  );
};

export default ReviewsSection;
