"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/useAuth";
import { GoogleIcon, LogoutIcon } from "./icons";

export default function AuthButton() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!isSupabaseConfigured) return null;

  const appPath = locale === "id" ? "/id/app" : "/app";

  async function signIn() {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${appPath}`,
      },
    });
  }

  async function signOut() {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setOpen(false);
    await supabase.auth.signOut();
  }

  if (loading) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-surface-2" />;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className="flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-medium text-fg transition-colors hover:bg-surface-2 active:scale-95 disabled:opacity-60"
      >
        <GoogleIcon /> <span className="hidden sm:inline">{t("signIn")}</span>
      </button>
    );
  }

  const meta = user.user_metadata ?? {};
  const name: string = meta.full_name || meta.name || user.email || t("account");
  const avatar: string | undefined = meta.avatar_url || meta.picture;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("account")}
        className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-border bg-primary/10 text-sm font-semibold text-primary active:scale-95"
      >
        {avatar && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          initial
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="animate-fade-up absolute right-0 top-12 z-20 w-56 rounded-2xl border border-border bg-surface p-2 shadow-lg">
            <div className="border-b border-border px-3 py-2">
              <p className="truncate text-sm font-semibold text-fg">{name}</p>
              {user.email && (
                <p className="truncate text-xs text-muted">{user.email}</p>
              )}
            </div>
            <button
              type="button"
              onClick={signOut}
              className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
            >
              <LogoutIcon width={18} height={18} /> {t("signOut")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
