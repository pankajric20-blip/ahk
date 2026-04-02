"use server";

import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Allowlists — any value outside these is rejected before hitting the DB
const VALID_LANGUAGES = new Set(["en", "hi", "hinglish"]);
const VALID_DURATIONS = new Set([
  "Just testing",
  "Less than 1 month",
  "1-6 months",
  "Over 6 months",
  "",
]);

// Simple UUID v4 check — prevents arbitrary strings being used as tool IDs
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function submitReview(formData: FormData) {
  const toolId = (formData.get("tool_id") as string)?.trim();
  const rating = Number(formData.get("rating"));
  const slug = (formData.get("slug") as string)?.trim();

  // ── Input validation ─────────────────────────────────────────────────────
  if (!toolId || !UUID_RE.test(toolId)) {
    return { error: "Invalid tool." };
  }
  if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return { error: "Invalid rating" };
  }

  const title = ((formData.get("title") as string) ?? "").trim().slice(0, 200);
  const reviewText = ((formData.get("review_text") as string) ?? "").trim();
  const useCase = ((formData.get("use_case") as string) ?? "")
    .trim()
    .slice(0, 200);
  const usageDuration = (formData.get("usage_duration") as string) ?? "";
  const language = (formData.get("language") as string) ?? "";

  if (!reviewText) {
    return { error: "Please write a review before submitting." };
  }
  if (reviewText.length > 5000) {
    return { error: "Review is too long (max 5000 characters)." };
  }

  // Validate enum-like fields against allowlists to prevent unexpected values
  if (language && !VALID_LANGUAGES.has(language)) {
    return { error: "Invalid language." };
  }
  if (!VALID_DURATIONS.has(usageDuration)) {
    return { error: "Invalid usage duration." };
  }

  // ── Auth ─────────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  // ── Upsert review ────────────────────────────────────────────────────────
  const { error: upsertError } = await (supabase.from("reviews") as any).upsert(
    {
      user_id: user.id,
      tool_id: toolId,
      rating,
      title: title || null,
      review_text: reviewText,
      use_case: useCase || null,
      usage_duration: usageDuration || null,
      language: language || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id, tool_id" },
  );

  if (upsertError) {
    console.error("Error upserting review:", upsertError.message);
    return { error: "Failed to submit review" };
  }

  // ── Update aggregate rating ──────────────────────────────────────────────
  // DB trigger (trg_sync_review_stats) handles this automatically in Phase 1+.
  // Keep a manual fallback here in case the trigger is on 'published' status only.
  const { data: reviews, error: fetchError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("tool_id", toolId);

  if (!fetchError && reviews && reviews.length > 0) {
    const totalReviews = reviews.length;
    const averageRating =
      (reviews as any[]).reduce((sum, r) => sum + Number(r.rating), 0) /
      totalReviews;

    await (supabase.from("ai_tools") as any)
      .update({
        rating_avg: Number(averageRating.toFixed(1)),
        review_count: totalReviews,
      })
      .eq("id", toolId);
  }

  // ── Revalidate ───────────────────────────────────────────────────────────
  if (slug) revalidatePath(`/tool/${slug}`);
  revalidatePath("/");

  return { success: true };
}
