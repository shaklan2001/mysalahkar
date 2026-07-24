# My Salahkar

India's AI professional consultancy platform — consult AI SME agents (CA, CS, Legal, FEMA, Wealth, and more) on WhatsApp, chat, or call. Human specialists escalate only when needed.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn-style UI
- Mock agent runtime (swap-ready for Vibrium Speak / web-call)
- Vercel-ready

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `LEAD_WEBHOOK_URL` | Optional webhook for leads / consultations |
| `LEAD_TO_EMAIL` | Destination email label (logged) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp deep-link digits (e.g. `9198…`) |
| `NEXT_PUBLIC_VIBRIUM_*` | Reserved for live Vibrium integration |

## Key routes

| Route | Description |
| --- | --- |
| `/` | Marketing home |
| `/agents` | Browse AI agents (filters) |
| `/agents/[slug]` | Agent profile + consult |
| `/services` | ~380 services across 12 categories |
| `/community` | Professional community feed |
| `/learning` | Courses & sessions |
| `/loan-comparison` | Smart Loan + AI advisor (Veer) |
| `/how-it-works` | Channels & escalation |
| `/contact` | Book a human call |

## Design reference

See `FIGMA_DESIGN_FINDINGS.md` for the original Figma Make inventory (all features preserved, reframed around AI agents).
