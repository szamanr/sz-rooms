import { ParentComponentProps } from "@/utils/componentTypes";
import { NavBar } from "@/components/navbar/NavBar";
import { Page } from "@/components/layout/Page";

export default function Layout({ children }: ParentComponentProps) {
  return (
    <div>
      <NavBar />
      <Page>{children}</Page>
    </div>
  );
}
