import { getBotIdForAgent, getVibriumConfig } from "./config";
import { vibriumFetch } from "./auth";

export type WebCallMode = "voice" | "chat" | "hybrid";

export type WebCallSession = {
  token: string;
  url: string;
  roomName: string;
  participantIdentity: string;
  mode: WebCallMode;
  callSid: string;
  expiresAt: number;
};

export async function createWebCallSession(input: {
  agentSlug: string;
  contactId: string;
  contactName?: string;
  mode?: WebCallMode;
}): Promise<WebCallSession> {
  const { apiBaseUrl, customerId } = getVibriumConfig();
  const botId = getBotIdForAgent(input.agentSlug);
  const mode = input.mode || "voice";

  const res = await vibriumFetch(
    `${apiBaseUrl}/v1/customers/${customerId}/web-call`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bot_id: botId,
        contact_id: input.contactId,
        contact_name: input.contactName || "",
        mode,
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Web call failed (${res.status}): ${text}`);
  }

  const payload = (await res.json()) as {
    data?: {
      token?: string;
      url?: string;
      room_name?: string;
      participant_identity?: string;
      mode?: WebCallMode;
      call_sid?: string;
      expires_at?: number;
    };
  };

  const data = payload.data;
  if (!data?.token || !data?.url || !data?.room_name) {
    throw new Error("Web call response missing token, url, or room_name");
  }

  return {
    token: data.token,
    url: data.url,
    roomName: data.room_name,
    participantIdentity: data.participant_identity || "",
    mode: data.mode || mode,
    callSid: data.call_sid || "",
    expiresAt: data.expires_at || 0,
  };
}
