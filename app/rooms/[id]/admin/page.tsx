import { IdRouteParams } from "@/utils/componentTypes";
import { supabaseServerClient } from "@/api/supabaseServer";
import { Show } from "@/components/controlFlow/Show/Show";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { $t } from "@/utils/intl";
import { getRoomTypeLabel } from "@/app/rooms/getRoomTypeLabel";
import { For } from "@/components/controlFlow/For/For";
import { updateRoom } from "@/app/rooms/[id]/admin/actions";
import { Button } from "@/components/Button";

const RoomAdmin = async ({ params: { id } }: IdRouteParams) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  const { data, error } = await supabaseServerClient()
    .from("room")
    .select(
      `id, cover_photo, currency, default_min_stay, default_price, name, location, type, owner_id, 
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
    owner_id,
    type,
  } = room;

  // TODO: replace with route authorization
  const isOwner = owner_id && currentUser && owner_id === currentUser.id;
  if (!isOwner) return null;

  return (
    <form action={updateRoom}>
      <div className="flex flex-col gap-1">
        <input name="id" hidden value={id} />
        <input name="name" defaultValue={name} type="text" />
        <input
          name="cover_photo"
          defaultValue={cover_photo ?? ""}
          type="text"
        />
        <input name="location" defaultValue={location ?? ""} type="text" />

        <input
          id="flat"
          name="type"
          value="flat"
          type="radio"
          defaultChecked={type === "flat"}
        />
        <label htmlFor="flat">{getRoomTypeLabel("flat")}</label>
        <input
          id="room"
          name="type"
          value="room"
          type="radio"
          defaultChecked={type === "room"}
        />
        <label htmlFor="room">{getRoomTypeLabel("room")}</label>

        {/* TODO: add/edit available dates */}
        <div>
          <h4>{$t("Available dates:")}</h4>
          <ul>
            <For
              each={availability}
              fallback={
                <span className="text-gray-500">
                  {$t("No available dates")}
                </span>
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
      <Button type="submit">{$t("Save")}</Button>
    </form>
  );
};

export default RoomAdmin;
