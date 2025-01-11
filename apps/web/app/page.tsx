import FeaturesSection from "@/components/landing-page/features-section";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
