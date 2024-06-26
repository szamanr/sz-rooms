"use client";
import { $t } from "@/utils/intl";
import { supabaseClient } from "@/api/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons/Button";

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
    <Button className="font-normal" onClick={logOut} variant="negative">
      {$t("Log out")}
    </Button>
  );
};
