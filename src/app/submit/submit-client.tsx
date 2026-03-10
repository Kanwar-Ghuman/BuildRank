"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, X, Plus, Loader2 } from "lucide-react";
import { Container } from "@/components/layout/container";

const SUGGESTED_TAGS = [
  "SaaS",
  "AI/ML",
  "Developer Tool",
  "Mobile App",
  "E-commerce",
  "Fintech",
  "Open Source",
  "Productivity",
  "Design",
  "API",
  "No-Code",
  "Chrome Extension",
];

export function SubmitClient() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    url: "",
    image: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addTag = (tag: string) => {
    if (tags.length >= 5) return;
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      router.push(`/project/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/20";

  return (
    <main className="relative min-h-[calc(100vh-4rem)]">
      <div className="pointer-events-none absolute inset-0 -top-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,140,50,0.06),transparent)]" />
      <Container className="relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Submit your project
              </span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Share what you&apos;ve built with the community and get rated.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Project name
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="My awesome project"
                required
                maxLength={100}
                className={inputClass}
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setField("tagline", e.target.value)}
                placeholder="A one-liner describing your project"
                required
                maxLength={150}
                className={inputClass}
              />
            </div>

            {/* URL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Project URL
              </label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => setField("url", e.target.value)}
                placeholder="https://your-project.com"
                required
                className={inputClass}
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Screenshot / Logo URL{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setField("image", e.target.value)}
                placeholder="https://example.com/screenshot.png"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Tell us about what you built, why, and what makes it special..."
                required
                rows={4}
                maxLength={2000}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Tags <span className="text-muted-foreground">(up to 5)</span>
              </label>
              {tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      {tag}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={tags.length >= 5}
                    className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs text-muted-foreground transition-all hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-foreground disabled:opacity-40"
                  >
                    <Plus className="h-3 w-3" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4" />
                  Submit project
                </>
              )}
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
}
