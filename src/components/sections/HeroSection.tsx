
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
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
          <Link to="/auth">
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
  );
};

export default HeroSection;
