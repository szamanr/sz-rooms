import { Database } from "@/api/schema.types";
import { For } from "@/components/controlFlow/For/For";
import Link from "next/link";
import Image from "next/image";

type Room = Database["public"]["Tables"]["room"]["Row"];

type Props = {
  fallback: JSX.Element;
  roomHref: (id: number) => string;
  rooms: Room[];
};

export const RoomList = ({ fallback, roomHref, rooms }: Props) => (
  <ul className="grid grid-cols-3 gap-6">
    <For each={rooms} fallback={fallback}>
      {({ id, name, cover_photo }) => (
        <li className="w-32">
          <Link className="flex flex-col" href={roomHref(id)}>
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
);
