import { Link } from "@/components/navigation/Link";
import Icon from "@/components/Icon";
import { ParentComponentProps } from "@/utils/componentTypes";
import { UserInfo } from "@/components/navbar/UserInfo";

export function NavBar({ children }: ParentComponentProps) {
  return (
    <nav className="h-10 px-2 py-1 sticky top-0 left-0 flex justify-between w-full bg-gray-300 shadow">
      <div className="flex items-center">
        <Link className="hover:text-lime-500 flex" href="/">
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
