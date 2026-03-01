"use server";

import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitReview(formData: FormData) {
  const toolId = formData.get("tool_id") as string;
  const rating = Number(formData.get("rating"));
  const reviewText = formData.get("review_text") as string;
  const slug = formData.get("slug") as string;

  if (!toolId || !rating || rating < 1 || rating > 5) {
    return { error: "Invalid rating" };
  }

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

  // Upsert the review
  const { error: upsertError } = await (supabase.from("reviews") as any).upsert(
    {
      user_id: user.id,
      tool_id: toolId,
      rating,
      review_text: reviewText?.trim() || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id, tool_id" },
  );

  if (upsertError) {
    console.error("Error upserting review:", upsertError);
    return { error: "Failed to submit review" };
  }

  // Recalculate average rating and review count
  const { data: reviews, error: fetchError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("tool_id", toolId);

  if (fetchError || !reviews) {
    console.error("Error fetching reviews to calculate average:", fetchError);
    return { error: "Failed to update tool rating" };
  }

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews as any[]).reduce((sum, r) => sum + Number(r.rating), 0) /
        totalReviews
      : 0;

  // Update the ai_tools table with the new aggregate values
  const { error: updateToolError } = await (supabase.from("ai_tools") as any)
    .update({
      rating_avg: Number(averageRating.toFixed(1)),
      review_count: totalReviews,
    })
    .eq("id", toolId);

  if (updateToolError) {
    console.error("Error updating tool average rating:", updateToolError);
    return { error: "Failed to update tool rating" };
  }

  // Revalidate paths
  revalidatePath(`/tool/${slug}`);
  revalidatePath("/");
  revalidatePath(`/categories/${slug}`);

  return { success: true };
}
