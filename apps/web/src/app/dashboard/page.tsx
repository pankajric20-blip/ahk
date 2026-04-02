/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { DashboardClient } from "./dashboard-client";
import { getLocale, localizeTools } from "@/lib/get-locale";

export const metadata: Metadata = {
  title: "Dashboard | AihKya",
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

  // ── Round 1: Parallel — profile, bookmarks, reviews, locale ─────────────
  const [{ data: profile }, { data: bookmarkRows }, { data: reviews }, locale] =
    await Promise.all([
      supabase
        .from("profiles")
        .select(
          "display_name, avatar_url, user_type, city, state, business_name, " +
            "is_ai_champion, onboarding_completed, " +
            "tools_saved, tools_reviewed, karma_score, helpful_votes_received",
        )
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("saved_tools")
        .select("tool_id, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(6),

      supabase
        .from("reviews")
        .select("id, tool_id, rating, title, review_text, created_at, status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),

      getLocale(),
    ]);

  // ── Round 2: Parallel — tool details for bookmarks and reviews ───────────
  const bookmarkToolIds = (bookmarkRows ?? []).map((b: any) => b.tool_id);
  const reviewToolIds = [
    ...new Set((reviews ?? []).map((r: any) => r.tool_id)),
  ];

  const [{ data: toolData }, { data: reviewTools }] = await Promise.all([
    bookmarkToolIds.length > 0
      ? supabase
          .from("ai_tools")
          .select(
            "id, slug, logo_url, pricing_model, rating_avg, rating_count, made_in_india, " +
              "name_en, name_hi, name_hinglish, tagline_en, tagline_hi, tagline_hinglish, " +
              "description_en, description_hi, description_hinglish",
          )
          .in("id", bookmarkToolIds)
      : Promise.resolve({ data: [] }),

    reviewToolIds.length > 0
      ? supabase
          .from("ai_tools")
          .select("id, name_en, slug, logo_url")
          .in("id", reviewToolIds)
      : Promise.resolve({ data: [] }),
  ]);

  // ── Assemble saved tools (preserve bookmark order) ───────────────────────
  let savedTools: any[] = [];
  if (toolData && toolData.length > 0) {
    const localized = localizeTools(toolData as any[], locale);
    const toolMap = new Map(localized.map((t: any) => [t.id, t]));
    savedTools = bookmarkToolIds
      .map((id: string) => toolMap.get(id))
      .filter(Boolean);
  }

  // ── Assemble reviews with tool info ──────────────────────────────────────
  let reviewsWithTools: any[] = [];
  if (reviews && reviews.length > 0) {
    const toolMap = new Map((reviewTools ?? []).map((t: any) => [t.id, t]));
    reviewsWithTools = reviews.map((r: any) => ({
      ...r,
      tool: toolMap.get(r.tool_id),
    }));
  }

  const p = profile as any;
  const totalSaved = p?.tools_saved ?? bookmarkRows?.length ?? 0;
  const totalReviews = p?.tools_reviewed ?? reviews?.length ?? 0;
  const karmaScore = p?.karma_score ?? 0;
  const helpfulVotes = p?.helpful_votes_received ?? 0;
  const displayName = p?.display_name || user.email?.split("@")?.[0] || "User";
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
        avatar_url: p?.avatar_url ?? null,
        display_name: displayName,
        user_type: p?.user_type ?? null,
        city: p?.city ?? null,
        state: p?.state ?? null,
        business_name: p?.business_name ?? null,
        is_ai_champion: p?.is_ai_champion ?? false,
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
