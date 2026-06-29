"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const t = useTranslations("install");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("dhikr-install-dismissed") === "1";
  });

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!deferred || dismissed) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }

  function dismiss() {
    setDismissed(true);
    window.localStorage.setItem("dhikr-install-dismissed", "1");
  }

  return (
    <div className="animate-fade-up mb-4 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-3">
      <div className="flex-1 text-sm">
        <p className="font-semibold text-fg">{t("title")}</p>
        <p className="text-muted">{t("desc")}</p>
      </div>
      <button
        type="button"
        onClick={install}
        className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-fg active:scale-95"
      >
        {t("install")}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("close")}
        className="px-2 text-muted hover:text-fg"
      >
        ✕
      </button>
    </div>
  );
}
