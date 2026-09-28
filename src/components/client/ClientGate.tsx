"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClientSession } from "@/lib/client-session";

export function ClientGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { ready, session } = useClientSession();

  useEffect(() => {
    if (!ready || session) return;
    router.replace(`/client/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, session, pathname, router]);

  if (!ready || !session) return null;
  return children;
}
