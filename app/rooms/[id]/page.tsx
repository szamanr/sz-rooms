import { IdRouteParams } from "@/utils/componentTypes";
import { supabaseServerClient } from "@/app/lib/supabase";
import { Show } from "@/components/controlFlow/Show/Show";
import Image from "next/image";
import Icon from "@/components/Icon";
import { Room as RoomType } from "@/app/rooms/types";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { $t } from "@/utils/intl";

const Room = async ({ params: { id } }: IdRouteParams) => {
  const { data, error } = await supabaseServerClient()
    .from("room")
    .select("id, cover_photo, name, location")
    .eq("id", id)
    .limit(1);

  const room = data?.[0];

  if (error || !room) {
    console.error(error);
    return <ErrorMessage />;
  }

  const { cover_photo, location, name } = room as RoomType;

  const [lat, long] = location?.split(",") ?? [];
  const mapLink = `https://www.openstreetmap.org/#map=18/${lat}/${long}`;

  return (
    <div>
      <h3>{name}</h3>
      <Show when={cover_photo}>
        {(photo) => (
          <Image src={photo} alt={"cover photo"} height={200} width={200} />
        )}
      </Show>
      <Show when={location}>
        <a className="flex items-center gap-1" href={mapLink} target="_blank">
          <Icon name="open_in_new" />
          <span>{$t("see on openstreetmap")}</span>
        </a>
      </Show>
    </div>
  );
};

export default Room;
