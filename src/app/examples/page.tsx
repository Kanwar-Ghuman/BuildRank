import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function ExamplesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.06),transparent)]" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Example Scorecards
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              See what a BuildRank scorecard looks like. Each category gets a
              score, status, and specific feedback.
            </p>
          </div>
        </Container>
      </section>

      {/* Sample scorecard */}
      <section className="py-20 md:py-28">
        <Container>
          {/* Overall score */}
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Sample Overall Score
              </p>
              <div className="mt-3 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-extrabold text-foreground">
                  6.6
                </span>
                <span className="text-xl text-muted-foreground">/10</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                acme-startup.com
              </p>
            </div>

            {/* Category breakdown */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  label: "Problem Clarity",
                  score: 8,
                  status: "strong" as const,
                  icon: "🎯",
                },
                {
                  label: "Pricing Clarity",
                  score: 6,
                  status: "ok" as const,
                  icon: "💰",
                },
                {
                  label: "Audience Fit",
                  score: 7,
                  status: "strong" as const,
                  icon: "👥",
                },
                {
                  label: "Differentiation",
                  score: 5,
                  status: "weak" as const,
                  icon: "⚡",
                },
                {
                  label: "Trust",
                  score: 7,
                  status: "strong" as const,
                  icon: "🛡️",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <span className="mb-2 block text-xl">{item.icon}</span>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{item.score}</span>
                    <span className="text-sm text-muted-foreground">/10</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full ${
                          item.status === "strong"
                            ? "bg-emerald-500"
                            : item.status === "ok"
                              ? "bg-amber-500"
                              : "bg-red-400"
                        }`}
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.status === "strong"
                        ? "default"
                        : item.status === "weak"
                          ? "destructive"
                          : "secondary"
                    }
                    className="mt-2.5 text-[10px] uppercase tracking-wider"
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Sample recommendations */}
            <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
              <h3 className="text-base font-semibold text-foreground">
                Top recommendations
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Prioritized fixes to improve conversion
              </p>
              <ol className="mt-5 space-y-3">
                {[
                  "Lead with the pain point in your headline — users should immediately feel understood.",
                  "Add at least one concrete testimonial with a name and measurable outcome.",
                  "Create a clear 'Why us' comparison against alternatives your audience already knows.",
                  "Move pricing above the fold or add a prominent CTA to view pricing.",
                ].map((rec, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Dimensions explanation */}
      <section className="border-y border-white/[0.04] bg-white/[0.01] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              What we evaluate
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Five founder-specific dimensions. Each scored 1–10 with specific,
              actionable feedback.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {[
              {
                label: "Problem Clarity",
                desc: "How clearly does the page articulate the problem?",
              },
              {
                label: "Pricing Clarity",
                desc: "Is pricing visible and understandable?",
              },
              {
                label: "Audience Fit",
                desc: "Does the page speak to the right audience?",
              },
              {
                label: "Differentiation",
                desc: "How clearly does it differentiate from alternatives?",
              },
              { label: "Trust", desc: "Does the page build credibility?" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
              >
                <div className="h-2 w-2 mt-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.label}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
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
          <h2 className="text-3xl font-bold tracking-tight">
            Get your own scorecard
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste a URL and see real results in seconds.
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
