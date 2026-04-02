import { NextResponse } from "next/server";
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";

// Max characters for a search query
const MAX_QUERY_LEN = 200;
// Max results per request (hard cap prevents abuse)
const MAX_LIMIT = 50;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQ = searchParams.get("q") ?? "";

  if (!rawQ.trim()) {
    return NextResponse.json({ tools: [], message: "No query provided" });
  }

  // Validate and sanitize limit
  const rawLimit = parseInt(searchParams.get("limit") ?? "10", 10);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(1, rawLimit), MAX_LIMIT)
    : 10;

  // Trim and cap query length, strip characters that break PostgREST FTS
  const q = rawQ
    .trim()
    .slice(0, MAX_QUERY_LEN)
    .replace(/[%*():,'"&|!<>\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!q) {
    return NextResponse.json({ tools: [], message: "Invalid query" });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const { data: tools, error } = await supabase
    .from("ai_tools")
    .select(
      "id, slug, logo_url, pricing_model, price_inr_monthly, rating_avg, rating_count, " +
        "name_en, name_hi, name_hinglish, tagline_en, tagline_hi, tagline_hinglish, " +
        "description_en, description_hi, description_hinglish, " +
        "made_in_india, upi_payment_accepted, gst_compliant",
    )
    .eq("status", "approved")
    .textSearch("search_vector", q, {
      type: "websearch",
      config: "simple",
    })
    .order("rating_avg", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Search Error:", error.message);
    // Return generic error — never expose DB error details to client
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 },
    );
  }

  // Log search asynchronously — fire and forget, never awaited
  void (supabase.from("search_logs") as any).insert({
    query: q,
    results_count: tools?.length ?? 0,
    filters_used: { search_type: "api_route" },
  });

  return NextResponse.json(
    { tools },
    {
      headers: {
        // Cache successful search results for 60 seconds at the edge
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
