"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Scorecard } from "@/lib/analyze";

export function ScorecardClient() {
  const params = useSearchParams();
  const url = params.get("url");
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: decodeURIComponent(url) }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Analysis failed");
        setScorecard(data);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Analysis failed"))
      .finally(() => setLoading(false));
  }, [url]);

  if (!url) return null;

  if (loading) {
    return (
      <div className="mt-16 space-y-8">
        <div>
          <h2 className="text-xl font-bold">Analyzing</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {decodeURIComponent(url)}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-card" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle>Analysis failed</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check the URL and try again. Ensure OPENAI_API_KEY is set in .env.local.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!scorecard) return null;

  return (
    <div className="mt-16 space-y-8">
      <div>
        <h2 className="text-xl font-bold">Scorecard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {decodeURIComponent(url)}
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{scorecard.overall}</span>
            <span className="text-muted-foreground">/10</span>
            <span className="text-sm font-normal text-muted-foreground">Overall</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {scorecard.categories.map((item) => (
          <Card key={item.label} className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{item.score}</span>
                <span className="text-muted-foreground">/10</span>
                <Badge
                  variant={
                    item.status === "strong"
                      ? "default"
                      : item.status === "weak"
                        ? "destructive"
                        : "secondary"
                  }
                  className="ml-auto text-xs"
                >
                  {item.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {scorecard.recommendations.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Top recommendations</CardTitle>
            <CardDescription>Prioritized fixes to improve conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-2 text-sm">
              {scorecard.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
