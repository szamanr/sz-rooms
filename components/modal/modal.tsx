"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      className="absolute z-10 inset-0 w-screen h-screen flex items-center justify-center bg-gray-900/75 backdrop-blur-sm"
      id="modalBackdrop"
    >
      <div
        className="w-1/3 h-1/3 bg-white rounded p-2 flex flex-col"
        id="modal"
      >
        <div className="w-full flex justify-end">
          <button className="hover:text-lime-500" onClick={router.back}>
            <Icon name="close" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
