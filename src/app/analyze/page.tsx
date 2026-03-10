import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { AnalyzeForm } from "./analyze-form";
import { ScorecardClient } from "./scorecard-client";

export default function AnalyzePage() {
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
        <Suspense fallback={null}>
          <ScorecardClient />
        </Suspense>
      </Container>
    </main>
  );
}
