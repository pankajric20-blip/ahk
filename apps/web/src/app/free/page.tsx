/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "@/components/tool/tool-logo";
import { BackButton } from "@/components/global/back-button";

export const metadata = {
  title: "Free AI Tools | Aihkya",
  description:
    "Discover the best free AI tools — no credit card required. Browse our curated list of AI tools available at no cost.",
};

export default async function FreeToolsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const { data: freeTools } = await supabase
    .from("tools")
    .select("*")
    .eq("status", "published")
    .eq("pricing_model", "Free")
    .order("rating", { ascending: false });

  const tools = freeTools ?? [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[60vh]">
      <div className="mb-8">
        <BackButton fallbackHref="/" label="Back to Home" />
      </div>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold px-3 py-1 mb-4">
          ✓ 100% Free
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Free AI Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {tools.length} AI tools you can start using today — no credit card
          required.
        </p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool: any) => (
            <div
              key={tool.id}
              className="group relative flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all overflow-hidden h-full"
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
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase font-bold text-green-500 border-green-500/30 bg-green-500/10">
                    Free
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
          <p className="text-muted-foreground text-lg">
            No free tools found yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
