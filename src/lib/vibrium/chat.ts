import { getBotIdForAgent, getVibriumConfig } from "./config";
import { vibriumFetch } from "./auth";

function chatBase(agentSlug: string, contactId: string) {
  const { agentsBaseUrl, customerId } = getVibriumConfig();
  const botId = getBotIdForAgent(agentSlug);
  return `${agentsBaseUrl}/chat/customerId/${customerId}/botId/${botId}/contactId/${encodeURIComponent(contactId)}`;
}

export async function startSession(
  agentSlug: string,
  contactId: string,
): Promise<{ session_id: string }> {
  const res = await vibriumFetch(`${chatBase(agentSlug, contactId)}/chat/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to start chat (${res.status}): ${text}`);
  }

  return (await res.json()) as { session_id: string };
}

export async function streamCompletion(
  agentSlug: string,
  contactId: string,
  message: string,
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const res = await vibriumFetch(
    `${chatBase(agentSlug, contactId)}/chat/completions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        stream: true,
        channel: "whatsapp",
      }),
      signal,
    },
  );

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(`Chat completion failed (${res.status}): ${text}`);
  }

  return res.body;
}
