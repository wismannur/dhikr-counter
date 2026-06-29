import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProgressRing from "@/components/ProgressRing";
import { DHIKR_BY_CATEGORY, DHIKR_PRESETS, pick } from "@/lib/dhikr";
import {
  ChartIcon,
  DownloadIcon,
  GoogleIcon,
  RefreshIcon,
  TapIcon,
  TargetIcon,
  VibrateIcon,
} from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: { absolute: `Dhikr Counter — ${t("titleLine1")} ${t("titleLine2")}` },
    description: t("subtitle"),
    alternates: { canonical: locale === "en" ? "/" : `/${locale}` },
  };
}

const FEATURE_ICONS = [
  TapIcon,
  TargetIcon,
  VibrateIcon,
  ChartIcon,
  RefreshIcon,
  DownloadIcon,
];

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Landing />;
}

function Landing() {
  const t = useTranslations("home");
  const tc = useTranslations("categories");
  const locale = useLocale();
  const sample = DHIKR_PRESETS.find((d) => d.id === "subhanallah")!;
  const features = t.raw("features") as { title: string; desc: string }[];
  const steps = t.raw("steps") as { title: string; desc: string }[];

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-12 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              {t("badge")}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl">
              {t("titleLine1")}
              <br />
              <span className="text-primary">{t("titleLine2")}</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/app"
                className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-fg shadow-sm transition-colors hover:bg-primary-strong active:scale-95"
              >
                {t("ctaStart")}
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-base font-medium text-fg transition-colors hover:bg-surface-2 active:scale-95"
              >
                <GoogleIcon /> {t("ctaGoogle")}
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">{t("note")}</p>
          </div>

          {/* Mockup counter */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />
            <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-xl">
              <p className="arabic text-3xl font-bold text-fg">
                {sample.arabic}
              </p>
              <p className="mt-1 text-sm text-muted">
                {sample.latin} · {pick(sample.translation, locale)}
              </p>
              <div className="my-6 flex justify-center">
                <ProgressRing progress={27 / 33} size={208} stroke={12}>
                  <div>
                    <div className="text-6xl font-bold tabular-nums text-fg">
                      27
                    </div>
                    <div className="mt-1 text-sm font-medium text-muted">
                      / 33
                    </div>
                  </div>
                </ProgressRing>
              </div>
              <p className="text-sm text-muted">{t("mockupCaption")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-fg">
            {t("featuresTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            {t("featuresSubtitle")}
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? TapIcon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon width={22} height={22} />
                  </div>
                  <h3 className="mt-4 font-semibold text-fg">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Koleksi dzikir & doa */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight text-fg">
          {t("collectionTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          {t("collectionSubtitle")}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {DHIKR_BY_CATEGORY.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-fg">{tc(group.category)}</h3>
                <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                  {t("collectionCount", { count: group.items.length })}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {group.items.slice(0, 4).map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-muted">{d.latin}</span>
                    <span className="arabic shrink-0 text-base text-primary">
                      {d.arabic.length > 22
                        ? d.arabic.slice(0, 22) + "…"
                        : d.arabic}
                    </span>
                  </li>
                ))}
                {group.items.length > 4 && (
                  <li className="text-xs text-muted/70">
                    {t("collectionMore", { count: group.items.length - 4 })}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Cara kerja */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-fg">
            {t("stepsTitle")}
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-primary-fg">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold text-fg">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA akhir */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-primary-strong px-6 py-14 text-center text-primary-fg shadow-sm">
          <p className="arabic text-3xl">بِسْمِ اللَّهِ</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            {t("ctaHeading")}
          </h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">{t("ctaSubtitle")}</p>
          <Link
            href="/app"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-base font-semibold text-primary-strong shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </main>
  );
}
