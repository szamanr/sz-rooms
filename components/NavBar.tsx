import Link from "next/link";
import Icon from "@/components/Icon";
import { ParentComponentProps } from "@/utils/componentTypes";

export function NavBar({ children }: ParentComponentProps) {
  return (
    <nav className="p-1 absolute top-0 left-0 flex items-center">
      <Link href="/">
        <Icon name="home" size="2xl" />
      </Link>
      {children}
    </nav>
  );
}
