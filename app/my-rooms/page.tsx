import { supabaseServerClient } from "@/api/supabaseServer";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { Searchbox } from "@/app/rooms/Searchbox";
import { SearchParams } from "@/utils/componentTypes";
import { $t } from "@/utils/intl";
import { RoomFilters } from "@/app/rooms/RoomFilters";
import invariant from "tiny-invariant";
import { RoomList } from "@/components/room/RoomList";

const MyRooms = async ({ searchParams }: SearchParams) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  invariant(currentUser);
  let roomsQuery = supabaseServerClient()
    .from("room")
    .select()
    .eq("owner_id", currentUser.id);

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

  const fallback = (
    <div className="text-gray-500">{$t("You have not added any rooms")}</div>
  );

  return (
    <div className="w-5/6 flex flex-col items-center gap-4">
      <div className="w-1/2">
        <Searchbox className="w-full p-2 rounded border" param="name" />
      </div>
      <div className="w-1/2">
        <RoomFilters className="w-full" />
      </div>
      <RoomList
        roomHref={(id) => `/rooms/${id}/admin`}
        rooms={rooms}
        fallback={fallback}
      />
    </div>
  );
};

export default MyRooms;
