# BuildRank

AI landing page teardown for founders.

## Setup

1. Copy env and add keys:
   ```bash
   cp .env.example .env.local
   ```
   See [docs/SETUP.md](docs/SETUP.md) for how to get each API key.

2. Push database schema (requires `DATABASE_URL`):
   ```bash
   npm run db:push
   ```

3. Run:
   ```bash
   npm install
   npm run dev
   ```

## Project structure

- `docs/PRD.md` — Product requirements
- `docs/SETUP.md` — API keys and Neon setup
- `docs/MILESTONES.md` — Commit milestones
- `public/logo.svg` — Replace with your logo

## Stack

Next.js 16, TypeScript, Tailwind v4, shadcn/ui, Clerk, OpenAI, Neon Postgres, Drizzle
# BuildRank
