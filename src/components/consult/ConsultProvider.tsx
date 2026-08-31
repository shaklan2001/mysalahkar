"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { resolveLiveDemoSlug } from "@/lib/data/agents";

export type ConsultMode = "chat" | "call";

type ConsultContextValue = {
  openConsult: (agentSlug?: string, mode?: ConsultMode) => void;
  closeConsult: () => void;
};

const ConsultContext = createContext<ConsultContextValue | null>(null);

export function ConsultProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const openConsult = useCallback(
    (slug?: string, mode: ConsultMode = "chat") => {
      const resolved = resolveLiveDemoSlug(slug);
      router.push(`/consult/${resolved}?mode=${mode}`);
    },
    [router],
  );

  const closeConsult = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/agents");
    }
  }, [router]);

  const value = useMemo(
    () => ({ openConsult, closeConsult }),
    [openConsult, closeConsult],
  );

  return (
    <ConsultContext.Provider value={value}>{children}</ConsultContext.Provider>
  );
}

export function useConsult() {
  const ctx = useContext(ConsultContext);
  if (!ctx) {
    throw new Error("useConsult must be used within ConsultProvider");
  }
  return ctx;
}
