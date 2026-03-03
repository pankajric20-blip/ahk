import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { ToolCard } from "@/components/tool/tool-card";
import { CategoryGrid } from "@/components/global/category-grid";
import {
  HeroSection,
  FeaturedSectionHeader,
  HomeSearchBar,
} from "@/components/global/localized-sections";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  // Fetch featured/sponsored tools — fall back to top-rated published tools
  let { data: featuredTools } = await supabase
    .from("ai_tools")
    .select("*")
    .eq("status", "approved")
    .or("is_featured.eq.true,is_sponsored.eq.true")
    .order("rating_avg", { ascending: false })
    .limit(6);

  // Fallback: if no featured/sponsored tools, show highest-rated approved tools
  if (!featuredTools || featuredTools.length === 0) {
    const { data: topTools } = await supabase
      .from("ai_tools")
      .select("*")
      .eq("status", "approved")
      .order("rating_avg", { ascending: false })
      .limit(6);
    featuredTools = topTools;
  }

  // Fetch popular task categories
  const { data: categories } = await supabase
    .from("task_categories")
    .select("*")
    .eq("level", 0)
    .order("display_order", { ascending: true })
    .limit(8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">
              India&apos;s First Hindi-First AI Directory
            </span>
            <span className="sm:hidden">Hindi-First AI Directory</span>
          </div>
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
