"use server";

import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const VALID_LANGUAGES = new Set(["en", "hi", "hinglish"]);
const VALID_USER_TYPES = new Set([
  "student",
  "professional",
  "entrepreneur",
  "freelancer",
  "other",
  "",
]);

export async function completeOnboarding(formData: FormData) {
  const language = (formData.get("language") as string)?.trim() ?? "";
  const userType = (formData.get("userType") as string)?.trim() ?? "";
  const city = (formData.get("city") as string)?.trim() ?? "";
  const next = (formData.get("next") as string)?.trim() ?? "";

  // ── Input validation ─────────────────────────────────────────────────────
  if (language && !VALID_LANGUAGES.has(language)) {
    return { error: "Invalid language selection." };
  }
  if (userType && !VALID_USER_TYPES.has(userType)) {
    return { error: "Invalid user type." };
  }
  if (city.length > 100) {
    return { error: "City name is too long." };
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

  if (googleName) upsertPayload.display_name = googleName;
  if (googleAvatar) upsertPayload.avatar_url = googleAvatar;

  const { error } = await (supabase.from("profiles") as any).upsert(
    upsertPayload,
    { onConflict: "id" },
  );

  if (error) {
    console.error("Failed to complete onboarding:", error.message);
    return { error: "Failed to save profile. Please try again." };
  }

  // ── Safe redirect — use URL constructor to prevent open redirect ─────────
  // Only allow paths within the same origin (no protocol-relative or external URLs)
  let safePath = "/";
  if (next) {
    try {
      // Resolve against a dummy origin to parse the path
      const parsed = new URL(next, "https://aihkya.com");
      // Only accept if it resolves to the same dummy origin (i.e., it's a relative path)
      if (parsed.origin === "https://aihkya.com" && parsed.pathname) {
        safePath = parsed.pathname + parsed.search;
      }
    } catch {
      // next was not a valid URL — use default
    }
  }

  return redirect(safePath);
}
