import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { projects } from "@/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const [row] = await getDb()
      .select()
      .from(projects)
      .where(eq(projects.slug, slug));

    if (!row) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({
      ...row,
      tags: JSON.parse(row.tags),
      avgRating:
        row.ratingCount > 0
          ? Math.round((row.ratingSum / row.ratingCount) * 10) / 10
          : 0,
    });
  } catch (err) {
    console.error("GET /api/projects/[slug] error:", err);
    return Response.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
