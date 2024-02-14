"use client";
import { $t } from "@/utils/intl";
import { supabaseClient } from "@/api/supabaseClient";
import { useState } from "react";
import { Show } from "../controlFlow/Show/Show";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  const logIn = async (email: string, password: string) => {
    setErrorMessage(undefined);
    const { data, error } = await supabaseClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setErrorMessage(error.message);
      return;
    }

    router.back();
    router.refresh();
  };

  return (
    <div className="w-full h-full">
      <h3>{$t("Log in")}</h3>
      <div>[TODO add form here]</div>
      <Show when={errorMessage}>
        <div className="text-red-500">{errorMessage}</div>
      </Show>
      <button onClick={() => logIn("user001@example.org", "Test1234!")}>
        {$t("Submit")}
      </button>
    </div>
  );
};

export default Login;
