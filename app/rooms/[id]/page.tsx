import { IdRouteParams } from "@/utils/componentTypes";

export default function Room({ params: { id } }: IdRouteParams) {
  return <div>i am a a room with id {id}</div>;
}
