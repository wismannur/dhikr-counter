"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallbackRef } from "@/lib/useCallbackRef";
import { useEffect, useState } from "react";
import type { Dhikr } from "@/lib/types";
import { pick } from "@/lib/dhikr";
import {
  increment,
  resetSession,
  setHaptic,
  setSound,
  setTarget,
  undo,
  useSession,
  useSettings,
  useTarget,
  useTodayCount,
} from "@/lib/store";
import { feedbackMilestone, feedbackTick, feedbackUndo } from "@/lib/feedback";
import ProgressRing from "./ProgressRing";
import {
  ArrowLeftIcon,
  RefreshIcon,
  SoundOffIcon,
  SoundOnIcon,
  UndoIcon,
  VibrateIcon,
} from "./icons";

const TARGET_PRESETS = [33, 100, 1000];

export default function Counter({ dhikr }: { dhikr: Dhikr }) {
  const t = useTranslations("counter");
  const locale = useLocale();
  const session = useSession(dhikr.id);
  const today = useTodayCount(dhikr.id);
  const target = useTarget(dhikr.id);
  const settings = useSettings();

  const [justMilestone, setJustMilestone] = useState(false);
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  const inRound =
    session === 0 ? 0 : session % target === 0 ? target : session % target;
  const currentRound = session === 0 ? 1 : Math.floor((session - 1) / target) + 1;
  const roundsDone = Math.floor(session / target);
  const progress = inRound / target;

  const translation = pick(dhikr.translation, locale);

  const tap = useCallbackRef(() => {
    const next = session + 1;
    const milestone = next % target === 0;
    increment(dhikr.id);
    setJustMilestone(milestone);
    if (milestone) {
      feedbackMilestone(settings);
      setShowCelebrate(true);
      window.setTimeout(() => setShowCelebrate(false), 1400);
    } else {
      feedbackTick(settings);
    }
  });

  function handleUndo() {
    undo(dhikr.id);
    feedbackUndo(settings);
  }

  function handleReset() {
    resetSession(dhikr.id);
    feedbackUndo(settings);
  }

  useEffect(() => {
    const keys = new Set([
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "+",
      "=",
      " ",
      "Enter",
    ]);
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement | null)?.isContentEditable;
      if (typing) return;
      if (keys.has(e.key)) {
        e.preventDefault();
        if (e.repeat) return;
        tap();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tap]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex items-center justify-between gap-2 px-4 py-3">
        <Link
          href="/app"
          aria-label={t("backAria")}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-fg active:scale-95"
        >
          <ArrowLeftIcon width={20} height={20} />
        </Link>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-semibold text-fg">{dhikr.latin}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSound(!settings.sound)}
            aria-pressed={settings.sound}
            aria-label={t("soundAria")}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors active:scale-95 ${
              settings.sound
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-surface text-muted"
            }`}
          >
            {settings.sound ? (
              <SoundOnIcon width={20} height={20} />
            ) : (
              <SoundOffIcon width={20} height={20} />
            )}
          </button>
          <button
            type="button"
            onClick={() => setHaptic(!settings.haptic)}
            aria-pressed={settings.haptic}
            aria-label={t("vibrateAria")}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors active:scale-95 ${
              settings.haptic
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-surface text-muted"
            }`}
          >
            <VibrateIcon width={20} height={20} />
          </button>
        </div>
      </header>

      <button
        type="button"
        onClick={tap}
        aria-label={t("addAria", { name: dhikr.latin })}
        className="no-select relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-6 px-5 py-4 text-center focus:outline-none"
      >
        <div className="space-y-2">
          <p
            className={`arabic mx-auto max-w-xl font-bold text-fg ${
              dhikr.arabic.length > 40
                ? "text-2xl sm:text-3xl"
                : "text-4xl sm:text-5xl"
            }`}
          >
            {dhikr.arabic}
          </p>
          <p className="mx-auto max-w-md text-base text-muted">
            {dhikr.latin} · {translation}
          </p>
          {dhikr.source && (
            <p className="text-xs text-muted/70">{pick(dhikr.source, locale)}</p>
          )}
        </div>

        <ProgressRing progress={progress} size={264} stroke={14}>
          <div
            key={session}
            className={justMilestone ? "animate-celebrate" : "animate-pop"}
          >
            <div className="text-7xl font-bold tabular-nums text-fg">
              {inRound}
            </div>
            <div className="mt-1 text-base font-medium text-muted">
              / {target}
            </div>
          </div>
        </ProgressRing>

        <div className="flex items-center gap-4 text-sm text-muted">
          <span>
            {t("round")}{" "}
            <span className="font-semibold text-fg">{currentRound}</span>
            {roundsDone > 0 && (
              <span className="text-muted"> · {t("completed", { count: roundsDone })}</span>
            )}
          </span>
          <span aria-hidden>•</span>
          <span>
            {t("today")} <span className="font-semibold text-fg">{today}</span>
          </span>
        </div>

        <p className="text-xs text-muted/80">{t("tapHint")}</p>

        {showCelebrate && (
          <div className="animate-fade-up pointer-events-none absolute inset-x-0 top-6 mx-auto w-fit rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-fg shadow-lg">
            ﷽ {t("targetReached")}
          </div>
        )}
      </button>

      <div className="space-y-3 px-4 pb-6 pt-2">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleUndo}
            disabled={session === 0}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2 active:scale-95 disabled:opacity-40"
          >
            <UndoIcon width={18} height={18} /> {t("undo")}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={session === 0}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2 active:scale-95 disabled:opacity-40"
          >
            <RefreshIcon width={18} height={18} /> {t("reset")}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted">{t("target")}</span>
          {TARGET_PRESETS.map((tp) => (
            <button
              key={tp}
              type="button"
              onClick={() => {
                setTarget(dhikr.id, tp);
                setCustomOpen(false);
              }}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors active:scale-95 ${
                target === tp && !customOpen
                  ? "bg-primary text-primary-fg"
                  : "border border-border bg-surface text-muted hover:text-fg"
              }`}
            >
              {tp}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCustomOpen((v) => !v)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors active:scale-95 ${
              !TARGET_PRESETS.includes(target) || customOpen
                ? "bg-primary text-primary-fg"
                : "border border-border bg-surface text-muted hover:text-fg"
            }`}
          >
            {t("other")}
          </button>
          {customOpen && (
            <CustomTarget
              value={target}
              ariaLabel={t("customTargetAria")}
              onChange={(n) => setTarget(dhikr.id, n)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CustomTarget({
  value,
  ariaLabel,
  onChange,
}: {
  value: number;
  ariaLabel: string;
  onChange: (n: number) => void;
}) {
  const [text, setText] = useState(String(value));
  return (
    <input
      type="number"
      inputMode="numeric"
      min={1}
      max={100000}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        const n = parseInt(e.target.value, 10);
        if (Number.isFinite(n) && n > 0) onChange(n);
      }}
      className="w-20 rounded-full border border-primary/40 bg-surface px-3 py-1 text-center text-sm text-fg outline-none focus:border-primary"
      aria-label={ariaLabel}
    />
  );
}
