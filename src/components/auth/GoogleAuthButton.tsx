"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signInClient } from "@/lib/client-session";
import { saveProAccount } from "@/lib/pro-account";

type GoogleAuthButtonProps = {
  role: "client" | "professional";
  consent: boolean;
  intent?: "signin" | "signup";
};

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4A7.2 7.2 0 0 1 5 12c0-.8.1-1.6.4-2.4V6.5H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

/** Demo only. Swap for OAuth authorization-code + PKCE when a Google client is configured. */
export function GoogleAuthButton({
  role,
  consent,
  intent = "signin",
}: GoogleAuthButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const destination =
    role === "client"
      ? "/client/dashboard"
      : intent === "signup"
        ? "/professionals/dashboard?new=1"
        : "/professionals/dashboard";

  async function onClick() {
    if (!consent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (role === "client") {
      signInClient({ name: "Google Client", email: "client@gmail.com" });
    }
    if (role === "professional" && intent === "signup") {
      saveProAccount({
        name: "Google Professional",
        email: "pro@gmail.com",
        phone: "",
        firm: "",
      });
    }
    toast.success(
      intent === "signup"
        ? "Account created with Google (demo)"
        : "Signed in with Google (demo)",
    );
    router.push(destination);
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={loading || !consent}
      onClick={onClick}
    >
      <GoogleMark />
      {loading ? "Connecting…" : "Continue with Google"}
    </Button>
  );
}
