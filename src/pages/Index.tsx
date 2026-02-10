import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import DesignedForRealLifeSection from "@/components/home/DesignedForRealLifeSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import WhyNotHotelSection from "@/components/home/WhyNotHotelSection";
import PropertiesPreview from "@/components/home/PropertiesPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PhilosophySection />
      <DesignedForRealLifeSection />
      <FeaturesSection />
      <WhyNotHotelSection />
      <PropertiesPreview />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
