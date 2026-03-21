import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@aihkya/db";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Validate the `next` param to prevent open redirects.
  // Only allow relative paths that stay within the same origin.
  const nextParam = searchParams.get("next") ?? "/dashboard";
  let next = "/dashboard";
  try {
    const parsedNext = new URL(nextParam, origin);
    if (parsedNext.origin === origin) {
      next = parsedNext.pathname + parsedNext.search;
    }
  } catch {
    if (nextParam.startsWith("/") && !nextParam.startsWith("//")) {
      next = nextParam;
    }
  }

  if (code) {
    // Collect cookies set during exchangeCodeForSession so we can attach them
    // directly to the redirect response. Using next/headers + NextResponse.redirect()
    // does NOT reliably forward Set-Cookie headers — the browser never receives the
    // session tokens and the middleware keeps bouncing the user to /login.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cookiesToSet: { name: string; value: string; options: any }[] = [];

    // Custom cookie store: reads from the incoming request and accumulates writes
    // so we can forward them directly onto the redirect response below.
    // @aihkya/db's createServerClient calls store.set() for each cookie Supabase wants
    // to persist, so we collect them here instead of writing to next/headers.
    const cookieStore = {
      getAll() {
        return request.cookies.getAll();
      },
      set(name: string, value: string, options?: Record<string, unknown>) {
        cookiesToSet.push({ name, value, options });
      },
    };

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      cookieStore,
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Determine where to redirect
      let redirectUrl = `${origin}${next}`;

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
          const onboardingUrl = new URL("/onboarding", origin);
          if (nextParam && nextParam !== "/dashboard") {
            onboardingUrl.searchParams.set("next", nextParam);
          }
          redirectUrl = onboardingUrl.toString();
        }
      }

      // Build the redirect and attach all session cookies directly to it.
      const response = NextResponse.redirect(redirectUrl);
      cookiesToSet.forEach(({ name, value, options }) =>
        response.cookies.set(name, value, options),
      );
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}
