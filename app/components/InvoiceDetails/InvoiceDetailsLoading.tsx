import React from "react";
import Skeleton from "@/app/components/Skeleton";

const InvoiceDetailsLoading = () => {
  return (
    <div className="space-y-[30px] max-md:pb-[100px]">
      <div className="mt-[45px] flex flex-col gap-4">
        <Skeleton
          height={104}
          borderRadius={8}
          className="primary-loading-skeleton"
        />
        <div className="bg-white dark:bg-slate-navy rounded-lg p-6 shadow-primary-10 shadow-primary-placement">
          {/* <Skeleton height={200} className="primary-loading-skeleton" /> */}

          <div className="invoiceDetailsGrid lg:h-[200px]">
            <IdLoading />
            <BillFromLoading />
            <InvoiceDateLoading />
            <BillToLoading />
            <PaymentDueLoading />
            <SentToLoading />
          </div>

          <div className="flex flex-col mt-9">
            <div className="bg-[#F9FAFE] dark:bg-midnight-slate rounded-t-lg p-6">
              <div className="w-full border-separate border-spacing-y-[30px]">
                <div>
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[100px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[100px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[100px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[100px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                    <Skeleton
                      height={15}
                      className="secondary-loading-skeleton"
                      containerClassName="w-[50px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-b-lg px-6 py-8 flex items-center justify-between bg-charcoal-slate dark:bg-rich-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IdLoading = () => (
  <div className="grid-in-id lg:h-[60px]">
    <Skeleton height={20} width={100} className="secondary-loading-skeleton" />
    <Skeleton height={10} width={100} className="secondary-loading-skeleton" />
  </div>
);

const BillFromLoading = () => (
  <div className="grid-in-billFrom lg:h-[60px]">
    <Skeleton height={10} width={50} className="secondary-loading-skeleton" />
    <Skeleton height={10} width={50} className="secondary-loading-skeleton" />
    <Skeleton height={10} width={50} className="secondary-loading-skeleton" />
  </div>
);

const InvoiceDateLoading = () => (
  <div className="grid-in-invoiceDate lg:h-[50px]">
    <Skeleton height={10} width={100} className="secondary-loading-skeleton" />
    <Skeleton height={20} width={150} className="secondary-loading-skeleton" />
  </div>
);

const BillToLoading = () => (
  <div className="grid-in-billTo lg:h-[132px]">
    <Skeleton height={10} width={50} className="secondary-loading-skeleton" />
    <Skeleton height={20} width={70} className="secondary-loading-skeleton" />
    <div className="mt-3">
      <Skeleton height={10} width={50} className="secondary-loading-skeleton" />
      <Skeleton height={10} width={50} className="secondary-loading-skeleton" />
      <Skeleton height={10} width={50} className="secondary-loading-skeleton" />
    </div>
  </div>
);

const PaymentDueLoading = () => (
  <div className="grid-in-paymentDue h-[50px]">
    <Skeleton height={10} width={100} className="secondary-loading-skeleton" />
    <Skeleton height={20} width={150} className="secondary-loading-skeleton" />
  </div>
);

const SentToLoading = () => (
  <div className="grid-in-sentTo">
    <Skeleton height={10} width={80} className="secondary-loading-skeleton" />
    <Skeleton height={20} width={150} className="secondary-loading-skeleton" />
  </div>
);

export default InvoiceDetailsLoading;
