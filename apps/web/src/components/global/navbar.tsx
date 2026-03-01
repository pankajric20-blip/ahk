import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { SearchInput } from "./search-input";
import { Suspense } from "react";
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { LanguageSwitcher } from "./language-switcher";

export async function Navbar() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/categories"
              className="hover:text-foreground transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/tools"
              className="hover:text-foreground transition-colors"
            >
              Mini Tools
            </Link>
            <Link
              href="/new"
              className="hover:text-foreground transition-colors"
            >
              Submit Tool
            </Link>
          </nav>
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

          {user ? (
            <Link
              href="/dashboard"
              className="hidden md:flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          )}

          <button className="md:hidden flex items-center justify-center h-9 w-9 rounded-md border border-input">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
