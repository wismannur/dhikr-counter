# Setup Dhikr Counter

Aplikasi **langsung bisa dipakai tanpa konfigurasi apa pun** (mode tamu — data
tersimpan di `localStorage` perangkat). Login Google + sinkronisasi cloud
bersifat opsional dan butuh setup Supabase di bawah ini.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — sudah berfungsi penuh tanpa login.

---

## Mengaktifkan Login Google + Sync (opsional)

### 1. Buat project Supabase

1. Masuk ke https://supabase.com → **New project**.
2. Setelah jadi, buka **Project Settings → API** (atau **Data API**), catat:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Buat tabel & policy

Buka **SQL Editor → New query**, tempel seluruh isi
[`supabase/schema.sql`](./supabase/schema.sql), lalu **Run**.

### 3. Siapkan Google OAuth

**a. Google Cloud Console** (https://console.cloud.google.com):

1. Buat / pilih project → **APIs & Services → OAuth consent screen** → isi data dasar.
2. **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
3. Application type: **Web application**.
4. **Authorized redirect URIs**, tambahkan URL callback dari Supabase:
   ```
   https://<PROJECT-REF>.supabase.co/auth/v1/callback
   ```
   (Lihat URL persisnya di langkah berikutnya di dashboard Supabase.)
5. Simpan, catat **Client ID** dan **Client secret**.

**b. Supabase Dashboard:**

1. **Authentication → Providers → Google** → aktifkan.
2. Tempel **Client ID** & **Client secret** dari Google, lalu **Save**.
   Di halaman ini juga tertera *Callback URL* yang harus dipakai di langkah 4a.
3. **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` (dev) atau domain produksimu.
   - **Redirect URLs**, tambahkan:
     ```
     http://localhost:3000/auth/callback
     https://<domain-produksi>/auth/callback
     ```

### 4. Isi environment variable

```bash
cp .env.local.example .env.local
```

Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari langkah 1,
lalu jalankan ulang `npm run dev`.

Setelah ini tombol **Masuk** akan muncul di beranda. Saat login pertama, data
dzikir yang sudah tersimpan di perangkat otomatis disinkronkan ke akunmu.

---

## Build produksi

```bash
npm run build
npm start
```
