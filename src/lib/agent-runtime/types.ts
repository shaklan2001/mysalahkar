export type ChatMessage = {
  id: string;
  role: "user" | "agent" | "system";
  content: string;
  createdAt: number;
};

export type AgentProvider = {
  streamReply: (
    agentSlug: string,
    userMessage: string,
    onChunk: (chunk: string) => void
  ) => Promise<void>;
  requestHumanCall?: (payload: Record<string, unknown>) => Promise<void>;
};
