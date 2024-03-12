import React from "react";
import { supabaseServerClient } from "@/api/supabaseServer";
import { IdRouteParams } from "@/utils/componentTypes";
import { NavigateBack, NavigateForward } from "@/app/requests/[id]/Navigate";
import { BasicInfo } from "@/app/requests/[id]/BasicInfo";
import { UserAbout } from "@/app/requests/[id]/UserAbout";
import { UserProfile } from "@/app/requests/[id]/UserProfile";
import { isNil } from "lodash";

const BookingRequest = async ({ params: { id } }: IdRouteParams) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  if (!currentUser) return null;

  const { data: allRequestsData } = await supabaseServerClient()
    .from("booking_request")
    .select(
      `id, room (
      owner_id
    )`,
    )
    .eq("room.owner_id", currentUser.id)
    .order("start_date");

  const currentRequestIndex = allRequestsData?.findIndex(
    (r) => `${r.id}` === id,
  );
  const previousRequest = !isNil(currentRequestIndex)
    ? allRequestsData?.[currentRequestIndex - 1]?.id
    : undefined;
  const nextRequest = !isNil(currentRequestIndex)
    ? allRequestsData?.[currentRequestIndex + 1]?.id
    : undefined;

  const { data, error } = await supabaseServerClient()
    .from("booking_request")
    .select(
      `
      id, start_date, end_date, room(
        id, name, currency, default_price, owner_id
      ), user_id
    `,
    )
    .eq("id", id)
    .limit(1);

  const request = data?.[0] ?? undefined;

  if (!request) return null;

  return (
    <div className="flex gap-4">
      <NavigateBack id={previousRequest} />
      <div className="flex flex-col gap-4 w-screen px-8 md:px-16 lg:px-56">
        <BasicInfo request={request} />
        <div className="flex gap-8 justify-between">
          <UserAbout />
          <UserProfile />
        </div>
      </div>
      <NavigateForward id={nextRequest} />
    </div>
  );
};

export default BookingRequest;
