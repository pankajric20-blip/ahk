/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import { ToolCard } from "@/components/tool/tool-card";
import { BackButton } from "@/components/global/back-button";
import { PricingFilter } from "./pricing-filter";
import { Suspense } from "react";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pricing?: string }>;
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
    .from("task_categories")
    .select("name_en")
    .eq("slug", p.slug)
    .single();
  const category: any = data;

  if (!category) return { title: "Category Not Found - Aihkya" };

  return {
    title: `${category.name_en} AI Tools | Aihkya`,
    description: `Discover the best AI tools for ${category.name_en}.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const p = await params;
  const sp = await searchParams;

  // Parse active pricing filters from URL (?pricing=Free,Paid)
  const activePricing = sp.pricing ? sp.pricing.split(",").filter(Boolean) : [];

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  // Fetch category
  const { data } = await supabase
    .from("task_categories")
    .select("*")
    .eq("slug", p.slug)
    .single();
  const category: any = data;

  if (!category) {
    notFound();
  }

  // Fetch tools in category via intersection table
  let query = supabase
    .from("ai_tools")
    .select("*, tool_tasks!inner(task_id)")
    .eq("tool_tasks.task_id", category.id)
    .eq("status", "approved")
    .order("is_sponsored", { ascending: false })
    .order("rating_avg", { ascending: false });

  // Apply pricing filter if any are selected
  if (activePricing.length > 0) {
    // Note: ensure activePricing maps properly if UI casing differs from DB ENUM
    // DB enum: 'free', 'freemium', 'free_trial', 'paid', 'contact_sales'
    const lowerPricing = activePricing.map((p) => p.toLowerCase());
    query = query.in("pricing_model", lowerPricing);
  }

  const { data: categoryTools, error } = await query;
  if (error) console.error(error);
  const tools = categoryTools ?? [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button — goes to browser history; falls back to /categories */}
      <div className="mb-8">
        <BackButton fallbackHref="/categories" label="All Categories" />
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {category.name_en} Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Browse our curated collection of{" "}
          <span className="text-foreground font-medium">{tools.length}</span> AI
          platforms specifically targeted for {category.name_en.toLowerCase()}{" "}
          workflows.
          {activePricing.length > 0 && (
            <span className="ml-1 text-sm text-primary">
              (filtered: {activePricing.join(", ")})
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
            <Filter className="h-5 w-5" /> Filters
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Pricing</h4>
            {/* Suspense needed because PricingFilter uses useSearchParams */}
            <Suspense
              fallback={
                <div className="text-sm text-muted-foreground">
                  Loading filters…
                </div>
              }
            >
              <PricingFilter selected={activePricing} />
            </Suspense>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.length > 0 ? (
            tools.map((tool: any) => <ToolCard key={tool.id} tool={tool} />)
          ) : (
            <div className="col-span-full py-12 text-center border rounded-xl border-dashed bg-muted/20">
              <p className="text-muted-foreground text-lg">
                {activePricing.length > 0
                  ? `No ${activePricing.join(" / ")} tools found in this category.`
                  : "No tools found in this category yet."}
              </p>
              {activePricing.length > 0 && (
                <Link
                  href={`/categories/${p.slug}`}
                  className="mt-4 inline-flex items-center justify-center h-9 px-4 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-colors"
                >
                  Clear filters
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
