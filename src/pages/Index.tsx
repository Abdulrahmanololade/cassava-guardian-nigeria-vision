
import HeroSection from "@/components/sections/HeroSection";
import AITechnologySection from "@/components/sections/AITechnologySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactInfoSection from "@/components/sections/ContactInfoSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AITechnologySection />
      <ServicesSection />
      <ContactInfoSection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
};

export default Index;
