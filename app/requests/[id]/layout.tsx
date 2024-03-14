import { ParentComponentProps } from "@/utils/componentTypes";
import { NavBar } from "@/components/navbar/NavBar";
import { BackLink } from "@/components/navigation/BackLink";

export default function Layout({ children }: ParentComponentProps) {
  return (
    <div className="flex flex-col h-svh">
      <NavBar>
        <BackLink size="2xl" />
      </NavBar>
      {children}
    </div>
  );
}
