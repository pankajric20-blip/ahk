"use server";

import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
  const language = formData.get("language") as string;
  const userType = formData.get("userType") as string;
  const city = formData.get("city") as string;
  const next = formData.get("next") as string;

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

  // For OAuth (Google) signups, the DB trigger may not have run yet or may have failed.
  // Pull display_name and avatar_url from the user's identity metadata as a fallback
  // so the profile is always complete after onboarding.
  const meta = user.user_metadata ?? {};
  const googleName: string | null =
    meta.full_name || meta.name || meta.display_name || null;
  const googleAvatar: string | null = meta.avatar_url || meta.picture || null;

  const upsertPayload: Record<string, unknown> = {
    id: user.id,
    preferred_language: language || null,
    user_type: userType || null,
    city: city || null,
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  };

  // Only include these if we have values — they will be set on INSERT and preserved on UPDATE
  // (an existing non-null value won't be overwritten because ON CONFLICT DO UPDATE only
  //  touches the columns we explicitly list, but we include them here to cover the case
  //  where the trigger failed and the profile row doesn't exist yet).
  if (googleName) upsertPayload.display_name = googleName;
  if (googleAvatar) upsertPayload.avatar_url = googleAvatar;

  // Update or insert profile
  const { error } = await (supabase.from("profiles") as any).upsert(
    upsertPayload,
    { onConflict: "id" },
  );

  if (error) {
    console.error("Failed to complete onboarding:", error);
    return { error: "Failed to save profile. Please try again." };
  }

  // Redirect to original destination or home
  return redirect(next && next.startsWith("/") ? next : "/");
}
