"use server";

import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitReview(formData: FormData) {
  const toolId = Number(formData.get("tool_id"));
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

  // Upsert the review (handles both insert and update if uniqueness is enforced on user_id, tool_id)
  // Our schema has UNIQUE(user_id, tool_id)
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

  // Update the tools table with the new aggregate values
  const { error: updateToolError } = await (supabase.from("tools") as any)
    .update({
      rating: Number(averageRating.toFixed(1)),
      review_count: totalReviews,
    })
    .eq("id", toolId);

  if (updateToolError) {
    console.error("Error updating tool average rating:", updateToolError);
    return { error: "Failed to update tool rating" };
  }

  // Revalidate the tool page
  revalidatePath(`/tool/${slug}`);
  revalidatePath("/");
  revalidatePath(`/categories/${slug}`); // Not exact but close enough, maybe better to just use router.refresh() on client or revalidate tag

  return { success: true };
}
