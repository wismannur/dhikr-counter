"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Logs } from "./types";
import { getLogsSnapshot, mergeLogs } from "./store";

interface Row {
  dhikr_id: string;
  log_date: string;
  count: number;
}

/**
 * Sinkronisasi dua arah agregat harian:
 * 1. Tarik data server → gabung ke lokal (ambil nilai terbesar)
 * 2. Dorong hasil gabungan lokal → server (upsert)
 * Sehingga kedua sisi konvergen ke nilai maksimum.
 */
export async function syncLogs(supabase: SupabaseClient, userId: string) {
  // 1. Tarik
  const { data, error } = await supabase
    .from("dhikr_logs")
    .select("dhikr_id, log_date, count")
    .eq("user_id", userId);
  if (error) throw error;

  const remote: Logs = {};
  for (const row of (data ?? []) as Row[]) {
    (remote[row.log_date] ??= {})[row.dhikr_id] = row.count;
  }

  // 2. Gabung ke lokal
  mergeLogs(remote);

  // 3. Dorong lokal (sudah tergabung) ke server
  await pushLogs(supabase, userId);
}

/** Dorong seluruh agregat lokal ke server (upsert). */
export async function pushLogs(supabase: SupabaseClient, userId: string) {
  const local = getLogsSnapshot();
  const rows: Array<Row & { user_id: string }> = [];
  for (const [date, per] of Object.entries(local)) {
    for (const [dhikrId, count] of Object.entries(per)) {
      if (count > 0) {
        rows.push({
          user_id: userId,
          dhikr_id: dhikrId,
          log_date: date,
          count,
        });
      }
    }
  }
  if (rows.length === 0) return;
  const { error } = await supabase
    .from("dhikr_logs")
    .upsert(rows, { onConflict: "user_id,dhikr_id,log_date" });
  if (error) throw error;
}
