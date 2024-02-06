import Link from "next/link";

const getRooms = () => [
  {
    id: "00001",
    name: "double room in badalona",
  },
  {
    id: "00002",
    name: "flat in the heart of wien",
  },
];

export default function Rooms() {
  const rooms = getRooms();

  return (
    <div>
      <ul>
        {rooms.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/rooms/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
