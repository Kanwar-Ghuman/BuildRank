# BuildRank — Setup Guide

## API Keys & Services

### 1. OpenAI (for AI analysis)

| | |
|---|---|
| **Get key** | https://platform.openai.com/api-keys |
| **Env var** | `OPENAI_API_KEY` |

1. Sign in or create an account
2. API keys → Create new secret key
3. Copy the key (starts with `sk-`)

---

### 2. Clerk (for authentication)

| | |
|---|---|
| **Get keys** | https://dashboard.clerk.com |
| **Env vars** | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` |

1. Create an account and a new application
2. Dashboard → API Keys
3. Copy **Publishable key** (pk_) and **Secret key** (sk_)

Clerk works in keyless mode for local dev without keys. Add keys for production.

---

### 3. Neon (Postgres database)

| | |
|---|---|
| **Get connection string** | https://neon.tech |
| **Env var** | `DATABASE_URL` |

1. Sign up or log in
2. Create a new project
3. Copy the connection string from Connection details

Format: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

---

## Setup Steps

1. Copy env:
   ```bash
   cp .env.example .env.local
   ```

2. Add keys to `.env.local` (see above for where to get each)

3. Push schema to Neon:
   ```bash
   npm run db:push
   ```

4. Run:
   ```bash
   npm run dev
   ```

---

## Optional

**Production URL** — For shareable report links:
```
NEXT_PUBLIC_APP_URL=https://your-domain.com
```
