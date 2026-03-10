"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AnalyzeForm() {
  const router = useRouter();
  const params = useSearchParams();
  const initialUrl = params.get("url") ?? "";
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = url.trim();
      if (!trimmed) return;
      setIsLoading(true);
      router.push(`/analyze?url=${encodeURIComponent(trimmed)}`);
    },
    [url, router]
  );

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://your-startup.com"
        className="h-12 flex-1 bg-card border-border text-base"
        required
      />
      <Button type="submit" size="lg" className="h-12 px-8" disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze"}
      </Button>
    </form>
  );
}
