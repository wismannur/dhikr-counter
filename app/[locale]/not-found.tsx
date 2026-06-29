import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-fg shadow-sm">
        <span className="arabic text-2xl leading-none">ذِكْر</span>
      </div>
      <p className="text-6xl font-bold tracking-tight text-fg">404</p>
      <p className="text-lg font-semibold text-fg">{t("title")}</p>
      <p className="max-w-sm text-sm text-muted">{t("message")}</p>
      <div className="mt-2 flex gap-3">
        <Link
          href="/"
          className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2 active:scale-95"
        >
          {t("home")}
        </Link>
        <Link
          href="/app"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg active:scale-95"
        >
          {t("openApp")}
        </Link>
      </div>
    </main>
  );
}
