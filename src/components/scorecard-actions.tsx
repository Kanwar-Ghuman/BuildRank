"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Save, ExternalLink, Copy, LogIn } from "lucide-react";
import type { Scorecard } from "@/lib/analyze";

interface ScorecardActionsProps {
  url: string;
  scorecard: Scorecard;
}

export function ScorecardActions({ url, scorecard }: ScorecardActionsProps) {
  const { isSignedIn } = useAuth();
  const [saved, setSaved] = useState<{ slug: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, scorecard }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      setSaved({ slug: data.slug });
    } catch {
      setSaving(false);
    }
    setSaving(false);
  };

  const btnBase =
    "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all";

  if (!isSignedIn) {
    return (
      <div className="mt-6">
        <Link
          href="/sign-in"
          className={`${btnBase} border border-white/[0.1] bg-white/[0.04] text-foreground hover:border-white/[0.2] hover:bg-white/[0.08]`}
        >
          <LogIn className="h-4 w-4" />
          Sign in to save this report
        </Link>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/report/${saved.slug}`}
          className={`${btnBase} border border-white/[0.1] bg-white/[0.04] text-foreground hover:border-white/[0.2] hover:bg-white/[0.08]`}
        >
          <ExternalLink className="h-4 w-4" />
          View saved report
        </Link>
        <button
          onClick={() => {
            const u = `${window.location.origin}/report/${saved.slug}`;
            navigator.clipboard.writeText(u);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className={`${btnBase} bg-primary text-primary-foreground hover:brightness-110`}
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy share link"}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleSave}
        disabled={saving}
        className={`${btnBase} border border-white/[0.1] bg-white/[0.04] text-foreground hover:border-white/[0.2] hover:bg-white/[0.08] disabled:opacity-50`}
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving\u2026" : "Save to dashboard"}
      </button>
    </div>
  );
}
