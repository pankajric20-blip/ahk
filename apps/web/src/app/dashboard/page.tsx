/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard | Aihkya",
  description: "Manage your saved tools, reviews, and account settings.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // Fetch saved tools with details
  const { data: bookmarkRows } = await supabase
    .from("saved_tools")
    .select("tool_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(6);

  let savedTools: any[] = [];
  if (bookmarkRows && bookmarkRows.length > 0) {
    const toolIds = bookmarkRows.map((b: any) => b.tool_id);
    const { data: toolData } = await supabase
      .from("ai_tools")
      .select(
        "id, name_en, name_hi, name_hinglish, slug, logo_url, pricing_model, rating_avg, rating_count, tagline_en, tagline_hi, tagline_hinglish, made_in_india, is_featured",
      )
      .in("id", toolIds);
    if (toolData) {
      const toolMap = new Map((toolData as any[]).map((t) => [t.id, t]));
      savedTools = toolIds.map((id: string) => toolMap.get(id)).filter(Boolean);
    }
  }

  // Fetch user reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, tool_id, rating, title, review_text, created_at, status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch tool names for reviews
  let reviewsWithTools: any[] = [];
  if (reviews && reviews.length > 0) {
    const reviewToolIds = [...new Set(reviews.map((r: any) => r.tool_id))];
    const { data: reviewTools } = await supabase
      .from("ai_tools")
      .select("id, name_en, slug, logo_url")
      .in("id", reviewToolIds);
    const toolMap = new Map((reviewTools || []).map((t: any) => [t.id, t]));
    reviewsWithTools = reviews.map((r: any) => ({
      ...r,
      tool: toolMap.get(r.tool_id),
    }));
  }

  // Stats
  const totalSaved = (profile as any)?.tools_saved ?? bookmarkRows?.length ?? 0;
  const totalReviews = (profile as any)?.tools_reviewed ?? reviews?.length ?? 0;
  const karmaScore = (profile as any)?.karma_score ?? 0;
  const helpfulVotes = (profile as any)?.helpful_votes_received ?? 0;

  const displayName =
    (profile as any)?.display_name || user.email?.split("@")[0] || "User";

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <DashboardClient
      user={{
        id: user.id,
        email: user.email ?? "",
        avatar_url: (profile as any)?.avatar_url ?? null,
        display_name: displayName,
        user_type: (profile as any)?.user_type ?? null,
        city: (profile as any)?.city ?? null,
        state: (profile as any)?.state ?? null,
        business_name: (profile as any)?.business_name ?? null,
        is_ai_champion: (profile as any)?.is_ai_champion ?? false,
        member_since: memberSince,
      }}
      stats={{
        saved: totalSaved,
        reviews: totalReviews,
        karma: karmaScore,
        helpful_votes: helpfulVotes,
      }}
      savedTools={savedTools}
      reviews={reviewsWithTools}
    />
  );
}
