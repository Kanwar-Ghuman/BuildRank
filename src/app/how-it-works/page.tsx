import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowRight, Globe2, Brain, FileBarChart } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.06),transparent)]" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                How BuildRank works
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get a structured scorecard for your landing page in under a
              minute. Three steps, zero guesswork.
            </p>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: Globe2,
                step: "01",
                title: "Paste your URL",
                description:
                  "Enter your startup landing page URL. We fetch the page, extract the headline, subhead, body content, pricing, and social proof signals.",
              },
              {
                icon: Brain,
                step: "02",
                title: "AI analyzes your page",
                description:
                  "Our AI evaluates five founder-specific dimensions: problem clarity, pricing clarity, audience fit, differentiation, and trust/credibility.",
              },
              {
                icon: FileBarChart,
                step: "03",
                title: "Get your scorecard",
                description:
                  "Receive a structured scorecard with scores (1–10), status labels, detailed explanations, and prioritized recommendations. Save or share.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {item.step}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What we score */}
      <section className="border-y border-white/[0.04] bg-white/[0.01] py-20 md:py-28">
        <Container>
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
            What we score
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
            Five dimensions designed for founders, not SEO or vanity metrics.
          </p>
          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            {[
              {
                label: "Problem Clarity",
                desc: "How clearly does your page articulate the problem? We check headline, subhead, and pain point specificity.",
              },
              {
                label: "Pricing Clarity",
                desc: "Is pricing visible, understandable, and justified? We evaluate tiers, value alignment, and transparency.",
              },
              {
                label: "Audience Fit",
                desc: "Does the page speak to the right audience? We analyze language, tone, use cases, and testimonials.",
              },
              {
                label: "Differentiation",
                desc: "How clearly does it stand out from alternatives? We look for a unique value prop and positioning.",
              },
              {
                label: "Trust / Credibility",
                desc: "Does the page build trust? We check for social proof, logos, testimonials, and founder visibility.",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to try it?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste your URL and get your scorecard in seconds.
          </p>
          <Link
            href="/#analyze"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Analyze your page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    </main>
  );
}
