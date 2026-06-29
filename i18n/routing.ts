import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
  // English tanpa prefix (/), Indonesia di /id
  localePrefix: "as-needed",
  // `/` selalu English (default pasti); Indonesia diakses eksplisit lewat /id
  // atau tombol pemilih bahasa. Tidak auto-redirect berdasarkan browser/cookie.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
