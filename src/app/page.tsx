import { HeroSection } from "@/components/home/HeroSection";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";
import { FeaturedAgents } from "@/components/home/FeaturedAgents";
import { QuietTrust } from "@/components/home/QuietTrust";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { BottomCTA } from "@/components/home/BottomCTA";
import { ProfessionalsPromo } from "@/components/home/ProfessionalsPromo";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceCategories />
      <PrinciplesSection />
      <FeaturedAgents />
      <QuietTrust />
      <TestimonialsSection />
      <ProfessionalsPromo />
      <FaqSection />
      <BottomCTA />
    </>
  );
}
