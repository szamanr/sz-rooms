import { supabaseServerClient } from "@/api/supabaseServer";
import { $t } from "@/utils/intl";
import { getRoomTypeLabel } from "@/app/rooms/getRoomTypeLabel";
import { insertRoom } from "@/app/rooms/[id]/admin/actions";
import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/form/Input";
import { redirect } from "next/navigation";

const RoomAdd = async () => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  if (!currentUser) redirect("/my-rooms");

  return (
    <form action={insertRoom} className="flex flex-col gap-2">
      <input name="ownerId" hidden readOnly value={currentUser.id} />

      <Input id="name" name="name" type="text" label={$t("Name")} />
      <Input
        id="coverPhoto"
        label={$t("Link to cover photo")}
        name="coverPhoto"
        type="text"
      />
      <Input id="location" name="location" type="text" label={$t("Location")} />

      <div>
        <span>{$t("Room type")}</span>
        <div className="flex items-center gap-2">
          <input
            id="flat"
            name="type"
            value="flat"
            type="radio"
            defaultChecked
          />
          <label htmlFor="flat">{getRoomTypeLabel("flat")}</label>
        </div>

        <div className="flex items-center gap-2">
          <input id="room" name="type" value="room" type="radio" />
          <label htmlFor="room">{getRoomTypeLabel("room")}</label>
        </div>
      </div>

      <div>
        <span>{$t("Currency")}</span>
        <div className="flex items-center gap-2">
          <input
            id="EUR"
            name="currency"
            value="EUR"
            type="radio"
            defaultChecked
          />
          <label htmlFor="EUR">{$t("€ Euro")}</label>
        </div>

        <div className="flex items-center gap-2">
          <input id="USD" name="currency" value="USD" type="radio" />
          <label htmlFor="USD">{$t("$ US Dollar")}</label>
        </div>
      </div>

      <Input
        id="defaultPrice"
        label={$t("Default price")}
        name="defaultPrice"
        type="number"
      />

      <Input
        id="defaultMinStay"
        label={$t("Default minimum stay (days)")}
        name="defaultMinStay"
        type="number"
      />

      <Button type="submit">{$t("Save")}</Button>
    </form>
  );
};

export default RoomAdd;
