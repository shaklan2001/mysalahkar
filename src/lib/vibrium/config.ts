function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const BOT_ID_ENV: Record<string, string> = {
  "ankit-gupta-ca": "VIBRIUM_BOT_ID_ANKIT",
  "soniya-gupta-cs": "VIBRIUM_BOT_ID_SONIYA",
};

export function getVibriumConfig() {
  return {
    apiBaseUrl: (
      process.env.VIBRIUM_API_BASE_URL || "https://api.vibrium.ai"
    ).replace(/\/$/, ""),
    agentsBaseUrl: (
      process.env.VIBRIUM_AGENTS_API_BASE_URL ||
      "https://agents-api.vibrium.ai"
    ).replace(/\/$/, ""),
    customerId: required("VIBRIUM_CUSTOMER_ID"),
    username: required("VIBRIUM_SERVICE_USERNAME"),
    password: required("VIBRIUM_SERVICE_PASSWORD"),
  };
}

export function getBotIdForAgent(agentSlug: string): string {
  const envName = BOT_ID_ENV[agentSlug];
  if (!envName) {
    throw new Error(`No Vibrium bot configured for agent: ${agentSlug}`);
  }
  return required(envName);
}

export function isVibriumAgentConfigured(agentSlug: string): boolean {
  const envName = BOT_ID_ENV[agentSlug];
  if (!envName) return false;
  return Boolean(process.env[envName]?.trim());
}
