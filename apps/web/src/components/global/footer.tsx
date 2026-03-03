"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { ui } = useLanguage();

  return (
    <footer className="border-t py-12 bg-muted/20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-primary">AihKya</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {ui("footer_tagline")}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">{ui("nav_categories")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/categories"
                className="hover:text-foreground transition-colors"
              >
                {ui("cats_title")}
              </Link>
            </li>
            <li>
              <Link
                href="/free"
                className="hover:text-foreground transition-colors"
              >
                {ui("common_bilkul_free")}
              </Link>
            </li>
            <li>
              <Link
                href="/search?q="
                className="hover:text-foreground transition-colors"
              >
                All Tools
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">{ui("new_title")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/new"
                className="hover:text-foreground transition-colors"
              >
                {ui("nav_submit_tool")}
              </Link>
            </li>
            <li>
              <Link
                href="/sponsor"
                className="hover:text-foreground transition-colors"
              >
                Sponsor a Listing
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Aihkya Platform. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
