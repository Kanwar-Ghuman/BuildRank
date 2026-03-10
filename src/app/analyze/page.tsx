import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { AnalyzeForm } from "./analyze-form";
import { ScorecardClient } from "./scorecard-client";

export default function AnalyzePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.06),transparent)]" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Analyze your landing page
              </span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Paste your URL to get a structured scorecard with scores,
              feedback, and fixes.
            </p>
            <Suspense fallback={null}>
              <AnalyzeForm />
            </Suspense>
          </div>
        </Container>
      </section>
      <section className="pb-20">
        <Container>
          <Suspense fallback={null}>
            <ScorecardClient />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
