"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Show } from "@clerk/nextjs";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="rounded-lg border border-white/[0.08] px-4 py-1.5 text-sm text-muted-foreground transition-all hover:border-white/[0.15] hover:text-foreground">
            Log in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110">
            Get Started
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link
          href="/dashboard"
          className="rounded-lg border border-white/[0.08] px-4 py-1.5 text-sm text-muted-foreground transition-all hover:border-white/[0.15] hover:text-foreground"
        >
          Dashboard
        </Link>
        <UserButton />
      </Show>
    </div>
  );
}
