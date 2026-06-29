import type { Logs, ReportRange } from "./types";
import {
  addDays,
  dateKey,
  endOfMonth,
  formatDayMonth,
  monthLabel,
  monthShort,
  rangeKeys,
  startOfMonth,
  startOfWeek,
} from "./date";

export interface Bucket {
  key: string;
  /** label pendek untuk sumbu chart */
  label: string;
  /** label panjang untuk judul periode */
  fullLabel: string;
  from: Date;
  to: Date;
  total: number;
}

/** Total semua dzikir pada rentang [from, to] inklusif. */
export function sumRange(logs: Logs, from: Date, to: Date): number {
  let total = 0;
  for (const key of rangeKeys(from, to)) {
    const day = logs[key];
    if (day) for (const v of Object.values(day)) total += v;
  }
  return total;
}

/** Total per dzikir pada rentang [from, to] inklusif. */
export function perDhikrRange(
  logs: Logs,
  from: Date,
  to: Date
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const key of rangeKeys(from, to)) {
    const day = logs[key];
    if (day)
      for (const [id, v] of Object.entries(day)) out[id] = (out[id] ?? 0) + v;
  }
  return out;
}

/**
 * Bangun deretan bucket untuk chart tren:
 * - daily: 14 hari terakhir
 * - weekly: 8 minggu terakhir (mulai Senin)
 * - monthly: 6 bulan terakhir
 * Bucket terakhir = periode saat ini.
 */
export function buildBuckets(
  logs: Logs,
  range: ReportRange,
  locale: string,
  now = new Date()
): Bucket[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const buckets: Bucket[] = [];

  if (range === "daily") {
    for (let i = 13; i >= 0; i--) {
      const d = addDays(today, -i);
      buckets.push({
        key: dateKey(d),
        label: String(d.getDate()),
        fullLabel: formatDayMonth(d, locale),
        from: d,
        to: d,
        total: sumRange(logs, d, d),
      });
    }
  } else if (range === "weekly") {
    const thisWeek = startOfWeek(today);
    for (let i = 7; i >= 0; i--) {
      const from = addDays(thisWeek, -7 * i);
      const to = addDays(from, 6);
      buckets.push({
        key: dateKey(from),
        label: formatDayMonth(from, locale),
        fullLabel: `${formatDayMonth(from, locale)} – ${formatDayMonth(to, locale)}`,
        from,
        to,
        total: sumRange(logs, from, to),
      });
    }
  } else {
    for (let i = 5; i >= 0; i--) {
      const ref = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const from = startOfMonth(ref);
      const to = endOfMonth(ref);
      buckets.push({
        key: `${ref.getFullYear()}-${ref.getMonth()}`,
        label: monthShort(ref, locale),
        fullLabel: monthLabel(ref, locale),
        from,
        to,
        total: sumRange(logs, from, to),
      });
    }
  }

  return buckets;
}
