import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";

import { Database } from "@/types/schema";

export const createBrowserClient = () => {
  return createSupabaseBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
