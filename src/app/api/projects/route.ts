import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb } from "@/db";
import { projects } from "@/db/schema";

// GET /api/projects — list all projects (public, sorted by newest)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort") ?? "new"; // new | top
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);
  const offset = Number(searchParams.get("offset") ?? 0);

  try {
    const db = getDb();

    let orderBy;
    if (sort === "top") {
      orderBy = sql`CASE WHEN ${projects.ratingCount} = 0 THEN 0 ELSE ${projects.ratingSum}::float / ${projects.ratingCount} END DESC`;
    } else {
      orderBy = desc(projects.createdAt);
    }

    const rows = await db
      .select()
      .from(projects)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

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
    console.error("GET /api/projects error:", err);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// POST /api/projects — submit a new project (requires auth)
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, tagline, description, url, image, tags } = body;

  if (
    !title?.trim() ||
    !tagline?.trim() ||
    !description?.trim() ||
    !url?.trim()
  ) {
    return Response.json(
      { error: "title, tagline, description, and url are required" },
      { status: 400 },
    );
  }

  try {
    new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const slug = nanoid(10);
    const tagArray = Array.isArray(tags) ? tags.slice(0, 5) : [];

    const db = getDb();
    await db.insert(projects).values({
      slug,
      userId,
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      url: url.trim(),
      image: image?.trim() || null,
      tags: JSON.stringify(tagArray),
    });

    const [row] = await db
      .select()
      .from(projects)
      .where(sql`${projects.slug} = ${slug}`);

    return Response.json(
      { ...row, tags: JSON.parse(row.tags), avgRating: 0 },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
