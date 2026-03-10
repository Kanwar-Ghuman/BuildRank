import { auth } from "@clerk/nextjs/server";
import { desc, sql, and, eq, not, inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { projects, ratings } from "@/db/schema";

// GET /api/feed — get unrated projects for the current user
export async function GET() {
  try {
    const { userId } = await auth();

    const db = getDb();

    if (userId) {
      // Get projects the user hasn't rated yet
      const ratedProjectIds = db
        .select({ projectId: ratings.projectId })
        .from(ratings)
        .where(eq(ratings.userId, userId));

      const rows = await db
        .select()
        .from(projects)
        .where(
          and(
            not(eq(projects.userId, userId)), // Exclude own projects
            sql`${projects.id} NOT IN (SELECT ${ratings.projectId} FROM ${ratings} WHERE ${ratings.userId} = ${userId})`,
          ),
        )
        .orderBy(desc(projects.createdAt))
        .limit(20);

      return Response.json(
        rows.map((r) => ({
          ...r,
          tags: JSON.parse(r.tags),
          avgRating:
            r.ratingCount > 0
              ? Math.round((r.ratingSum / r.ratingCount) * 10) / 10
              : 0,
        })),
      );
    }

    // For unauthenticated users, just return recent projects
    const rows = await getDb()
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(20);

    return Response.json(
      rows.map((r) => ({
        ...r,
        tags: JSON.parse(r.tags),
        avgRating:
          r.ratingCount > 0
            ? Math.round((r.ratingSum / r.ratingCount) * 10) / 10
            : 0,
      })),
    );
  } catch (err) {
    console.error("GET /api/feed error:", err);
    return Response.json({ error: "Failed to fetch feed" }, { status: 500 });
  }
}
