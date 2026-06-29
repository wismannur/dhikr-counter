import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LoginForm from "@/components/LoginForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "login" });
  return {
    title: t("title"),
    description: t("subtitle"),
    robots: { index: false, follow: true },
  };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <LoginForm />
    </main>
  );
}
