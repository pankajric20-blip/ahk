"use client";

import { createBrowserClient } from "@aihkya/db";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  return (
    <div className="flex flex-col space-y-2 text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <p className="text-sm text-muted-foreground">
        Sign in to your Aihkya account to save tools and write reviews.
      </p>
    </div>
  );
}

function AuthForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  return (
    <Auth
      supabaseClient={supabase as any}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "hsl(var(--primary))",
              brandAccent: "hsl(var(--primary))",
              inputText: "hsl(var(--foreground))",
              inputLabelText: "hsl(var(--muted-foreground))",
              inputBorder: "hsl(var(--border))",
              inputBackground: "transparent",
              messageText: "hsl(var(--muted-foreground))",
              messageTextDanger: "hsl(var(--destructive))",
              anchorTextColor: "hsl(var(--muted-foreground))",
              anchorTextHoverColor: "hsl(var(--foreground))",
            },
            space: {
              buttonPadding: "0.75rem",
              inputPadding: "0.75rem",
            },
            radii: {
              borderRadiusButton: "0.5rem",
              buttonBorderRadius: "0.5rem",
              inputBorderRadius: "0.5rem",
            },
          },
        },
        className: {
          container: "w-full",
          button: "w-full flex items-center justify-center font-medium",
          input: "w-full text-sm",
          label: "text-sm font-medium mb-1.5",
          anchor: "text-sm hover:underline",
        },
      }}
      theme="dark" // We default to dark mode in layout.tsx
      providers={["google"]}
      redirectTo={`${typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=${encodeURIComponent(next)}`}
    />
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl border bg-card text-card-foreground shadow-sm">
        <Suspense
          fallback={
            <div className="text-center">Loading authentication...</div>
          }
        >
          <LoginForm />
          <AuthForm />
        </Suspense>
      </div>
    </div>
  );
}
