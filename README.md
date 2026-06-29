# Dhikr Counter — Tasbih Digital

Aplikasi penghitung dzikir (tasbih digital) berbasis web. Pilih dzikir, lalu
hitung dengan **ketukan layar atau keyboard**, lengkap dengan **target**,
**feedback getar + suara** (berguna saat berdzikir dengan mata tertutup), dan
**laporan progres harian, mingguan, hingga bulanan**.

Dibangun dengan **Next.js 16**, **React 19**, **Tailwind CSS v4**, dan
**Supabase** (opsional, untuk login & sinkronisasi).

## Fitur

- 🕌 **16 dzikir & doa preset berkategori** (tasbih harian, Ramadan, rezeki,
  doa Al-Qur'an) dengan teks Arab, latin, arti, dan sumber.
- 🎯 **Target hitungan** (33 / 100 / 1000 / kustom) dengan progress ring dan
  penanda saat target/kelipatannya tercapai.
- 👆 **Banyak cara menghitung — semua menambah +1**: ketuk layar, panah
  (↑ ↓ ← →), `+`, Spasi, atau Enter.
- 🔔 **Feedback taktil & audio** tiap hitungan dan saat target tercapai
  (bisa dimatikan).
- ↩️ **Undo & Reset** untuk koreksi salah pencet (reset tidak menghapus laporan).
- 📊 **Laporan** harian, mingguan, bulanan: tren + rincian per dzikir.
- 📴 **Mode tamu** — langsung pakai tanpa login, data tersimpan di perangkat.
- 🔐 **Login Google + sinkronisasi cloud** (opsional via Supabase). Data lokal
  otomatis disinkronkan saat login pertama.
- 📱 **PWA** — bisa di-_install_ ke layar utama dan dipakai offline.
- 🌗 **Mode terang & gelap** (mengikuti sistem, bisa di-_toggle_).
- 🌍 **Dwibahasa (i18n)** — English sebagai default di `/`, Indonesia di `/id`
  (via next-intl, tanpa prefix `/en`). Termasuk arti dzikir & semua teks UI.

## Mulai cepat

```bash
npm install
npm run dev
```

Buka http://localhost:3000 (English, default) atau http://localhost:3000/id
(Indonesia) — **sudah berfungsi penuh tanpa konfigurasi apa pun**.

## Login Google + Sinkronisasi (opsional)

Fitur login bersifat opsional dan butuh project Supabase + Google OAuth.
Panduan langkah demi langkah ada di **[SETUP.md](./SETUP.md)**.

Singkatnya:

1. Buat project Supabase, jalankan [`supabase/schema.sql`](./supabase/schema.sql).
2. Aktifkan provider Google di Supabase + buat OAuth client di Google Cloud.
3. Salin `.env.local.example` → `.env.local`, isi URL & anon key.

## Build produksi

```bash
npm run build
npm start
```

## Struktur

```
app/
  [locale]/             Semua halaman (en default tanpa prefix, /id untuk ID)
    layout.tsx            Root layout: html lang, NextIntlClientProvider, fonts
    (marketing)/          Halaman publik (layout SiteHeader/Footer):
      page.tsx              landing (/)
      login/ about/ privacy/ terms/ guide/ contact/ faq/
    app/page.tsx          Aplikasi — pemilih dzikir (/app)
    count/[id]/page.tsx   Layar hitung
    reports/page.tsx      Laporan
    auth/error/page.tsx   Halaman gagal login
    not-found.tsx         Halaman 404 bertema
  auth/callback/route   Callback OAuth Supabase (tidak dilokalkan)
  manifest.ts · sitemap.ts · robots.ts · opengraph-image.tsx   (root, global)
i18n/                   routing (en/id, as-needed), request, navigation
messages/               en.json · id.json (semua teks UI + konten halaman)
components/             Counter, Reports, SiteHeader/Footer, LoginForm,
                        LocaleSwitcher, AuthButton, dll.
lib/
  dhikr.ts             Data preset dzikir (arti per-locale) + pick()
  store.ts              State + persistensi localStorage
  reports.ts            Agregasi laporan
  date.ts               Format tanggal locale-aware (Intl)
  supabase/             Client, server, auth, config
  sync.ts               Sinkronisasi dua arah ke Supabase
proxy.ts                Middleware Next 16: i18n next-intl + sesi Supabase
supabase/schema.sql     Skema tabel + RLS
```

## Catatan teknis

- **Mode tamu vs cloud**: tanpa env Supabase, seluruh fitur jalan dari
  `localStorage`. Dengan env, muncul tombol **Masuk** dan data tersinkron.
- **Model data**: agregat harian per dzikir — `dhikr_logs(user_id, dhikr_id,
  log_date, count)` — ringan dan mudah dijumlahkan untuk laporan.
- Dibuat untuk **Next.js 16** (App Router, Turbopack, async request APIs,
  `proxy.ts`).
