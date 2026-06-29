# Dhikr Counter Setup

The app **works out of the box with zero configuration** (guest mode — data is
stored in your device's `localStorage`). Google sign-in + cloud sync are
optional and require the Supabase setup below.

## Running locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 — fully functional without signing in.

> Using npm or yarn? Swap in `npm install` / `npm run dev` or the yarn
> equivalents; the lockfile in this repo is for pnpm.

---

## Enabling Google sign-in + Sync (optional)

### 1. Create a Supabase project

1. Go to https://supabase.com → **New project**.
2. Once it's ready, open **Project Settings → API** (or **Data API**) and note:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Create the table & policies

Open **SQL Editor → New query**, paste the entire contents of
[`supabase/schema.sql`](./supabase/schema.sql), then click **Run**.

### 3. Set up Google OAuth

**a. Google Cloud Console** (https://console.cloud.google.com):

1. Create / pick a project → **APIs & Services → OAuth consent screen** → fill in the basics.
2. **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
3. Application type: **Web application**.
4. Under **Authorized redirect URIs**, add the callback URL from Supabase:
   ```
   https://<PROJECT-REF>.supabase.co/auth/v1/callback
   ```
   (You'll find the exact URL in the next step in the Supabase dashboard.)
5. Save, and note the **Client ID** and **Client secret**.

**b. Supabase Dashboard:**

1. **Authentication → Providers → Google** → enable it.
2. Paste the **Client ID** & **Client secret** from Google, then **Save**.
   This page also shows the *Callback URL* you need to use in step 4a.
3. **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` (dev) or your production domain.
   - Under **Redirect URLs**, add:
     ```
     http://localhost:3000/auth/callback
     https://<production-domain>/auth/callback
     ```

### 4. Set the environment variables

```bash
cp .env.local.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from
step 1, then restart `pnpm dev`.

After this, a **Sign in** button appears on the home page. On your first
sign-in, the dhikr data already stored on your device is automatically synced
to your account.

---

## Production build

```bash
pnpm build
pnpm start
```
