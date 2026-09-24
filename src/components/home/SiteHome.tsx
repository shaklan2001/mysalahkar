import { HeroSection } from "@/components/home/HeroSection";
import { DigestTicker } from "@/components/home/DigestTicker";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { FeaturedAgents } from "@/components/home/FeaturedAgents";
import { QuietTrust } from "@/components/home/QuietTrust";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { BottomCTA } from "@/components/home/BottomCTA";
import { ProfessionalsPromo } from "@/components/home/ProfessionalsPromo";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";

export function SiteHome() {
  return (
    <>
      <DigestTicker />
      <HeroSection />
      <ServiceCategories />
      <FeaturedAgents />
      <QuietTrust />
      <TestimonialsSection />
      <ProfessionalsPromo />
      <PrinciplesSection />
      <FaqSection />
      <BottomCTA />
    </>
  );
}
