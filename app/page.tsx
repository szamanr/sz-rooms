import Link from "next/link";
import { $t } from "@/utils/intl";

export default function Home() {
  return (
    <div>
      <Link href="/rooms">{$t("rooms")}</Link>
    </div>
  );
}
