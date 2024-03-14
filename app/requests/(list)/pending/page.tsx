import React from "react";
import { $t } from "@/utils/intl";
import { supabaseServerClient } from "@/api/supabaseServer";
import { RequestList } from "@/app/requests/RequestList";

type Props = {};

const Requests: React.FC<Props> = async ({}) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  if (!currentUser) return null;

  const { data, error } = await supabaseServerClient()
    .from("booking_request")
    .select(
      `
      id, start_date, end_date, room!inner (
        id, name, currency, default_price, owner_id
      ), user_id
    `,
    )
    .eq("room.owner_id", currentUser.id)
    .eq("status", "pending")
    .order("start_date")
    .order("id");

  const requests = data ?? [];

  return (
    <div className="w-full">
      <h3>{$t("Pending requests")}:</h3>
      <RequestList
        fallback={$t("No pending booking requests")}
        requests={requests}
        status="pending"
      />
    </div>
  );
};

export default Requests;
