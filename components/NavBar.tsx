import Link from "next/link";
import Icon from "@/components/Icon";
import { ParentComponentProps } from "@/utils/componentTypes";

export function NavBar({ children }: ParentComponentProps) {
  return (
    <nav className="p-1 absolute top-0 left-0">
      <Link href="/">
        <Icon name="home" />
      </Link>
      {children}
    </nav>
  );
}
