import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhikr Counter — Tasbih Digital",
    short_name: "Dhikr",
    description:
      "Tasbih digital untuk menghitung dzikir dengan target, plus laporan harian, mingguan, dan bulanan.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#080d0b",
    theme_color: "#0f7a5a",
    lang: "id",
    categories: ["lifestyle", "utilities", "education"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
