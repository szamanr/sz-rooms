import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import invariant from "tiny-invariant";
import { Database } from "@/api/schema.types";

export const supabaseClient = () => {
  invariant(process.env.SUPABASE_URL);
  invariant(process.env.SUPABASE_KEY);

  return createClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );
};

export const supabaseServerClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
};
