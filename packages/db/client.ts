import {
  createBrowserClient as createBrowser,
  createServerClient as createServer,
} from "@supabase/ssr";
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
  cookies: any,
) {
  return createServer<Database>(supabaseUrl, supabaseAnonKey, { cookies });
}
