import { ParentComponentProps } from "@/utils/componentTypes";
import { NavBar } from "@/components/navbar/NavBar";

export default function Layout({ children }: ParentComponentProps) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
