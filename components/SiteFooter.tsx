import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SiteFooter() {
  const t = useTranslations("footer");

  const links = [
    { href: "/app", label: t("openApp") },
    { href: "/about", label: t("about") },
    { href: "/guide", label: t("guide") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
    { href: "/privacy", label: t("privacy") },
    { href: "/terms", label: t("terms") },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-fg">
                <span className="arabic text-base leading-none">ذِكْر</span>
              </div>
              <span className="text-base font-bold text-fg">Dhikr Counter</span>
            </div>
            <p className="mt-3 text-sm text-muted">{t("tagline")}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Dhikr Counter · {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
