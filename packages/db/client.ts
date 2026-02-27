import {
  createBrowserClient as createBrowser,
  createServerClient as createServer,
} from "@supabase/ssr";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { Database } from "./types";

export function createBrowserClient(
  supabaseUrl: string,
  supabaseAnonKey: string,
) {
  return createBrowser<Database>(supabaseUrl, supabaseAnonKey);
}

export function createServerClient(
  supabaseUrl: string,
  supabaseAnonKey: string,
  cookieStore: ReadonlyRequestCookies,
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
