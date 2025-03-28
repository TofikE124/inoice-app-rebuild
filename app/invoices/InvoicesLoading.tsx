import Skeleton from "@/app/components/Skeleton";
import InvoiceSummaryLoading from "../components/InvoiceSummaryLoading";
import FilterByStatus from "./FilterByStatus";
import NewInvoiceButton from "./NewInvoiceButton";

const InvoicesLoading = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-[55px] lg:gap-16">
      <HeaderLoading />
      <IvoicesContentLoading />
    </div>
  );
};

const HeaderLoading = () => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-[6px]">
        <h1 className="heading-l text-rich-black dark:text-white">Invoices</h1>
        <Skeleton
          className="primary-loading-skeleton"
          width={130}
          height={15}
          containerClassName="h-[15px]"
        />
      </div>
      <div className="flex items-center gap-4 md:gap-10">
        <FilterByStatus disabled />
        <NewInvoiceButton disabled />
      </div>
    </div>
  );
};

const IvoicesContentLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <InvoiceSummaryLoading />
      <InvoiceSummaryLoading />
      <InvoiceSummaryLoading />
      <InvoiceSummaryLoading />
      <InvoiceSummaryLoading />
      <InvoiceSummaryLoading />
    </div>
  );
};

export default InvoicesLoading;
