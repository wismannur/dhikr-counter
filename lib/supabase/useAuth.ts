"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getBrowserClient } from "./client";
import { isSupabaseConfigured } from "./config";

export interface AuthState {
  user: User | null;
  loading: boolean;
}

/** Pantau status auth Supabase di klien. */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  // Bila Supabase tak dikonfigurasi, tidak ada yang dimuat.
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    const supabase = getBrowserClient();
    if (!supabase) return;
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setUser(data.user ?? null);
        setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
