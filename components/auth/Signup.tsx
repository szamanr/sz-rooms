"use client";
import { $t } from "@/utils/intl";
import { supabaseClient } from "@/api/supabaseClient";
import { useState } from "react";
import { Show } from "../controlFlow/Show/Show";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const id = Math.floor(Math.random() * 100_000);

  const signUp = async (email: string, password: string) => {
    setErrorMessage(undefined);
    const { data, error } = await supabaseClient().auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
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
      <h3>{$t("Sign up")}</h3>
      <div>[TODO add form here]</div>
      <Show when={errorMessage}>
        <div className="text-red-500">{errorMessage}</div>
      </Show>
      <button onClick={() => signUp(`user-${id}@example.org`, "Test1234!")}>
        {$t("Submit")}
      </button>
    </div>
  );
};

export default Signup;
