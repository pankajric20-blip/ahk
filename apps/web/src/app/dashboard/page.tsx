import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut, Bookmark, Star, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ToolCard } from "@/components/tool/tool-card";

export const metadata = {
  title: "Dashboard | Aihkya",
  description: "Manage your saved tools and reviews.",
};

export default async function DashboardPage() {
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
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get the IDs of tools the user has bookmarked
  const { data: bookmarkRows, error: bookmarkError } = await supabase
    .from("saved_tools")
    .select("tool_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (bookmarkError) {
    console.error(
      "[Dashboard] saved_tools fetch error:",
      bookmarkError.message,
    );
  }

  // Fetch the actual ai_tools records for those IDs
  let savedTools: any[] = [];
  if (bookmarkRows && bookmarkRows.length > 0) {
    const toolIds = bookmarkRows.map((b: any) => b.tool_id);
    const { data: toolData, error: toolError } = await supabase
      .from("ai_tools")
      .select("*")
      .in("id", toolIds);

    if (toolError) {
      console.error("[Dashboard] ai_tools fetch error:", toolError.message);
    } else if (toolData) {
      // Preserve the bookmark order
      const toolMap = new Map((toolData as any[]).map((t) => [t.id, t]));
      savedTools = toolIds.map((id: string) => toolMap.get(id)).filter(Boolean);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-[80vh]">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            My Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Welcome back, {(profile as any)?.display_name || user.email}
          </p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-1 border rounded-xl bg-card overflow-hidden h-fit">
          <nav className="flex flex-col p-2 space-y-1">
            <a
              href="#saved"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium"
            >
              <Bookmark className="h-5 w-5" />
              Saved Tools
            </a>
            <a
              href="#reviews"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted font-medium transition-colors"
            >
              <Star className="h-5 w-5" />
              My Reviews
            </a>
            <a
              href="#settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted font-medium transition-colors"
            >
              <Settings className="h-5 w-5" />
              Settings
            </a>
          </nav>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-3 border rounded-xl bg-card p-6 min-h-[400px]">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" /> Saved Tools
          </h2>

          {savedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedTools.map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl border-muted-foreground/20 text-center p-6 bg-muted/10">
              <Bookmark className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <h3 className="font-semibold text-lg mb-1">No saved tools yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Explore the directory and bookmark tools you want to keep track
                of. They will appear here.
              </p>
              <Link
                href="/categories"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Explore Tools <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
