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

  // Update or insert profile
  const { error } = await (supabase.from("profiles") as any).upsert(
    {
      id: user.id,
      preferred_language: language || null,
      user_type: userType || null,
      city: city || null,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("Failed to complete onboarding:", error);
    return { error: "Failed to save profile. Please try again." };
  }

  // Redirect to original destination or home
  return redirect(next && next.startsWith("/") ? next : "/");
}
