"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function NavLinks() {
  const { ui } = useLanguage();
  return (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
      <Link
        href="/categories"
        className="hover:text-foreground transition-colors"
      >
        {ui("nav_categories")}
      </Link>
      <Link href="/tools" className="hover:text-foreground transition-colors">
        {ui("nav_mini_tools")}
      </Link>
      <Link href="/new" className="hover:text-foreground transition-colors">
        {ui("nav_submit_tool")}
      </Link>
    </nav>
  );
}

export function NavAuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { ui } = useLanguage();
  return isLoggedIn ? (
    <a
      href="/dashboard"
      className="hidden md:flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      {ui("nav_dashboard")}
    </a>
  ) : (
    <a
      href="/login"
      className="hidden md:flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      {ui("nav_login")}
    </a>
  );
}
