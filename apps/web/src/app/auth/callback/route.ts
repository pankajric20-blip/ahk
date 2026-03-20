import { NextResponse } from "next/server";
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Validate the `next` param to prevent open redirects.
  // Only allow relative paths that stay within the same origin.
  const nextParam = searchParams.get("next") ?? "/dashboard";
  let next = "/dashboard";
  try {
    const parsedNext = new URL(nextParam, origin);
    // Only allow same-origin redirects
    if (parsedNext.origin === origin) {
      next = parsedNext.pathname + parsedNext.search;
    }
  } catch {
    // nextParam is a relative path (e.g. "/dashboard") — safe to use directly
    if (nextParam.startsWith("/") && !nextParam.startsWith("//")) {
      next = nextParam;
    }
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      cookieStore,
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if onboarding is completed
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", user.id)
          .maybeSingle();

        if (!profile || !(profile as any).onboarding_completed) {
          // If a specific next parameter is provided (e.g. they were trying to save a tool),
          // pass it along to the onboarding so we can redirect them back afterward.
          const onboardingUrl = new URL("/onboarding", origin);
          if (nextParam && nextParam !== "/dashboard") {
            onboardingUrl.searchParams.set("next", nextParam);
          }
          return NextResponse.redirect(onboardingUrl.toString());
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page; do not expose internal error details
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}
