import invariant from "tiny-invariant";
import { Database } from "@/api/schema.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseClient = () => {
  invariant(process.env.NEXT_PUBLIC_SUPABASE_URL);
  invariant(process.env.NEXT_PUBLIC_SUPABASE_KEY);

  return createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
};
