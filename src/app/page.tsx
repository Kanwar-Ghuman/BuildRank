import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main>
      <section id="hero" className="py-24 md:py-32">
        <Container className="flex flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Landing page teardowns that actually help you convert
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Submit your URL. Get a structured scorecard. Fix what matters.
          </p>
          <form
            id="analyze"
            action="/analyze"
            method="GET"
            className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <Input
              type="url"
              name="url"
              placeholder="https://your-startup.com"
              className="h-12 flex-1 bg-card border-border text-base"
              required
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              Analyze
            </Button>
          </form>
        </Container>
      </section>

      <section className="border-y border-border/50 py-8">
        <Container>
          <p className="text-center text-sm text-muted-foreground">
            Trusted by 500+ founders
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <h2 className="text-center text-2xl font-bold">
            See exactly where you stand
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Structured feedback across problem clarity, pricing, audience fit, differentiation, and trust.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Problem Clarity", score: 8, status: "strong" },
              { label: "Pricing Clarity", score: 6, status: "ok" },
              { label: "Audience Fit", score: 7, status: "strong" },
              { label: "Differentiation", score: 5, status: "weak" },
              { label: "Trust", score: 7, status: "strong" },
            ].map((item) => (
              <Card key={item.label} className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{item.score}</span>
                    <span className="text-muted-foreground">/10</span>
                    <Badge
                      variant={item.status === "strong" ? "default" : item.status === "weak" ? "destructive" : "secondary"}
                      className="ml-auto text-xs"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-card/30">
        <Container>
          <h2 className="text-center text-2xl font-bold">
            Built for founders
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Structured feedback",
                description: "Comparable scores, not vague opinions.",
              },
              {
                title: "Founder-specific",
                description: "Scoring that matters for conversion.",
              },
              {
                title: "Actionable fixes",
                description: "Prioritized recommendations you can implement.",
              },
              {
                title: "Optional gallery",
                description: "Publish and get discovered.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-background/50">
                <CardHeader>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <h2 className="text-center text-2xl font-bold">
            Simple pricing
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Free", price: "$0", reviews: "3/month", cta: "Get started" },
              { name: "Pro", price: "$19", reviews: "Unlimited", cta: "Start free trial", featured: true },
              { name: "Team", price: "$49", reviews: "Unlimited + 5 seats", cta: "Contact sales" },
            ].map((tier) => (
              <Card
                key={tier.name}
                className={`border-border/50 ${tier.featured ? "border-primary/50 ring-1 ring-primary/20" : ""}`}
              >
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tier.reviews}</p>
                  <Link
                    href="/#analyze"
                    className={`mt-4 flex h-9 w-full items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors ${
                      tier.featured
                        ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/50 py-24">
        <Container>
          <h2 className="text-center text-2xl font-bold">
            FAQ
          </h2>
          <div className="mx-auto mt-12 max-w-2xl space-y-8">
            {[
              {
                q: "How does it work?",
                a: "Paste your landing page URL. Our AI analyzes it and returns a structured scorecard with scores, explanations, and actionable recommendations.",
              },
              {
                q: "What gets analyzed?",
                a: "We evaluate problem clarity, pricing clarity, audience fit, differentiation, and trust. Each category gets a score and specific feedback.",
              },
              {
                q: "Is it accurate?",
                a: "Our scoring is based on founder-specific criteria. We focus on conversion signals, not SEO or technical metrics. Results improve as you iterate.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="text-center">
          <h2 className="text-2xl font-bold">
            Ready to fix what matters?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Get your first scorecard in under a minute.
          </p>
          <Link
            href="/#analyze"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Analyze your page
          </Link>
        </Container>
      </section>
    </main>
  );
}
