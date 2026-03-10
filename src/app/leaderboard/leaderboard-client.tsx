"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Star,
  Trophy,
  Medal,
  Award,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/layout/container";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  url: string;
  tags: string[];
  avgRating: number;
  ratingCount: number;
}

const RANK_ICONS = [Trophy, Medal, Award];
const RANK_COLORS = ["text-yellow-400", "text-gray-300", "text-amber-600"];

export function LeaderboardClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?sort=top&limit=50")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Project[]) =>
        setProjects(data.filter((p) => p.ratingCount > 0)),
      )
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="relative min-h-[calc(100vh-4rem)]">
      <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.06),transparent)]" />
      <Container className="relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              The highest-rated projects on BuildRank, ranked by community
              votes.
            </p>
          </div>

          <div className="mt-12">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/[0.08] p-12 text-center">
                <Trophy className="mx-auto h-10 w-10 text-muted-foreground/40" />
                <h3 className="mt-4 font-semibold">No ranked projects yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Projects need at least one rating to appear here.
                </p>
                <Link
                  href="/feed"
                  className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  Rate some projects
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project, i) => {
                  const RankIcon = RANK_ICONS[i] ?? null;
                  const rankColor = RANK_COLORS[i] ?? "text-muted-foreground";

                  return (
                    <Link
                      key={project.id}
                      href={`/project/${project.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                    >
                      {/* Rank  */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                        {RankIcon ? (
                          <RankIcon className={`h-6 w-6 ${rankColor}`} />
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground">
                            {i + 1}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          {project.tagline}
                        </p>
                        {project.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex shrink-0 flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-lg font-bold text-foreground">
                            {project.avgRating}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {project.ratingCount}{" "}
                          {project.ratingCount === 1 ? "vote" : "votes"}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
