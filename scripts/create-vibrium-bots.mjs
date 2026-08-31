#!/usr/bin/env node
/**
 * Create MySalahkaar demo voice bots on Vibrium (run once per new agent).
 * Usage: node scripts/create-vibrium-bots.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    const value = trimmed.slice(idx + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const customerId = process.env.VIBRIUM_CUSTOMER_ID;
const username = process.env.VIBRIUM_SERVICE_USERNAME;
const password = process.env.VIBRIUM_SERVICE_PASSWORD;
const apiBase = (process.env.VIBRIUM_API_BASE_URL || "https://api.vibrium.ai").replace(
  /\/$/,
  "",
);

const botsToCreate = [
  {
    envKey: "VIBRIUM_BOT_ID_ANKIT",
    bot_name: "MySalahkaar Ankit Gupta CA",
    agents_name: "Ankit",
    agents_gender: "Male",
    description: "CA Ankit Gupta — tax, GST, M&A and startup advisory demo",
    personaFile: "ankit_gupta_ca.md",
    firstMessageEn:
      "Namaste! I am CA Ankit Gupta on MySalahkaar. I advise on income tax, GST, M&A, and startup compliance. How can I help you today?",
    firstMessageHi:
      "नमस्ते! मैं CA अंकित गुप्ता, MySalahkaar पर। Income Tax, GST, M&A और startup compliance में मदद करता हूँ। आज कैसे सहायता करूँ?",
  },
  {
    envKey: "VIBRIUM_BOT_ID_SONIYA",
    bot_name: "MySalahkaar Soniya Gupta CS",
    agents_name: "Soniya",
    agents_gender: "Female",
    description: "Soniya Gupta FCS — corporate law, IPO, IBC, FEMA, POSH demo",
    personaFile: "soniya_gupta_cs.md",
    firstMessageEn:
      "Hello, I am Soniya Gupta, Company Secretary and Insolvency Professional on MySalahkaar. How can I assist with corporate compliance or advisory today?",
    firstMessageHi:
      "नमस्ते, मैं सोनिया गुप्ता, Company Secretary और Insolvency Professional, MySalahkaar पर। आज corporate compliance में कैसे मदद करूँ?",
  },
];

async function getToken() {
  const basic = Buffer.from(`${username}:${password}`).toString("base64");
  const res = await fetch(`${apiBase}/v1/customers/${customerId}/auth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json.data?.token || json.token;
}

async function createBot(token, spec) {
  const persona = fs.readFileSync(
    path.join(root, ".setup/voice_bot_prompts", spec.personaFile),
    "utf8",
  );

  const body = {
    bot_name: spec.bot_name,
    agents_name: spec.agents_name,
    agents_gender: spec.agents_gender,
    description: spec.description,
    default_language: "English",
    supported_languages: ["English", "Hindi"],
    dispositions: [{ name: "Consultation Complete", subcategories: [] }],
    contacts_attributes: "all",
    entities: {},
    contact_type: "customer",
    persona,
    platform_language_configs: {
      English: { first_message: spec.firstMessageEn },
      Hindi: { first_message: spec.firstMessageHi },
    },
  };

  const res = await fetch(`${apiBase}/v1/customers/${customerId}/voice-bots`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  const botId = json.data?.bot_id;
  console.log(`Created ${spec.agents_name}: ${botId} → set ${spec.envKey}=${botId}`);
  return botId;
}

async function main() {
  if (!customerId || !username || !password) {
    throw new Error("Missing Vibrium credentials in .env.local");
  }

  const token = await getToken();
  for (const spec of botsToCreate) {
    await createBot(token, spec);
    await new Promise((r) => setTimeout(r, 3000));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
