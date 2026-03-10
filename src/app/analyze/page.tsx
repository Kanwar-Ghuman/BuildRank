import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { AnalyzeForm } from "./analyze-form";
import { ScorecardPreview } from "./scorecard-preview";

export default function AnalyzePage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  return (
    <main className="py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold">Analyze your landing page</h1>
          <p className="mt-2 text-muted-foreground">
            Paste your URL to get a structured scorecard.
          </p>
          <Suspense fallback={null}>
            <AnalyzeForm />
          </Suspense>
        </div>
        <Suspense fallback={<ScorecardSkeleton />}>
          <ScorecardPreview searchParams={searchParams} />
        </Suspense>
      </Container>
    </main>
  );
}

function ScorecardSkeleton() {
  return (
    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-lg bg-card"
        />
      ))}
    </div>
  );
}
