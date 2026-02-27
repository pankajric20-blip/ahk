/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Browse AI Categories | Aihkya",
  description:
    "Find the best AI tools by category. Explore text generation, image creation, video editing, and more.",
};

export default async function CategoriesPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          All Categories
        </h1>
        <p className="text-xl text-muted-foreground">
          Explore our comprehensive directory of AI tools structured by use-case
          to help you find precisely what you need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories && categories.length > 0
          ? categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group flex flex-col p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all text-card-foreground"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-auto line-clamp-2">
                  Discover {category.name} tools for your creative and
                  professional workflows.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                  Explore tools <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))
          : Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border bg-card flex flex-col animate-pulse h-40"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div className="h-6 w-24 bg-muted rounded"></div>
                </div>
                <div className="h-4 w-full bg-muted rounded mt-auto"></div>
                <div className="h-4 w-3/4 bg-muted rounded mt-2"></div>
              </div>
            ))}
      </div>
    </div>
  );
}
