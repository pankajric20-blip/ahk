"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const { ui } = useLanguage();

  const [query, setQuery] = useState(initialQuery);

  // Track if this is the first render — skip the auto-redirect on mount
  const isFirstRender = useRef(true);

  useEffect(() => {
    // On first mount, sync input with URL but DO NOT redirect
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else if (!query && initialQuery) {
        // User cleared the search — go back to /search without query
        router.push(`/search`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]); // intentionally only react to query changes, not mount

  // Handle Enter key for immediate search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else {
        router.push(`/search`);
      }
    }
  };

  return (
    <div className="relative group flex-1 max-w-lg">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={ui("search_placeholder")}
        className="h-10 w-full rounded-full border border-input bg-background/50 px-9 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background"
      />
    </div>
  );
}
