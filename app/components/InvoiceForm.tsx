"use client";
import { PaymentTerms } from "@prisma/client";
import Image from "next/image";
import LeftArrowIcon from "../../public/assets/icon-arrow-left.svg";
import DeleteIcon from "../../public/assets/icon-delete.svg";
import Button from "./Button";
import DatePicker from "./DatePicker";
import { Dropdown } from "./Dropdown";
import TextField from "./TextField";

type InvoiceFormProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const InvoiceForm = ({
  isOpen = false,
  onClose = () => {},
}: InvoiceFormProps) => {
  return (
    <>
      <div
        className={`${
          isOpen
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        } fixed transition-all duration-500 top-0 bottom-0 left-0 md:w-[80%] max-md:pt-[72px] max-md:right-0 max-lg:pt-[80px] lg:pl-[103px] bg-white dark:bg-deep-space rounded-r-[20px] z-20`}
      >
        <div className="px-6 overflow-y-scroll max-md:h-[60vh] md:h-[80vh] lg:h-screen pt-[33px] max-md:pb-[20vh] md:pt-[60px] lg:px-[56px]">
          <button
            onClick={onClose}
            className="text-rich-black dark:text-white heading-s-variant flex items-center gap-6 md:hidden"
          >
            <Image src={LeftArrowIcon} alt="Left Arrow Icon" />
            Go Back
          </button>

          <h1 className="max-md:mt-[26px] heading-m text-rich-black dark:text-white">
            New Invoice
          </h1>
          <div className="grid grid-cols-2 gap-6 mt-[22px]">
            <InvoiceFormBillFrom />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-10">
            <InvoiceFormBillTo />
          </div>
          <div className="mt-10 flex flex-col gap-6">
            <DatePicker label="Invoice Date" />
            <InvoicePaymentTerms />
          </div>
          <div className="mt-6">
            <TextField label="Project Description" />
          </div>
          <div className="mt-[70px]">
            <InvoiceFormItemList />
          </div>
          <InvoiceFormFooter onClose={onClose} />
        </div>
      </div>
      <InvoiceFormBlackOverlay onClose={onClose} isOpen={isOpen} />
    </>
  );
};

const InvoiceFormBlackOverlay = ({ onClose, isOpen }: InvoiceFormProps) => {
  return (
    <div
      className={`fixed ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-all duration-500 z-10 inset-0 bg-black/50`}
      onClick={onClose}
    ></div>
  );
};

const InvoiceFormBillFrom = () => {
  return (
    <>
      <h3 className="heading-s text-deep-purple col-span-2">Bill From</h3>
      <TextField label="Street Address" className="col-span-2" />
      <TextField label="City" />
      <TextField label="Post Code" />
      <TextField label="Country" className="col-span-2" />
    </>
  );
};

const InvoiceFormBillTo = () => {
  return (
    <>
      <h3 className="heading-s text-deep-purple col-span-2">Bill To</h3>
      <TextField label="Client's Name" className="col-span-2" />
      <TextField label="Client's Email" className="col-span-2" />
      <TextField label="Street Address" className="col-span-2" />
      <TextField label="City" />
      <TextField label="Post Code" />
      <TextField label="Country" className="col-span-2" />
    </>
  );
};

const InvoicePaymentTerms = () => {
  const paymentTermsMap: Record<PaymentTerms, { label: string }> = {
    NET_1_DAY: { label: "Net 1 Day" },
    NET_7_DAYS: { label: "Net 7 Days" },
    NET_14_DAYS: { label: "Net 14 Days" },
    NET_30_DAYS: { label: "Net 30 Days" },
  };

  return (
    <Dropdown.Root>
      <Dropdown.Label>Payment Terms</Dropdown.Label>
      <Dropdown.Trigger placeholder="Choose Payment Terms" />
      <Dropdown.Content>
        <Dropdown.Item value={null}>Choose Payment Terms</Dropdown.Item>
        {Object.values(PaymentTerms).map((v) => (
          <Dropdown.Item key={v} value={v}>
            {paymentTermsMap[v].label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

const InvoiceFormItemList = () => {
  return (
    <>
      <h2 className="text-[18px] tracking-[-0.375px] font-bold text-[#777F98]">
        Item List
      </h2>
      <h3 className="heading-s-variant text-center py-4 tracking-[-0.375px] font-bold text-cool-gray">
        No Items Have Been Added Yet
      </h3>
      <div className="space-y-[50px] mt-[22px]">
        <Button color="primary" className="w-full">
          + Add New Item
        </Button>
      </div>
    </>
  );
};

type InvoiceFormFooterProps = {
  onClose?: () => void;
};

const InvoiceFormFooter = ({ onClose }: InvoiceFormFooterProps) => {
  return (
    <div className="max-md:fixed left-0 right-0 bottom-0 z-20">
      <div className="relative bg-white dark:bg-slate-navy md:bg-transparent dark:md:bg-transparent flex items-center gap-2 max-md:px-6 max-md:py-6 md:mt-[55px] md:mb-8">
        <Button color="primary" className="mr-auto" onClick={onClose}>
          Discard
        </Button>
        <Button color="secondary">Save as Draft</Button>
        <Button color="deepPurple">Save & Send</Button>
        <div className="md:hidden absolute left-0 right-0 transition-all duration-200 pointer-events-none bottom-full bg-gradient-to-b from-transparent to-black/10 h-[64px]"></div>
      </div>
    </div>
  );
};

const Item = () => {
  return (
    <div className="grid grid-cols-[auto_auto_auto_1fr] gap-y-6 gap-x-4">
      <TextField label="Item Name" containerClassname="col-span-4" />
      <TextField label="Qty." className="max-w-[64px]" />
      <TextField label="Price" className="max-w-[100px]" />
      <div className="flex flex-col">
        <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
          Total
        </p>
        <h3 className="heading-s-variant text-cool-gray my-auto">156.0</h3>
      </div>
      <button className="h-fit justify-self-end self-end mb-4">
        <Image src={DeleteIcon} alt="Delete Icon" />
      </button>
    </div>
  );
};

export default InvoiceForm;
