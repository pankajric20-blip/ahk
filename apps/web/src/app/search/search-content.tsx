"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchPageContentProps {
  q: string;
  resultCount: number;
}

export function SearchPageHeader({ q, resultCount }: SearchPageContentProps) {
  const { ui } = useLanguage();
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {q ? `${ui("search_results_for")} "${q}"` : ui("search_title")}
      </h1>
      {q && (
        <p className="text-muted-foreground">
          {ui("search_results_count").replace("{n}", String(resultCount))}
        </p>
      )}
    </div>
  );
}

export function SearchEmptyPrompt() {
  const { ui } = useLanguage();
  return (
    <div className="py-20 text-center border rounded-xl border-dashed bg-muted/10">
      <p className="text-muted-foreground text-lg">
        {ui("search_title")} — {ui("search_try_different")}
      </p>
    </div>
  );
}

export function SearchNoResults({ q }: { q: string }) {
  const { ui } = useLanguage();
  return (
    <div className="py-20 text-center border rounded-xl border-dashed bg-muted/10">
      <h3 className="text-xl font-medium mb-2">
        {ui("search_no_results")} "{q}"
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        {ui("search_try_different")}
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/categories"
          className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          {ui("search_browse_categories")}
        </Link>
      </div>
    </div>
  );
}
