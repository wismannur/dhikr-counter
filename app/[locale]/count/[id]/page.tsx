"use client";

import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getDhikr } from "@/lib/dhikr";
import Counter from "@/components/Counter";

export default function CountPage() {
  const t = useTranslations("counter");
  const params = useParams<{ id: string }>();
  const dhikr = getDhikr(params.id);

  if (!dhikr) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-lg font-semibold text-fg">{t("notFoundTitle")}</p>
        <p className="text-sm text-muted">{t("notFoundDesc")}</p>
        <Link
          href="/app"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg active:scale-95"
        >
          {t("notFoundCta")}
        </Link>
      </main>
    );
  }

  return <Counter dhikr={dhikr} />;
}
