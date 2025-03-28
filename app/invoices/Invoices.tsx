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
          <Header invoices={filteredInvoices} />
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
};

const Header = ({ invoices }: HeaderProps) => {
  let message = "";
  switch (invoices.length) {
    case 0:
      message = "There is 0 invoices";
      break;
    case 1:
      message = "There is 1 invoice";
      break;
    default:
      message = `There is ${invoices.length} invoice`;
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
      {invoices.map((invoice) => (
        <InvoiceSummary key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
};

export default Invoices;
