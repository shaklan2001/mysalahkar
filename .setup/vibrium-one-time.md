# Vibrium one-time setup — MySalahkaar live demo

Updated 2026-08-31. Uses the same Vibrium org + service account as `payment_automation`.

| Item | Value |
|---|---|
| Org | `org_kseKmYgURrloPdO5` |
| Service account username | `vibrium` |
| Ankit Gupta CA bot | `VB00000311` |
| Soniya Gupta CS bot | `VB00000312` |
| Persona sources | `.setup/voice_bot_prompts/ankit_gupta_ca.md`, `soniya_gupta_cs.md` |

Password lives only in `.env.local` / Vercel env — never commit it.

## Vercel env vars (Production)

```
VIBRIUM_API_BASE_URL=https://api.vibrium.ai
VIBRIUM_AGENTS_API_BASE_URL=https://agents-api.vibrium.ai
VIBRIUM_CUSTOMER_ID=org_kseKmYgURrloPdO5
VIBRIUM_SERVICE_USERNAME=vibrium
VIBRIUM_SERVICE_PASSWORD=<from payment_automation .env.local>
VIBRIUM_BOT_ID_ANKIT=VB00000311
VIBRIUM_BOT_ID_SONIYA=VB00000312
NEXT_PUBLIC_SITE_URL=https://mysalahkar.com
```

## Update bot personas

```bash
node scripts/update-vibrium-bots.mjs
```

## Create new bots (one-time)

```bash
node scripts/create-vibrium-bots.mjs
```
