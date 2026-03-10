# BuildRank — Milestone Commit Guide

Use these as reference when writing commit messages.

## Milestone 1: Project setup
- Next.js 16, TypeScript, Tailwind v4
- shadcn/ui (Button, Input, Card, Badge)
- docs/PRD.md
- Placeholder logo (public/logo.svg — replace with your own)

## Milestone 2: Design system and base layout
- Dark-first chromic theme (globals.css)
- Header with nav (How It Works, Pricing, Examples, Get Started)
- Container component
- Placeholder pages: /how-it-works, /pricing, /examples

## Milestone 3: Homepage and landing page
- Hero with URL input CTA
- Trust row
- Sample scorecard preview
- Feature cards
- Pricing section
- FAQ
- Final CTA

## Milestone 4: URL submission flow and scorecard UI
- /analyze page with URL form
- Scorecard preview (mock data)
- Category cards, overall score, recommendations

## Milestone 5: Dashboard (minimal)
- /dashboard layout with sidebar (Overview, Projects, Settings)
- Overview page with stats cards
- Projects page (empty state)
- Settings page (auth placeholder)
- Dashboard link in header

## Milestone 6: Auth (Clerk)
- Clerk provider and middleware
- Protected /dashboard routes
- Sign-in and sign-up pages
- AuthButtons in header (Sign in, Get Started when signed out; Dashboard, UserButton when signed in)

## Milestone 7: AI analysis
- POST /api/analyze with URL
- Fetches page HTML, extracts text, calls OpenAI (gpt-4o-mini)
- Structured scorecard: 5 categories (problem, pricing, audience, differentiation, trust), overall score, recommendations
- ScorecardClient fetches and displays live results
