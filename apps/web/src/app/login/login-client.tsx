"use client";

import { createBrowserClient } from "@aihkya/db";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";

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
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    ),
  );

  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  // Store `next` in a ref so the auth listener always reads the latest value
  // without needing to re-subscribe when the search param changes.
  const nextRef = useRef(next);
  nextRef.current = next;
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  // Subscribe once — read nextRef.current inside the callback to avoid
  // unnecessary unsubscribe/resubscribe cycles on every render.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push(nextRef.current);
        router.refresh();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]); // nextRef is stable — intentionally omitted

  // Parse errors out of the URL (both search and hash)
  useEffect(() => {
    // e.g. /login?error=auth-callback-failed
    const errorParam = searchParams.get("error");
    const errorDescriptionParam = searchParams.get("error_description");

    if (errorParam || errorDescriptionParam) {
      toast.error(
        errorDescriptionParam?.replace(/\+/g, " ") ||
          errorParam?.replace(/\+/g, " ") ||
          "Login failed. Please try again.",
      );
    }

    // Supabase often returns errors in the hash fragment for implicit flows or rejected OAuth
    if (typeof window !== "undefined" && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const hashError = hashParams.get("error");
      const hashErrorDesc = hashParams.get("error_description");

      if (hashError || hashErrorDesc) {
        toast.error(
          hashErrorDesc?.replace(/\+/g, " ") ||
            hashError?.replace(/\+/g, " ") ||
            "OAuth Login failed. Google Auth might not be configured.",
        );
        // Clean fragment so it doesn't repeatedly toast on reload
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    }
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      toast.error(
        err.message || "An unexpected error occurred during Google sign-in",
      );
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-white text-black px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isGoogleLoading ? (
          <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

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
        theme={theme} // Respect the user's saved theme preference
        providers={[]} // We handle Google explicitly above
        redirectTo={`${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback?next=${encodeURIComponent(next)}`}
      />
    </div>
  );
}

export function LoginClient() {
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
