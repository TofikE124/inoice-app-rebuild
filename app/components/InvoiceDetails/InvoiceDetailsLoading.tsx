import React from "react";
import Skeleton from "@/app/components/Skeleton";

const InvoiceDetailsLoading = () => {
  return (
    <div className="space-y-[30px] max-md:pb-[100px]">
      <div className="mt-[45px] flex flex-col gap-4">
        <Skeleton height={104} className="primary-loading-skeleton" />
        <div className="bg-white dark:bg-slate-navy rounded-lg p-6 shadow-primary-10 shadow-primary-placement">
          <Skeleton height={200} className="primary-loading-skeleton" />

          <div className="flex flex-col mt-9">
            <div className="bg-[#F9FAFE] dark:bg-midnight-slate rounded-t-lg p-6">
              <div className="w-full border-separate border-spacing-y-[30px]">
                <div>
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      width={150}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      width={150}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      width={150}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton
                      height={15}
                      width={150}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
                    />
                    <Skeleton
                      height={15}
                      width={100}
                      className="secondary-loading-skeleton"
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

export default InvoiceDetailsLoading;
