import type { Locale } from "./config";
import { localizedRoutes } from "./routes";

export function getWorkshopPath(lang: Locale, slug: string): string {
  return `${localizedRoutes.workshops[lang]}${slug}/`;
}
