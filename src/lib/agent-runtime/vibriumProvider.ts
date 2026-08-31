import { consumeAgentStream } from "@/lib/chat-stream";
import { isLiveDemoAgent } from "@/lib/data/agents";
import type { AgentProvider } from "./types";

function createContactId(agentSlug: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `salahkar-${agentSlug}-${crypto.randomUUID()}`;
  }
  return `salahkar-${agentSlug}-${Date.now()}`;
}

const contactIds = new Map<string, string>();
const startedSessions = new Set<string>();

function getContactId(agentSlug: string): string {
  const existing = contactIds.get(agentSlug);
  if (existing) return existing;
  const next = createContactId(agentSlug);
  contactIds.set(agentSlug, next);
  return next;
}

async function ensureSession(agentSlug: string, contactId: string) {
  const key = `${agentSlug}:${contactId}`;
  if (startedSessions.has(key)) return;

  const res = await fetch("/api/agent/chat/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agentSlug, contactId }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to start chat session");
  }

  startedSessions.add(key);
}

export const vibriumAgentProvider: AgentProvider = {
  async streamReply(agentSlug, userMessage, onChunk, signal) {
    if (!isLiveDemoAgent(agentSlug)) {
      throw new Error("Agent is not available for live demo");
    }

    const contactId = getContactId(agentSlug);
    await ensureSession(agentSlug, contactId);

    const res = await fetch("/api/agent/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentSlug, contactId, message: userMessage }),
      signal,
    });

    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Chat request failed");
    }

    await consumeAgentStream(res.body, onChunk, signal);
  },
};
