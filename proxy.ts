import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

// Pengganti `middleware` di Next.js 16. Menggabungkan:
// 1. Routing i18n next-intl (en default tanpa prefix, id di /id)
// 2. Penyegaran sesi auth Supabase
const handleI18n = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = handleI18n(request);

  if (isSupabaseConfigured) {
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });
    // Menyegarkan token bila kedaluwarsa; cookie ditulis ke response i18n.
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  // Semua route kecuali API, aset statis (ada titik), opengraph-image,
  // dan callback OAuth.
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|auth/callback|.*\\..*).*)",
  ],
};
