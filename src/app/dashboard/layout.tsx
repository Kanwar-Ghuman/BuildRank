import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <aside className="w-56 border-r border-border/50 bg-card/30 p-4">
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/projects"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Projects
          </Link>
          <Link
            href="/dashboard/settings"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
