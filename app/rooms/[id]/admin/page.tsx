import { IdRouteParams } from "@/utils/componentTypes";
import { supabaseServerClient } from "@/api/supabaseServer";
import { Show } from "@/components/controlFlow/Show/Show";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { $t } from "@/utils/intl";
import { getRoomTypeLabel } from "@/app/rooms/getRoomTypeLabel";
import { For } from "@/components/controlFlow/For/For";
import {
  addAvailability,
  deleteAvailability,
  deleteRoom,
  updateRoom,
} from "@/app/rooms/[id]/admin/actions";
import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/form/Input";
import { redirect } from "next/navigation";
import { ConfirmButton } from "@/components/buttons/ConfirmButton";
import Icon from "@/components/Icon";

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
    <div className="flex flex-col gap-4 min-w-[30vw]">
      <form action={updateRoom} className="flex flex-col gap-2">
        <input name="id" hidden readOnly value={id} />
        <Input defaultValue={name} label={$t("Name")} name="name" type="text" />
        <Input
          defaultValue={cover_photo ?? ""}
          label={$t("Link to cover photo")}
          name="cover_photo"
          type="text"
        />
        <Input
          defaultValue={location ?? ""}
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
          label={$t("Default price")}
          name="defaultPrice"
          type="number"
        />

        <Input
          defaultValue={default_min_stay}
          label={$t("Default minimum stay (days)")}
          name="defaultMinStay"
          type="number"
        />
      </form>

      <div>
        <h4>{$t("Available dates:")}</h4>
        <ul className="flex flex-col gap-2">
          <For
            each={availability}
            fallback={
              <li className="text-gray-500">{$t("No available dates")}</li>
            }
          >
            {({ id, start_date, end_date, price, min_stay }) => (
              <li className="gap-1 w-page-small grid grid-cols-5">
                <span className="col-span-2">
                  {start_date} - {end_date}
                </span>
                <span>
                  {price ?? default_price} {currency}
                </span>
                <Show
                  when={min_stay ?? default_min_stay ?? null}
                  fallback={<span />}
                >
                  {(minDays) => (
                    <span>
                      {$t("{number} days minimum", { number: minDays })}
                    </span>
                  )}
                </Show>
                <form action={deleteAvailability} className="justify-self-end">
                  <input name="id" hidden readOnly value={id} />
                  <ConfirmButton
                    key={id}
                    className="px-1 py-0"
                    messages={{
                      prompt: $t("Delete?"),
                    }}
                    type="submit"
                    variant="danger"
                  >
                    <Icon name="delete" size="xl" />
                  </ConfirmButton>
                </form>
              </li>
            )}
          </For>
          <form action={addAvailability}>
            <li className="flex gap-2">
              <input name="roomId" hidden readOnly value={room.id} />
              <Input placeholder={$t("Start date")} name="startDate" />
              <Input placeholder={$t("End date")} name="endDate" />
              <Button type="submit">{$t("Add")}</Button>
            </li>
          </form>
        </ul>
      </div>
      <div className="flex gap-2 mt-2">
        <Button type="submit">{$t("Save")}</Button>
        <ConfirmButton formAction={deleteRoom} variant="danger">
          {$t("Delete")}
        </ConfirmButton>
      </div>
    </div>
  );
};

export default RoomAdmin;
