import React from "react";
import Login from "@/components/auth/Login";
import { Modal } from "@/components/modal/modal";

type Props = {};

const Page: React.FC<Props> = ({}) => {
  return (
    <Modal>
      <Login />
    </Modal>
  );
};

export default Page;
