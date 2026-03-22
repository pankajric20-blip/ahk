/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { ToolCard } from "@/components/tool/tool-card";
import { BackButton } from "@/components/global/back-button";
import { getLocale } from "@/lib/get-locale";

export const metadata = {
  title: "Free AI Tools | Aihkya",
  description:
    "Discover the best free AI tools — no credit card required. Browse our curated list of AI tools available at no cost.",
};

export default async function FreeToolsPage() {
  const [cookieStore, locale] = await Promise.all([cookies(), getLocale()]);
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const { data: freeTools } = await supabase
    .from("ai_tools_list")
    .select(
      "id, slug, logo_url, pricing_model, price_inr_monthly, rating_avg, rating_count, " +
        "name, tagline, made_in_india, upi_payment_accepted, gst_compliant",
    )
    .eq("status", "approved")
    .eq("locale", locale)
    .in("pricing_model", ["free", "freemium", "free_trial"])
    .order("rating_avg", { ascending: false });

  const tools = freeTools ?? [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[60vh]">
      <div className="mb-8">
        <BackButton fallbackHref="/" translationKey="common_back" />
      </div>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold px-3 py-1 mb-4">
          ✓ 100% Free or Freemium
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Free AI Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {tools.length} AI tools you can start using today at $0 or ₹0 tier.
        </p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool: any) => (
            <ToolCard key={tool.id} tool={tool} />
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
