import Link from "next/link";
import { supabaseServerClient } from "@/app/lib/supabase";
import { Room } from "@/app/rooms/types";
import Image from "next/image";
import { For } from "@/components/controlFlow/For/For";
import { ErrorMessage } from "@/components/return/ErrorMessage";

const Rooms = async () => {
  const { data, error } = await supabaseServerClient().from("room").select();
  const rooms: Room[] = data ?? [];

  if (error) {
    console.error(error);
    return <ErrorMessage />;
  }

  return (
    <div>
      <ul className="grid grid-cols-3 gap-6">
        <For each={rooms}>
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
