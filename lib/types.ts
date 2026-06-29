// Tipe inti aplikasi Dhikr Counter

/** Teks dengan dua bahasa (en default, id). */
export interface LocalizedText {
  en: string;
  id: string;
}

export interface Dhikr {
  /** slug stabil, dipakai sebagai kunci di storage & DB */
  id: string;
  arabic: string;
  latin: string;
  /** arti (per-locale) */
  translation: LocalizedText;
  /** target hitungan default (mis. 33 atau 100) */
  defaultTarget: number;
  /** kunci kategori (label diterjemahkan via messages.categories) */
  category: string;
  /** sumber: mis. "Narrated by Tirmidhi" / "HR. Tirmidzi" (opsional) */
  source?: LocalizedText;
  /** keutamaan singkat per-locale (opsional) */
  virtue?: LocalizedText;
}

export interface Settings {
  sound: boolean;
  haptic: boolean;
  /** override target per dzikir (id -> target) */
  targets: Record<string, number>;
}

/** logs[YYYY-MM-DD][dhikrId] = jumlah hitungan hari itu */
export type Logs = Record<string, Record<string, number>>;

export interface StoreData {
  version: number;
  /** agregat harian — sumber data laporan */
  logs: Logs;
  /** sesi aktif (resettable) per dzikir — tidak masuk laporan */
  sessions: Record<string, number>;
  settings: Settings;
}

export type ReportRange = "daily" | "weekly" | "monthly";
