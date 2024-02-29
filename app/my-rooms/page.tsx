import { supabaseServerClient } from "@/api/supabaseServer";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { Searchbox } from "@/app/rooms/Searchbox";
import { SearchParams } from "@/utils/componentTypes";
import { $t } from "@/utils/intl";
import { RoomFilters } from "@/app/rooms/RoomFilters";
import { RoomList } from "@/components/room/RoomList";
import { redirect } from "next/navigation";
import { Show } from "@/components/controlFlow/Show/Show";
import Icon from "@/components/Icon";
import Link from "next/link";

const MyRooms = async ({ searchParams }: SearchParams) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  if (!currentUser) redirect("/rooms");

  let roomsQuery = supabaseServerClient()
    .from("room")
    .select()
    .eq("owner_id", currentUser.id)
    .order("created_at", { ascending: false });

  const search = searchParams.name;
  const type = searchParams.type;
  if (search) roomsQuery = roomsQuery.ilike("name", `%${search}%`);
  if (type) roomsQuery = roomsQuery.in("type", type.split(","));

  const { data, error } = await roomsQuery;
  const rooms = data ?? [];

  if (error) {
    console.error(error);
    return <ErrorMessage />;
  }

  const canAddRooms = rooms.length <= 5;

  return (
    <div className="w-5/6 flex flex-col items-center gap-4">
      <div className="w-1/2">
        <Searchbox className="w-full p-2 rounded border" param="name" />
      </div>
      <div className="w-1/2">
        <RoomFilters className="w-full" />
      </div>
      <RoomList roomHref={(id) => `/rooms/${id}/admin`} rooms={rooms}>
        <Show when={canAddRooms}>
          <Link
            className="size-full flex flex-col justify-center items-center text-gray-500 hover:text-amber-500"
            href="/rooms/add"
          >
            <Icon name="add" size="2xl" />
            <span>{$t("Add room")}</span>
          </Link>
        </Show>
      </RoomList>
    </div>
  );
};

export default MyRooms;
