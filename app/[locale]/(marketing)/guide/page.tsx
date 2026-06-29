import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = { params: Promise<{ locale: string }> };
type Section = { h: string; p: string[] };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function GuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Guide />;
}

function Guide() {
  const t = useTranslations("guide");
  const keys = t.raw("keys") as string[];
  const sections = t.raw("sections") as Section[];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-fg">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("subtitle")}</p>

      <div className="prose-content mt-6">
        {sections.map((s, i) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {i === 1 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {keys.map((k) => (
                  <span
                    key={k}
                    className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg shadow-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
