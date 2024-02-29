import { IdRouteParams } from "@/utils/componentTypes";
import { supabaseServerClient } from "@/api/supabaseServer";
import { Show } from "@/components/controlFlow/Show/Show";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { $t } from "@/utils/intl";
import { getRoomTypeLabel } from "@/app/rooms/getRoomTypeLabel";
import { For } from "@/components/controlFlow/For/For";
import { updateRoom } from "@/app/rooms/[id]/admin/actions";
import { Button } from "@/components/Button";
import { Input } from "@/components/form/Input";
import { redirect } from "next/navigation";

const RoomAdmin = async ({ params: { id } }: IdRouteParams) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  if (!currentUser) redirect(`/rooms/${id}`);

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
  if (!isOwner) redirect(`/rooms/${id}`);

  return (
    <form action={updateRoom} className="flex flex-col gap-2">
      <input name="id" hidden readOnly value={id} />
      <Input
        defaultValue={name}
        id="name"
        label={$t("Name")}
        name="name"
        type="text"
      />
      <Input
        defaultValue={cover_photo ?? ""}
        id="cover_photo"
        label={$t("Link to cover photo")}
        name="cover_photo"
        type="text"
      />
      <Input
        defaultValue={location ?? ""}
        id="location"
        label={$t("Location")}
        name="location"
        type="text"
      />

      <div>
        <span>{$t("Room type")}</span>
        <div className="flex items-center gap-2">
          <input
            defaultChecked={type === "flat"}
            id="flat"
            name="type"
            type="radio"
            value="flat"
          />
          <label htmlFor="flat">{getRoomTypeLabel("flat")}</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            defaultChecked={type === "room"}
            id="room"
            name="type"
            type="radio"
            value="room"
          />
          <label htmlFor="room">{getRoomTypeLabel("room")}</label>
        </div>
      </div>

      <div>
        <span>{$t("Currency")}</span>
        <div className="flex items-center gap-2">
          <input
            defaultChecked={currency === "EUR"}
            id="EUR"
            name="currency"
            type="radio"
            value="EUR"
          />
          <label htmlFor="EUR">{$t("€ Euro")}</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            defaultChecked={currency === "USD"}
            id="USD"
            name="currency"
            type="radio"
            value="USD"
          />
          <label htmlFor="USD">{$t("$ US Dollar")}</label>
        </div>
      </div>

      <Input
        defaultValue={default_price ?? ""}
        id="defaultPrice"
        label={$t("Default price")}
        name="defaultPrice"
        type="number"
      />

      <Input
        defaultValue={default_min_stay}
        id="defaultMinStay"
        label={$t("Default minimum stay (days)")}
        name="defaultMinStay"
        type="number"
      />

      {/* TODO: add/edit available dates */}
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
      <Button type="submit">{$t("Save")}</Button>
    </form>
  );
};

export default RoomAdmin;
