import React from "react";
import Image from "next/image";
import { supabaseServerClient } from "@/api/supabaseServer";
import { Input } from "@/components/form/Input";
import { $t } from "@/utils/intl";
import { Button } from "@/components/buttons/Button";
import { Show } from "@/components/controlFlow/Show/Show";
import { AvatarPlaceholder } from "@/components/placeholders/AvatarPlaceholder";
import { updateUser } from "@/app/my-profile/actions";
import { getUserData } from "@/utils/getUserData";
import { format } from "date-fns";

const MyProfile: React.FC = async () => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  if (!currentUser) return null;

  const user = await getUserData(currentUser.id);
  if (!user) return null;

  const { about, birthday, avatar, gender, name } = user;

  return (
    <div className="flex space-x-8">
      <div>
        <Show
          when={avatar}
          fallback={<AvatarPlaceholder name={name ?? "XY"} />}
        >
          {(userPhoto) => (
            <Image
              alt="user image"
              className="rounded-full"
              height={150}
              src={userPhoto}
              width={150}
            />
          )}
        </Show>
      </div>
      <div className="flex flex-col gap-4 min-w-[30vw]">
        <form action={updateUser} className="flex flex-col gap-2">
          <input name="id" hidden readOnly value={user.id} />
          <Input
            defaultValue={name ?? ""}
            label={$t("Name")}
            name="name"
            type="text"
          />
          <Input
            defaultValue={avatar ?? ""}
            label={$t("Link to avatar")}
            name="avatar"
            type="text"
          />

          <div>
            <span>{$t("Gender")}</span>
            <div className="flex items-center gap-2">
              <input
                defaultChecked={gender === "female"}
                id="female"
                name="gender"
                type="radio"
                value="female"
              />
              <label htmlFor="female">{$t("Female")}</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                defaultChecked={gender === "male"}
                id="male"
                name="gender"
                type="radio"
                value="male"
              />
              <label htmlFor="male">{$t("Male")}</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                defaultChecked={gender === "other"}
                id="other"
                name="gender"
                type="radio"
                value="other"
              />
              <label htmlFor="other">{$t("Other")}</label>
            </div>
          </div>

          <Input
            defaultValue={birthday ?? ""}
            label={$t("Birthday")}
            name="birthday"
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder={format(new Date(), "yyyy-MM-dd")}
            type="text"
          />

          <Input
            defaultValue={about ?? ""}
            label={$t("About")}
            name="about"
            type="text"
          />

          <div className="flex mt-2">
            <Button type="submit">{$t("Save")}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
