import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { ToolCard } from "@/components/tool/tool-card";
import { CategoryGrid } from "@/components/global/category-grid";
import {
  HeroSection,
  FeaturedSectionHeader,
  HomeSearchBar,
  HomeBadge,
} from "@/components/global/localized-sections";
import { getLocale } from "@/lib/get-locale";

// Cache the homepage for 5 minutes — re-render in background on next request
export const revalidate = 300;

export default async function Home() {
  const [cookieStore, locale] = await Promise.all([cookies(), getLocale()]);
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  // Single query against the lean list view — one locale, no heavy JSONB columns
  const { data: featuredTools } = await supabase
    .from("ai_tools_list")
    .select(
      "id, slug, logo_url, pricing_model, price_inr_monthly, rating_avg, rating_count, " +
        "name, tagline, made_in_india, upi_payment_accepted, gst_compliant, is_featured, is_sponsored",
    )
    .eq("status", "approved")
    .eq("locale", locale)
    .order("is_featured", { ascending: false })
    .order("is_sponsored", { ascending: false })
    .order("rating_avg", { ascending: false })
    .limit(6);

  // Fetch popular task categories — only columns CategoryGrid needs
  const { data: categories } = await supabase
    .from("task_categories")
    .select(
      "id, name_en, name_hi, name_hinglish, slug, icon, tool_count, description_en, description_hi, description_hinglish",
    )
    .eq("level", 0)
    .order("display_order", { ascending: true })
    .limit(8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <HomeBadge />
          <HeroSection />

          <HomeSearchBar />
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <FeaturedSectionHeader />
            <Link
              href="/categories"
              className="hidden sm:flex items-center text-primary font-medium hover:underline underline-offset-4 shrink-0"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools && featuredTools.length > 0
              ? featuredTools.map((tool: any) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))
              : // Empty state skeletons
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border bg-card p-6 h-[240px] flex flex-col justify-between animate-pulse"
                  >
                    <div className="flex justify-between">
                      <div className="h-12 w-12 rounded-lg bg-muted"></div>
                      <div className="h-5 w-16 rounded-full bg-muted"></div>
                    </div>
                    <div>
                      <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                      <div className="h-4 w-full bg-muted rounded mb-1"></div>
                      <div className="h-4 w-2/3 bg-muted rounded"></div>
                    </div>
                    <div className="h-4 w-12 bg-muted rounded mt-4"></div>
                  </div>
                ))}
          </div>
          <div className="mt-8 sm:hidden flex justify-center">
            <Link
              href="/categories"
              className="flex items-center text-primary font-medium hover:underline underline-offset-4"
            >
              View all tools <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {categories && categories.length > 0 ? (
            <CategoryGrid categories={categories as any} />
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="h-8 w-48 bg-muted rounded mx-auto mb-4 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border bg-card flex flex-col items-center animate-pulse"
                  >
                    <div className="h-12 w-12 rounded-full bg-muted mb-4" />
                    <div className="h-5 w-24 bg-muted rounded" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
