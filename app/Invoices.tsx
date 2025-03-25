"use client";
import InvoiceSummary from "./components/InvoiceSummary";
import dummyInvoice from "./dummyInvoice";
import FilterByStatus from "./FilterByStatus";
import NewInvoiceButton from "./NewInvoiceButton";

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
        <FilterByStatus />
        <NewInvoiceButton />
      </div>
    </div>
  );
};

const IvoicesContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
      <InvoiceSummary invoice={dummyInvoice} />
    </div>
  );
};

export default Invoices;
