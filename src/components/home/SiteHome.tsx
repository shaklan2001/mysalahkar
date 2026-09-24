import { HomeHero } from "@/components/home/HomeHero";
import { CoverageStrip } from "@/components/home/CoverageStrip";
import { PlatformSides } from "@/components/home/PlatformSides";
import { FeatureBento } from "@/components/home/FeatureBento";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ExpertsShowcase } from "@/components/home/ExpertsShowcase";
import { ProfessionalsSection } from "@/components/home/ProfessionalsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export function SiteHome() {
  return (
    <>
      <HomeHero />
      <CoverageStrip />
      <PlatformSides />
      <FeatureBento />
      <ClientsSection />
      <ExpertsShowcase />
      <div className="section-pad">
        <ProfessionalsSection />
      </div>
      <TestimonialsSection />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
