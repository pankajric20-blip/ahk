import Link from "next/link";
import { Globe, Menu } from "lucide-react";
import { SearchInput } from "./search-input";
import { Suspense } from "react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl inline-block text-primary">
              aihkya<span className="text-foreground">.com</span>
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

          <button className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">
            <Globe className="h-4 w-4" />
            <span>EN</span>
          </button>

          <button className="md:hidden flex items-center justify-center h-9 w-9 rounded-md border border-input">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
