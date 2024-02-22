import React from "react";
import { Modal } from "@/components/modal/modal";
import Signup from "@/components/auth/Signup";

type Props = {};

const Page: React.FC<Props> = ({}) => {
  return (
    <Modal>
      <Signup />
    </Modal>
  );
};

export default Page;
