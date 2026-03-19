import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * POST /auth/signout
 * Signs the user out and redirects to the home page.
 * Must be a POST to prevent CSRF via GET requests.
 */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  await supabase.auth.signOut();

  const { origin } = new URL(request.url);
  return NextResponse.redirect(new URL("/", origin), { status: 302 });
}
