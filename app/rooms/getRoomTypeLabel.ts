import { $t } from "@/utils/intl";
import { Enums } from "@/api/schema.types";

export const getRoomTypeLabel = (roomType: Enums<"room_type">) => {
  switch (roomType) {
    case "flat":
      return $t("Flat");
    case "room":
      return $t("Room");
  }
};
