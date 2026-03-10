import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScorecardPreviewProps {
  searchParams: Promise<{ url?: string }>;
}

const MOCK_SCORECARD = {
  overall: 6.8,
  categories: [
    { label: "Problem Clarity", score: 8, status: "strong", note: "Headline clearly states the pain." },
    { label: "Pricing Clarity", score: 4, status: "weak", note: "Pricing is hidden. Add visible tiers." },
    { label: "Audience Fit", score: 7, status: "strong", note: "Tone matches ICP. Add more specific use cases." },
    { label: "Differentiation", score: 5, status: "weak", note: "Could be any competitor. Add unique angle." },
    { label: "Trust", score: 7, status: "strong", note: "Good testimonials. Add founder photo." },
  ],
  recommendations: [
    "Add pricing section above the fold",
    "Add \"Why us\" or comparison section",
    "Include founder story or photo",
  ],
};

export async function ScorecardPreview({ searchParams }: ScorecardPreviewProps) {
  const { url } = await searchParams;
  if (!url) return null;

  return (
    <div className="mt-16 space-y-8">
      <div>
        <h2 className="text-xl font-bold">Scorecard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Analysis for {decodeURIComponent(url)}
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{MOCK_SCORECARD.overall}</span>
            <span className="text-muted-foreground">/10</span>
            <span className="text-sm font-normal text-muted-foreground">Overall</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {MOCK_SCORECARD.categories.map((item) => (
          <Card key={item.label} className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{item.score}</span>
                <span className="text-muted-foreground">/10</span>
                <Badge
                  variant={
                    item.status === "strong"
                      ? "default"
                      : item.status === "weak"
                        ? "destructive"
                        : "secondary"
                  }
                  className="ml-auto text-xs"
                >
                  {item.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Top recommendations</CardTitle>
          <CardDescription>Prioritized fixes to improve conversion</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-inside list-decimal space-y-2 text-sm">
            {MOCK_SCORECARD.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
