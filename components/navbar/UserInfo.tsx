import React from "react";
import { Show } from "@/components/controlFlow/Show/Show";
import { $t } from "@/utils/intl";
import { supabaseServerClient } from "@/api/supabaseServer";
import { LogoutButton } from "@/components/navbar/LogoutButton";
import { Link } from "@/components/navigation/Link";
import Icon from "@/components/Icon";

export const LogInButton: React.FC = () => {
  return (
    <div className="flex divide-x divide-gray-300 *:px-1">
      <Link href="/signup">{$t("Sign up")}</Link>
      <Link href="/login">{$t("Log in")}</Link>
    </div>
  );
};

export const UserInfo: React.FC = async () => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  return (
    <div>
      <Show when={currentUser} fallback={<LogInButton />}>
        <div className="flex items-center space-x-1">
          <Link href="/my-profile">
            <Icon name="person" size="xl" />
            <span>{$t("My profile")}</span>
          </Link>
          <LogoutButton />
        </div>
      </Show>
    </div>
  );
};
