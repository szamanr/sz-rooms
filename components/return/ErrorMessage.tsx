import { $t } from "@/utils/intl";

export const ErrorMessage = () => (
  <div className="text-red-500">
    {$t("Something went wrong, please try again.")}
  </div>
);
