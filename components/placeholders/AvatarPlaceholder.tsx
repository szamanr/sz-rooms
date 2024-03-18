import React from "react";
import Image from "next/image";

type Props = {
  name: string;
};

export const AvatarPlaceholder: React.FC<Props> = ({ name }) => {
  return (
    <Image
      alt="user image"
      className="rounded-full"
      height={150}
      src={`https://ui-avatars.com/api/?name=${name.replaceAll(" ", "+")}&size=200`}
      width={150}
    />
  );
};
