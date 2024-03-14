import React from "react";
import { For } from "@/components/controlFlow/For/For";
import { $t } from "@/utils/intl";
import { supabaseServerClient } from "@/api/supabaseServer";
import { differenceInDays, format } from "date-fns";
import { Link } from "@/components/navigation/Link";

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
    .order("start_date");

  const requests = data ?? [];

  return (
    <div className="w-full">
      <ul>
        <li className="px-2 pb-2 grid grid-cols-5 gap-2">
          <span>{$t("Room")}</span>
          <span>{$t("Duration")}</span>
          <span>{$t("Start date")}</span>
          <span>{$t("End date")}</span>
          <span>{$t("Guest")}</span>
        </li>
        <For
          each={requests}
          fallback={<li className="p-2">{$t("No booking requests")}</li>}
        >
          {({ end_date, id, room, start_date, user_id }) => (
            <li className="hover:bg-stone-200 even:bg-lime-300 even:hover:bg-lime-400 rounded">
              <Link
                className="p-2 grid grid-cols-5 gap-2"
                href={`/requests/${id}`}
                variant="none"
              >
                <span>{room?.name}</span>
                <span>
                  {$t("{count} days", {
                    count: differenceInDays(end_date, start_date),
                  })}
                </span>
                <span>{format(start_date, "dd MMM yyyy")}</span>
                <span>{format(end_date, "dd MMM yyyy")}</span>
                <span>{user_id}</span>
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Requests;
