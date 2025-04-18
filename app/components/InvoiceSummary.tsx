import Image from "next/image";
import RightArrowIcon from "../../public/assets/icon-arrow-right.svg";
import { FullInvoice } from "../types/invoice";
import InvoiceStatus from "./InvoiceStatus";
import { Item } from "@prisma/client";
import Link from "next/link";

type InvoiceSummaryProps = {
  invoice: FullInvoice;
};

const InvoiceSummary = ({ invoice }: InvoiceSummaryProps) => {
  const date = new Date(invoice.invoiceDate);

  return (
    <div className="rounded-lg p-6 dark-transition bg-white dark:bg-slate-navy shadow-primary-10 shadow-primary-placement border border-deep-purple/0 hover:border-deep-purple">
      <div className="grid justify-between max-md:grid-cols-2 max-md:auto-rows-auto max-md:gap-y-2 md:grid-cols-[auto_auto_auto_1fr_auto_auto] md:gap-x-5 md:items-center">
        <div className="md:mr-2 lg:mr-6">
          <h3 className="heading-s-variant text-rich-black dark:text-white uppercase">
            <span className="text-steel-blue">#</span>
            {invoice.id.slice(0, 5)}
          </h3>
        </div>

        <div className="max-md:justify-self-end md:flex md:items-center">
          <p className="text-[#858BB2] dark:text-white body-s-variant tracking-[-0.1px]">
            {invoice.billTo.name}
          </p>
        </div>

        <div className="max-md:mt-4 md:mr-6 lg:mr-10">
          <p className="text-steel-blue dark:text-pale-lavender body-s-variant tracking-[-0.1px]">
            <span className="text-cool-gray dark:text-pale-lavender mr-2">
              Due
            </span>
            {date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="md:ml-auto md:mr-5">
          <h3 className="heading-s text-rich-black dark:text-white">
            <span className="mr-1">£</span>
            {getTotal(invoice.items).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
            })}
          </h3>
        </div>

        <div className="flex items-center max-md:justify-self-end max-md:col-start-2 max-md:row-start-2 max-md:row-span-2">
          <InvoiceStatus status={invoice.status} />
        </div>
        <div className="max-md:hidden">
          <Link href={`/invoices/${invoice.id}`} className="cursor-pointer p-2">
            <Image src={RightArrowIcon} alt="Right Arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const getTotal = (items: Item[]) => {
  return items.reduce((sum, curr) => sum + curr.price, 0);
};

export default InvoiceSummary;
