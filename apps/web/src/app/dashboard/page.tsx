import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ToolCard } from "@/components/tool/tool-card";
import {
  DashboardHeader,
  DashboardSidebar,
  DashboardSavedTitle,
  DashboardEmptyState,
} from "./dashboard-content";

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
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: bookmarkRows, error: bookmarkError } = await supabase
    .from("saved_tools")
    .select("tool_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (bookmarkError)
    console.error(
      "[Dashboard] saved_tools fetch error:",
      bookmarkError.message,
    );

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
      const toolMap = new Map((toolData as any[]).map((t) => [t.id, t]));
      savedTools = toolIds.map((id: string) => toolMap.get(id)).filter(Boolean);
    }
  }

  const displayName = (profile as any)?.display_name
    ? `Welcome back, ${(profile as any).display_name}`
    : `Welcome back, ${user.email}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-[80vh]">
      <DashboardHeader displayName={displayName} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardSidebar />

        <div className="col-span-1 md:col-span-3 border rounded-xl bg-card p-6 min-h-[400px]">
          <DashboardSavedTitle />
          {savedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedTools.map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <DashboardEmptyState />
          )}
        </div>
      </div>
    </div>
  );
}
