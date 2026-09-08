# Vibrium one-time setup — MySalahkaar live demo

Updated 2026-09-08. Dedicated Salahkar Vibrium org + service account.

| Item | Value |
|---|---|
| Org | `org_vIemkf44LRy0t5ZQ` |
| Service account username | `vibrium` |
| Ankit Gupta CA bot | `VB00000001` |
| Soniya Gupta CS bot | `VB00000002` |
| Persona sources | `.setup/voice_bot_prompts/ankit_gupta_ca.md`, `soniya_gupta_cs.md` |

Password lives only in `.env.local` / Vercel env — never commit it.

## Vercel env vars (Production)

```
VIBRIUM_API_BASE_URL=https://api.vibrium.ai
VIBRIUM_AGENTS_API_BASE_URL=https://agents-api.vibrium.ai
VIBRIUM_CUSTOMER_ID=org_vIemkf44LRy0t5ZQ
VIBRIUM_SERVICE_USERNAME=vibrium
VIBRIUM_SERVICE_PASSWORD=<from .env.local>
VIBRIUM_BOT_ID_ANKIT=VB00000001
VIBRIUM_BOT_ID_SONIYA=VB00000002
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

Create bots **sequentially with ≥5s delay** — parallel creates can return the same bot ID on a new org.
