"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, ExternalLink, ArrowLeft, Calendar, Loader2 } from "lucide-react";
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

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userScore, setUserScore] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setProject)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleRate = async (score: number) => {
    if (!project || ratingLoading) return;
    setRatingLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.slug}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      if (res.ok) {
        const data = await res.json();
        setUserScore(score);
        setProject((p) =>
          p
            ? {
                ...p,
                avgRating: data.avgRating,
                ratingCount: data.ratingCount,
              }
            : p,
        );
      }
    } catch {
      // ignore
    } finally {
      setRatingLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Container className="text-center">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <p className="mt-2 text-muted-foreground">
            This project may have been removed.
          </p>
          <Link
            href="/feed"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Back to feed
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)]">
      <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.06),transparent)]" />
      <Container className="relative z-10 py-8 md:py-16">
        <Link
          href="/feed"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Link>

        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                  {project.title}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  {project.tagline}
                </p>
              </div>
              {project.avgRating > 0 && (
                <div className="flex shrink-0 flex-col items-center rounded-xl bg-primary/10 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-2xl font-bold text-primary">
                      {project.avgRating}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {project.ratingCount}{" "}
                    {project.ratingCount === 1 ? "vote" : "votes"}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Image */}
            {project.image && (
              <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                About
              </h3>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/80">
                {project.description}
              </p>
            </div>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-6">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Visit project
                <ExternalLink className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Rating section */}
          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              {userScore ? "Thanks for rating!" : "Rate this project"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {userScore
                ? "Your vote has been recorded."
                : "How would you rate this project?"}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
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
                    className={`h-9 w-9 transition-colors ${
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
      </Container>
    </main>
  );
}
