import React from "react";
import { Show } from "@/components/controlFlow/Show/Show";
import { $t } from "@/utils/intl";
import { For } from "@/components/controlFlow/For/For";
import { MakeBooking } from "@/app/rooms/[id]/MakeBooking";
import { supabaseServerClient } from "@/api/supabaseServer";
import { ErrorMessage } from "@/components/return/ErrorMessage";
import { ConfirmButton } from "@/components/buttons/ConfirmButton";
import Icon from "@/components/Icon";
import { deleteBookingRequest } from "@/app/rooms/[id]/actions";

type Props = {
  roomId: number;
};

export const MyRequests: React.FC<Props> = async ({ roomId }) => {
  const currentUser = (await supabaseServerClient().auth.getSession()).data
    .session?.user;

  if (!currentUser) return null;

  const { data, error } = await supabaseServerClient()
    .from("booking_request")
    .select("id, start_date, end_date")
    .eq("room_id", roomId)
    .eq("user_id", currentUser.id);

  if (error) {
    console.error(error);
    return <ErrorMessage />;
  }

  const myRequests = data ?? [];

  return (
    <>
      <Show when={myRequests.length}>
        <div>
          <h4>{$t("My requests:")}</h4>
          <ul>
            <For each={myRequests}>
              {({ id, start_date, end_date }) => (
                <li className="gap-1 w-page-small grid grid-cols-4">
                  <span className="col-span-2">
                    {start_date} - {end_date}
                  </span>
                  <span>
                    {$t("status")}: {$t("pending")}
                  </span>
                  <form
                    action={deleteBookingRequest}
                    className="justify-self-end"
                  >
                    <input name="roomId" hidden readOnly value={roomId} />
                    <input name="id" hidden readOnly value={id} />
                    <ConfirmButton
                      key={id}
                      className="px-1 py-0"
                      messages={{
                        prompt: $t("Delete?"),
                      }}
                      type="submit"
                      variant="danger"
                    >
                      <Icon name="delete" size="xl" />
                    </ConfirmButton>
                  </form>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
      <MakeBooking roomId={roomId} />
    </>
  );
};
