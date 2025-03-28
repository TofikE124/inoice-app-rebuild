"use client";
import Image from "next/image";
import { useState } from "react";
import PlusIcon from "../../public/assets/icon-plus.svg";
import Button from "../components/Button";
import InvoiceForm from "../components/InvoiceForm";

interface NewInvoiceButtonProps {
  disabled?: boolean;
}

const NewInvoiceButton = ({ disabled }: NewInvoiceButtonProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        disabled={disabled}
        color="deepPurple"
        className="pl-[6px] pr-4 py-[6px]"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div className="size-[32px] bg-white grid place-items-center rounded-full">
            <Image src={PlusIcon} width={10} height={10} alt="Plus Icon" />
          </div>
          <span className="hidden md:block">New Invoice</span>
          <span className="md:hidden">New</span>
        </div>
      </Button>
      <InvoiceForm isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};

export default NewInvoiceButton;
