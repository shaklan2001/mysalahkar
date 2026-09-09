import type { Metadata } from "next";
import { SignupWizard } from "@/components/professionals/SignupWizard";

export const metadata: Metadata = {
  title: "Create your AI consultant",
  description:
    "Apply as a professional on My Salahkar — create your AI consultant and start earning a share of consultations.",
};

export default function ProfessionalSignupPage() {
  return <SignupWizard />;
}
