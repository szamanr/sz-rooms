"use server";
import { supabaseServerClient } from "@/api/supabaseServer";
import invariant from "tiny-invariant";
import { revalidatePath } from "next/cache";
import { Database, Enums } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";

type InsertUser = Derive<
  Database["public"]["Tables"]["user"]["Row"],
  {
    about: true;
    avatar: true;
    birthday: true;
    gender: true;
    id: true;
    name: true;
  }
>;
type UpdateUser = Partial<Omit<InsertUser, "id">>;

export const updateUser = async (formData: FormData) => {
  const about = (formData.get("about") as Maybe<string>) ?? undefined;
  const avatar = (formData.get("avatar") as Maybe<string>) ?? undefined;
  const birthday = (formData.get("birthday") as Maybe<string>) ?? undefined;
  const gender =
    (formData.get("gender") as Maybe<Enums<"gender">>) ?? undefined;
  const name = (formData.get("name") as Maybe<string>) ?? undefined;
  const id = formData.get("id") as string;
  invariant(id);

  const values = {
    about,
    avatar,
    birthday,
    gender,
    name,
  } satisfies UpdateUser;

  const { error } = await supabaseServerClient()
    .from("user")
    .update(values)
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/my-profile`, "page");
};
