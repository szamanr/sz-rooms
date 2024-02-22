import Link from "next/link";
import Icon from "@/components/Icon";
import { ParentComponentProps } from "@/utils/componentTypes";
import { UserInfo } from "@/components/navbar/UserInfo";

export function NavBar({ children }: ParentComponentProps) {
  return (
    <nav className="px-2 py-1 absolute top-0 left-0 flex justify-between w-full">
      <div className="flex items-center">
        <Link href="/">
          <Icon name="home" size="2xl" />
        </Link>
        {children}
      </div>
      <div className="flex items-center">
        <UserInfo />
      </div>
    </nav>
  );
}