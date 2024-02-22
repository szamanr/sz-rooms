"use client";
import { $t } from "@/utils/intl";
import { supabaseClient } from "@/api/supabaseClient";
import { useRouter } from "next/navigation";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const logOut = async () => {
    const { error } = await supabaseClient().auth.signOut();
    if (error) {
      console.error(error);
      return;
    }

    router.refresh();
  };

  return (
    <button className="" onClick={logOut}>
      {$t("Log out")}
    </button>
  );
};
