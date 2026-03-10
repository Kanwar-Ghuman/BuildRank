import Link from "next/link";
import Image from "next/image";
import { Container } from "./container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <Image
              src="/logo.svg"
              alt="BuildRank"
              width={32}
              height={32}
              className="object-contain"
              priority
              unoptimized
            />
          </span>
          <span className="text-lg">BuildRank</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/examples"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Examples
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/#analyze"
            className="inline-flex h-7 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
        </nav>
      </Container>
    </header>
  );
}
