import { supabaseServerClient } from "@/api/supabaseServer";
import { $t } from "@/utils/intl";
import { getRoomTypeLabel } from "@/app/rooms/getRoomTypeLabel";
import { insertRoom } from "@/app/rooms/[id]/admin/actions";
import { Button } from "@/components/Button";
import { Input } from "@/components/form/Input";
import { redirect } from "next/navigation";

const RoomAdd = async () => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  if (!currentUser) redirect("/my-rooms");

  return (
    <form action={insertRoom} className="flex flex-col gap-2">
      <input name="ownerId" hidden readOnly value={currentUser.id} />

      <div className="flex flex-col">
        <label htmlFor="name">{$t("Name")}</label>
        <Input id="name" name="name" type="text" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="coverPhoto">{$t("Link to cover photo")}</label>
        <Input id="coverPhoto" name="coverPhoto" type="text" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="location">{$t("Location")}</label>
        <Input id="location" name="location" type="text" />
      </div>

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

      <div className="flex flex-col">
        <label htmlFor="defaultPrice">{$t("Default price")}</label>
        <Input id="defaultPrice" name="defaultPrice" type="number" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="defaultMinStay">
          {$t("Default minimum stay (days)")}
        </label>
        <Input id="defaultMinStay" name="defaultMinStay" type="number" />
      </div>

      <Button type="submit">{$t("Save")}</Button>
    </form>
  );
};

export default RoomAdd;
