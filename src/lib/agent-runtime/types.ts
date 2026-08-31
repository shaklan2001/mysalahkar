export type ChatMessage = {
  id: string;
  role: "user" | "agent" | "system";
  content: string;
  createdAt: number;
};

export type AgentProvider = {
  /** onChunk receives the full assembled response so far, not incremental deltas. */
  streamReply: (
    agentSlug: string,
    userMessage: string,
    onChunk: (assembled: string) => void,
    signal?: AbortSignal,
  ) => Promise<void>;
  requestHumanCall?: (payload: Record<string, unknown>) => Promise<void>;
};
