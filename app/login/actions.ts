"use server";
import { supabaseServerClient } from "@/api/supabaseServer";
import invariant from "tiny-invariant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logIn = async (formData: FormData) => {
  const email = formData.get("email") as Maybe<string>;
  const password = formData.get("password") as Maybe<string>;

  invariant(email);
  invariant(password);

  const { data, error } = await supabaseServerClient().auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const signUp = async (formData: FormData) => {
  const email = formData.get("email") as Maybe<string>;
  const password = formData.get("password") as Maybe<string>;

  invariant(email);
  invariant(password);

  const { data, error } = await supabaseServerClient().auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
};
