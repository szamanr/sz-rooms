import { Link } from "@/components/navigation/Link";
import { $t } from "@/utils/intl";
import { Show } from "@/components/controlFlow/Show/Show";
import { supabaseServerClient } from "@/api/supabaseServer";
import Icon from "@/components/Icon";

export default async function Home() {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  const isLoggedIn = !!currentUser;

  const roomsResponse = currentUser
    ? await supabaseServerClient()
        .from("room")
        .select("*", { count: "exact" })
        .eq("owner_id", currentUser?.id)
        .order("created_at", { ascending: false })
    : undefined;
  const hasRooms = !!(roomsResponse?.count ?? 0);

  const requestsResponse = currentUser
    ? await supabaseServerClient()
        .from("booking_request")
        .select(
          `status, room!inner ( 
            owner_id
           )`,
        )
        .eq("room.owner_id", currentUser.id)
    : undefined;
  const requests = requestsResponse?.data ?? [];

  return (
    <div className="flex space-x-16">
      <div className="flex flex-col">
        <Icon className="text-lime-500 self-center" name="house" size="3xl" />
        <h3>
          <span>{$t("Find a place")}</span>
        </h3>
        <Link href="/rooms">
          <p>{$t("Find rooms")}</p>
        </Link>
      </div>
      <Show when={isLoggedIn}>
        <div className="flex flex-col">
          <Icon
            className="text-lime-500 self-center"
            name="person"
            size="3xl"
          />
          <h3>
            <span>{$t("Find a roommate")}</span>
          </h3>
          <Link href="/my-rooms">
            <p>{$t("Manage my rooms")}</p>
          </Link>
          <Show when={hasRooms}>
            <Link className="space-x-1" href="/requests/pending">
              <p>{$t("Booking requests")}</p>
              <Show when={requestsResponse}>
                <span className="text-gray-500">
                  (
                  {requests.filter(({ status }) => status === "pending").length}
                  )
                </span>
              </Show>
            </Link>
            <Link className="space-x-1" href="/requests/accepted">
              <p>{$t("My matches")}</p>
              <Show when={requestsResponse}>
                <span className="text-gray-500">
                  (
                  {
                    requests.filter(({ status }) => status === "accepted")
                      .length
                  }
                  )
                </span>
              </Show>
            </Link>
            <Link className="space-x-1" href="/requests/saved">
              <p>{$t("Saved requests")}</p>
              <Show when={requestsResponse}>
                <span className="text-gray-500">
                  ({requests.filter(({ status }) => status === "saved").length})
                </span>
              </Show>
            </Link>
          </Show>
        </div>
      </Show>
    </div>
  );
}
