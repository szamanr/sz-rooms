import { Link } from "@/components/navigation/Link";
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
        <Link href="/requests">
          <p>{$t("Booking requests")}</p>
        </Link>
        <Link href="/requests/matches">
          <p>{$t("My matches")}</p>
        </Link>
        <Link href="/requests/saved">
          <p>{$t("Saved requests")}</p>
        </Link>
      </Show>
    </div>
  );
}
