import type { TranslationKey } from "@/i18n/translations";

const PRICING_KEY_MAP: Record<string, TranslationKey> = {
  free: "pricing_free",
  freemium: "pricing_freemium",
  paid: "pricing_paid",
  free_trial: "pricing_free_trial",
  enterprise: "pricing_enterprise",
  contact_sales: "pricing_contact_sales",
  open_source: "pricing_open_source",
};

/** Returns the translation key for a DB pricing_model value. */
export function getPricingKey(
  model: string | null | undefined,
): TranslationKey {
  return PRICING_KEY_MAP[model ?? ""] ?? "pricing_paid";
}
