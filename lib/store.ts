"use client";

import { useSyncExternalStore } from "react";
import type { Logs, Settings, StoreData } from "./types";
import { getDhikr } from "./dhikr";
import { todayKey } from "./date";

const STORAGE_KEY = "dhikr-counter:v1";
const VERSION = 1;

const DEFAULT_SETTINGS: Settings = {
  sound: true,
  haptic: true,
  targets: {},
};

const DEFAULT_DATA: StoreData = {
  version: VERSION,
  logs: {},
  sessions: {},
  settings: DEFAULT_SETTINGS,
};

let data: StoreData = DEFAULT_DATA;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage penuh / mode private — abaikan dengan aman
  }
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoreData>;
      data = {
        version: VERSION,
        logs: parsed.logs ?? {},
        sessions: parsed.sessions ?? {},
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      };
    }
  } catch {
    data = { ...DEFAULT_DATA };
  }
  // sinkron antar-tab
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      loaded = false;
      load();
      emit();
    }
  });
}

function setData(next: StoreData) {
  data = next;
  persist();
  emit();
}

// ---- subscription untuk useSyncExternalStore ----
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): StoreData {
  load();
  return data;
}

function getServerSnapshot(): StoreData {
  return DEFAULT_DATA;
}

// =================== ACTIONS ===================

export function targetFor(dhikrId: string): number {
  const override = data.settings.targets[dhikrId];
  if (override && override > 0) return override;
  return getDhikr(dhikrId)?.defaultTarget ?? 33;
}

export function increment(dhikrId: string, by = 1) {
  const today = todayKey();
  const dayLog = { ...(data.logs[today] ?? {}) };
  dayLog[dhikrId] = (dayLog[dhikrId] ?? 0) + by;
  setData({
    ...data,
    logs: { ...data.logs, [today]: dayLog },
    sessions: {
      ...data.sessions,
      [dhikrId]: (data.sessions[dhikrId] ?? 0) + by,
    },
  });
}

/** Undo 1 hitungan (untuk salah pencet) — kurangi sesi & total hari ini. */
export function undo(dhikrId: string) {
  const session = data.sessions[dhikrId] ?? 0;
  if (session <= 0) return;
  const today = todayKey();
  const dayLog = { ...(data.logs[today] ?? {}) };
  dayLog[dhikrId] = Math.max(0, (dayLog[dhikrId] ?? 0) - 1);
  setData({
    ...data,
    logs: { ...data.logs, [today]: dayLog },
    sessions: { ...data.sessions, [dhikrId]: session - 1 },
  });
}

/** Reset sesi saat ini ke 0 — TIDAK menghapus total harian (laporan aman). */
export function resetSession(dhikrId: string) {
  if ((data.sessions[dhikrId] ?? 0) === 0) return;
  setData({
    ...data,
    sessions: { ...data.sessions, [dhikrId]: 0 },
  });
}

export function setTarget(dhikrId: string, target: number) {
  setData({
    ...data,
    settings: {
      ...data.settings,
      targets: { ...data.settings.targets, [dhikrId]: target },
    },
  });
}

export function setSound(on: boolean) {
  setData({ ...data, settings: { ...data.settings, sound: on } });
}

export function setHaptic(on: boolean) {
  setData({ ...data, settings: { ...data.settings, haptic: on } });
}

/** Gabung logs dari sumber lain (mis. server) ke lokal — ambil nilai terbesar. */
export function mergeLogs(incoming: Logs) {
  const merged: Logs = { ...data.logs };
  for (const [date, perDhikr] of Object.entries(incoming)) {
    const day = { ...(merged[date] ?? {}) };
    for (const [id, count] of Object.entries(perDhikr)) {
      day[id] = Math.max(day[id] ?? 0, count);
    }
    merged[date] = day;
  }
  setData({ ...data, logs: merged });
}

export function getLogsSnapshot(): Logs {
  load();
  return data.logs;
}

// =================== HOOKS ===================

export function useStore(): StoreData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Total hitungan hari ini untuk satu dzikir. */
export function useTodayCount(dhikrId: string): number {
  const s = useStore();
  return s.logs[todayKey()]?.[dhikrId] ?? 0;
}

export function useSession(dhikrId: string): number {
  const s = useStore();
  return s.sessions[dhikrId] ?? 0;
}

export function useSettings(): Settings {
  return useStore().settings;
}

export function useTarget(dhikrId: string): number {
  const s = useStore();
  const override = s.settings.targets[dhikrId];
  if (override && override > 0) return override;
  return getDhikr(dhikrId)?.defaultTarget ?? 33;
}
