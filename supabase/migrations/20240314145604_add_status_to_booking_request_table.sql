create type "public"."booking_request_status" as enum ('pending', 'accepted', 'rejected', 'saved');

alter table "public"."booking_request" add column "status" booking_request_status not null default 'pending'::booking_request_status;


