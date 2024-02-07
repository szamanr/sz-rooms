import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import invariant from "tiny-invariant";

export const supabaseClient = () => {
  invariant(process.env.SUPABASE_URL);
  invariant(process.env.SUPABASE_KEY);

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
};

export const supabaseServerClient = () => {
  const cookieStore = cookies();

  return createServerClient(
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
