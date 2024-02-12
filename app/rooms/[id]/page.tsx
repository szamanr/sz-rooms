import { IdRouteParams } from "@/utils/componentTypes";
import { supabaseServerClient } from "@/api/supabase";
import { Show } from "@/components/controlFlow/Show/Show";
import Image from "next/image";
import Icon from "@/components/Icon";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { $t } from "@/utils/intl";
import { getRoomTypeLabel } from "@/app/rooms/getRoomTypeLabel";
import { For } from "@/components/controlFlow/For/For";

const Room = async ({ params: { id } }: IdRouteParams) => {
  const { data, error } = await supabaseServerClient()
    .from("room")
    .select(
      `id, cover_photo, currency, default_min_stay, default_price, name, location, type, 
      availability(
        id, start_date, end_date, price, min_stay
      )
      `,
    )
    .eq("id", id)
    .limit(1);

  const room = data?.[0];

  if (error || !room) {
    console.error(error);
    return <ErrorMessage />;
  }

  const {
    availability,
    cover_photo,
    currency,
    default_min_stay,
    default_price,
    location,
    name,
    type,
  } = room;

  const [lat, long] = location?.split(",") ?? [];
  const mapLink = `https://www.openstreetmap.org/#map=18/${lat}/${long}`;

  return (
    <div className="flex flex-col gap-1">
      <h3>{name}</h3>
      <Show when={cover_photo}>
        {(photo) => (
          <Image src={photo} alt={"cover photo"} height={200} width={200} />
        )}
      </Show>
      <Show when={location}>
        <div className="flex gap-1">
          {$t("location")}:
          <a className="flex items-center gap-1" href={mapLink} target="_blank">
            <Icon name="open_in_new" />
            <span>{$t("see on openstreetmap")}</span>
          </a>
        </div>
      </Show>
      <Show when={type}>
        {(roomType) => (
          <div className="flex gap-1">
            {$t("type")}:<span>{getRoomTypeLabel(roomType)}</span>
          </div>
        )}
      </Show>
      <div>
        <h4>{$t("Available dates:")}</h4>
        <ul>
          <For
            each={availability}
            fallback={
              <span className="text-gray-500">{$t("No available dates")}</span>
            }
          >
            {({ start_date, end_date, price, min_stay }) => (
              <li className="flex gap-1 w-page-small grid grid-cols-4">
                <span className="col-span-2">
                  {start_date} - {end_date}
                </span>
                <span>
                  {price ?? default_price} {currency}
                </span>
                <Show when={min_stay || default_min_stay || null}>
                  {(minDays) => (
                    <span>
                      {$t("{number} days minimum", { number: minDays })}
                    </span>
                  )}
                </Show>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default Room;
