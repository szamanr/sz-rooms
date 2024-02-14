import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";
import { Database } from "@/api/schema.types";

export const supabaseClient = () => {
  invariant(process.env.NEXT_PUBLIC_SUPABASE_URL);
  invariant(process.env.NEXT_PUBLIC_SUPABASE_KEY);

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
  );
};
