"use client";
import { $t } from "@/utils/intl";
import { useState } from "react";
import { Show } from "../controlFlow/Show/Show";
import Icon from "@/components/Icon";
import { logIn } from "@/app/login/actions";

const Login = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-full">
      <h3>{$t("Log in")}</h3>

      <form action={logIn} className="space-y-2">
        <div className="flex items-center space-x-2 w-full">
          <label htmlFor="email">{$t("Email:")}</label>
          <input
            className="border rounded border-gray-300 p-1 grow shrink"
            id="email"
            name="email"
            type="email"
          />
        </div>

        <div className="flex items-center space-x-2 w-full">
          <label htmlFor="password">{$t("Password:")}</label>
          <input
            className="border rounded border-gray-300 p-1 grow shrink"
            id="password"
            name="password"
            type="password"
          />
        </div>

        {/* TODO: handle error from server */}
        {/*<Show when={errorMessage}>*/}
        {/*  <div className="text-red-500">{errorMessage}</div>*/}
        {/*</Show>*/}

        <button
          className="bg-lime-500 text-white rounded px-2 py-1 font-semibold hover:bg-lime-600 flex items-center gap-2"
          onClick={setLoading.bind(null, true)}
          type="submit"
        >
          <Show when={loading}>
            <Icon className="animate-pulse" name="hourglass" />
          </Show>
          {$t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default Login;
