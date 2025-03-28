"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InvoiceSummary from "../components/InvoiceSummary";
import FilterByStatus from "./FilterByStatus";
import NewInvoiceButton from "./NewInvoiceButton";
import { FullInvoice } from "../types/invoice";
import InvoicesLoading from "./InvoicesLoading";
import { useSearchParams } from "next/navigation";
import { getFilterByStatus } from "../helper/getFilterByStatus";

import IllustrationeEmpty from "../../public/assets/illustration-empty.svg";
import Image from "next/image";
import { Status } from "@prisma/client";
import { statusMap } from "../helper/statusMap";

const Invoices = () => {
  const urlSearchParams = useSearchParams();
  const filterByStatus = getFilterByStatus(
    urlSearchParams.get("filterByStatus")
  );

  const {
    data: invoices,
    error,
    isLoading,
  } = useQuery<FullInvoice[]>({
    queryKey: ["invoices"],
    queryFn: () => axios.get("/api/invoice").then((res) => res.data),
  });

  const filteredInvoices = filterByStatus
    ? invoices?.filter((invoice) => invoice.status == filterByStatus)
    : invoices;

  if (error) return null;

  return (
    <div className="flex flex-col gap-8 md:gap-[55px] lg:gap-16">
      {filteredInvoices ? (
        <>
          <Header invoices={filteredInvoices} filterByStatus={filterByStatus} />
          <IvoicesContent invoices={filteredInvoices} />
        </>
      ) : isLoading ? (
        <InvoicesLoading />
      ) : null}
    </div>
  );
};

type HeaderProps = {
  invoices: FullInvoice[];
  filterByStatus: Status | null;
};

const Header = ({ invoices, filterByStatus }: HeaderProps) => {
  let message = "";
  const filterLabel = filterByStatus ? statusMap[filterByStatus].label : "";

  switch (invoices.length) {
    case 0:
      message = `No ${filterLabel} Invoices`;
      break;
    case 1:
      message = `There is 1 ${filterLabel} invoice`;
      break;
    default:
      message = `There is ${invoices.length} ${filterLabel} invoices`;
      break;
  }

  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-[6px]">
        <h1 className="heading-l text-rich-black dark:text-white">Invoices</h1>
        <p className="body-variant tracking-[-0.1px] text-cool-gray dark:text-pale-lavender">
          {message}
        </p>
      </div>
      <div className="flex items-center gap-4 md:gap-10">
        <FilterByStatus />
        <NewInvoiceButton />
      </div>
    </div>
  );
};

type InvoicesContentProps = {
  invoices: FullInvoice[];
};

const IvoicesContent = ({ invoices }: InvoicesContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      {invoices.length ? (
        invoices.map((invoice) => (
          <InvoiceSummary key={invoice.id} invoice={invoice} />
        ))
      ) : (
        <InvoicesEmpty />
      )}
    </div>
  );
};

const InvoicesEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[100px]">
      <Image src={IllustrationeEmpty} alt="Empty Illustration" />
      <h2 className="heading-m text-rich-black dark:text-white mt-10 md:mt-[66px]">
        There is nothing here
      </h2>
      <p className="body-variant tracking-[-0.1px] text-cool-gray dark:text-pale-lavender max-w-[170px] text-center pt-6">
        Create an invoice by clicking the New button and get started
      </p>
    </div>
  );
};

export default Invoices;
