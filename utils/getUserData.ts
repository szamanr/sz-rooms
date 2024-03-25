import { supabaseServerClient } from "@/api/supabaseServer";
import { Database } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";

type User = Derive<
  Database["public"]["Tables"]["user"]["Row"],
  {
    about: true;
    avatar: true;
    birthday: true;
    created_at: true;
    gender: true;
    id: true;
    name: true;
  }
>;

export const getUserData = async (id: string): Promise<User | undefined> => {
  const { data } = await supabaseServerClient()
    .from("user")
    .select("id, about, avatar, birthday, created_at, gender, name")
    .eq("id", id)
    .limit(1);

  return data?.[0] ?? undefined;
};
