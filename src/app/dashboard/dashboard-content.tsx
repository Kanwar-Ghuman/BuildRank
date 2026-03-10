"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, FolderKanban, TrendingUp } from "lucide-react";

interface Review {
  id: string;
  slug: string;
  url: string;
  scorecard: { overall: number };
  createdAt: string;
}

export function DashboardContent() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : []))
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const avgScore =
    reviews.length > 0
      ? (
          reviews.reduce((s, r) => s + r.scorecard.overall, 0) / reviews.length
        ).toFixed(1)
      : "—";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your landing page scorecards and recommendations.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: BarChart3,
            label: "Saved reviews",
            value: loading ? "…" : String(reviews.length),
          },
          {
            icon: TrendingUp,
            label: "Average score",
            value: loading ? "…" : avgScore,
          },
          {
            icon: FolderKanban,
            label: "Projects",
            value: loading ? "…" : String(reviews.length),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Recent activity</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Your latest scorecards
            </p>
          </div>
        </div>
        <div className="mt-5">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center rounded-lg border border-dashed border-white/[0.08] p-8 text-center">
              <p className="text-sm text-muted-foreground">No reviews yet</p>
              <Link
                href="/#analyze"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Analyze your first page
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {reviews.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/report/${r.slug}`}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    <span className="truncate text-sm text-foreground">
                      {r.url}
                    </span>
                    <span className="ml-3 shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                      {r.scorecard.overall}/10
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
