import Link from "next/link";
import Image from "next/image";
import { Container } from "./container";
import { AuthButtons } from "./auth-buttons";

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
          <AuthButtons />
        </nav>
      </Container>
    </header>
  );
}
