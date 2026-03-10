"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Show } from "@clerk/nextjs";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="inline-flex h-7 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Get Started
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <UserButton />
      </Show>
    </div>
  );
}
