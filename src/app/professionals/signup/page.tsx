import type { Metadata } from "next";
import { ProAccountForm } from "@/components/professionals/ProAccountForm";

export const metadata: Metadata = {
  title: "Create a professional account",
  description: "Create your MySalahkar professional account. Set up your AI Salahkar after you sign in.",
};

export default function ProfessionalSignupPage() {
  return <ProAccountForm />;
}
