/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  // Fetch featured tools
  const { data: featuredTools } = await supabase
    .from("tools")
    .select("*")
    .eq("status", "published")
    .or("is_featured.eq.true,is_sponsored.eq.true")
    .limit(6);

  // Fetch popular categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
            Discover the Best <span className="text-primary">AI Tools</span> for
            Your Workflow
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            Explore carefully curated AI tools with full Hindi language support,
            detailed pricing, and Indian alternative recommendations.
          </p>

          <div className="w-full max-w-2xl relative flex items-center animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
            <form
              action="/search"
              className="w-full relative flex items-center"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="q"
                placeholder="Search for AI writing, video generation, chatbots..."
                className="w-full h-14 pl-12 pr-4 rounded-full border-2 border-input bg-background/50 backdrop-blur-sm text-lg shadow-sm transition-all focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground h-10 px-6 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Featured Tools
              </h2>
              <p className="text-muted-foreground">
                Hand-picked AI tools for maximum productivity.
              </p>
            </div>
            <Link
              href="/categories"
              className="hidden sm:flex items-center text-primary font-medium hover:underline underline-offset-4"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools && featuredTools.length > 0
              ? featuredTools.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="group relative rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="flex flex-col p-6 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                          {tool.logo_url ? (
                            <img
                              src={tool.logo_url}
                              alt={tool.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-lg">
                              {tool.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                          {tool.pricing_model}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        <Link
                          href={`/tool/${tool.slug}`}
                          className="before:absolute before:inset-0"
                        >
                          {tool.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {tool.description_en}
                      </p>
                      {tool.description_hi && (
                        <p className="text-sm text-muted-foreground/80 font-hindi line-clamp-1 mb-4 italic">
                          &quot;{tool.description_hi}&quot;
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                        <div className="flex items-center text-amber-500">
                          <span className="text-sm font-medium mr-1">
                            {tool.rating || "New"}
                          </span>
                          ★
                        </div>
                        <span className="text-sm font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                          Details <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you need by exploring our organized collections.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories && categories.length > 0
              ? categories.map((category: any) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group flex flex-col items-center justify-center p-6 rounded-xl border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      {/* Replace with actual Lucide icon mapping later */}
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </Link>
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border bg-card flex flex-col items-center animate-pulse"
                  >
                    <div className="h-12 w-12 rounded-full bg-muted mb-4"></div>
                    <div className="h-5 w-24 bg-muted rounded"></div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
