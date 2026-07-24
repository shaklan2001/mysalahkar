import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { ChannelStrip } from "@/components/home/ChannelStrip";
import { StatsStrip } from "@/components/home/StatsStrip";
import { PremiumPromo } from "@/components/home/PremiumPromo";
import { DomainGrid } from "@/components/home/DomainGrid";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { FirstConsultOffer } from "@/components/home/FirstConsultOffer";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CommunityPromo } from "@/components/home/CommunityPromo";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustLogosSection } from "@/components/home/TrustLogosSection";
import { BottomCTA } from "@/components/home/BottomCTA";

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <HeroSection />
      <ChannelStrip />
      <StatsStrip />
      <PremiumPromo />
      <DomainGrid />
      <WhyChooseSection />
      <FirstConsultOffer />
      <HowItWorksSection />
      <CommunityPromo />
      <TestimonialsSection />
      <TrustLogosSection />
      <BottomCTA />
    </>
  );
}
