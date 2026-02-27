import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut, Bookmark, Star, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ToolLogo } from "@/components/tool/tool-logo";

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

  // Fetch user profile from profiles table, or just use auth user data
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  const profile: any = profileData;

  // Step 1: Get the IDs of tools the user has bookmarked
  const { data: bookmarkRows, error: bookmarkError } = await supabase
    .from("bookmarks")
    .select("tool_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (bookmarkError) {
    console.error("[Dashboard] bookmarks fetch error:", bookmarkError.message);
  }

  // Step 2: Fetch the actual tool records for those IDs
  let savedTools: any[] = [];
  if (bookmarkRows && bookmarkRows.length > 0) {
    const toolIds = bookmarkRows.map((b: any) => b.tool_id);
    const { data: toolData, error: toolError } = await supabase
      .from("tools")
      .select("id, name, slug, description_en, logo_url, pricing_model, rating")
      .in("id", toolIds);

    if (toolError) {
      console.error("[Dashboard] tools fetch error:", toolError.message);
    } else if (toolData) {
      // Preserve the bookmark order (most recently bookmarked first)
      const toolMap = new Map(toolData.map((t: any) => [t.id, t]));
      savedTools = toolIds.map((id: number) => toolMap.get(id)).filter(Boolean);
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
            Welcome back, {profile?.full_name || user.email}
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
                <div
                  key={tool.id}
                  className="group relative flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all h-full"
                >
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
                        <ToolLogo
                          logoUrl={tool.logo_url}
                          name={tool.name}
                          size="md"
                        />
                      </div>
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase font-bold bg-secondary text-secondary-foreground">
                        {tool.pricing_model}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {tool.name}
                      </Link>
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                      {tool.description_en}
                    </p>

                    <div className="mt-auto pt-3 border-t flex justify-between items-center w-full">
                      <div className="flex items-center text-amber-500 text-xs font-semibold">
                        {tool.rating || "New"} ★
                      </div>
                      <span className="text-xs font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
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
