import { $t } from "@/utils/intl";
import invariant from "tiny-invariant";
import { supabaseServerClient } from "@/api/supabaseServer";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const Signup = () => {
  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as Maybe<string>;
    const password = formData.get("password") as Maybe<string>;

    invariant(email);
    invariant(password);

    const { data, error } = await supabaseServerClient().auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return;
    }

    revalidatePath("/", "layout");
    redirect("/");
  };

  return (
    <div className="w-full h-full">
      <h3>{$t("Sign up")}</h3>
      <form action={signUp} className="space-y-2">
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

        <button
          className="bg-amber-500 text-white rounded px-2 py-1 font-semibold hover:bg-amber-600"
          type="submit"
        >
          {$t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default Signup;
