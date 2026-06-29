"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { DHIKR_BY_CATEGORY, pick } from "@/lib/dhikr";
import { useStore } from "@/lib/store";
import { formatLong, todayKey } from "@/lib/date";
import ThemeToggle from "@/components/ThemeToggle";
import AuthButton from "@/components/AuthButton";
import InstallPrompt from "@/components/InstallPrompt";
import { ChartIcon } from "@/components/icons";

export default function AppHome() {
  const t = useTranslations("app");
  const tc = useTranslations("categories");
  const locale = useLocale();
  const store = useStore();
  const today = store.logs[todayKey()] ?? {};
  const totalToday = Object.values(today).reduce((a, b) => a + b, 0);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-12">
      <header className="flex items-center justify-between gap-2 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-fg shadow-sm">
            <span className="arabic text-lg leading-none">ذِكْر</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-fg">
              {t("brand")}
            </h1>
            <p className="text-xs text-muted">{t("brandSub")}</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/reports"
            aria-label={t("reportsAria")}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-fg active:scale-95"
          >
            <ChartIcon width={20} height={20} />
          </Link>
          <ThemeToggle />
          <AuthButton />
        </div>
      </header>

      <InstallPrompt />

      <section className="mb-6 rounded-3xl border border-border bg-gradient-to-br from-primary to-primary-strong p-5 text-primary-fg shadow-sm">
        <p className="text-sm/relaxed opacity-90" suppressHydrationWarning>
          {formatLong(new Date(), locale)}
        </p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold tabular-nums">{totalToday}</p>
            <p className="text-sm opacity-90">{t("todayLabel")}</p>
          </div>
          <p className="arabic text-2xl opacity-90">بِسْمِ اللَّهِ</p>
        </div>
      </section>

      {DHIKR_BY_CATEGORY.map((group) => (
        <section key={group.category} className="mb-6">
          <h2 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-muted">
            {tc(group.category)}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.items.map((d) => {
              const count = today[d.id] ?? 0;
              return (
                <Link
                  key={d.id}
                  href={`/count/${d.id}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:scale-[0.99]"
                >
                  <p className="arabic text-right text-2xl leading-relaxed text-primary">
                    {d.arabic}
                  </p>
                  <div>
                    <p className="font-semibold text-fg">{d.latin}</p>
                    <p className="text-sm text-muted">
                      {pick(d.translation, locale)}
                    </p>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 font-medium text-muted">
                      {t("target", { count: d.defaultTarget })}
                    </span>
                    {d.source && (
                      <span className="text-muted/70">
                        {pick(d.source, locale)}
                      </span>
                    )}
                    {count > 0 && (
                      <span className="ml-auto font-semibold text-primary">
                        {t("todayCount", { count })}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <p className="mt-8 text-center text-xs text-muted">{t("guestNote")}</p>
    </main>
  );
}
