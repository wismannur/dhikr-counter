"use client";

import { useEffect, useRef } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/useAuth";
import { useStore } from "@/lib/store";
import { pushLogs, syncLogs } from "@/lib/sync";

export default function SyncManager() {
  const { user } = useAuth();
  const store = useStore();
  const didInitialSync = useRef<string | null>(null);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync awal saat user login (gabung lokal <-> server).
  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      didInitialSync.current = null;
      return;
    }
    if (didInitialSync.current === user.id) return;
    didInitialSync.current = user.id;
    const supabase = getBrowserClient();
    if (!supabase) return;
    syncLogs(supabase, user.id).catch(() => {
      /* gagal sync — data lokal tetap utuh, dicoba lagi saat ada perubahan */
    });
  }, [user]);

  // Dorong perubahan ke server (debounce) selama login.
  useEffect(() => {
    if (!isSupabaseConfigured || !user) return;
    if (didInitialSync.current !== user.id) return; // tunggu sync awal selesai
    const supabase = getBrowserClient();
    if (!supabase) return;

    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      pushLogs(supabase, user.id).catch(() => {});
    }, 2500);

    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, [store.logs, user]);

  return null;
}
