import { cookies } from "next/headers";
import { Database } from "@/api/schema.types";
import invariant from "tiny-invariant";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseServerClient = () => {
  invariant(process.env.NEXT_PUBLIC_SUPABASE_URL);
  invariant(process.env.NEXT_PUBLIC_SUPABASE_KEY);

  return createServerComponentClient<Database>(
    {
      cookies,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    },
  );
};
