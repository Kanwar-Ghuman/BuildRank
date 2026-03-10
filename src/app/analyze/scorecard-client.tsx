"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScorecardActions } from "@/components/scorecard-actions";
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
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Analysis failed"),
      )
      .finally(() => setLoading(false));
  }, [url]);

  if (!url) return null;

  if (loading) {
    return (
      <div className="mt-16 space-y-8">
        <div className="text-center">
          <h2 className="text-xl font-bold">Analyzing</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {decodeURIComponent(url)}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.02]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="font-semibold text-foreground">Analysis failed</h3>
          <p className="mt-1 text-sm text-red-400">{error}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Check the URL and try again. Ensure OPENAI_API_KEY is set in
            .env.local.
          </p>
        </div>
      </div>
    );
  }

  if (!scorecard) return null;

  return (
    <div className="mt-16 space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-bold">Scorecard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {decodeURIComponent(url)}
        </p>
      </div>

      {/* Overall score */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Overall Score
        </p>
        <div className="mt-3 flex items-baseline justify-center gap-2">
          <span className="text-6xl font-extrabold text-foreground">
            {scorecard.overall}
          </span>
          <span className="text-xl text-muted-foreground">/10</span>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {scorecard.categories.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {item.label}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">
                {item.score}
              </span>
              <span className="text-sm text-muted-foreground">/10</span>
            </div>
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.status === "strong"
                      ? "bg-emerald-500"
                      : item.status === "weak"
                        ? "bg-red-400"
                        : "bg-amber-500"
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
              className="mt-3 text-[10px] uppercase tracking-wider"
            >
              {item.status}
            </Badge>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {item.note}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {scorecard.recommendations.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
          <h3 className="text-base font-semibold text-foreground">
            Top recommendations
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Prioritized fixes to improve conversion
          </p>
          <ol className="mt-5 space-y-3">
            {scorecard.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <ScorecardActions url={decodeURIComponent(url)} scorecard={scorecard} />
    </div>
  );
}
