import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { SearchInput } from "./search-input";
import { Suspense, cache } from "react";
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { LanguageSwitcher } from "./language-switcher";
import { NavLinks, NavAuthButton } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

/**
 * cache() deduplicates this call within a single request.
 * If Navbar AND a page Server Component both call getLoggedInUser(),
 * Supabase is only queried ONCE per request — saving 100-300ms.
 */
export const getLoggedInUser = cache(async () => {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export async function Navbar() {
  const user = await getLoggedInUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="AihKya Logo"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-bold text-xl inline-block text-foreground">
              Aih<span className="text-primary">Kya</span>
            </span>
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative group items-center">
            <Suspense
              fallback={
                <div className="h-10 w-64 lg:w-80 rounded-full border border-input bg-muted/50 animate-pulse"></div>
              }
            >
              <SearchInput />
            </Suspense>
          </div>

          <LanguageSwitcher />
          <ThemeToggle />

          <NavAuthButton isLoggedIn={!!user} />

          <button className="md:hidden flex items-center justify-center h-9 w-9 rounded-md border border-input">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
