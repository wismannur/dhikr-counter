// Helper tanggal berbasis waktu LOKAL (hindari pergeseran hari karena UTC).
// Kunci tanggal selalu format YYYY-MM-DD. Format tampilan locale-aware (Intl).

function intlLocale(locale: string): string {
  return locale === "id" ? "id-ID" : "en-US";
}

export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayKey(): string {
  return dateKey(new Date());
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/** Awal minggu = Senin */
export function startOfWeek(d: Date): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = r.getDay(); // 0=Minggu..6=Sabtu
  const diff = day === 0 ? -6 : 1 - day; // mundur ke Senin
  return addDays(r, diff);
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

/** Daftar kunci tanggal dari `from` sampai `to` (inklusif). */
export function rangeKeys(from: Date, to: Date): string[] {
  const keys: string[] = [];
  let cur = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  while (cur <= end) {
    keys.push(dateKey(cur));
    cur = addDays(cur, 1);
  }
  return keys;
}

export function formatLong(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDayMonth(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "short",
  }).format(d);
}

export function monthShort(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), { month: "short" }).format(
    d
  );
}

export function monthLabel(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    month: "long",
    year: "numeric",
  }).format(d);
}

export function isSameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}
