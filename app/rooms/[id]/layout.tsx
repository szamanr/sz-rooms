import { ParentComponentProps } from "@/utils/componentTypes";
import Link from "next/link";
import Icon from "@/components/Icon";
import { NavBar } from "@/components/navbar/NavBar";

export default function Layout({ children }: ParentComponentProps) {
  return (
    <div>
      <NavBar>
        <Link href="/rooms">
          <Icon name="chevron_left" size="2xl" />
        </Link>
      </NavBar>
      {children}
    </div>
  );
}
