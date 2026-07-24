"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MessageSquare,
  Phone,
  X,
  Send,
  Sparkles,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useConsult } from "./ConsultProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agents, getAgent } from "@/lib/data/agents";
import { mockAgentProvider } from "@/lib/agent-runtime/mockProvider";
import type { ChatMessage } from "@/lib/agent-runtime/types";
import { toast } from "sonner";

const WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export function ConsultDock() {
  const { isOpen, closeConsult, agentSlug } = useConsult();
  const agent = useMemo(
    () => (agentSlug ? getAgent(agentSlug) : agents[0]),
    [agentSlug]
  );
  const [tab, setTab] = useState("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [callPhase, setCallPhase] = useState<"idle" | "ringing" | "live">("idle");
  const [showEscalate, setShowEscalate] = useState(false);
  const [escalateForm, setEscalateForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    note: "",
  });

  useEffect(() => {
    if (!isOpen || !agent) return;
    setMessages([
      {
        id: "welcome",
        role: "agent",
        content: `Namaste! I'm ${agent.name}, your AI ${agent.typeLabel}. Ask me anything about ${agent.specializations.slice(0, 2).join(" or ")} — or switch to WhatsApp / Call.`,
        createdAt: Date.now(),
      },
    ]);
    setCallPhase("idle");
    setTab("chat");
  }, [isOpen, agent]);

  if (!isOpen || !agent) return null;

  async function sendMessage() {
    if (!input.trim() || streaming || !agent) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: input.trim(),
      createdAt: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStreaming(true);
    const agentId = `a-${Date.now()}`;
    setMessages((m) => [
      ...m,
      { id: agentId, role: "agent", content: "", createdAt: Date.now() },
    ]);
    try {
      await mockAgentProvider.streamReply(
        agent.slug,
        userMsg.content,
        (chunk) => {
          setMessages((m) =>
            m.map((msg) =>
              msg.id === agentId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      );
    } finally {
      setStreaming(false);
    }
  }

  function startCall() {
    setCallPhase("ringing");
    setTimeout(() => setCallPhase("live"), 1800);
  }

  function whatsappHref() {
    if (!agent) return "";
    const text = encodeURIComponent(
      `Hi ${agent.name}, I'd like to consult on ${agent.specializations[0]}.`
    );
    return `https://wa.me/${WHATSAPP}?text=${text}`;
  }

  async function submitEscalation(e: React.FormEvent) {
    e.preventDefault();
    if (!agent) return;
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

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-end p-0 sm:items-end sm:justify-end sm:p-6">
      <button
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={closeConsult}
        aria-label="Close consult"
      />
      <div className="relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[min(720px,90vh)] sm:w-[420px] sm:rounded-2xl">
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
              {agent.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold leading-tight">{agent.name}</p>
              <p className="text-xs text-blue-100">
                AI {agent.typeLabel} · Live now
              </p>
            </div>
          </div>
          <button
            onClick={closeConsult}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
          <TabsList className="mx-4 mt-3 grid w-auto grid-cols-3">
            <TabsTrigger value="chat">
              <MessageSquare className="mr-1 h-3.5 w-3.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="call">
              <Phone className="mr-1 h-3.5 w-3.5" />
              Call
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex min-h-0 flex-1 flex-col px-4 pb-4">
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto py-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {m.content || (streaming ? "…" : "")}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${agent.name}…`}
                rows={2}
                className="resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                className="h-auto shrink-0"
                onClick={sendMessage}
                disabled={streaming}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="whatsapp" className="flex flex-1 flex-col px-4 pb-4">
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <MessageSquare className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Continue on WhatsApp
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {agent.name} will pick up your thread with full context — same
                  expertise, on the channel you already use.
                </p>
              </div>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <a href={whatsappHref()} target="_blank" rel="noreferrer">
                  Open WhatsApp
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="call" className="flex flex-1 flex-col px-4 pb-4">
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-primary">
                <Phone className={`h-9 w-9 ${callPhase === "ringing" ? "animate-pulse" : ""}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {callPhase === "idle" && `Call ${agent.name}`}
                  {callPhase === "ringing" && "Connecting…"}
                  {callPhase === "live" && "Connected"}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {callPhase === "live"
                    ? `${agent.name} is on the line. Speak naturally — transcripts update live.`
                    : "Voice consultation with your AI SME. Same knowledge as chat, spoken."}
                </p>
              </div>
              {callPhase === "live" && (
                <div className="w-full rounded-xl bg-slate-50 p-3 text-left text-sm text-slate-700">
                  <p className="font-medium text-primary">{agent.name}</p>
                  <p className="mt-1">
                    {agent.sampleChat[0]?.text ||
                      "I'm listening — how can I help with your query today?"}
                  </p>
                </div>
              )}
              {callPhase === "idle" ? (
                <Button onClick={startCall}>
                  <Phone className="h-4 w-4" />
                  Start call
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setCallPhase("idle")}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  End call
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="border-t bg-slate-50 px-4 py-3">
          {!showEscalate ? (
            <button
              onClick={() => setShowEscalate(true)}
              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-primary"
            >
              <Calendar className="h-4 w-4" />
              Need a human? Schedule a specialist call
            </button>
          ) : (
            <form onSubmit={submitEscalation} className="space-y-2">
              <p className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Human escalation — rare cases, full context handed off
              </p>
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
      </div>
    </div>
  );
}
