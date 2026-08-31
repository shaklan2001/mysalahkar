#!/usr/bin/env node
/**
 * PATCH Vibrium voice bots with persona markdown from .setup/voice_bot_prompts/
 * Usage: node scripts/update-vibrium-bots.mjs
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

const bots = [
  {
    botId: process.env.VIBRIUM_BOT_ID_ANKIT,
    personaFile: "ankit_gupta_ca.md",
    firstMessageEn:
      "Namaste! I am CA Ankit Gupta on MySalahkaar. I advise on income tax, GST, M&A, and startup compliance. How can I help you today?",
    firstMessageHi:
      "नमस्ते! मैं CA अंकित गुप्ता, MySalahkaar पर। Income Tax, GST, M&A और startup compliance में मदद करता हूँ। आज कैसे सहायता करूँ?",
  },
  {
    botId: process.env.VIBRIUM_BOT_ID_SONIYA,
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

async function getBot(token, botId) {
  const res = await fetch(
    `${apiBase}/v1/customers/${customerId}/voice-bots/${botId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json.data?.result?.bot;
}

async function patchBot(token, bot) {
  const persona = fs.readFileSync(
    path.join(root, ".setup/voice_bot_prompts", bot.personaFile),
    "utf8",
  );

  const existing = await getBot(token, bot.botId);

  const body = {
    bot_name: existing.bot_name,
    agents_name: existing.agents_name,
    agents_gender: existing.agents_gender,
    description: existing.description,
    default_language: existing.default_language,
    supported_languages: existing.supported_languages,
    dispositions: existing.dispositions,
    contacts_attributes: existing.contacts_attributes,
    entities: existing.entities || {},
    contact_type: existing.contact_type,
    persona,
    platform_language_configs: {
      ...existing.platform_language_configs,
      English: {
        ...(existing.platform_language_configs?.English || {}),
        first_message: bot.firstMessageEn,
      },
      Hindi: {
        ...(existing.platform_language_configs?.Hindi || {}),
        first_message: bot.firstMessageHi,
      },
    },
  };

  const res = await fetch(
    `${apiBase}/v1/customers/${customerId}/voice-bots/${bot.botId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const json = await res.json().catch(() => ({}));
  console.log(`${bot.botId}: ${res.status}`, json.message || json.error || "ok");
}

async function main() {
  if (!customerId || !username || !password) {
    throw new Error("Missing Vibrium credentials in .env.local");
  }

  const token = await getToken();
  for (const bot of bots) {
    if (!bot.botId) {
      console.warn(`Skipping ${bot.personaFile} — bot ID not set`);
      continue;
    }
    await patchBot(token, bot);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
