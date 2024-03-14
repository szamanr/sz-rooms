import { ParentComponentProps } from "@/utils/componentTypes";
import { NavBar } from "@/components/navbar/NavBar";
import { BackLink } from "@/components/navigation/BackLink";
import { Page } from "@/components/layout/Page";

export default function Layout({ children }: ParentComponentProps) {
  return (
    <div>
      <NavBar>
        <BackLink size="2xl" />
      </NavBar>
      <Page>{children}</Page>
    </div>
  );
}
