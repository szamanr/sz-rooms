import React from "react";
import { Show } from "@/components/controlFlow/Show/Show";
import { $t } from "@/utils/intl";
import { supabaseServerClient } from "@/api/supabaseServer";
import { LogoutButton } from "@/components/navbar/LogoutButton";
import { Link } from "@/components/navigation/Link";

export const LogInButton: React.FC = () => {
  return (
    <div className="divide-x divide-gray-300 *:px-1">
      <Link href="/signup">{$t("Sign up")}</Link>
      <Link href="/login">{$t("Log in")}</Link>
    </div>
  );
};

export const UserInfo: React.FC = async () => {
  const user = (await supabaseServerClient().auth.getSession()).data.session
    ?.user;

  return (
    <div>
      <Show when={user} fallback={<LogInButton />}>
        {(user) => (
          <div className="flex items-center space-x-1">
            <Link href="/my-profile">
              <span>
                {$t("user")}: {user.email}
              </span>
            </Link>
            <LogoutButton />
          </div>
        )}
      </Show>
    </div>
  );
};
