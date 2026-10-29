import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInComplete } from "@/components/auth/SignInComplete";

export const metadata: Metadata = {
  title: "Signing in",
  robots: { index: false, follow: false },
};

export default function SignInCompletePage() {
  return (
    <Suspense>
      <SignInComplete />
    </Suspense>
  );
}
