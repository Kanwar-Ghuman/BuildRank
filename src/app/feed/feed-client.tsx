"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Star,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/layout/container";

interface Project {
  id: string;
  slug: string;
  userId: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  image: string | null;
  tags: string[];
  avgRating: number;
  ratingCount: number;
  createdAt: string;
}

export function FeedClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [userScore, setUserScore] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/feed")
      .then((r) => (r.ok ? r.json() : []))
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const current = projects[index] ?? null;

  const handleRate = useCallback(
    async (score: number) => {
      if (!current || ratingLoading) return;
      setRatingLoading(true);
      try {
        const res = await fetch(`/api/projects/${current.slug}/rate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score }),
        });
        if (res.ok) {
          setUserScore(score);
          // Auto-advance after a short delay
          setTimeout(() => {
            goNext();
          }, 600);
        }
      } catch {
        // ignore
      } finally {
        setRatingLoading(false);
      }
    },
    [current, ratingLoading],
  );

  const goNext = useCallback(() => {
    if (index < projects.length - 1) {
      setDirection("right");
      setTimeout(() => {
        setIndex((i) => i + 1);
        setUserScore(null);
        setHoveredStar(0);
        setDirection(null);
      }, 150);
    }
  }, [index, projects.length]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      setDirection("left");
      setTimeout(() => {
        setIndex((i) => i - 1);
        setUserScore(null);
        setHoveredStar(0);
        setDirection(null);
      }, 150);
    }
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key >= "1" && e.key <= "5") handleRate(Number(e.key));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, handleRate]);

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (projects.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Container className="text-center">
          <h2 className="text-2xl font-bold">No projects to show yet</h2>
          <p className="mt-2 text-muted-foreground">
            Be the first to share your project with the community.
          </p>
          <Link
            href="/submit"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Submit a project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </main>
    );
  }

  const isEnd = index >= projects.length;

  if (isEnd || !current) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Container className="text-center">
          <div className="text-5xl">🎉</div>
          <h2 className="mt-4 text-2xl font-bold">
            You&apos;re all caught up!
          </h2>
          <p className="mt-2 text-muted-foreground">
            You&apos;ve seen all the projects. Check back later for more.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/leaderboard"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 text-sm font-semibold transition-all hover:border-white/[0.2] hover:bg-white/[0.08]"
            >
              View leaderboard
            </Link>
            <Link
              href="/submit"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Submit yours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.04),transparent)]" />

      <Container className="relative z-10 flex flex-col items-center py-8 md:py-12">
        {/* Progress */}
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            {index + 1} / {projects.length}
          </span>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${((index + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs">Use arrow keys or 1-5 to rate</span>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className={`w-full max-w-xl transition-all duration-150 ${
            direction === "right"
              ? "translate-x-8 opacity-0"
              : direction === "left"
                ? "-translate-x-8 opacity-0"
                : "translate-x-0 opacity-100"
          }`}
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold text-foreground">
                  {current.title}
                </h2>
                <p className="mt-1 text-base text-muted-foreground">
                  {current.tagline}
                </p>
              </div>
              {current.avgRating > 0 && (
                <div className="ml-4 flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-bold text-primary">
                    {current.avgRating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({current.ratingCount})
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {current.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="mt-5 leading-relaxed text-foreground/80">
              {current.description}
            </p>

            {/* Link */}
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Visit project
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Rating UI */}
            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
                {userScore ? "Rated!" : "Rate this project"}
              </p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    disabled={ratingLoading}
                    className="group rounded-lg p-2 transition-all hover:scale-110 hover:bg-white/[0.04] disabled:opacity-50"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoveredStar || userScore || 0)
                          ? "fill-primary text-primary"
                          : "text-white/20 group-hover:text-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={index === 0}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] px-4 py-2.5 text-sm font-medium transition-all hover:border-white/[0.12] hover:bg-white/[0.04] disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <Link
              href={`/project/${current.slug}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View details →
            </Link>
            <button
              onClick={goNext}
              disabled={index >= projects.length - 1}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] px-4 py-2.5 text-sm font-medium transition-all hover:border-white/[0.12] hover:bg-white/[0.04] disabled:opacity-30"
            >
              Skip
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
}
