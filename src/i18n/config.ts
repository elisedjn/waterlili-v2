export const defaultLocale = "en" as const;
export const locales = ["en", "pt", "fr"] as const;

export type Locale = (typeof locales)[number];
export type RouteKey = "home" | "workshops" | "atHome" | "shop" | "blog";

export const languageNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  pt: "Português",
};

export const languageLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  pt: "PT",
};
