export type RoomType = "flat" | "room";

// TODO: get from schema
export type Room = {
  cover_photo?: string | null;
  id: number;
  location?: string | null;
  name: string;
  type: RoomType;
};
