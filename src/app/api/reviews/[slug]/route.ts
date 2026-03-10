import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { reviews } from "@/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [row] = await getDb().select().from(reviews).where(eq(reviews.slug, slug));
  if (!row) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ ...row, scorecard: JSON.parse(row.scorecard) });
}
