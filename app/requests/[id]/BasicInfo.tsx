import React from "react";
import { Database } from "@/api/schema.types";
import { Derive } from "@shoooe/derive";
import { differenceInDays, format } from "date-fns";
import { $t } from "@/utils/intl";
import { Box } from "@/components/layout/Box";

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

type Props = {
  request: Request;
};

export const BasicInfo: React.FC<Props> = ({ request }) => {
  const { end_date, start_date } = request;

  return (
    <Box className="flex gap-2 justify-between">
      <span className="h-full flex items-center">[image]</span>
      <div>
        <p>{request.user_id}</p>
        <p className="text-lime-500">♂️ 27 years</p>
        <p>💼 work (self-employed) & study (MSc)</p>
        <p>member since 3 months</p>
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
