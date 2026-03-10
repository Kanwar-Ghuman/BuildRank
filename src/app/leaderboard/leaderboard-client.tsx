"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Trophy, Loader2 } from "lucide-react";
import { Container } from "@/components/layout/container";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  image: string | null;
  url: string;
  tags: string[];
  avgRating: number;
  ratingCount: number;
  creator: { name: string; avatar: string | null };
}

const RANK_MEDALS: Record<number, string> = { 0: "🥇", 1: "🥈", 2: "🥉" };

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
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Leaderboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Top-rated projects ranked by the community
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] p-16 text-center">
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
            <div className="overflow-hidden rounded-xl border border-white/[0.06]">
              {/* Table header */}
              <div className="grid grid-cols-[3rem_1fr_1fr_6rem_5rem] items-center gap-x-2 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 md:grid-cols-[3.5rem_1.5fr_1fr_6rem_6rem]">
                <span>#</span>
                <span>Project</span>
                <span>Creator</span>
                <span className="text-right">Rating</span>
                <span className="text-right">Votes</span>
              </div>

              {/* Rows */}
              {projects.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/project/${project.slug}`}
                  className="group grid grid-cols-[3rem_1fr_1fr_6rem_5rem] items-center gap-x-2 border-b border-white/[0.04] px-5 py-4 transition-colors last:border-b-0 hover:bg-white/[0.03] md:grid-cols-[3.5rem_1.5fr_1fr_6rem_6rem]"
                >
                  {/* Rank */}
                  <span className="flex items-center justify-center text-base">
                    {RANK_MEDALS[i] !== undefined ? (
                      <span className="text-xl">{RANK_MEDALS[i]}</span>
                    ) : (
                      <span className="font-semibold text-muted-foreground">
                        {i + 1}
                      </span>
                    )}
                  </span>

                  {/* Project */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.04]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={36}
                          height={36}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-sm font-bold text-primary">
                          {project.title.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Creator */}
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.04]">
                      {project.creator.avatar ? (
                        <Image
                          src={project.creator.avatar}
                          alt={project.creator.name}
                          width={28}
                          height={28}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-[10px] font-bold text-muted-foreground">
                          {project.creator.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="truncate text-sm text-muted-foreground">
                      {project.creator.name}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-sm font-bold text-foreground">
                      {project.avgRating.toFixed(1)}
                    </span>
                  </div>

                  {/* Votes */}
                  <span className="text-right text-sm text-muted-foreground">
                    {project.ratingCount}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
