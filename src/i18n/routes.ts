import type { Locale, RouteKey } from "./config";

export const localizedRoutes: Record<RouteKey, Record<Locale, string>> = {
  home: {
    en: "/",
    fr: "/fr/",
    pt: "/pt/",
  },
  workshops: {
    en: "/workshops/",
    fr: "/fr/ateliers/",
    pt: "/pt/workshops/",
  },
  atHome: {
    en: "/at-home/",
    fr: "/fr/ateliers-a-domicile/",
    pt: "/pt/workshops-em-casa/",
  },
  shop: {
    en: "/shop/",
    fr: "/fr/shop/",
    pt: "/pt/shop/",
  },
  blog: {
    en: "/blog/",
    fr: "/fr/blog/",
    pt: "/pt/blog/",
  },
};

export function withBase(path: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL ?? "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${normalizedBase}${cleanPath}`;
}

export function shopPath(lang: Locale): string {
  return localizedRoutes.shop[lang];
}

export function artworkPath(lang: Locale, slug: string): string {
  return `${shopPath(lang)}${slug}/`;
}

export function artworkAlternates(slug: string): Record<Locale, string> {
  return {
    en: artworkPath('en', slug),
    fr: artworkPath('fr', slug),
    pt: artworkPath('pt', slug),
  };
}
