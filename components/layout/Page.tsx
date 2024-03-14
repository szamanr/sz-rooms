import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Page: React.FC<Props> = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-between px-4 md:px-8 lg:px-24 py-2">
      {children}
    </main>
  );
};
