import { Metadata } from "next";
import { LearningHero } from "@/components/learning/LearningHero";
import { LearningContent } from "@/components/learning/LearningContent";
import { LearningSidebar } from "@/components/learning/LearningSidebar";

export const metadata: Metadata = {
  title: "Professional Learning | My Salahkar",
  description:
    "Master taxation, corporate law, compliance, and financial management with expert-led courses. Live workshops and recorded sessions from India's top professionals.",
};

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <LearningHero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <LearningContent />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <LearningSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
