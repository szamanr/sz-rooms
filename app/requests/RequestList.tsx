import React from "react";
import { $t } from "@/utils/intl";
import { For } from "@/components/controlFlow/For/For";
import { Link } from "@/components/navigation/Link";
import { differenceInDays, format } from "date-fns";
import { Database, Enums } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";

type Request = Derive<
  Database["public"]["Tables"]["booking_request"]["Row"],
  {
    end_date: true;
    id: true;
    start_date: true;
    user_id: true;
  }
> & {
  room: Maybe<
    Derive<
      Database["public"]["Tables"]["room"]["Row"],
      {
        name: true;
      }
    >
  >;
  user: Maybe<
    Derive<
      Database["public"]["Tables"]["user"]["Row"],
      {
        name: true;
      }
    >
  >;
};

type Props = {
  fallback?: React.ReactNode;
  requests: Request[];
  status: Enums<"booking_request_status">;
};

export const RequestList: React.FC<Props> = ({
  fallback,
  requests,
  status,
}) => {
  return (
    <ul>
      <li className="px-2 pb-2 grid grid-cols-5 gap-2">
        <span>{$t("Room")}</span>
        <span>{$t("Duration")}</span>
        <span>{$t("Start date")}</span>
        <span>{$t("End date")}</span>
        <span>{$t("Guest")}</span>
      </li>
      <For each={requests} fallback={<li className="p-2">{fallback}</li>}>
        {({ end_date, id, room, start_date, user, user_id }) => (
          <li className="hover:bg-stone-200 even:bg-lime-300 even:hover:bg-lime-400 rounded">
            <Link
              className="p-2 grid grid-cols-5 gap-2"
              href={`/requests/${id}?show=${status}`}
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
              <span>{user?.name ?? user_id}</span>
            </Link>
          </li>
        )}
      </For>
    </ul>
  );
};
