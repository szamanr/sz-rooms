import Link from "next/link";
import { $t } from "@/utils/intl";
import { Show } from "@/components/controlFlow/Show/Show";
import { supabaseServerClient } from "@/api/supabaseServer";

export default async function Home() {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  const isLoggedIn = !!currentUser;

  return (
    <div>
      <Link href="/rooms">
        <p>{$t("Find rooms")}</p>
      </Link>
      <Show when={isLoggedIn}>
        <Link href="/my-rooms">
          <p>{$t("Manage my rooms")}</p>
        </Link>
      </Show>
    </div>
  );
}
