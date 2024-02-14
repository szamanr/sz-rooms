import React from "react";
import { Show } from "@/components/controlFlow/Show/Show";
import { $t } from "@/utils/intl";
import Link from "next/link";
import { supabaseServerClient } from "@/api/supabaseServer";
import { LogoutButton } from "@/components/navbar/LogoutButton";

export const LogInButton: React.FC = () => {
  return (
    <Link className="" href="/login">
      {$t("Log in")}
    </Link>
  );
};

export const UserInfo: React.FC = async () => {
  const user = (await supabaseServerClient().auth.getSession()).data.session
    ?.user;

  return (
    <div>
      <Show when={user} fallback={<LogInButton />}>
        {(user) => (
          <div className="space-x-1">
            <span>
              {$t("user")}: {user.email}
            </span>
            <LogoutButton />
          </div>
        )}
      </Show>
    </div>
  );
};
