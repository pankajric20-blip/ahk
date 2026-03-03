/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { PageHeader } from "@/components/global/page-header";
import { CategoryList } from "@/components/global/category-list";

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
    .from("task_categories")
    .select("*")
    .order("display_order");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <PageHeader titleKey="cats_title" subtitleKey="cats_subtitle" />
      </div>

      {categories && categories.length > 0 ? (
        <CategoryList categories={categories as any} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border bg-card flex flex-col animate-pulse h-40"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="h-6 w-24 bg-muted rounded" />
              </div>
              <div className="h-4 w-full bg-muted rounded mt-auto" />
              <div className="h-4 w-3/4 bg-muted rounded mt-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
