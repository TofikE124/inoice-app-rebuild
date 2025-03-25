import React from "react";
import Button from "./components/Button";
import Image from "next/image";
import PlusIcon from "../public/assets/icon-plus.svg";

interface NewInvoiceButtonProps {
  disabled?: boolean;
}

const NewInvoiceButton = ({ disabled }: NewInvoiceButtonProps) => {
  return (
    <Button disabled={disabled} color="deepPurple" className="pl-2 pr-4">
      <div className="flex items-center gap-4">
        <div className="size-[32px] bg-white grid place-items-center rounded-full">
          <Image src={PlusIcon} width={10} height={10} alt="Plus Icon" />
        </div>
        <span className="hidden md:block">New Invoice</span>
        <span className="md:hidden">New</span>
      </div>
    </Button>
  );
};

export default NewInvoiceButton;
