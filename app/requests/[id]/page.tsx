import React from "react";
import { supabaseServerClient } from "@/api/supabaseServer";
import { IdRouteParams, SearchParams } from "@/utils/componentTypes";
import { NavigateBack, NavigateForward } from "@/app/requests/[id]/Navigate";
import { BasicInfo } from "@/app/requests/[id]/BasicInfo";
import { UserAbout } from "@/app/requests/[id]/UserAbout";
import { UserProfile } from "@/app/requests/[id]/UserProfile";
import { isNil } from "lodash";
import { ActionsFooter } from "@/app/requests/[id]/ActionsFooter";

const BookingRequest = async ({
  params: { id },
  searchParams,
}: IdRouteParams & SearchParams) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  if (!currentUser) return null;

  const statusToShow = searchParams.show;

  let allRequestsQuery = supabaseServerClient()
    .from("booking_request")
    .select(
      `id, room (
      owner_id
    )`,
    )
    .eq("room.owner_id", currentUser.id)
    .order("start_date");

  if (statusToShow) {
    allRequestsQuery = allRequestsQuery.eq("status", statusToShow);
  }

  const { data: allRequestsData } = await allRequestsQuery;

  const currentRequestIndex = allRequestsData?.findIndex(
    (r) => `${r.id}` === id,
  );
  const prevRequest = !isNil(currentRequestIndex)
    ? allRequestsData?.[currentRequestIndex - 1]?.id
    : undefined;
  const nextRequest = !isNil(currentRequestIndex)
    ? allRequestsData?.[currentRequestIndex + 1]?.id
    : undefined;

  const { data, error } = await supabaseServerClient()
    .from("booking_request")
    .select(
      `
      id, start_date, end_date, status, room(
        id, name, currency, default_price, owner_id
      ), user_id
    `,
    )
    .eq("id", id)
    .limit(1);

  const request = data?.[0] ?? undefined;

  if (!request) return null;

  const { status } = request;

  return (
    <main className="flex grow flex-col items-center justify-between">
      <div className="flex grow">
        <NavigateBack
          href={
            prevRequest
              ? `/requests/${prevRequest}?show=${statusToShow}`
              : undefined
          }
        />
        <div className="flex flex-col w-screen">
          <div className="w-full bg-lime-300 p-8 md:px-16 lg:px-48 flex">
            <BasicInfo request={request} />
          </div>
          <div className="w-full grow bg-stone-200 p-8 md:px-16 lg:px-48">
            <div className="min-h-[90%] flex gap-8 justify-between">
              <UserAbout />
              <UserProfile />
            </div>
          </div>
        </div>
        <NavigateForward
          href={
            nextRequest
              ? `/requests/${nextRequest}?show=${statusToShow}`
              : `/requests/${statusToShow}`
          }
          icon={nextRequest ? "chevron_right" : "sports_score"}
        />
      </div>
      <ActionsFooter id={id} nextRequest={nextRequest} status={status} />
    </main>
  );
};

export default BookingRequest;
