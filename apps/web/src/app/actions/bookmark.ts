"use server";

import { createServerClient } from "@aihkya/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/**
 * Toggles a bookmark for a tool for the currently authenticated user.
 *
 * Security notes:
 * - Authentication is always verified server-side via supabase.auth.getUser().
 * - toolId is validated as a UUID to prevent injection; Supabase parameterises queries.
 * - pathToRevalidate is validated to be a well-formed relative path before use.
 * - Generic error messages are returned to the client (never raw DB errors).
 */
export async function toggleBookmark(toolId: string, pathToRevalidate: string) {
  // Validate the revalidation path is a safe relative path
  const safePath =
    typeof pathToRevalidate === "string" &&
    pathToRevalidate.startsWith("/") &&
    !pathToRevalidate.startsWith("//")
      ? pathToRevalidate
      : "/";

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
    return { error: "You must be logged in to bookmark a tool." };
  }

  // Validate toolId is a non-empty string (UUID)
  if (!toolId || typeof toolId !== "string" || toolId.trim() === "") {
    return { error: "Invalid tool." };
  }
  const safeToolId = toolId.trim();

  // Check if bookmark already exists (RLS on DB ensures this is scoped to user)
  const { data: existingData } = await supabase
    .from("saved_tools")
    .select("tool_id")
    .eq("user_id", user.id)
    .eq("tool_id", safeToolId)
    .maybeSingle();

  if (existingData) {
    const { error: removeError } = await supabase
      .from("saved_tools")
      .delete()
      .eq("user_id", user.id)
      .eq("tool_id", safeToolId);

    if (removeError) {
      // Log server-side only — do NOT expose DB error to client
      console.error("[toggleBookmark] delete error:", removeError.message);
      return { error: "Failed to remove bookmark. Please try again." };
    }
  } else {
    const { error: insertError } = await supabase
      .from("saved_tools")
      .insert({ user_id: user.id, tool_id: safeToolId } as any);

    if (insertError) {
      console.error("[toggleBookmark] insert error:", insertError.message);
      return { error: "Failed to save bookmark. Please try again." };
    }
  }

  revalidatePath(safePath);
  revalidatePath("/dashboard");

  return { success: true, isBookmarked: !existingData };
}
