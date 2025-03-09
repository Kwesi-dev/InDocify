import { Footer } from "@/components/footer";
import HeroSection from "@/components/landing-page/hero-section";
import { NavBar } from "@/components/landing-page/nav-bar";
import StorySection from "@/components/landing-page/story-section";
import AuthButtons from "@/components/auth-buttons";
import PricingSectionServer from "@/components/landing-page/pricing-section-server";

export default async function Page() {
  return (
    <main>
      <NavBar authButtons={<AuthButtons />} />
      <HeroSection />
      <StorySection />
      <PricingSectionServer />
      <Footer />
    </main>
  );
}
