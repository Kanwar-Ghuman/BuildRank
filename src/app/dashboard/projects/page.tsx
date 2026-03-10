import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="mt-1 text-muted-foreground">
          Your saved landing page reviews.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>No projects yet</CardTitle>
          <CardDescription>
            Analyze a landing page and save the report to see it here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/#analyze"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Analyze a page
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
