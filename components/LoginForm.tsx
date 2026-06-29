"use client";

import Link from "next/link";
import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/useAuth";
import { GoogleIcon } from "@/components/icons";

const BENEFITS = [
  "Data dzikir tersimpan & ter-backup di akunmu",
  "Tersinkron otomatis di semua perangkat",
  "Lanjutkan progres dari mana saja",
];

export default function LoginForm() {
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);

  async function signIn() {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/app`,
      },
    });
  }

  const card =
    "w-full rounded-3xl border border-border bg-surface p-7 shadow-sm";

  // Supabase belum dikonfigurasi → arahkan ke mode tamu
  if (!isSupabaseConfigured) {
    return (
      <div className={card}>
        <h1 className="text-xl font-bold text-fg">Login belum tersedia</h1>
        <p className="mt-2 text-sm text-muted">
          Fitur akun belum diaktifkan pada instalasi ini. Tapi tenang, kamu tetap
          bisa memakai semua fitur tanpa login — datamu tersimpan di perangkat.
        </p>
        <Link
          href="/app"
          className="mt-6 block rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-fg active:scale-95"
        >
          Lanjut tanpa login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={card}>
        <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-surface-2" />
        <p className="mt-4 text-center text-sm text-muted">Memuat…</p>
      </div>
    );
  }

  if (user) {
    const name =
      user.user_metadata?.full_name || user.user_metadata?.name || user.email;
    return (
      <div className={`${card} text-center`}>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          ✓
        </div>
        <h1 className="mt-4 text-xl font-bold text-fg">Kamu sudah masuk</h1>
        <p className="mt-1 text-sm text-muted">sebagai {name}</p>
        <Link
          href="/app"
          className="mt-6 block rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-fg active:scale-95"
        >
          Buka Aplikasi
        </Link>
      </div>
    );
  }

  return (
    <div className={card}>
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-fg shadow-sm">
          <span className="arabic text-xl leading-none">ذِكْر</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-fg">Masuk ke Dhikr</h1>
        <p className="mt-2 text-sm text-muted">
          Simpan dan sinkronkan progres dzikirmu.
        </p>
      </div>

      <ul className="mt-6 space-y-2.5">
        {BENEFITS.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-fg">
            <span className="mt-0.5 text-primary">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg shadow-sm transition-colors hover:bg-surface-2 active:scale-95 disabled:opacity-60"
      >
        <GoogleIcon /> {busy ? "Mengarahkan…" : "Masuk dengan Google"}
      </button>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        atau
        <span className="h-px flex-1 bg-border" />
      </div>

      <Link
        href="/app"
        className="block rounded-xl border border-border px-5 py-3 text-center text-sm font-medium text-fg transition-colors hover:bg-surface-2 active:scale-95"
      >
        Lanjut tanpa login
      </Link>
      <p className="mt-4 text-center text-xs text-muted">
        Tanpa login, datamu tetap tersimpan di perangkat ini.
      </p>
    </div>
  );
}
