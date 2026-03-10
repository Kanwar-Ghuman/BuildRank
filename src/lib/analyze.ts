import OpenAI from "openai";

export interface ScorecardCategory {
  label: string;
  score: number;
  status: "strong" | "ok" | "weak";
  note: string;
}

export interface Scorecard {
  overall: number;
  categories: ScorecardCategory[];
  recommendations: string[];
}

function extractText(html: string): string {
  const noScript = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  const noStyle = noScript.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  const text = noStyle.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.slice(0, 12000);
}

export async function analyzeLandingPage(url: string): Promise<Scorecard> {
  const res = await fetch(url, {
    headers: { "User-Agent": "BuildRank/1.0 (Landing page analyzer)" },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const html = await res.text();
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? "";
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  const bodyText = extractText(html);

  const content = `URL: ${url}\n\nTitle: ${title}\n\nMeta description: ${metaDesc}\n\nPage content (excerpt):\n${bodyText.slice(0, 6000)}`;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a landing page analyst for founders. Evaluate the page on these 5 categories (1-10 each):
1. Problem Clarity - How clearly does the page articulate the problem? Signals: headline, subhead, pain points.
2. Pricing Clarity - Is pricing visible and understandable? Signals: pricing section, tiers.
3. Audience Fit - Does the page speak to the right audience? Signals: tone, use cases, testimonials.
4. Differentiation - How clearly does it differentiate from alternatives? Signals: unique value prop, comparison.
5. Trust - Does the page build trust? Signals: social proof, testimonials, founder story.

For each category, set status: "strong" (7+), "ok" (5-6), or "weak" (1-4).
Keep notes constructive, specific, and actionable. No harsh language.
Return valid JSON only, no markdown.`,
      },
      { role: "user", content },
    ],
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("No response from AI");

  const parsed = JSON.parse(raw) as {
    overall?: number;
    categories?: Array<{ label?: string; score?: number; status?: string; note?: string }>;
    recommendations?: string[];
  };

  if (!parsed.categories || !Array.isArray(parsed.categories)) {
    throw new Error("Invalid scorecard format");
  }

  return {
    overall: Math.round((parsed.overall ?? 0) * 10) / 10,
    categories: parsed.categories.map((c) => ({
      label: c.label ?? "Category",
      score: Math.min(10, Math.max(1, Math.round(c.score ?? 5))),
      status: (["strong", "ok", "weak"].includes(c.status ?? "") ? c.status : "ok") as "strong" | "ok" | "weak",
      note: c.note ?? "",
    })),
    recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
  };
}
