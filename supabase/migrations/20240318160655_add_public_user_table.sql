create type "public"."gender" as enum ('male', 'female', 'other');

create table "public"."user" (
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid(),
    "name" text,
    "avatar" text,
    "birthday" date,
    "about" text,
    "gender" gender
);


alter table "public"."user" enable row level security;

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."user" add constraint "public_user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user" validate constraint "public_user_id_fkey";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";

create policy "anyone can view users."
on "public"."user"
as permissive
for select
to public
using (true);


create policy "users can insert own data"
on "public"."user"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "users can update own data"
on "public"."user"
as permissive
for update
to public
using ((auth.uid() = id));



