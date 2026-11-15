import { vibriumAgentProvider } from "./vibriumProvider";
import type { AgentProvider } from "./types";

/** Every AI Salahkar talks through the API, which decides whether that professional's agent is live. */
export function getAgentProvider(): AgentProvider {
  return vibriumAgentProvider;
}
