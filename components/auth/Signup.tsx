"use client";
import { $t } from "@/utils/intl";
import { supabaseClient } from "@/api/supabaseClient";
import { useState } from "react";
import { Show } from "../controlFlow/Show/Show";
import { useRouter } from "next/navigation";
import invariant from "tiny-invariant";

const Signup = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const id = Math.floor(Math.random() * 100_000);

  const signUp = async (formData: FormData) => {
    "use server";
    // setErrorMessage(undefined);

    const email = formData.get("email");
    const password = formData.get("password");

    invariant(email);
    invariant(password);

    const { data, error } = await supabaseClient().auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      // setErrorMessage(error.message);
      return;
    }

    router.back();
    router.refresh();
  };

  return (
    <div className="w-full h-full">
      <h3>{$t("Sign up")}</h3>
      <form action={signUp}>
        <label htmlFor="email">{$t("Email:")}</label>
        <input id="email" type="email" />

        <label htmlFor="password">{$t("Password:")}</label>
        <input id="password" type="password" />

        <Show when={errorMessage}>
          <div className="text-red-500">{errorMessage}</div>
        </Show>
        <button type="submit">{$t("Submit")}</button>
      </form>
    </div>
  );
};

export default Signup;
