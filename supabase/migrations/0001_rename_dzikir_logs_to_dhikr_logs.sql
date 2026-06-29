-- =====================================================================
-- Migrasi: rename tabel dzikir_logs -> dhikr_logs
-- (mengikuti rename aplikasi menjadi "Dhikr Counter")
--
-- Jalankan di: Supabase Dashboard > SQL Editor > New query
-- Aman dijalankan SEKALI pada database yang masih memakai skema lama
-- (semua memakai IF EXISTS). Kolom `dhikr_id` sudah benar sejak awal,
-- jadi hanya nama tabel/index/policy/trigger yang berubah.
--
-- Catatan: jika database masih KOSONG / baru dibuat, kamu tidak perlu
-- migrasi ini — cukup jalankan ulang `supabase/schema.sql` yang terbaru.
-- =====================================================================

-- 1. Rename tabel (data & kolom tetap, termasuk dhikr_id)
alter table if exists public.dzikir_logs rename to dhikr_logs;

-- 2. Rename index
alter index if exists public.dzikir_logs_user_date_idx rename to dhikr_logs_user_date_idx;

-- 3. Ganti nama RLS policy (drop yang lama, buat ulang dengan nama baru)
drop policy if exists "Users manage own dzikir logs" on public.dhikr_logs;
create policy "Users manage own dhikr logs"
  on public.dhikr_logs
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 4. Rename trigger (ikut pindah bersama tabel setelah langkah 1)
alter trigger dzikir_logs_touch on public.dhikr_logs rename to dhikr_logs_touch;
