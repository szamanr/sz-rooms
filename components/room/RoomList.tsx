import { Database } from "@/api/schema.types";
import { For } from "@/components/controlFlow/For/For";
import Link from "next/link";
import Image from "next/image";

type Room = Database["public"]["Tables"]["room"]["Row"];

type Props = {
  children?: React.ReactNode;
  fallback?: JSX.Element;
  roomHref: (id: number) => string;
  rooms: Room[];
};

export const RoomList = ({ children, fallback, roomHref, rooms }: Props) => (
  <ul className="grid grid-cols-3 auto-rows-fr gap-6 w-full">
    <For each={rooms} fallback={fallback}>
      {({ id, name, cover_photo }) => (
        <li className="size-full">
          <Link
            className="flex flex-col justify-center items-center"
            href={roomHref(id)}
          >
            <Image
              alt={"cover photo"}
              className="rounded"
              height={200}
              src={cover_photo ?? "https://placeholder.photo/img/200"}
              width={200}
            />
            <span>{name}</span>
          </Link>
        </li>
      )}
    </For>
    {children}
  </ul>
);
