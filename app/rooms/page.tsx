import Link from "next/link";
import { supabaseServerClient } from "@/api/supabase";
import Image from "next/image";
import { For } from "@/components/controlFlow/For/For";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { Searchbox } from "@/app/rooms/Searchbox";
import { SearchParams } from "@/utils/componentTypes";
import { $t } from "@/utils/intl";
import { RoomFilters } from "@/app/rooms/RoomFilters";

const Rooms = async ({ searchParams }: SearchParams) => {
  let roomsQuery = supabaseServerClient().from("room").select();

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

  const fallback = <div className="text-gray-500">{$t("no rooms found")}</div>;

  return (
    <div className="w-5/6 flex flex-col items-center gap-4">
      <div className="w-1/2">
        <Searchbox className="w-full p-2 rounded border" param="name" />
      </div>
      <div className="w-1/2">
        <RoomFilters className="w-full" />
      </div>
      <ul className="grid grid-cols-3 gap-6">
        <For each={rooms} fallback={fallback}>
          {({ id, name, cover_photo }) => (
            <li className="w-32">
              <Link className="flex flex-col" href={`/rooms/${id}`}>
                <Image
                  src={cover_photo ?? "https://placeholder.photo/img/200"}
                  alt={"cover photo"}
                  height={200}
                  width={200}
                />
                <span>{name}</span>
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Rooms;
