"use server";
import { supabaseServerClient } from "@/api/supabaseServer";
import invariant from "tiny-invariant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Enums } from "@/api/schema.types";

export const updateRoom = async (formData: FormData) => {
  const id = formData.get("id") as string;
  invariant(id);

  const values = {
    name: (formData.get("name") as Maybe<string>) ?? undefined,
    cover_photo: (formData.get("cover_photo") as Maybe<string>) ?? undefined,
    location: (formData.get("location") as Maybe<string>) ?? undefined,
    type: (formData.get("type") as Maybe<Enums<"room_type">>) ?? undefined,
  };

  const { data, error } = await supabaseServerClient()
    .from("room")
    .update(values)
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/rooms/${id}`, "page");
  revalidatePath(`/rooms/${id}/admin`, "page");
  redirect(`/rooms/${id}`);
};
