
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Protect Your Cassava Crops?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Join thousands of farmers who trust Cassava Guard for their crop protection needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth">
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
  );
};

export default CTASection;
