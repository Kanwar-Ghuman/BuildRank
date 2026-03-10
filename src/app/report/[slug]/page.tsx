import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { reviews } from "@/db/schema";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";

async function getReport(slug: string) {
  const [row] = await getDb()
    .select()
    .from(reviews)
    .where(eq(reviews.slug, slug));
  if (!row) return null;
  return { ...row, scorecard: JSON.parse(row.scorecard) };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) notFound();

  const scorecard =
    typeof report.scorecard === "string"
      ? JSON.parse(report.scorecard)
      : report.scorecard;

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.06),transparent)]" />
        <Container className="relative z-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            BuildRank
          </Link>

          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold">Scorecard</h1>
              <p className="mt-1 text-sm text-muted-foreground">{report.url}</p>
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
              {scorecard.categories?.map(
                (item: {
                  label: string;
                  score: number;
                  status: string;
                  note: string;
                }) => (
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
                ),
              )}
            </div>

            {/* Recommendations */}
            {scorecard.recommendations?.length > 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
                <h3 className="text-base font-semibold text-foreground">
                  Top recommendations
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Prioritized fixes to improve conversion
                </p>
                <ol className="mt-5 space-y-3">
                  {scorecard.recommendations.map((rec: string, i: number) => (
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

            {/* CTA */}
            <div className="pt-8">
              <Link
                href="/#analyze"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Analyze your page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
