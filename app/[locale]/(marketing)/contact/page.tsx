import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Contact />;
}

function Contact() {
  const t = useTranslations("contact");
  const email = t("email");

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-fg">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("subtitle")}</p>

      <div className="prose-content mt-6">
        <p>{t("intro")}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {t("emailLabel")}
        </p>
        <p className="mt-1 text-lg font-semibold text-fg">{email}</p>
        <a
          href={`mailto:${email}`}
          className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary-strong active:scale-95"
        >
          {t("emailCta")}
        </a>
      </div>

      <p className="mt-4 text-sm text-muted">{t("responseNote")}</p>
    </main>
  );
}
