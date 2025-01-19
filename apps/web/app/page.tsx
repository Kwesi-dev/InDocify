import FeaturesSection from "@/components/landing-page/features-section";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import StorySection from "@/components/landing-page/story-section";

export default async function Page() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <StorySection />
      <PricingSection />
      <Footer />
    </main>
  );
}
