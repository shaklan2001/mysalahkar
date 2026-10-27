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
| `API_ORIGIN` | Node API when Next must proxy `/api/v1` (local: `http://localhost:8000`) |

Lead and consultation mail is sent by the API through Amazon SES (`EMAIL_BACKEND=ses`, `SUPPORT_EMAIL` in `backend/.env`).

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
