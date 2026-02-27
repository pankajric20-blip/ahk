/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const p = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const { data } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", p.slug)
    .single();
  const category: any = data;

  if (!category) return { title: "Category Not Found - Aihkya" };

  return {
    title: `${category.name} AI Tools | Aihkya`,
    description: `Discover the best AI tools for ${category.name}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const p = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  // Fetch category
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", p.slug)
    .single();
  const category: any = data;

  if (!category) {
    notFound();
  }

  // Fetch tools in category
  const { data: categoryTools } = await supabase
    .from("tools")
    .select("*")
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("is_sponsored", { ascending: false })
    .order("rating", { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link
        href="/categories"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        All Categories
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {category.name} Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Browse our curated collection of {categoryTools?.length || 0} AI
          platforms specifically targeted for {category.name.toLowerCase()}{" "}
          workflows.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Filters Sidebar (Mocked for now) */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
            <Filter className="h-5 w-5" /> Filters
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Pricing</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-input text-primary focus:ring-primary"
                />
                Free
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-input text-primary focus:ring-primary"
                />
                Freemium
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-input text-primary focus:ring-primary"
                />
                Paid
              </label>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools && categoryTools.length > 0 ? (
            categoryTools.map((tool: any) => (
              <div
                key={tool.id}
                className="group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all overflow-hidden h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
                      {tool.logo_url ? (
                        <img
                          src={tool.logo_url}
                          alt={tool.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="font-bold text-sm">
                          {tool.name.charAt(0)}
                        </span>
                      )}
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
            ))
          ) : (
            <div className="col-span-full py-12 text-center border rounded-xl border-dashed bg-muted/20">
              <p className="text-muted-foreground">
                No tools found in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
