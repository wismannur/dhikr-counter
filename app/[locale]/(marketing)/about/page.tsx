import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <About />;
}

function About() {
  const t = useTranslations("about");
  const features = t.raw("features") as string[];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-fg">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("subtitle")}</p>

      <div className="prose-content mt-6">
        <p>{t("intro")}</p>

        <h2>{t("featuresHeading")}</h2>
        <ul>
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2>{t("dhikrHeading")}</h2>
        <p>{t("dhikrBody")}</p>
        <p>{t("dhikrNote")}</p>

        <h2>{t("privacyHeading")}</h2>
        <p>
          {t("privacyBody")} <Link href="/privacy">{t("privacyLink")}</Link>.
        </p>

        <h2>{t("techHeading")}</h2>
        <p>{t("techBody")}</p>

        <p
          className="arabic"
          style={{ fontSize: "1.25rem", textAlign: "center", marginTop: "2rem" }}
        >
          تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ
        </p>
      </div>
    </main>
  );
}
