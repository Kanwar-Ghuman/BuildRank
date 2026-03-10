import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Globe } from "@/components/ui/globe";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Trophy,
  Rocket,
  Star,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  BarChart3,
} from "lucide-react";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-44">
        <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.08),transparent)]" />

        <Container className="relative z-10 flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="mb-6 border-white/[0.08] text-muted-foreground"
          >
            Where builders get ranked
          </Badge>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Show what you built.
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-amber-400 bg-clip-text text-transparent">
              Get rated by the community.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Post your project, discover what others are building, and vote on
            the best. Swipe through a live feed, climb the leaderboard, and get
            real feedback from fellow builders.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/feed"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <Flame className="h-4 w-4" />
              Explore the feed
            </Link>
            <Link
              href="/submit"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-7 text-sm font-semibold transition-all hover:border-white/[0.2] hover:bg-white/[0.08]"
            >
              <Rocket className="h-4 w-4" />
              Submit a project
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted-foreground/60">
            Free to use — sign in to rate & submit
          </p>
        </Container>

        {/* Globe */}
        <div className="relative mx-auto mt-16 flex h-[340px] max-w-lg items-center justify-center overflow-hidden md:h-[400px]">
          <Globe className="top-1/2 -translate-y-1/2" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.6),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,140,50,0.05),transparent)]" />
        </div>
      </section>

      {/* Trust row */}
      <section className="border-y border-white/[0.04] bg-white/[0.01] py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground/70">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary/70" />
              Community-driven ratings
            </span>
            <span className="hidden h-3 w-px bg-white/[0.08] sm:block" />
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary/70" />
              Built by indie hackers
            </span>
            <span className="hidden h-3 w-px bg-white/[0.08] sm:block" />
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary/70" />
              Tinder-style discover feed
            </span>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              How BuildRank works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three ways to use the platform.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Rocket,
                title: "Submit your project",
                description:
                  "Share what you've built — add a title, description, URL, and tags. Your project goes live instantly for others to discover.",
              },
              {
                step: "02",
                icon: Flame,
                title: "Swipe through the feed",
                description:
                  "Discover projects in a Tinder-style feed. Rate each one 1-5 stars using keyboard shortcuts or by clicking. Skip and come back later.",
              },
              {
                step: "03",
                icon: Trophy,
                title: "Climb the leaderboard",
                description:
                  "The highest-rated projects rise to the top. Check the leaderboard to see what's trending and how your project stacks up.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/50">
                  Step {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature cards */}
      <section className="border-y border-white/[0.04] bg-white/[0.01] py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built for people who ship
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to showcase and discover great projects.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Flame,
                title: "Live feed",
                description:
                  "Swipe through projects one at a time. Rate, skip, explore — at your own pace.",
              },
              {
                icon: Star,
                title: "Community ratings",
                description:
                  "1-5 star ratings from real builders. No bots, no fake votes.",
              },
              {
                icon: Trophy,
                title: "Leaderboard",
                description:
                  "The best projects rise to the top. See what the community loves most.",
              },
              {
                icon: Sparkles,
                title: "AI page analysis",
                description:
                  "Bonus tool: get an AI-powered scorecard for any landing page URL.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(200,140,50,0.06),transparent)]" />
        <Container className="relative z-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to show what you&apos;ve built?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join the community of builders. Submit your project or start rating
            today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Submit a project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-8 text-sm font-semibold transition-all hover:border-white/[0.2] hover:bg-white/[0.08]"
            >
              <Trophy className="h-4 w-4" />
              View leaderboard
            </Link>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground/60 sm:flex-row">
            <span>&copy; {new Date().getFullYear()} BuildRank</span>
            <div className="flex gap-6">
              <Link
                href="/feed"
                className="transition-colors hover:text-foreground"
              >
                Feed
              </Link>
              <Link
                href="/leaderboard"
                className="transition-colors hover:text-foreground"
              >
                Leaderboard
              </Link>
              <Link
                href="/analyze"
                className="transition-colors hover:text-foreground"
              >
                Page Analyzer
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
