import React from "react";
import { Dropdown } from "./components/Dropdown";
import DropdownTrigger from "./components/Dropdown/DropdownTrigger";
import Button from "./components/Button";
import PlusIcon from "../public/assets/icon-plus.svg";
import Image from "next/image";

const Invoices = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-[55px] lg:gap-16">
      <Header />
      <IvoicesContent />
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-[6px]">
        <h1 className="heading-l text-rich-black dark:text-white">Invoices</h1>
        <p className="body-variant tracking-[-0.1px] text-cool-gray dark:text-pale-lavender">
          There are 7 total invoices
        </p>
      </div>
      <div className="flex items-center gap-4 md:gap-10">
        <Dropdown.Root size="sm">
          <DropdownTrigger
            className="hidden md:block"
            placeholder="Filter by status"
          />
          <DropdownTrigger className="md:hidden" placeholder="Filter" />
          <Dropdown.Content>
            <Dropdown.Item value="1">1</Dropdown.Item>
            <Dropdown.Item value="2">2</Dropdown.Item>
            <Dropdown.Item value="3">3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
        <Button color="deepPurple" className="pl-2 pr-4">
          <div className="flex items-center gap-4">
            <div className="size-[32px] bg-white grid place-items-center rounded-full">
              <Image src={PlusIcon} width={10} height={10} alt="Plus Icon" />
            </div>
            <span className="hidden md:block">New Invoice</span>
            <span className="md:hidden">New</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

const IvoicesContent = () => {
  return <div></div>;
};

export default Invoices;
