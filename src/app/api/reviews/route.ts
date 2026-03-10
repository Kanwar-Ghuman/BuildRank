import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb } from "@/db";
import { reviews } from "@/db/schema";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await getDb().select().from(reviews).where(eq(reviews.userId, userId)).orderBy(desc(reviews.createdAt));
  return Response.json(rows.map((r) => ({ ...r, scorecard: JSON.parse(r.scorecard) })));
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { url, scorecard } = body;
  if (!url || !scorecard) {
    return Response.json({ error: "url and scorecard required" }, { status: 400 });
  }
  const slug = nanoid(10);
  await getDb().insert(reviews).values({
    slug,
    userId,
    url,
    scorecard: JSON.stringify(scorecard),
  });
  const [row] = await getDb().select().from(reviews).where(eq(reviews.slug, slug));
  return Response.json({ ...row, scorecard: JSON.parse(row.scorecard) });
}
