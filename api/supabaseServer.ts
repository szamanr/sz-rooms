import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/api/schema.types";
import invariant from "tiny-invariant";

export const supabaseServerClient = () => {
  invariant(process.env.NEXT_PUBLIC_SUPABASE_URL);
  invariant(process.env.NEXT_PUBLIC_SUPABASE_KEY);
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
};
