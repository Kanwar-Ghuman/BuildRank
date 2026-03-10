# BuildRank — Product Requirements Document

**AI Landing Page Teardown for Founders**

---

## Design Reference Summary

Three visual references inform the BuildRank design direction:

| Reference | Mood | Application |
|-----------|------|-------------|
| **TrustMRR** | Dark dashboard, dense data cards, founder/startup credibility | Dashboard layout, scorecard cards, analytics-style blocks, premium data presentation |
| **DataFast** | Clean hero, centered CTA, polished productized SaaS | Homepage hero, URL input placement, conversion-focused layout, restrained hierarchy |
| **ShipFast** | Bold headline, high contrast, strong offer framing | Hero typography, CTA treatment, commercial landing page structure, accent usage |

**Concrete UI principles derived:**
- Dark-first surfaces (graphite, charcoal, near-black)
- Subtle metallic highlights and restrained glow
- High-contrast typography, no decorative clutter
- Premium SaaS conversion feel, not template art
- Dense but scannable data cards for dashboard
- Bold hero headlines with clear CTAs
- Chromic modern: polished, expensive, professional

---

## 1. Product Overview

### What It Is
BuildRank is an AI-powered landing page teardown tool for indie hackers and early-stage founders. Users submit their startup landing page URL and receive a structured scorecard evaluating problem clarity, pricing clarity, audience fit, differentiation, and trust/credibility.

### Who It Is For
Indie hackers, solo founders, technical builders, and growth experts who need actionable feedback on their landing pages before spending on ads or design.

### Pain It Solves
Founders do not know why their page underperforms. Friend feedback is vague. Design feedback online is inconsistent. Small teams need messaging clarity and structured, comparable critique.

### Why People Would Pay
- Structured, founder-specific scoring vs. generic AI or SEO tools
- Actionable rewrite suggestions, not vanity metrics
- Optional public gallery for credibility and discoverability
- Future marketplace for paid expert teardowns

### Startup Potential
Clear positioning in the indie/startup ecosystem. Shareable scorecards create growth loops. Marketplace layer adds recurring revenue.

### Positioning
*"The AI landing page teardown built for founders."*

### Value Proposition
*"Submit your landing page. Get a structured scorecard. Fix what matters."*

### Category
SaaS + community + feedback marketplace for startup landing pages.

---

## 2. Target Users and Personas

### Persona 1: Indie Hacker (First SaaS)
- **Goals:** Ship fast, validate quickly, avoid expensive mistakes
- **Frustrations:** Unsure if messaging resonates, no design budget
- **Alternatives:** Reddit, Twitter DMs, generic AI analyzers
- **Willingness to pay:** Low initially, upgrades for premium reviews
- **Behavior:** Submits URL, skims scorecard, iterates, may publish to gallery

### Persona 2: Solo Founder (Weak Conversions)
- **Goals:** Improve conversion, understand drop-off, prioritize fixes
- **Frustrations:** Analytics show problems but not causes
- **Alternatives:** Hotjar, agency teardowns, A/B testing
- **Willingness to pay:** Medium for pro features, high for expert reviews
- **Behavior:** Submits multiple URLs, compares versions, uses recommendations

### Persona 3: Technical Builder (Messaging Struggle)
- **Goals:** Translate product into clear value prop, fix copy
- **Frustrations:** Strong product, weak messaging, jargon-heavy
- **Alternatives:** Copywriters, ChatGPT, competitor analysis
- **Willingness to pay:** Medium for structured feedback
- **Behavior:** Focuses on problem clarity and differentiation scores, iterates copy

### Persona 4: Growth/Design Expert (Sell Feedback)
- **Goals:** Monetize expertise, build reputation, find clients
- **Frustrations:** Fragmented platforms, no structured marketplace
- **Alternatives:** Upwork, direct outreach, Twitter
- **Willingness to pay:** Platform take rate on paid reviews
- **Behavior:** Onboards as reviewer, delivers premium teardowns, builds profile

---

## 3. Jobs to Be Done

| Segment | Functional Job | Emotional Job |
|---------|----------------|---------------|
| Indie Hacker | Get fast, structured feedback on landing page | Feel confident before launch |
| Solo Founder | Understand why page underperforms | Reduce anxiety about conversion |
| Technical Builder | Translate product into clear messaging | Feel less lost on copy |
| Growth Expert | Sell feedback services efficiently | Feel valued and discoverable |

---

## 4. Problem Statement

Founders lack structured, comparable feedback on landing pages. Friend feedback is vague ("looks good"). Generic AI analyzers focus on SEO, not conversion. Design feedback online is inconsistent. Small teams need messaging clarity before spending on ads or design. There is no founder-specific, actionable teardown tool that combines AI analysis with optional community and expert marketplace.

---

## 5. Value Proposition and Differentiation

### vs. Generic AI Website Analyzers
BuildRank scores founder-specific dimensions (problem clarity, pricing, audience fit, differentiation, trust), not SEO or technical metrics.

### vs. SEO Audit Tools
Focus on conversion and messaging, not keywords or backlinks.

### vs. Hotjar/Analytics
Provides qualitative feedback and recommendations, not just heatmaps.

### vs. Reddit/Twitter Feedback
Structured, comparable, actionable. No noise or inconsistent opinions.

### vs. Agency Teardowns
Faster, cheaper first pass. Optional premium expert layer later.

### Unique Elements
- Founder-specific scoring framework
- Actionable rewrite suggestions
- Optional public gallery for credibility
- Future marketplace for expert reviews

---

## 6. Product Pillars

1. **Clarity over vanity** — Score what matters for conversion, not vanity metrics
2. **Structured feedback over vague opinions** — Comparable, repeatable criteria
3. **Premium feel over feature clutter** — Polished, minimal, confident
4. **Fast first value** — Scorecard in minutes, no long onboarding
5. **Community credibility** — Public proof, shareable reports
6. **Public proof and discoverability** — Gallery, leaderboard, reputation

---

## 7. Feature Set

### MVP
- Landing page / marketing site
- URL submission flow
- Automated structured scorecard
- Breakdown by rating category (problem clarity, pricing, audience fit, differentiation, trust)
- Summary verdict
- Recommendations for improvement
- Account creation
- Saved reviews dashboard
- Basic shareable report page

### Phase 2
- Public gallery of reviewed startups
- Comments and community reviews
- Project profiles
- Compare multiple versions of a landing page
- History / iteration tracking
- Reputation badges

### Phase 3
- Marketplace for paid expert teardowns
- Founder matchmaking
- "Find reviewers" marketplace
- Benchmark against similar startups
- Verified expert profiles
- Premium team plans

---

## 8. User Flows

### First-Time Visitor
1. Land on homepage
2. See hero, value prop, sample scorecard
3. Paste URL in input
4. Click "Analyze" → redirected to analysis (or sign-up gate after preview)

### Submit URL and Get Reviewed
1. Enter URL
2. System fetches page, extracts content
3. AI generates scorecard
4. User sees scores, breakdown, recommendations
5. Option to sign up to save

### Sign Up After Review Preview
1. After scorecard loads, CTA: "Save this report"
2. Sign up (email or OAuth)
3. Report saved to dashboard

### Save / Share / Export Report
1. From dashboard or report page
2. Share link or export PDF (Phase 2)

### Publish to Public Gallery
1. From dashboard, toggle "Publish to gallery"
2. Project appears in public gallery with scorecard summary

### Request Premium Review (Phase 3)
1. From project page, "Request expert teardown"
2. Browse experts, select, pay
3. Expert delivers detailed review

### Expert Reviewer Onboarding (Phase 3)
1. Apply as expert
2. Submit profile, portfolio
3. Verification
4. Accept requests, deliver reviews, earn

---

## 9. Information Architecture

| Page | Purpose | Key Blocks |
|------|---------|------------|
| Homepage | Convert visitors, capture URLs | Hero, URL input, proof, sample scorecard, features, pricing, FAQ |
| How It Works | Explain process | Steps, screenshots, CTA |
| Pricing | Convert to paid | Tiers, feature comparison, CTA |
| Examples / Wall of Reviews | Social proof | Sample scorecards, testimonials |
| Public Gallery | Discover projects | Grid of projects, filters |
| Leaderboard / Trending | Social proof, engagement | Ranked projects |
| User Dashboard | Manage reviews | Score overview, projects, history |
| Project Detail | Single project view | Scorecard, recommendations, comments |
| Expert Marketplace | Find reviewers (Phase 3) | Expert profiles, pricing |
| Settings / Billing | Account management | Profile, subscription, billing |

---

## 10. Homepage / Landing Page PRD

### Top Nav
- Logo left
- Links: How It Works, Pricing, Examples
- CTA: "Get Started" or "Analyze" (primary)
- Minimal, dark background, high-contrast text

### Hero
- Large headline: value prop in one line (e.g., "Landing page teardowns that actually help you convert")
- Subhead: 1–2 sentences
- Centered URL input + "Analyze" button
- No decorative illustrations; optional subtle gradient or texture

### Proof / Trust Row
- Logos or stats: "X landing pages analyzed" or "Trusted by X founders"
- Restrained, not cluttered

### Sample Scorecard Preview
- Screenshot or mockup of scorecard
- Shows 5 categories with scores
- Caption: "See exactly where you stand"

### Feature Explainer
- 3–4 cards: Structured feedback, Founder-specific, Actionable fixes, Optional gallery
- Icon + title + short copy per card

### Before/After Example
- Side-by-side or before/after of improved landing page (if available)

### Social Proof
- Testimonials, 1–2 lines each
- Optional: "As seen in" or community logos

### Public Projects Teaser
- "See what others are building" — link to gallery

### Marketplace Teaser (Phase 2+)
- "Get expert teardowns from growth pros"

### Pricing
- Free / Pro / Team tiers
- Clear feature list per tier

### FAQ
- 4–6 questions: How it works, What gets analyzed, Pricing, Accuracy, etc.

### Final CTA
- Repeat URL input or "Start free" button

### Layout Rhythm
- Consistent vertical spacing (e.g., 80px–120px between sections)
- Max-width container (~1200px)
- Hierarchy: H1 > H2 > H3 > body

### Copy Style
- Sharp, founder-native, concise
- No corporate jargon, no goofy tone

---

## 11. Dashboard PRD

### Layout
- Left sidebar nav (or top nav on mobile)
- Main content: card grid

### Nav Items
- Overview
- Projects
- Settings

### Card Grid
- Score overview: aggregate score, trend
- Breakdown by category: 5 cards (problem, pricing, audience, differentiation, trust)
- Strengths / weaknesses: bullet lists
- Page recommendations: prioritized list
- Version history: timeline of submissions
- Community comments (Phase 2)
- Benchmark modules (Phase 2)

### Card Style
- Dark background, subtle border
- Dense but scannable
- Status labels (e.g., "Needs work", "Strong")
- Filters / sorting for projects

### Premium Feel
- Data-rich without clutter
- Consistent spacing, typography
- Subtle hover states, no flashy animations

---

## 12. Community and Marketplace System

### Public Feedback Model
- Users can publish projects to gallery
- Others can leave structured comments
- Moderation: flag, review, remove

### Reputation System
- Upvotes on helpful feedback
- Reviewer badges for consistent quality

### Verified Reviewer System
- Apply, submit portfolio
- Manual or semi-automated verification

### Incentives
- Visibility, badges, revenue share on paid reviews

### Marketplace
- Founders request expert teardowns
- Experts set price, deliver within timeframe
- Platform take rate (e.g., 15–20%)
- Disputes: refund policy, escalation

---

## 13. Scoring Framework

### Problem Clarity
- **Definition:** How clearly does the page articulate the problem?
- **Signals:** Headline, subhead, problem statement, pain points
- **Good:** Specific problem, relatable, immediate
- **Bad:** Vague, feature-focused, jargon
- **Example output:** "Your headline leads with features. Lead with the problem users feel."

### Pricing Clarity
- **Definition:** Is pricing visible, understandable, and justified?
- **Signals:** Pricing section, tiers, value prop per tier
- **Good:** Clear tiers, value alignment, no surprise fees
- **Bad:** Hidden pricing, confusing tiers, no justification
- **Example output:** "Pricing is buried. Move it above the fold or add a clear CTA to view pricing."

### Audience Fit
- **Definition:** Does the page speak to the right audience?
- **Signals:** Language, tone, use cases, testimonials
- **Good:** Specific audience, relevant proof
- **Bad:** Generic, wrong tone, mismatched testimonials
- **Example output:** "Copy feels enterprise-focused. Your ICP may be SMBs—adjust tone."

### Differentiation
- **Definition:** How clearly does the page differentiate from alternatives?
- **Signals:** Unique value prop, comparison, positioning
- **Good:** Clear "why us," specific differentiators
- **Bad:** Generic, could be any competitor
- **Example output:** "Differentiation is weak. Add a clear 'Why BuildRank' or comparison section."

### Trust / Credibility
- **Definition:** Does the page build trust?
- **Signals:** Social proof, logos, testimonials, founder story, security
- **Good:** Concrete proof, recognizable names, founder visibility
- **Bad:** No proof, generic claims, anonymous
- **Example output:** "Add at least one concrete testimonial with name and outcome."

### Feedback Tone
- Constructive, specific, actionable. No harsh or dismissive language.

---

## 14. AI/Analysis Engine Behavior

### Input
- Landing page URL
- Optional: startup name, category

### Output
- Structured review: scores (1–10 or 1–5 per category), explanations, strengths, weaknesses, recommendations

### Confidence Scoring
- Flag low-confidence reviews (e.g., page not loading, minimal content)

### Explainability
- Each score has a short explanation
- Recommendations are specific, not generic

### Actionable Suggestions
- Prioritized list of fixes
- Example rewrites where helpful

### Tone
- Supportive, founder-native, direct

### What Not to Do
- Generic "improve your copy"
- Harsh or demotivating language
- Overly long outputs

### Edge Cases
- Missing pricing: note it, suggest adding
- Weak/confusing page: flag, suggest clarity improvements
- Low confidence: show warning, suggest re-submitting

---

## 15. Monetization

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 3 reviews/month, basic scorecard, no save (or limited save) |
| Pro | $19/mo | Unlimited reviews, save all, shareable reports, version history |
| Team | $49/mo | Pro + team seats, shared dashboard, benchmark |
| Expert Review | One-time | Paid teardown from verified expert |
| Marketplace | Take rate | 15–20% on expert reviews |

---

## 16. Design System Direction

### Visual Principles
- Dark-first, chromic modern
- Premium, sharp, startup-native
- Confident, minimal, not over-decorated
- Slightly futuristic but professional

### Color Strategy
- **Base background:** `#0a0a0a` to `#111111`
- **Panel/surface:** `#18181b` to `#27272a`
- **Border:** `#27272a` to `#3f3f46`
- **Accent:** Single accent (e.g., cyan `#22d3ee` or emerald `#10b981`), used sparingly for CTAs, links, highlights
- **Text:** `#fafafa` primary, `#a1a1aa` secondary, `#71717a` muted

### Typography
- **Headings:** Bold, high contrast, clear hierarchy
- **Body:** Readable, 16px base, line-height 1.6
- **Monospace:** For scores, data, code snippets

### Radius
- Cards: 8px–12px
- Buttons: 6px–8px
- Inputs: 6px–8px

### Shadows
- Subtle, dark shadows (e.g., `0 4px 6px -1px rgba(0,0,0,0.3)`)
- Avoid bright glows; use restrained highlights

### Borders
- Thin (1px), low-contrast
- Optional: subtle inner glow on focus

### Iconography
- Consistent style (e.g., Lucide, Heroicons)
- 16px–24px for UI, 32px+ for feature blocks

### Motion
- Subtle transitions (150–200ms)
- No excessive animation
- Hover: slight scale or brightness

### Button Styles
- Primary: accent background, high contrast
- Secondary: outline or ghost
- Destructive: red accent

### Input Styles
- Dark background, light border
- Focus: accent border or ring
- Placeholder: muted

### Card Styles
- Dark surface, subtle border
- Optional: very subtle gradient or texture
- Dense but readable

### Chart/Data Blocks
- Clean, minimal
- Use accent for key data points
- Consistent spacing

### Empty States
- Short message, clear CTA
- Optional illustration (restrained)

### Loading States
- Skeleton or spinner
- No flashy animations

### States
- Hover: slight brightness or border change
- Focus: visible ring
- Active: slight press
- Disabled: reduced opacity, no interaction

### Chromic Modern in Practice
- Deep graphite/charcoal surfaces
- Subtle metallic highlights (e.g., border highlights)
- Restrained glow on CTAs only
- Glass/mist only for hierarchy (e.g., modals)
- High-contrast typography
- Polished, expensive feel
- No neon, no random gradients, no template art

---

## 17. Frontend Implementation Standards

### Recommended Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix primitives
- Framer Motion (only when helpful)

### Component Architecture
- Atomic: Button, Input, Card
- Composed: ScoreCard, ProjectCard
- Page-level: Dashboard, Homepage

### Design Tokens
- CSS variables for colors, spacing, radius
- Tailwind config extends tokens

### Accessibility
- WCAG 2.1 AA
- Focus states, keyboard nav, screen reader support
- Radix for accessible primitives

### Responsive
- Mobile-first
- Breakpoints: sm, md, lg, xl
- Dashboard: sidebar collapses on mobile

### Performance
- LCP < 2.5s
- Minimal JS for above-fold
- Lazy load below-fold

### Animation
- Prefer CSS transitions
- Framer Motion for complex sequences only

### Spacing Grid
- 4px base (4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128)

### Typography Scale
- xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl

### Icon Sizing
- 16px (inline), 20px (buttons), 24px (nav), 32px (features)

### State Handling
- Server components where possible
- Client components for interactivity
- Clear loading/error states

### Goal
Custom product feel, not default template. Cohesive, intentional, production-grade.

---

## 18. Frontend Design Documentation to Follow

### Tailwind CSS
- **Use for:** Spacing, typography, dark mode, utility consistency
- **Consult:** Dark mode docs, typography plugin, spacing scale
- **Influence:** Design token alignment, responsive patterns

### shadcn/ui
- **Use for:** Component composition, custom design system foundation
- **Consult:** Component docs, theming, customization
- **Influence:** Don't use as-is; customize into BuildRank system

### Radix UI / Radix Themes
- **Use for:** Accessibility, primitives, overlays, dialogs, navigation, theming
- **Consult:** Dialog, Dropdown, Tabs, Theme docs
- **Influence:** Behavior, focus management, keyboard nav

### Apple Human Interface Guidelines
- **Use for:** Dark mode contrast, layout clarity, material layering, polished interaction
- **Consult:** Dark mode, layout, materials, contrast
- **Influence:** Contrast ratios, touch targets, visual hierarchy

### Warnings
- Do not paste together random UI snippets
- Do not overuse gradients, glass, glows, or animation
- Do not let each page feel like a different template
- The product must feel designed, not generated

---

## 19. Content and Copy Style

### Brand Voice
- Sharp, founder-native, concise
- Premium, slightly opinionated
- Not corporate, not goofy

### Example Tone Lines
- "Your headline leads with features. Lead with the problem."
- "Pricing buried? Move it up."
- "Structured feedback. No fluff."
- "Fix what matters."

---

## 20. Success Metrics

| Metric | Target |
|--------|--------|
| Submission-to-signup conversion | >15% |
| Signup-to-report-save rate | >40% |
| Report share rate | >10% |
| Upgrade rate (free → pro) | >5% |
| Public gallery publish rate | >20% of saved |
| Marketplace attach rate (Phase 3) | TBD |
| Review helpfulness score | >4/5 |

---

## 21. Risks and Mitigation

| Risk | Mitigation |
|------|------------|
| Generic AI outputs | Curate prompts, human review samples, iterate |
| Low trust in scores | Explain methodology, show examples, allow feedback |
| Shallow feedback quality | Improve prompts, add expert layer |
| Weak retention | Email sequences, iteration tracking, community |
| Community spam | Moderation, reputation, rate limits |
| Reviewers gaming system | Verification, quality checks, penalties |
| Template-like look | Follow design docs, custom design system |
| Overbuilding before validation | MVP first, validate core flow |

---

## 22. Launch Strategy

1. Private beta with 50–100 founders
2. Founder communities (Indie Hackers, Twitter, Reddit)
3. X/Twitter launch thread
4. Reddit: r/SideProject, r/startups, r/Entrepreneur
5. Indie hacker circles
6. Public wall of reviewed startups as social proof
7. Shareable scorecards as growth loop

---

## 23. MVP Scope Recommendation

**Version 1 should include:**
- Homepage with hero, URL input, sample scorecard, features, pricing, FAQ
- URL submission → AI scorecard (mock or real API)
- Account creation (email + OAuth)
- Saved reviews dashboard
- Shareable report page
- Dark-first design system

**Defer to Phase 2:**
- Public gallery
- Community comments
- Version comparison
- Marketplace

---

## 24. Appendix

### Sample Homepage Wireframe (Text)
```
[Logo]                    How It Works  Pricing  Examples     [Get Started]

                    Landing page teardowns that actually help you convert.
                    Submit your URL. Get a structured scorecard. Fix what matters.

                    [________________________] [Analyze]
                    
                    Trusted by 500+ founders

[Scorecard preview]

[Feature cards x4]

[Pricing]

[FAQ]

[Final CTA]
```

### Sample Dashboard Wireframe (Text)
```
[Logo] BuildRank     Overview | Projects | Settings

[Score Overview Card]     [Trend]

[Problem] [Pricing] [Audience] [Differentiation] [Trust]
  7/10      6/10     8/10         5/10           7/10

[Strengths]              [Weaknesses]
• Clear headline         • Pricing buried
• Good social proof      • Weak differentiation

[Recommendations]
1. Move pricing above fold
2. Add "Why us" section
3. ...
```

### Sample Scorecard Example
```
BuildRank Scorecard — example.com

Overall: 6.8/10

Problem Clarity:    8/10 — Strong. Headline clearly states the pain.
Pricing Clarity:    4/10 — Pricing is hidden. Add visible tiers.
Audience Fit:       7/10 — Tone matches ICP. Add more specific use cases.
Differentiation:   5/10 — Could be any competitor. Add unique angle.
Trust:              7/10 — Good testimonials. Add founder photo.

Top 3 Fixes:
1. Add pricing section above the fold
2. Add "Why [Product]" or comparison section
3. Include founder story or photo
```

### Sample Pricing Structure
| | Free | Pro | Team |
|---|------|-----|------|
| Price | $0 | $19/mo | $49/mo |
| Reviews | 3/mo | Unlimited | Unlimited |
| Save reports | 1 | All | All |
| Share | No | Yes | Yes |
| Version history | No | Yes | Yes |
| Team seats | — | — | 5 |
