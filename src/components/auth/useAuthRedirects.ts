"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { hasRole, oauthErrorMessage, useSession, type Role } from "@/lib/auth";

/** Shows the reason when Google OAuth sends the user back with ?error=, then drops it from the URL. */
export function useOAuthErrorToast() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shown = useRef(false);
  const code = params.get("error");

  useEffect(() => {
    const message = oauthErrorMessage(code);
    if (!message || shown.current) return;
    shown.current = true;
    // Next tick: the layout's <Toaster> mounts in this same commit, after the page's effects.
    window.setTimeout(() => toast.error(message), 0);
    const rest = new URLSearchParams(params.toString());
    rest.delete("error");
    router.replace(rest.size ? `${pathname}?${rest.toString()}` : pathname);
  }, [code, params, pathname, router]);
}

/** On sign-in / sign-up pages: someone already signed in with this role goes straight on. */
export function useRedirectIfSignedIn(role: Role, next: string) {
  const router = useRouter();
  const { ready, user } = useSession();
  useEffect(() => {
    if (ready && hasRole(user, role)) router.replace(next);
  }, [ready, user, role, next, router]);
}
