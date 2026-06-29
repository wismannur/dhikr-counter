import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

const PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/app", priority: 0.9 },
  { path: "/about", priority: 0.6 },
  { path: "/guide", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/contact", priority: 0.4 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

function urlFor(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map(({ path, priority }) => ({
    url: urlFor(routing.defaultLocale, path),
    lastModified: now,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, urlFor(l, path)])
      ),
    },
  }));
}
