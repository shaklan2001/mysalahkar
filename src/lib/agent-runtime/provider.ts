import { isLiveDemoAgent } from "@/lib/data/agents";
import { mockAgentProvider } from "./mockProvider";
import { vibriumAgentProvider } from "./vibriumProvider";
import type { AgentProvider } from "./types";

export function getAgentProvider(agentSlug: string): AgentProvider {
  if (isLiveDemoAgent(agentSlug)) {
    return vibriumAgentProvider;
  }
  return mockAgentProvider;
}
