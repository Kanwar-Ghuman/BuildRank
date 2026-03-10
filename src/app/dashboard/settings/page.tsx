import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Sign in to save reports and access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Auth integration coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
