import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

export default function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-fg shadow-sm">
            <span className="arabic text-base leading-none">ذِكْر</span>
          </div>
          <span className="text-base font-bold text-fg">Dhikr Counter</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          <Link href="/about" className="transition-colors hover:text-fg">
            {t("about")}
          </Link>
          <Link href="/guide" className="transition-colors hover:text-fg">
            {t("guide")}
          </Link>
          <Link href="/faq" className="transition-colors hover:text-fg">
            {t("faq")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-fg">
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg sm:inline"
          >
            {t("signIn")}
          </Link>
          <Link
            href="/app"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg shadow-sm transition-colors hover:bg-primary-strong active:scale-95"
          >
            {t("openApp")}
          </Link>
        </div>
      </div>
    </header>
  );
}
