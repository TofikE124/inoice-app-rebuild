"use client";
import Skeleton from "@/app/components/Skeleton";

const InvoiceSummaryLoading = () => {
  return (
    <div className="rounded-lg p-6 dark-transition bg-white dark:bg-slate-navy shadow-primary-10 border border-deep-purple/0 hover:border-deep-purple">
      <div className="grid justify-between max-md:grid-cols-2 max-md:auto-rows-auto max-md:gap-y-2 md:grid-cols-[auto_auto_auto_1fr_auto_auto] md:gap-x-5 md:items-center">
        <div className="md:mr-2 lg:mr-6">
          <Skeleton
            className="primary-loading-skeleton"
            width={92}
            height={15}
          />
        </div>

        <div className="max-md:justify-self-end md:flex md:items-center">
          <Skeleton
            className="primary-loading-skeleton"
            width={125}
            height={25}
          />
        </div>

        <div className="max-md:mt-4 md:mr-6 lg:mr-10">
          <Skeleton
            className="primary-loading-skeleton"
            width={115}
            height={25}
          />
        </div>
        <div className="md:ml-auto md:mr-5">
          <Skeleton
            className="primary-loading-skeleton"
            width={55}
            height={25}
          />
        </div>

        <div className="flex items-center max-md:justify-self-end max-md:col-start-2 max-md:row-start-2 max-md:row-span-2">
          <Skeleton
            className="primary-loading-skeleton"
            width={126}
            height={47}
          />
        </div>
        <div className="max-md:hidden">
          <Skeleton
            className="primary-loading-skeleton"
            width={25}
            height={25}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummaryLoading;
