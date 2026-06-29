"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { ReportRange } from "@/lib/types";
import { useStore } from "@/lib/store";
import { useMounted } from "@/lib/useMounted";
import { DHIKR_PRESETS } from "@/lib/dhikr";
import { buildBuckets, perDhikrRange } from "@/lib/reports";
import { ArrowLeftIcon } from "./icons";

const RANGES: ReportRange[] = ["daily", "weekly", "monthly"];

export default function Reports() {
  const t = useTranslations("reports");
  const locale = useLocale();
  const store = useStore();
  const mounted = useMounted();
  const [range, setRange] = useState<ReportRange>("daily");

  const buckets = useMemo(
    () => buildBuckets(store.logs, range, locale),
    [store.logs, range, locale]
  );

  const current = buckets[buckets.length - 1];
  const previous = buckets[buckets.length - 2];
  const delta = current && previous ? current.total - previous.total : 0;
  const maxBar = Math.max(1, ...buckets.map((b) => b.total));

  const breakdown = useMemo(() => {
    if (!current) return [];
    const per = perDhikrRange(store.logs, current.from, current.to);
    return DHIKR_PRESETS.map((d) => ({ dhikr: d, count: per[d.id] ?? 0 }))
      .filter((x) => x.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [store.logs, current]);

  const maxBreakdown = Math.max(1, ...breakdown.map((b) => b.count));

  const periodNoun =
    range === "daily"
      ? t("periodDay")
      : range === "weekly"
        ? t("periodWeek")
        : t("periodMonth");

  const trendAdj =
    range === "daily"
      ? t("trendDaily")
      : range === "weekly"
        ? t("trendWeekly")
        : t("trendMonthly");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-12">
      <header className="flex items-center gap-3 py-4">
        <Link
          href="/app"
          aria-label={t("back")}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-fg active:scale-95"
        >
          <ArrowLeftIcon width={20} height={20} />
        </Link>
        <h1 className="text-lg font-bold text-fg">{t("title")}</h1>
      </header>

      <div className="mb-5 grid grid-cols-3 gap-1 rounded-2xl border border-border bg-surface p-1">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={`rounded-xl py-2 text-sm font-medium transition-colors ${
              range === r
                ? "bg-primary text-primary-fg shadow-sm"
                : "text-muted hover:text-fg"
            }`}
          >
            {t(r)}
          </button>
        ))}
      </div>

      {!mounted ? (
        <div className="h-64 animate-pulse rounded-3xl border border-border bg-surface" />
      ) : (
        <>
          <section className="mb-4 rounded-3xl border border-border bg-gradient-to-br from-primary to-primary-strong p-5 text-primary-fg shadow-sm">
            <p className="text-sm opacity-90">{current?.fullLabel}</p>
            <p className="mt-1 text-4xl font-bold tabular-nums">
              {current?.total ?? 0}
            </p>
            <p className="text-sm opacity-90">
              {t("totalThisPeriod", { period: periodNoun })}
            </p>
            {previous && (
              <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
                {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}{" "}
                {t("vsLast", { period: periodNoun })}
              </p>
            )}
          </section>

          <section className="mb-4 rounded-3xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-fg">
              {t("trend", { period: trendAdj })}
            </h2>
            <div className="flex h-44 gap-1.5">
              {buckets.map((b, i) => {
                const isCurrent = i === buckets.length - 1;
                const h = (b.total / maxBar) * 100;
                return (
                  <div
                    key={b.key}
                    className="flex h-full flex-1 flex-col items-center gap-1.5"
                    title={`${b.fullLabel}: ${b.total}`}
                  >
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          isCurrent ? "bg-primary" : "bg-primary/25"
                        }`}
                        style={{
                          height: `${Math.max(b.total > 0 ? 4 : 2, h)}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`text-[10px] tabular-nums ${
                        isCurrent ? "font-semibold text-fg" : "text-muted"
                      }`}
                    >
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-fg">
              {t("breakdown")}
            </h2>
            {breakdown.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">
                {t("empty", { period: periodNoun })}
              </p>
            ) : (
              <ul className="space-y-3">
                {breakdown.map(({ dhikr, count }) => (
                  <li key={dhikr.id}>
                    <div className="mb-1 flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium text-fg">
                        {dhikr.latin}
                      </span>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-primary">
                        {count}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-track">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(count / maxBreakdown) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
