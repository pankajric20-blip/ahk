"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bookmark, Star, Settings, ArrowRight, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  displayName: string;
}

export function DashboardHeader({ displayName }: DashboardHeaderProps) {
  const { ui } = useLanguage();
  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {ui("dashboard_title")}
        </h1>
        <p className="text-muted-foreground text-sm">{displayName}</p>
      </div>
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="flex items-center text-sm font-medium text-destructive hover:bg-destructive/10 px-4 py-2 rounded-md transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </button>
      </form>
    </div>
  );
}

export function DashboardSidebar() {
  const { ui } = useLanguage();
  return (
    <div className="col-span-1 border rounded-xl bg-card overflow-hidden h-fit">
      <nav className="flex flex-col p-2 space-y-1">
        <a
          href="#saved"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium"
        >
          <Bookmark className="h-5 w-5" />
          {ui("dashboard_saved")}
        </a>
        <a
          href="#reviews"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted font-medium transition-colors"
        >
          <Star className="h-5 w-5" /> My Reviews
        </a>
        <a
          href="#settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted font-medium transition-colors"
        >
          <Settings className="h-5 w-5" /> Settings
        </a>
      </nav>
    </div>
  );
}

export function DashboardSavedTitle() {
  const { ui } = useLanguage();
  return (
    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
      <Bookmark className="h-5 w-5 text-primary" /> {ui("dashboard_saved")}
    </h2>
  );
}

export function DashboardEmptyState() {
  const { ui } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl border-muted-foreground/20 text-center p-6 bg-muted/10">
      <Bookmark className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <h3 className="font-semibold text-lg mb-1">{ui("dashboard_no_saved")}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {ui("dashboard_discover")}
      </p>
      <Link
        href="/categories"
        className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        {ui("dashboard_discover")} <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}
