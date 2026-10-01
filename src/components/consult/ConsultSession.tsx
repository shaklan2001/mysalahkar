"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Calendar,
  MessageSquare,
  Phone,
  Repeat,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useConsult, type ConsultMode } from "./ConsultProvider";
import { VoiceCallPanel } from "./VoiceCallPanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getLiveDemoAgents,
  getAgent,
  isLiveDemoAgent,
  aiConsultantName,
} from "@/lib/data/agents";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import { aiSalahkarHref } from "@/lib/data/marketplace";
import { getAgentProvider } from "@/lib/agent-runtime/provider";
import type { ChatMessage } from "@/lib/agent-runtime/types";
import { toast } from "sonner";
import { AiConsultGate } from "./AiConsultGate";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { readClientSession } from "@/lib/client-session";

function createContactId(agentSlug: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `salahkar-${agentSlug}-${crypto.randomUUID()}`;
  }
  return `salahkar-${agentSlug}-${Date.now()}`;
}

type ConsultSessionProps = {
  agentSlug: string;
  initialMode?: ConsultMode;
};

export function ConsultSession({
  agentSlug,
  initialMode = "chat",
}: ConsultSessionProps) {
  const router = useRouter();
  const { closeConsult, openConsult } = useConsult();
  const [allowed, setAllowed] = useState(false);
  const agent = useMemo(
    () => getAgent(agentSlug) ?? getLiveDemoAgents()[0],
    [agentSlug],
  );

  const [tab, setTab] = useState<ConsultMode>(initialMode);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [callActive, setCallActive] = useState(initialMode === "call");
  const [contactId, setContactId] = useState("");
  const [showEscalate, setShowEscalate] = useState(false);
  const [escalateConsent, setEscalateConsent] = useState(false);
  const [escalateForm, setEscalateForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    note: "",
  });

  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (readClientSession()) {
      setAllowed(true);
      return;
    }
    const next = `${window.location.pathname}${window.location.search}`;
    router.replace(`/client/login?next=${encodeURIComponent(next)}`);
  }, [router]);

  useEffect(() => {
    if (!allowed || !agent) return;
    setContactId(createContactId(agent.slug));
    setMessages([
      {
        id: "welcome",
        role: "agent",
        content: `Namaste! I'm ${aiConsultantName(agent)}. What's on your mind today?`,
        createdAt: Date.now(),
      },
    ]);
  }, [agent, allowed]);

  useEffect(() => {
    if (!allowed) return;
    setTab(initialMode);
    setCallActive(initialMode === "call");
  }, [initialMode, allowed]);

  useEffect(() => {
    if (!allowed) return;
    if (tab === "call") {
      setCallActive(true);
    } else {
      setCallActive(false);
    }
  }, [tab, allowed]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  if (!allowed || !agent) return null;

  async function sendMessage() {
    if (!input.trim() || streaming) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: input.trim(),
      createdAt: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStreaming(true);

    const agentMsgId = `a-${Date.now()}`;
    setMessages((m) => [
      ...m,
      { id: agentMsgId, role: "agent", content: "", createdAt: Date.now() },
    ]);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const provider = getAgentProvider(agent.slug);
      await provider.streamReply(
        agent.slug,
        userMsg.content,
        (assembled) => {
          // Callback receives full assembled text (not deltas) — always replace.
          setMessages((m) =>
            m.map((msg) =>
              msg.id === agentMsgId ? { ...msg, content: assembled } : msg,
            ),
          );
        },
        abortRef.current.signal,
      );
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setMessages((m) =>
        m.map((msg) =>
          msg.id === agentMsgId
            ? {
                ...msg,
                content:
                  "I'm having trouble connecting right now. Please try again in a moment.",
              }
            : msg,
        ),
      );
      toast.error(message);
    } finally {
      setStreaming(false);
    }
  }

  async function submitEscalation(e: React.FormEvent) {
    e.preventDefault();
    if (!escalateConsent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...escalateForm,
          agentSlug: agent.slug,
          type: "human-escalation",
          privacyConsent: true,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("Failed");
      toast.success(
        data.meetUrl
          ? `Call booked. Meet: ${data.meetUrl}`
          : "Human consultation requested.",
      );
      setShowEscalate(false);
      setEscalateConsent(false);
      setEscalateForm({
        name: "",
        email: "",
        phone: "",
        preferredTime: "",
        note: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const liveConfigured = isLiveDemoAgent(agent.slug);
  const displayName = aiConsultantName(agent);
  const firstName = displayName.split(" ")[0];
  const suggestions = agent.faqs.map((faq) => faq.q).slice(0, 3);
  const onlyWelcome = messages.length <= 1;

  function openEscalation() {
    const session = readClientSession();
    setEscalateForm((f) => ({
      ...f,
      name: f.name || session?.name || "",
      email: f.email || session?.email || "",
      phone: f.phone || (session?.phone ? `+91 ${session.phone}` : ""),
    }));
    setShowEscalate(true);
  }

  return (
    <AiConsultGate>
      <div className="flex h-[100dvh] flex-col bg-background">
        {/* Header */}
        <header className="shrink-0 border-b border-border/70 bg-white">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
            <button
              onClick={closeConsult}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <ConsultantPhoto
                src={agent.image}
                alt=""
                showAiBadge
                rounded="xl"
                className="h-10 w-10"
                sizes="40px"
              />
              <div className="min-w-0">
                <p className="truncate font-display text-[15px] font-semibold leading-tight tracking-tight text-foreground">
                  {displayName}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                  <span
                    className={
                      liveConfigured
                        ? "h-1.5 w-1.5 rounded-full bg-success"
                        : "h-1.5 w-1.5 rounded-full bg-border"
                    }
                  />
                  AI Salahkar · {liveConfigured ? "Online 24/7" : "Offline"}
                </p>
              </div>
            </div>

            <div
              className="inline-flex shrink-0 rounded-lg border border-border bg-[#f8f9fc] p-1"
              role="tablist"
              aria-label="Consultation mode"
            >
              {(
                [
                  ["chat", "Chat", MessageSquare],
                  ["call", "Call", Phone],
                ] as const
              ).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={tab === value}
                  onClick={() => setTab(value)}
                  className={
                    tab === value
                      ? "inline-flex h-8 items-center gap-1.5 rounded-md bg-[#001450] px-3 text-xs font-semibold text-white shadow-sm"
                      : "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openConsult()}
              className="hidden h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
            >
              <Repeat className="h-3.5 w-3.5" /> Switch
            </button>
          </div>
        </header>

        <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 gap-5 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-6">
          {/* Conversation */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-white">
            {tab === "chat" ? (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mx-auto max-w-3xl space-y-5">
                    {messages.map((m) =>
                      m.role === "user" ? (
                        <div key={m.id} className="flex justify-end">
                          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#001450] px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap text-white">
                            {m.content}
                          </div>
                        </div>
                      ) : (
                        <div key={m.id} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-accent">
                            <Bot className="h-4 w-4" />
                          </span>
                          <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-border bg-[#fbfcfe] px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap text-ink-soft">
                            {m.content ||
                              (streaming ? (
                                <span
                                  className="inline-flex items-center gap-1 py-1"
                                  aria-label={`${firstName} is typing`}
                                >
                                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/70" />
                                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/70 [animation-delay:120ms]" />
                                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/70 [animation-delay:240ms]" />
                                </span>
                              ) : null)}
                          </div>
                        </div>
                      ),
                    )}

                    {onlyWelcome && suggestions.length ? (
                      <div className="pl-11">
                        <p className="text-xs font-medium text-muted-foreground">
                          Try asking
                        </p>
                        <div className="mt-2 flex flex-col items-start gap-2">
                          {suggestions.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => setInput(q)}
                              className="rounded-xl border border-border bg-white px-3.5 py-2 text-left text-sm text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="shrink-0 border-t border-border/70 bg-white px-4 py-4 sm:px-6">
                  <div className="mx-auto max-w-3xl">
                    <div className="flex items-end gap-2 rounded-2xl border border-border bg-white p-2 transition-shadow focus-within:border-accent/50 focus-within:ring-3 focus-within:ring-accent/15">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message ${displayName}…`}
                        aria-label={`Message ${displayName}`}
                        rows={1}
                        className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-[15px] outline-none placeholder:text-muted-foreground"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                      <Button
                        size="icon"
                        variant="accent"
                        className="h-11 w-11 shrink-0 rounded-xl"
                        onClick={sendMessage}
                        disabled={streaming || !input.trim()}
                        aria-label="Send message"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-muted-foreground">
                      <span>
                        AI guidance, not a formal professional opinion.
                      </span>
                      <button
                        type="button"
                        onClick={openEscalation}
                        className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-accent lg:hidden"
                      >
                        <UserRound className="h-3 w-3" /> Talk to a human
                      </button>
                      <span className="hidden sm:inline lg:inline">
                        Enter to send · Shift + Enter for a new line
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : liveConfigured && contactId ? (
              <VoiceCallPanel
                agentSlug={agent.slug}
                agentName={displayName}
                contactId={contactId}
                active={callActive}
                onEnded={() => setCallActive(false)}
                fullScreen
              />
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Voice calls aren&apos;t available for this Salahkar yet.
              </div>
            )}
          </section>

          {/* Context rail */}
          <aside className="hidden min-h-0 space-y-4 overflow-y-auto lg:block">
            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                <Sparkles className="h-3.5 w-3.5" /> About this chat
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {displayName} is an AI assistant, not a live person. Answers are
                informational and may be incomplete.
              </p>
              <Link
                href={aiSalahkarHref(agent)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-accent"
              >
                What {firstName} can help with{" "}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Guided by
              </p>
              <div className="mt-3 flex items-center gap-3">
                <ConsultantPhoto
                  src={agent.image}
                  alt=""
                  rounded="xl"
                  className="h-10 w-10"
                  sizes="40px"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {agent.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {agent.typeLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#001450] p-5 text-white">
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/40 blur-2xl"
                aria-hidden
              />
              <UserRound className="relative h-5 w-5 text-blue-200" />
              <p className="relative mt-3 font-display text-base font-semibold tracking-tight">
                Need a human expert?
              </p>
              <p className="relative mt-1 text-sm text-slate-300">
                For filings, notices or sign-off, book {agent.name} on Google
                Meet. Your chat goes with you.
              </p>
              <button
                type="button"
                onClick={openEscalation}
                className="relative mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-white text-xs font-semibold text-[#001450] hover:bg-blue-50"
              >
                <Calendar className="h-3.5 w-3.5" /> Schedule a call
              </button>
            </div>
          </aside>
        </div>

        {/* Human escalation */}
        <Dialog open={showEscalate} onOpenChange={setShowEscalate}>
          <DialogContent className="max-w-lg">
            <DialogTitle>Book a human specialist</DialogTitle>
            <DialogDescription>
              {agent.name} or their team will join you on Google Meet. We share
              this conversation so you don&apos;t have to repeat yourself.
            </DialogDescription>
            <form onSubmit={submitEscalation} className="mt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Your name"
                  aria-label="Your name"
                  required
                  value={escalateForm.name}
                  onChange={(e) =>
                    setEscalateForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <Input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  required
                  value={escalateForm.email}
                  onChange={(e) =>
                    setEscalateForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
                <Input
                  placeholder="Phone"
                  aria-label="Phone"
                  required
                  value={escalateForm.phone}
                  onChange={(e) =>
                    setEscalateForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
                <Input
                  placeholder="Preferred time"
                  aria-label="Preferred time"
                  value={escalateForm.preferredTime}
                  onChange={(e) =>
                    setEscalateForm((f) => ({
                      ...f,
                      preferredTime: e.target.value,
                    }))
                  }
                />
              </div>
              <Textarea
                placeholder="What should the specialist know?"
                aria-label="Notes for the specialist"
                rows={3}
                value={escalateForm.note}
                onChange={(e) =>
                  setEscalateForm((f) => ({ ...f, note: e.target.value }))
                }
              />
              <LegalConsent
                id="esc-dpdp"
                checked={escalateConsent}
                onChange={setEscalateConsent}
              />
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEscalate(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!escalateConsent}
                >
                  Book Meet
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AiConsultGate>
  );
}
