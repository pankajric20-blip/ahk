/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tool/tool-card";
import { BackButton } from "@/components/global/back-button";
import { PricingFilter } from "./pricing-filter";
import { Suspense } from "react";
import {
  CategoryPageContent,
  CategoryFiltersHeader,
  CategoryPricingLabel,
  CategoryEmptyState,
} from "./category-content";
import { getLocale, localizeTools } from "@/lib/get-locale";

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
  const activePricing = sp.pricing ? sp.pricing.split(",").filter(Boolean) : [];

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const { data } = await supabase
    .from("task_categories")
    .select("*")
    .eq("slug", p.slug)
    .single();
  const category: any = data;
  if (!category) notFound();

  const locale = await getLocale();

  let query = supabase
    .from("ai_tools")
    .select(
      "id, slug, logo_url, pricing_model, price_inr_monthly, rating_avg, rating_count, " +
        "name_en, name_hi, name_hinglish, tagline_en, tagline_hi, tagline_hinglish, " +
        "made_in_india, upi_payment_accepted, gst_compliant, tool_tasks!inner(task_id)",
    )
    .eq("tool_tasks.task_id", category.id)
    .eq("status", "approved")
    .order("is_sponsored", { ascending: false })
    .order("rating_avg", { ascending: false });

  if (activePricing.length > 0) {
    query = query.in(
      "pricing_model",
      activePricing.map((p) => p.toLowerCase()),
    );
  }

  const { data: categoryTools, error } = await query;
  if (error) console.error(error);
  const tools = localizeTools(categoryTools ?? [], locale);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <BackButton fallbackHref="/categories" translationKey="cat_back" />
      </div>

      <CategoryPageContent
        category={category}
        tools={tools}
        activePricing={activePricing}
        slug={p.slug}
      />

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <CategoryFiltersHeader />
          <div className="space-y-3">
            <CategoryPricingLabel />
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

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.length > 0 ? (
            tools.map((tool: any) => <ToolCard key={tool.id} tool={tool} />)
          ) : (
            <CategoryEmptyState activePricing={activePricing} slug={p.slug} />
          )}
        </div>
      </div>
    </div>
  );
}
