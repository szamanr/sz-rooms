import Link from "next/link";
import { supabaseServerClient } from "@/app/lib/supabase";
import { Room } from "@/app/rooms/types";
import Image from "next/image";
import { For } from "@/components/controlFlow/For/For";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { Searchbox } from "@/app/rooms/Searchbox";
import { SearchParams } from "@/utils/componentTypes";
import { $t } from "@/utils/intl";

const Rooms = async ({ searchParams }: SearchParams) => {
  const search = searchParams.name;
  let queryRooms = supabaseServerClient().from("room").select();
  if (search) queryRooms = queryRooms.ilike("name", `%${search}%`);
  const { data, error } = await queryRooms;
  const rooms: Room[] = data ?? [];

  if (error) {
    console.error(error);
    return <ErrorMessage />;
  }

  const fallback = <div>{$t("no rooms found")}</div>;

  return (
    <div className="w-5/6 flex flex-col items-center gap-4">
      <div className="w-1/2">
        <Searchbox className="w-full p-2 rounded border" param="name" />
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
