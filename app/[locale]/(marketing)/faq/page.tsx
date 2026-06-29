import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = { params: Promise<{ locale: string }> };
type Item = { q: string; a: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Faq />;
}

function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-fg">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("subtitle")}</p>

      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="group rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-fg">
              {it.q}
              <span className="text-xl text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{it.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
