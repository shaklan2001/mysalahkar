"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MessageSquare, Phone, Sparkles } from "lucide-react";
import {
  aiConsultantName,
  getLiveDemoAgents,
  resolveLiveDemoSlug,
} from "@/lib/data/agents";
import { readClientSession } from "@/lib/client-session";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export type ConsultMode = "chat" | "call";

type ConsultContextValue = {
  /** With a slug, opens that AI Salahkar. Without one, asks who to talk to first. */
  openConsult: (agentSlug?: string, mode?: ConsultMode) => void;
  closeConsult: () => void;
};

const ConsultContext = createContext<ConsultContextValue | null>(null);

export function ConsultProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [picker, setPicker] = useState<{ mode: ConsultMode } | null>(null);

  const go = useCallback(
    (slug: string, mode: ConsultMode) => {
      const dest = `/consult/${resolveLiveDemoSlug(slug)}?mode=${mode}`;
      if (!readClientSession()) {
        router.push(`/client/login?next=${encodeURIComponent(dest)}`);
        return;
      }
      router.push(dest);
    },
    [router],
  );

  const openConsult = useCallback(
    (slug?: string, mode: ConsultMode = "chat") => {
      if (slug) {
        go(slug, mode);
        return;
      }
      setPicker({ mode });
    },
    [go],
  );

  const closeConsult = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/client/dashboard/find");
    }
  }, [router]);

  const value = useMemo(
    () => ({ openConsult, closeConsult }),
    [openConsult, closeConsult],
  );

  return (
    <ConsultContext.Provider value={value}>
      {children}
      <SalahkarPicker
        open={picker !== null}
        onOpenChange={(open) => (open ? null : setPicker(null))}
        onPick={(slug, mode) => {
          setPicker(null);
          go(slug, mode);
        }}
      />
    </ConsultContext.Provider>
  );
}

function SalahkarPicker({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (slug: string, mode: ConsultMode) => void;
}) {
  const agents = getLiveDemoAgents();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-semibold text-accent">
          <Sparkles className="h-3.5 w-3.5" /> AI Salahkars
        </span>
        <DialogTitle className="mt-4">
          Who would you like to talk to?
        </DialogTitle>
        <DialogDescription>
          Both are AI assistants, online 24/7. Pick the one that fits your
          question.
        </DialogDescription>

        <ul className="mt-6 space-y-3">
          {agents.map((agent) => {
            const name = aiConsultantName(agent);
            return (
              <li
                key={agent.slug}
                className="rounded-xl border border-border p-4 transition-colors hover:border-accent/35 hover:bg-[#f8f9fc]"
              >
                <div className="flex items-start gap-3">
                  <ConsultantPhoto
                    src={agent.image}
                    alt=""
                    showAiBadge
                    rounded="xl"
                    className="h-12 w-12"
                    sizes="48px"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-semibold tracking-tight text-foreground">
                      {name}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {agent.tagline}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Guided by {agent.name}, {agent.typeLabel}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onPick(agent.slug, "chat")}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-accent text-xs font-semibold text-white hover:bg-[#002ee0]"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Chat with{" "}
                    {name.split(" ")[0]}
                  </button>
                  <button
                    type="button"
                    onClick={() => onPick(agent.slug, "call")}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-white text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    <Phone className="h-3.5 w-3.5" /> Voice call
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export function useConsult() {
  const ctx = useContext(ConsultContext);
  if (!ctx) {
    throw new Error("useConsult must be used within ConsultProvider");
  }
  return ctx;
}
