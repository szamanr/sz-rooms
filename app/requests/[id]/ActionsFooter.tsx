"use client";
import { Button } from "@/components/buttons/Button";
import Icon from "@/components/Icon";
import { $t } from "@/utils/intl";
import React from "react";
import { Enums } from "@/api/schema.types";
import { supabaseClient } from "@/api/supabaseClient";
import { useRouter } from "next/navigation";
import { twClass } from "@/utils/twClass";

type Props = {
  id: string;
  nextRequest?: number;
  status?: Enums<"booking_request_status">;
};

export const ActionsFooter = ({ id, nextRequest, status }: Props) => {
  const router = useRouter();

  const updateBookingRequestStatus = async (
    status: Enums<"booking_request_status">,
  ) => {
    const { error } = await supabaseClient()
      .from("booking_request")
      .update({
        status,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    if (!!nextRequest) {
      router.push(`/requests/${nextRequest}`);
    } else {
      router.push("/requests/accepted");
      router.refresh();
    }
  };

  const rejected = status === "rejected";
  const accepted = status === "accepted";
  const saved = status === "saved";

  return (
    <footer className="h-14 sticky bottom-0 left-0 w-screen p-3 flex justify-center gap-4 sm:gap-24 bg-gray-300">
      <Button
        className={twClass("rounded-full px-6", "hover:bg-red-600")}
        onClick={updateBookingRequestStatus.bind(
          null,
          rejected ? "pending" : "rejected",
        )}
        variant="danger"
      >
        <Icon name="thumb_down" size="xl" filled={rejected} />
        <span>{$t(rejected ? "rejected" : "nope")}</span>
      </Button>
      <Button
        className={twClass(
          "rounded-full px-6",
          "bg-gray-300 hover:bg-gray-400 border-2 border-gray-400",
        )}
        onClick={updateBookingRequestStatus.bind(
          null,
          saved ? "pending" : "saved",
        )}
        variant="none"
      >
        <Icon name="bookmark" size="xl" filled={saved} />
        <span>{$t(saved ? "saved" : "save")}</span>
      </Button>
      <Button
        className={twClass(
          "rounded-full px-6",
          "bg-lime-500 hover:bg-lime-600",
        )}
        onClick={updateBookingRequestStatus.bind(
          null,
          accepted ? "pending" : "accepted",
        )}
        variant="base"
      >
        <Icon name="thumb_up" size="xl" filled={accepted} />
        <span>{$t(accepted ? "accepted" : "yup")}</span>
      </Button>
    </footer>
  );
};
