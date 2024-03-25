alter table "public"."booking_request" drop constraint "public_booking_request_user_id_fkey";

alter table "public"."booking_request" add constraint "public_booking_request_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booking_request" validate constraint "public_booking_request_user_id_fkey";


