import Link from "next/link";
import { supabaseServerClient } from "@/app/lib/supabase";

const Rooms = async () => {
  const { data, error } = await supabaseServerClient().from("rooms").select();
  const rooms = data ?? [];

  return (
    <div>
      <ul>
        {rooms.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/rooms/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
