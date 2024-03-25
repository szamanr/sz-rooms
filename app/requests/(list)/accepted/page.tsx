import React from "react";
import { $t } from "@/utils/intl";
import { supabaseServerClient } from "@/api/supabaseServer";
import { RequestList } from "@/app/requests/RequestList";

type Props = {};

const Matches: React.FC<Props> = async ({}) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  if (!currentUser) return null;

  const { data, error } = await supabaseServerClient()
    .from("booking_request")
    .select(
      `
      id, start_date, end_date, room!inner (
        id, name, currency, default_price, owner_id
      ), user ( name ), user_id
    `,
    )
    .eq("room.owner_id", currentUser.id)
    .eq("status", "accepted")
    .order("start_date")
    .order("id");

  const matches = data ?? [];

  return (
    <div className="w-full">
      <h3>{$t("My matches")}:</h3>
      <RequestList
        fallback={$t("No matches")}
        requests={matches}
        status="accepted"
      />
    </div>
  );
};

export default Matches;
