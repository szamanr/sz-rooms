"use client";
import React from "react";
import { Show } from "@/components/controlFlow/Show/Show";
import { $t } from "@/utils/intl";
import Link from "next/link";

export const LogInButton: React.FC = () => {
  return (
    <Link className="" href="/login">
      {$t("Log in")}
    </Link>
  );
};

export const UserInfo: React.FC = () => {
  const user = undefined;
  const loggedIn = !!user;

  // TODO
  const logOut = () => {};

  return (
    <div>
      <Show when={loggedIn} fallback={<LogInButton />}>
        <span>i am user</span>
        <button className="" onClick={logOut}>
          {$t("Log out")}
        </button>
      </Show>
    </div>
  );
};
