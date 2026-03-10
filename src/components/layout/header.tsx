import Link from "next/link";
import { Container } from "./container";
import { AuthButtons } from "./auth-buttons";
import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-lg text-foreground">BuildRank</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/feed"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Feed
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Leaderboard
          </Link>
          <Link
            href="/submit"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Submit
          </Link>
          <Link
            href="/analyze"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Analyze
          </Link>
          <AuthButtons />
        </nav>
      </Container>
    </header>
  );
}
