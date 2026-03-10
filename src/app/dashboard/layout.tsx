import Link from "next/link";
import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-60 border-r border-white/[0.06] bg-white/[0.01] p-5 md:block">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Dashboard
        </p>
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.04]"
          >
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            Overview
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            <FolderKanban className="h-4 w-4" />
            Projects
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
