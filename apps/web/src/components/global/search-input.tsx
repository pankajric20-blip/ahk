"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);

  // Debounce the navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query && query !== initialQuery) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else if (!query && initialQuery) {
        // If cleared, either go to /search empty or maybe home? Let's stay on /search without q
        router.push(`/search`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, router, initialQuery]);

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
        placeholder="Search AI tools (e.g. video generation)..."
        className="h-10 w-full rounded-full border border-input bg-background/50 px-9 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background"
      />
    </div>
  );
}
