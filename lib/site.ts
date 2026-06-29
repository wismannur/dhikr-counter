// Konfigurasi situs untuk SEO (metadata, sitemap, robots, OG image).
// Set NEXT_PUBLIC_SITE_URL ke domain produksi saat deploy.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Dhikr Counter";

export const SITE_DESCRIPTION =
  "Tasbih digital untuk menghitung dzikir & doa dengan target, plus laporan progres harian, mingguan, dan bulanan. Gratis, bisa offline, dengan sinkronisasi akun.";
