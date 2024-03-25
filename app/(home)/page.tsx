import { Link } from "@/components/navigation/Link";
import { $t } from "@/utils/intl";
import { Show } from "@/components/controlFlow/Show/Show";
import { supabaseServerClient } from "@/api/supabaseServer";
import Icon from "@/components/Icon";

export default async function Home() {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;
  const isLoggedIn = !!currentUser;

  return (
    <div className="flex space-x-16">
      <div className="flex flex-col">
        <Icon className="text-lime-500 self-center" name="house" size="3xl" />
        <h3>
          <span>{$t("Find a place")}</span>
        </h3>
        <Link href="/rooms">
          <p>{$t("Find rooms")}</p>
        </Link>
      </div>
      <Show when={isLoggedIn}>
        <div className="flex flex-col">
          <Icon
            className="text-lime-500 self-center"
            name="person"
            size="3xl"
          />
          <h3>
            <span>{$t("Find a roommate")}</span>
          </h3>
          <Link href="/my-rooms">
            <p>{$t("Manage my rooms")}</p>
          </Link>
          <Link href="/requests/pending">
            <p>{$t("Booking requests")}</p>
          </Link>
          <Link href="/requests/accepted">
            <p>{$t("My matches")}</p>
          </Link>
          <Link href="/requests/saved">
            <p>{$t("Saved requests")}</p>
          </Link>
        </div>
      </Show>
    </div>
  );
}
