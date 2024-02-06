import {IdRouteParams} from "@/utils/componentTypes";

export default function Room({ params: { id } }: IdRouteParams) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      i am a a room with id {id}
    </main>
  )
}