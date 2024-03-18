import React from "react";
import { Database } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";
import {
  differenceInDays,
  differenceInYears,
  format,
  formatDistanceToNow,
} from "date-fns";
import { $t } from "@/utils/intl";
import { Box } from "@/components/layout/Box";
import Image from "next/image";
import { Show } from "@/components/controlFlow/Show/Show";
import { AvatarPlaceholder } from "@/components/placeholders/AvatarPlaceholder";

type Request = Derive<
  Database["public"]["Tables"]["booking_request"]["Row"],
  {
    user_id: true;
    start_date: true;
    end_date: true;
  }
> & {
  room: Maybe<
    Derive<
      Database["public"]["Tables"]["room"]["Row"],
      {
        name: true;
      }
    >
  >;
};

type User = Derive<
  Database["public"]["Tables"]["user"]["Row"],
  {
    avatar: true;
    birthday: true;
    created_at: true;
    gender: true;
    name: true;
  }
>;

type Props = {
  request: Request;
  user: User;
};

export const BasicInfo: React.FC<Props> = ({ request, user }) => {
  const { end_date, start_date } = request;
  const { avatar, birthday, created_at, gender, name } = user;
  const memberSince = formatDistanceToNow(created_at);
  const age = birthday ? differenceInYears(new Date(), birthday) : undefined;

  return (
    <Box className="flex gap-2 justify-between">
      <div className="h-full flex items-center">
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
      <div>
        <p>{name}</p>
        <p className="text-lime-500 space-x-1">
          <Show when={gender && ["female", "male"].includes(gender)}>
            <span>{gender === "female" ? "♀️" : "♂️"}</span>
          </Show>
          <Show when={age}>
            {(age) => <span>{$t("{age} years", { age })}</span>}
          </Show>
        </p>
        <p>💼 work (self-employed) & study (MSc)</p>
        <p>member since {memberSince}</p>
        <p>been to: madrid, barcelona</p>
      </div>
      <div>
        <p>{request.room?.name}</p>
        <p>
          {$t("{count} days", {
            count: differenceInDays(end_date, start_date),
          })}
        </p>
        <p>
          {format(start_date, "dd MMM yyyy")}
          {" - "}
          {format(end_date, "dd MMM yyyy")}
        </p>
        <p>reason for renting: work & travel</p>
      </div>
    </Box>
  );
};
