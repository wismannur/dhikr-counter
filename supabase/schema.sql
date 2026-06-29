-- =====================================================================
-- Skema Dhikr Counter untuk Supabase
-- Jalankan seluruh isi file ini di: Supabase Dashboard > SQL Editor > New query
-- =====================================================================

-- Agregat harian per user per dzikir (sumber data laporan).
create table if not exists public.dhikr_logs (
  user_id   uuid        not null references auth.users (id) on delete cascade,
  dhikr_id  text        not null,
  log_date  date        not null,
  count     integer     not null default 0 check (count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, dhikr_id, log_date)
);

create index if not exists dhikr_logs_user_date_idx
  on public.dhikr_logs (user_id, log_date);

-- Row Level Security: tiap user hanya boleh mengakses barisnya sendiri.
alter table public.dhikr_logs enable row level security;

drop policy if exists "Users manage own dhikr logs" on public.dhikr_logs;
create policy "Users manage own dhikr logs"
  on public.dhikr_logs
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Perbarui updated_at otomatis saat baris diubah.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists dhikr_logs_touch on public.dhikr_logs;
create trigger dhikr_logs_touch
  before update on public.dhikr_logs
  for each row execute function public.touch_updated_at();
