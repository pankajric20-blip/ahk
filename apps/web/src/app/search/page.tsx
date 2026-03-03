/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { ToolCard } from "@/components/tool/tool-card";
import { BackButton } from "@/components/global/back-button";
import {
  SearchPageHeader,
  SearchEmptyPrompt,
  SearchNoResults,
} from "./search-content";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q;
  if (!q) return { title: "Search AI Tools | Aihkya" };
  return { title: `Search results for "${q}" | Aihkya` };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q || "";

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  let searchResults: any[] = [];

  if (q) {
    const safeQ = q
      .trim()
      .slice(0, 200)
      .replace(/[%*():,'"&|!]/g, " ");
    if (safeQ) {
      const { data } = await supabase
        .from("ai_tools")
        .select("*")
        .eq("status", "approved")
        .textSearch("search_vector", safeQ, {
          type: "websearch",
          config: "english",
        })
        .order("rating_avg", { ascending: false });
      if (data) searchResults = data;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[60vh]">
      <div className="mb-4">
        <BackButton fallbackHref="/" label="Back to Home" />
      </div>

      <SearchPageHeader q={q} resultCount={searchResults.length} />

      {!q ? (
        <SearchEmptyPrompt />
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((tool: any) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <SearchNoResults q={q} />
      )}
    </div>
  );
}
