"use server";
import { supabaseServerClient } from "@/api/supabaseServer";
import { revalidatePath } from "next/cache";
import invariant from "tiny-invariant";
import { Database } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";

type SendBookingRequest = Derive<
  Database["public"]["Tables"]["booking_request"]["Row"],
  {
    end_date: true;
    room_id: true;
    start_date: true;
  }
>;

export const sendBookingRequest = async (formData: FormData) => {
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
  } satisfies SendBookingRequest;

  const { error } = await supabaseServerClient()
    .from("booking_request")
    .insert(values)
    .select();

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/rooms/${roomId}`, "page");
};

export const deleteBookingRequest = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const roomId = formData.get("roomId") as string;
  invariant(id);
  invariant(roomId);

  const { error } = await supabaseServerClient()
    .from("booking_request")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/rooms/${roomId}`, "page");
};
