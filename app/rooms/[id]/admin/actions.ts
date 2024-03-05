"use server";
import { supabaseServerClient } from "@/api/supabaseServer";
import invariant from "tiny-invariant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database, Enums } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";

type InsertRoom = Derive<
  Database["public"]["Tables"]["room"]["Row"],
  {
    cover_photo: true;
    currency: true;
    default_min_stay: true;
    default_price: true;
    location: true;
    name: true;
    owner_id: true;
    type: true;
  }
>;
type UpdateRoom = Partial<Omit<InsertRoom, "id" | "owner_id">>;

export const insertRoom = async (formData: FormData) => {
  const defaultPrice = formData.get("defaultPrice") as Maybe<string>;
  const name = formData.get("name") as Maybe<string>;
  const location = formData.get("location") as Maybe<string>;
  const ownerId = formData.get("ownerId") as Maybe<string>;

  invariant(location);
  invariant(name);
  invariant(ownerId);

  const values = {
    cover_photo: formData.get("coverPhoto") as Maybe<string>,
    currency: formData.get("currency") as Maybe<Enums<"currency">>,
    default_min_stay: parseInt(
      (formData.get("defaultMinStay") as Maybe<string>) ?? "0",
    ),
    default_price: defaultPrice ? parseFloat(defaultPrice) : null,
    location,
    name,
    owner_id: ownerId,
    type: formData.get("type") as Maybe<Enums<"room_type">>,
  } satisfies InsertRoom;

  const { data, error } = await supabaseServerClient()
    .from("room")
    .insert(values)
    .select();

  if (error) {
    console.error(error);
    return;
  }

  const id = data[0].id;

  revalidatePath(`/rooms/${id}`, "page");
  revalidatePath(`/rooms/${id}/admin`, "page");
  redirect(`/rooms/${id}`);
};

export const updateRoom = async (formData: FormData) => {
  const defaultMinStay = formData.get("default_min_price") as Maybe<string>;
  const defaultPrice = formData.get("default_price") as Maybe<string>;
  const id = formData.get("id") as string;
  invariant(id);

  const values = {
    cover_photo: (formData.get("cover_photo") as Maybe<string>) ?? undefined,
    currency: formData.get("currency") as Maybe<Enums<"currency">>,
    default_min_stay: defaultMinStay ? parseInt(defaultMinStay) : undefined,
    default_price: defaultPrice ? parseFloat(defaultPrice) : undefined,
    location: (formData.get("location") as Maybe<string>) ?? undefined,
    name: (formData.get("name") as Maybe<string>) ?? undefined,
    type: (formData.get("type") as Maybe<Enums<"room_type">>) ?? undefined,
  } satisfies UpdateRoom;

  const { error } = await supabaseServerClient()
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

export const deleteRoom = async (formData: FormData) => {
  const id = formData.get("id") as string;
  invariant(id);

  const { error } = await supabaseServerClient()
    .from("room")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/rooms`, "page");
  revalidatePath(`/my-rooms`, "page");
  redirect(`/my-rooms`);
};

type InsertAvailability = Derive<
  Database["public"]["Tables"]["availability"]["Row"],
  {
    end_date: true;
    room_id: true;
    start_date: true;
  }
>;

export const addAvailability = async (formData: FormData) => {
  const roomId = formData.get("roomId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  invariant(roomId);
  invariant(startDate);
  invariant(endDate);

  const values = {
    end_date: endDate,
    room_id: parseInt(roomId),
    start_date: startDate,
  } satisfies InsertAvailability;

  const { error } = await supabaseServerClient()
    .from("availability")
    .insert(values)
    .select();

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/rooms/${roomId}`, "page");
  revalidatePath(`/rooms/${roomId}/admin`, "page");
};

export const deleteAvailability = async (formData: FormData) => {
  const id = formData.get("id") as string;
  invariant(id);

  const { error } = await supabaseServerClient()
    .from("availability")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/rooms/${id}`, "page");
  revalidatePath(`/rooms/${id}/admin`, "page");
};
