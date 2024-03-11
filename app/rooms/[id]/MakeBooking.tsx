"use client";
import React, { Fragment } from "react";
import { Button } from "@/components/buttons/Button";
import { $t } from "@/utils/intl";
import { Disclosure } from "@headlessui/react";
import { sendBookingRequest } from "@/app/rooms/[id]/actions";
import { Input } from "@/components/form/Input";
import { twClass } from "@/utils/twClass";

type Props = {
  className?: string;
  roomId: number;
};

export const MakeBooking: React.FC<Props> = ({ className, roomId }) => {
  return (
    <Disclosure as="div" className={twClass("flex flex-col gap-2", className)}>
      <Disclosure.Button as={Fragment}>
        <Button>{$t("Request to book")}</Button>
      </Disclosure.Button>
      <Disclosure.Panel>
        <form action={sendBookingRequest} className="flex items-center gap-1">
          <input name="roomId" hidden readOnly value={roomId} />
          <Input placeholder={$t("Start date")} name="startDate" />
          <Input placeholder={$t("End date")} name="endDate" />
          <Button type="submit">{$t("Send")}</Button>
        </form>
      </Disclosure.Panel>
    </Disclosure>
  );
};
