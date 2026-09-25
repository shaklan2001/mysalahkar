import { Metadata } from "next";
import { DailyDigestView } from "@/components/digest/DailyDigestView";

export const metadata: Metadata = {
  title: "Daily Digest",
  description:
    "AI-curated daily compliance updates from GST, Income Tax, ROC, SEBI, RBI, and MCA — plus top global headlines.",
};

export default function DailyDigestPage() {
  return <DailyDigestView communityHref="/community" />;
}
