import { $t } from "@/utils/intl";
import { RoomType } from "@/app/rooms/types";

export const getRoomTypeLabel = (roomType: RoomType) => {
  switch (roomType) {
    case "flat":
      return $t("Flat");
    case "room":
      return $t("Room");
  }
};
