"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { resolveLiveDemoSlug } from "@/lib/data/agents";

type ConsultContextValue = {
  isOpen: boolean;
  agentSlug: string | null;
  openConsult: (agentSlug?: string) => void;
  closeConsult: () => void;
};

const ConsultContext = createContext<ConsultContextValue | null>(null);

export function ConsultProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [agentSlug, setAgentSlug] = useState<string | null>(null);

  const openConsult = useCallback((slug?: string) => {
    setAgentSlug(resolveLiveDemoSlug(slug));
    setIsOpen(true);
  }, []);

  const closeConsult = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, agentSlug, openConsult, closeConsult }),
    [isOpen, agentSlug, openConsult, closeConsult],
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
