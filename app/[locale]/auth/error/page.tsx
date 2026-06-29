import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AuthErrorPage() {
  const t = useTranslations("authError");
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-lg font-semibold text-fg">{t("title")}</p>
      <p className="max-w-sm text-sm text-muted">{t("desc")}</p>
      <Link
        href="/"
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg active:scale-95"
      >
        {t("back")}
      </Link>
    </main>
  );
}
