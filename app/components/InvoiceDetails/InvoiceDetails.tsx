import Image from "next/image";
import Link from "next/link";
import LeftArrowIcon from "/public/assets/icon-arrow-left.svg";
import { FullInvoice } from "../../types/invoice";
import InvoiceStatus from "../InvoiceStatus";
import Button from "../Button";
import { formatDate } from "../../helper/formateDate";
import { Item, Location, PaymentTerms } from "@prisma/client";
import { addDays } from "date-fns";
import { toTitleCase } from "../../helper/toTitleCase";
import { useState } from "react";
import InvoiceForm from "../InvoiceForm";

// InvoiceDetails component
type InvoiceDetailsProps = {
  invoice: FullInvoice;
};

const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  const date = new Date(invoice.invoiceDate);

  return (
    <div className="space-y-[30px] max-md:pb-[100px]">
      <GoBack />
      <div className="flex flex-col gap-4">
        <InvoiceDetailsHeader invoice={invoice} />
        <div className="bg-white dark:bg-slate-navy rounded-lg p-6 shadow-primary-10 shadow-primary-placement">
          <div className="invoiceDetailsGrid">
            {/* Id and Description */}
            <InvoiceIdAndDescription
              id={invoice.id}
              description={invoice.projectDescription}
            />
            <BillFrom billFrom={invoice.billFrom} />
            <InvoiceDate date={date} />
            <PaymentDue date={date} paymentTerms={invoice.paymentTerms} />
            <SentTo email={invoice.billTo.email!} />
            <BillTo billTo={invoice.billTo} />
          </div>
          <div className="flex flex-col mt-9">
            <div className="bg-[#F9FAFE] dark:bg-midnight-slate rounded-t-lg p-6">
              <table className="w-full border-separate border-spacing-y-[30px]">
                <thead>
                  <tr>
                    <th className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender text-start">
                      Item Name
                    </th>
                    <th className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
                      QTY.
                    </th>
                    <th className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
                      Price
                    </th>
                    <th className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="heading-s text-rich-black dark:text-white text-start">
                        {item.name}
                      </td>
                      <td className="heading-s text-steel-blue dark:text-pale-lavender text-center">
                        {item.quantity}
                      </td>
                      <td className="heading-s text-steel-blue dark:text-pale-lavender text-center">
                        £ {item.price}
                      </td>
                      <td className="heading-s text-rich-black dark:text-pale-lavender text-center">
                        £ {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-b-lg px-6 py-8 flex items-center justify-between bg-charcoal-slate dark:bg-rich-black">
              <p className="body-variant text-white">Grand Total</p>
              <h2 className="heading-m text-white ">
                £ {getItemsTotal(invoice.items)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getItemsTotal = (items: Item[]) => {
  return items.reduce((prev, item) => prev + item.quantity * item.price, 0);
};

// InvoiceIdAndDescription component
const InvoiceIdAndDescription = ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => (
  <div className="grid-in-id space-y-2">
    <h3 className="heading-s-variant text-rich-black dark:text-white uppercase">
      <span className="text-steel-blue">#</span>
      {id.slice(0, 5)}
    </h3>
    <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
      {description}
    </p>
  </div>
);

// BillFrom component
const BillFrom = ({
  billFrom,
}: {
  billFrom: {
    streetAdress: string;
    city: string;
    postCode: string;
    country: string;
  };
}) => (
  <div className="grid-in-billFrom space-y-3">
    <div className="w-fit">
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billFrom.streetAdress}
      </p>
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billFrom.city}
      </p>
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billFrom.postCode}
      </p>
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billFrom.country}
      </p>
    </div>
  </div>
);

// InvoiceDate component
const InvoiceDate = ({ date }: { date: Date }) => {
  const formattedDate = formatDate(new Date(date));
  return (
    <div className="grid-in-invoiceDate space-y-3">
      <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
        Invoice Date
      </p>
      <h3 className="heading-s text-rich-black dark:text-white">
        {formattedDate}
      </h3>
    </div>
  );
};

// PaymentDue component
const PaymentDue = ({
  date,
  paymentTerms,
}: {
  date: Date;
  paymentTerms: PaymentTerms;
}) => {
  const paymentDueDate = calculatePaymentDue(new Date(date), paymentTerms);
  return (
    <div className="grid-in-paymentDue space-y-3">
      <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
        Payment Due
      </p>
      <h3 className="heading-s text-rich-black dark:text-white">
        {formatDate(paymentDueDate)}
      </h3>
    </div>
  );
};

// SentTo component
const SentTo = ({ email }: { email: string }) => (
  <div className="grid-in-sentTo space-y-3">
    <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
      Sent To
    </p>
    <h3 className="heading-s text-rich-black dark:text-white">{email}</h3>
  </div>
);

// BillTo component
const BillTo = ({ billTo }: { billTo: Location }) => (
  <div className="grid-in-billTo space-y-3">
    <p className="body-variant tracking-[-0.1px] text-steel-blue dark:text-pale-lavender">
      Bill To
    </p>
    <h3 className="heading-s text-rich-black dark:text-white mt-3">
      {toTitleCase(billTo.name!)}
    </h3>
    <div className="w-fit mt-2">
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billTo.streetAdress}
      </p>
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billTo.city}
      </p>
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billTo.postCode}
      </p>
      <p className="body-variant tracking-[-0.1px] text-end text-steel-blue dark:text-pale-lavender">
        {billTo.country}
      </p>
    </div>
  </div>
);

// GoBack component
const GoBack = () => (
  <Link
    href=".."
    className="heading-s-variant text-rich-black dark:text-white cursor-pointer flex items-center gap-6"
  >
    <Image src={LeftArrowIcon} alt="Right Arrow" />
    Go Back
  </Link>
);

// InvoiceDetailsHeader component
const InvoiceDetailsHeader = ({ invoice }: { invoice: FullInvoice }) => (
  <div className="flex items-center max-md:justify-between md:gap-5 p-6 rounded-lg bg-white dark:bg-slate-navy shadow-primary-10 shadow-primary-placement">
    <p className="body-variant tracking-[-0.1px] text-[#858BB2] dark:text-pale-lavender">
      Status
    </p>
    <InvoiceStatus status={invoice.status} />
    <div className="max-md:fixed bottom-0 left-0 right-0 max-md:shadow-primary-10 max-md:shadow-[0px_10px_10px_-10px] max-md:bg-white max-md:dark:bg-slate-navy max-md:px-6 max-md:py-5 flex gap-2 max-md:justify-around md:justify-between items-center md:ml-auto">
      <EditInvoice invoice={invoice} />
      <Button color="red" className="max-md:w-full">
        Delete
      </Button>
      <Button color="deepPurple" className="max-md:w-full">
        Mark as Paid
      </Button>
    </div>
  </div>
);

type EditInvoiceDetails = {
  invoice: FullInvoice;
};

const EditInvoice = ({ invoice }: EditInvoiceDetails) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        color="primary"
        className="max-md:w-full"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <InvoiceForm
        invoice={invoice}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

// Calculate Payment Due Date
const calculatePaymentDue = (date: Date, paymentTerm: PaymentTerms) => {
  const paymentTermsMap: Record<PaymentTerms, number> = {
    NET_1_DAY: 1,
    NET_7_DAYS: 7,
    NET_14_DAYS: 14,
    NET_30_DAYS: 30,
  };

  return addDays(date, paymentTermsMap[paymentTerm]);
};

export default InvoiceDetails;
