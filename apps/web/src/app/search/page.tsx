/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "@/components/tool/tool-logo";
import { BackButton } from "@/components/global/back-button";

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
    // Sanitize: strip PostgREST operator characters that could alter the .or() filter string.
    // Supabase parameterises values in .ilike(), but .or() uses string interpolation.
    const safeQ = q
      .trim()
      .slice(0, 200) // cap length to prevent abuse
      .replace(/[%*():,]/g, ""); // strip PostgREST / SQL wildcards

    if (safeQ) {
      const { data } = await supabase
        .from("tools")
        .select("*")
        .eq("status", "published")
        .or(
          `name.ilike.%${safeQ}%,description_en.ilike.%${safeQ}%,description_hi.ilike.%${safeQ}%`,
        )
        .order("rating", { ascending: false });

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
            <div
              key={tool.id}
              className="group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all overflow-hidden h-full"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
                    <ToolLogo
                      logoUrl={tool.logo_url}
                      name={tool.name}
                      size="md"
                    />
                  </div>
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase font-bold bg-secondary text-secondary-foreground">
                    {tool.pricing_model}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  <Link
                    href={`/tool/${tool.slug}`}
                    className="before:absolute before:inset-0"
                  >
                    {tool.name}
                  </Link>
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                  {tool.description_en}
                </p>

                <div className="mt-auto pt-3 border-t flex justify-between items-center w-full">
                  <div className="flex items-center text-amber-500 text-xs font-semibold">
                    {tool.rating || "New"} ★
                  </div>
                  <span className="text-xs font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
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
