# Dhikr Counter — Digital Tasbih

A web-based dhikr counter (digital tasbih). Pick a dhikr, then count it with
**screen taps or your keyboard**, complete with **targets**, **haptic + sound
feedback** (handy for counting with your eyes closed), and **daily, weekly, and
monthly progress reports**.

Built with **Next.js 16**, **React 19** (React Compiler enabled), **Tailwind
CSS v4**, **next-intl**, and **Supabase** (optional, for sign-in & sync).

## Features

- 🕌 **16 preset dhikr & du'a across categories** (daily tasbih, Ramadan,
  provision/rizq, Qur'anic du'a) with Arabic text, transliteration, meaning, and
  source.
- 🎯 **Count targets** (33 / 100 / 1000 / custom) with a progress ring, round
  tracking, and a marker each time the target or one of its multiples is reached.
- 👆 **Many ways to count — all add +1**: tap the screen, arrow keys
  (↑ ↓ ← →), `+`, `=`, Space, or Enter.
- 🔔 **Haptic & audio feedback** on every count and when a target is reached
  (can be turned off).
- ↩️ **Undo & Reset** to fix mis-taps (Reset does not erase your reports).
- 📊 **Reports** — daily, weekly, monthly: trends plus a per-dhikr breakdown.
- 📴 **Guest mode** — use it instantly without signing in; data is stored on
  your device.
- 🔐 **Google sign-in + cloud sync** (optional, via Supabase). Local data is
  automatically synced on your first sign-in.
- 📱 **PWA** — installable to your home screen and usable offline.
- 🌗 **Light & dark mode** (follows the system, with a manual toggle).
- 🌍 **Bilingual (i18n)** — English as the default at `/`, Indonesian at `/id`
  (via next-intl, no `/en` prefix). Covers dhikr meanings and all UI text.

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 (English, default) or http://localhost:3000/id
(Indonesian) — **fully functional with zero configuration**.

> Using npm or yarn? Swap in `npm install` / `npm run dev` or the yarn
> equivalents; the lockfile in this repo is for pnpm.

## Google sign-in + Sync (optional)

Sign-in is optional and requires a Supabase project + Google OAuth. A
step-by-step guide is in **[SETUP.md](./SETUP.md)**.

In short:

1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql).
2. Enable the Google provider in Supabase + create an OAuth client in Google Cloud.
3. Copy `.env.local.example` → `.env.local` and fill in the URL & anon key.

## Production build

```bash
pnpm build
pnpm start
```

## Structure

```
app/
  [locale]/             All pages (en default with no prefix, /id for ID)
    layout.tsx            Root layout: html lang, NextIntlClientProvider, fonts
    (marketing)/          Public pages (SiteHeader/Footer layout):
      page.tsx              landing (/)
      login/ about/ privacy/ terms/ guide/ contact/ faq/
    app/page.tsx          App — dhikr picker (/app)
    count/[id]/page.tsx   Counting screen
    reports/page.tsx      Reports
    auth/error/page.tsx   Sign-in error page
    not-found.tsx         Themed 404 page
  auth/callback/route   Supabase OAuth callback (not localized)
  globals.css · manifest.ts · sitemap.ts · robots.ts · opengraph-image.tsx
i18n/                   routing (en/id, as-needed), request, navigation
messages/               en.json · id.json (all UI text + page content)
components/             Counter, ProgressRing, Reports, SiteHeader/Footer,
                        LoginForm, AuthButton, LocaleSwitcher, ThemeToggle,
                        InstallPrompt, ServiceWorkerRegister, SyncManager, icons
lib/
  dhikr.ts             Preset dhikr data (per-locale meanings) + pick()
  store.ts              State + localStorage persistence
  reports.ts            Report aggregation
  feedback.ts           Haptic + audio feedback (Web Audio / Vibration API)
  date.ts               Locale-aware date formatting (Intl)
  site.ts · types.ts    Site metadata + shared types
  supabase/             Client, server, config, useAuth
  sync.ts               Two-way sync with Supabase
proxy.ts                Next 16 middleware: next-intl i18n + Supabase session
supabase/
  schema.sql            Table schema + RLS
  migrations/           SQL migrations
public/                 sw.js (service worker), icon.svg, icons/
```

## Technical notes

- **Guest vs cloud**: without Supabase env vars, everything runs from
  `localStorage`. With them set, a **Sign in** button appears and data syncs.
- **Data model**: a daily per-dhikr aggregate — `dhikr_logs(user_id, dhikr_id,
  log_date, count)` — lightweight and easy to sum up for reports.
- Built for **Next.js 16** (App Router, Turbopack, async request APIs,
  `proxy.ts`) with the **React Compiler** enabled.
