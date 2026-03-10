import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { eq, and, sql, desc } from "drizzle-orm";
import { getDb } from "@/db";
import { projects, ratings } from "@/db/schema";

// POST /api/projects/[slug]/rate — rate a project 1-5
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await req.json();
  const score = Number(body.score);

  if (!score || score < 1 || score > 5 || !Number.isInteger(score)) {
    return Response.json(
      { error: "score must be an integer from 1 to 5" },
      { status: 400 },
    );
  }

  try {
    const db = getDb();
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug));

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    // Check for existing rating
    const [existing] = await db
      .select()
      .from(ratings)
      .where(
        and(eq(ratings.projectId, project.id), eq(ratings.userId, userId)),
      );

    if (existing) {
      // Update existing rating
      const diff = score - existing.score;
      await db
        .update(ratings)
        .set({ score })
        .where(eq(ratings.id, existing.id));
      await db
        .update(projects)
        .set({ ratingSum: sql`${projects.ratingSum} + ${diff}` })
        .where(eq(projects.id, project.id));
    } else {
      // Insert new rating
      await db.insert(ratings).values({
        projectId: project.id,
        userId,
        score,
      });
      await db
        .update(projects)
        .set({
          ratingSum: sql`${projects.ratingSum} + ${score}`,
          ratingCount: sql`${projects.ratingCount} + 1`,
        })
        .where(eq(projects.id, project.id));
    }

    // Return updated project
    const [updated] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, project.id));

    return Response.json({
      avgRating:
        updated.ratingCount > 0
          ? Math.round((updated.ratingSum / updated.ratingCount) * 10) / 10
          : 0,
      ratingCount: updated.ratingCount,
      userScore: score,
    });
  } catch (err) {
    console.error("POST /api/projects/[slug]/rate error:", err);
    return Response.json({ error: "Failed to rate project" }, { status: 500 });
  }
}
