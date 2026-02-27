import {
  createBrowserClient as createBrowser,
  createServerClient as createServer,
} from "@supabase/ssr";
import type { Database } from "./types";

// Simple interface compatible with both ReadonlyRequestCookies and RequestCookies
// Avoids importing from fragile Next.js internal paths
interface CookieStore {
  getAll(): Array<{ name: string; value: string }>;
  set?(name: string, value: string, options?: Record<string, unknown>): void;
}

export function createBrowserClient(
  supabaseUrl: string,
  supabaseAnonKey: string,
) {
  return createBrowser<Database>(supabaseUrl, supabaseAnonKey);
}

export function createServerClient(
  supabaseUrl: string,
  supabaseAnonKey: string,
  cookieStore: CookieStore,
) {
  return createServer<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }[],
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            // ReadonlyRequestCookies in Server Components won't allow set — that's fine,
            // the middleware handles session refresh there.
            (cookieStore as any).set(name, value, options);
          });
        } catch {
          // Ignore — expected in read-only contexts (Server Components).
        }
      },
    },
  });
}
