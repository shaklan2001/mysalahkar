"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useConsult, type ConsultMode } from "./ConsultProvider";
import { VoiceCallPanel } from "./VoiceCallPanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getLiveDemoAgents,
  getAgent,
  isLiveDemoAgent,
} from "@/lib/data/agents";
import { getAgentProvider } from "@/lib/agent-runtime/provider";
import type { ChatMessage } from "@/lib/agent-runtime/types";
import { toast } from "sonner";

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
  const { closeConsult } = useConsult();
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
    if (!agent) return;
    setContactId(createContactId(agent.slug));
    setMessages([
      {
        id: "welcome",
        role: "agent",
        content: `Namaste! I'm ${agent.name}, your AI ${agent.typeLabel}. What's on your mind today?`,
        createdAt: Date.now(),
      },
    ]);
  }, [agent]);

  useEffect(() => {
    setTab(initialMode);
    setCallActive(initialMode === "call");
  }, [initialMode]);

  useEffect(() => {
    if (tab === "call") {
      setCallActive(true);
    } else {
      setCallActive(false);
    }
  }, [tab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  if (!agent) return null;

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
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
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
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...escalateForm,
          agentSlug: agent.slug,
          type: "human-escalation",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Human consultation requested. We'll call you shortly.");
      setShowEscalate(false);
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

  return (
    <div className="flex h-[100dvh] flex-col bg-[#f8fafc]">
      {/* Header */}
      <header className="shrink-0 border-b border-slate-200 bg-[#001450] text-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <button
            onClick={closeConsult}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#003cf8]">
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold leading-tight">{agent.name}</p>
              <p className="truncate text-xs text-blue-200/90">
                {agent.typeLabel} · {liveConfigured ? "Live" : "Offline"}
              </p>
            </div>
          </div>

          <Link
            href={`/agents/${agent.slug}`}
            className="hidden text-xs text-slate-400 hover:text-white sm:block"
          >
            View profile
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4 sm:px-6">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as ConsultMode)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="mx-auto mb-4 grid w-full max-w-xs grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="chat" className="gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="call" className="gap-1.5">
              <Phone className="h-4 w-4" />
              Call
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="chat"
            className="mt-0 flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="mx-auto max-w-3xl space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {m.content || (streaming ? "…" : "")}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 px-4 py-4 sm:px-6">
              <div className="mx-auto flex max-w-3xl gap-3">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${agent.name}…`}
                  rows={2}
                  className="min-h-[52px] resize-none text-[15px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="h-[52px] w-[52px] shrink-0"
                  onClick={sendMessage}
                  disabled={streaming || !input.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="call"
            className="mt-0 flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {liveConfigured && contactId ? (
              <VoiceCallPanel
                agentSlug={agent.slug}
                agentName={agent.name}
                contactId={contactId}
                active={callActive}
                onEnded={() => setCallActive(false)}
                fullScreen
              />
            ) : (
              <div className="flex flex-1 items-center justify-center text-slate-600">
                Voice demo is not available for this agent.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer escalation */}
      <footer className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {!showEscalate ? (
            <button
              onClick={() => setShowEscalate(true)}
              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-primary"
            >
              <Calendar className="h-4 w-4" />
              Need a human specialist? Schedule a call
            </button>
          ) : (
            <form onSubmit={submitEscalation} className="mx-auto max-w-lg space-y-2">
              <p className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Human escalation
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  placeholder="Your name"
                  required
                  value={escalateForm.name}
                  onChange={(e) =>
                    setEscalateForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={escalateForm.email}
                  onChange={(e) =>
                    setEscalateForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
                <Input
                  placeholder="Phone"
                  required
                  value={escalateForm.phone}
                  onChange={(e) =>
                    setEscalateForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
                <Input
                  placeholder="Preferred time"
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
                rows={2}
                value={escalateForm.note}
                onChange={(e) =>
                  setEscalateForm((f) => ({ ...f, note: e.target.value }))
                }
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEscalate(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Request call
                </Button>
              </div>
            </form>
          )}
        </div>
      </footer>
    </div>
  );
}
