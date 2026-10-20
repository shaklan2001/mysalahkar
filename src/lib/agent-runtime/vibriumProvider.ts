import { API_URL } from "@/lib/api";
import { consumeAgentStream } from "@/lib/chat-stream";
import { isLiveDemoAgent } from "@/lib/data/agents";
import type { AgentProvider } from "./types";

const started = new Set<string>();

async function ensureSession(agentSlug: string) {
  if (started.has(agentSlug)) return;
  const res = await fetch(`${API_URL}/chat/start`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agentSlug }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to start chat session");
  }
  started.add(agentSlug);
}

/** Live agents bill and talk through the API. The API derives the contact from the session. */
export const vibriumAgentProvider: AgentProvider = {
  async streamReply(agentSlug, userMessage, onChunk, signal) {
    if (!isLiveDemoAgent(agentSlug)) {
      throw new Error("Agent is not available for live demo");
    }

    await ensureSession(agentSlug);

    const res = await fetch(`${API_URL}/chat/message`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentSlug, message: userMessage }),
      signal,
    });

    if (!res.ok || !res.body) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(data.error || "Chat request failed");
    }

    await consumeAgentStream(res.body, onChunk, signal);
  },
};
