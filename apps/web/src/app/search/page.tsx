/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { ToolCard } from "@/components/tool/tool-card";
import { BackButton } from "@/components/global/back-button";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q;
  if (!q) {
    return { title: "Search AI Tools | Aihkya" };
  }
  return {
    title: `Search results for "${q}" | Aihkya`,
  };
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
    // Sanitize
    const safeQ = q
      .trim()
      .slice(0, 200) // cap length to prevent abuse
      .replace(/[%*():,'&|!]/g, " "); // Strip FTS special characters to avoid syntax errors

    if (safeQ) {
      // Use pg_trgm websearch instead of simple ilike for better hinglish results
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
      <div className="mb-8">
        <BackButton fallbackHref="/" label="Back to Home" />
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {q ? `Search results for "${q}"` : "Search AI Tools"}
        </h1>
        {q && (
          <p className="text-muted-foreground">
            Found {searchResults.length}{" "}
            {searchResults.length === 1 ? "tool" : "tools"} matching your query.
          </p>
        )}
      </div>

      {!q ? (
        <div className="py-20 text-center border rounded-xl border-dashed bg-muted/10">
          <p className="text-muted-foreground text-lg">
            Type in the search bar above to discover AI tools.
          </p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((tool: any) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border rounded-xl border-dashed bg-muted/10">
          <h3 className="text-xl font-medium mb-2">No tools found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any AI tools matching "{q}". Try searching for
            related keywords or browse our categories.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
