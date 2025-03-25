import delay from "delay";
import Invoices from "./Invoices";
import Sidebar from "./Sidebar";

export default async function Home() {
  await delay(1000);

  return (
    <main className="min-h-screen pb-[150px] overflow-x-hidden bg-pale-ghost dark:bg-deep-space dark-transition">
      <Sidebar />
      <div className="box-container w-full pt-9 md:pt-[62px] lg:pt-[80px]">
        <div className="mt-[72px] md:mt-20 lg:mt-0 lg:ml-[103px]">
          <Invoices />
        </div>
      </div>
    </main>
  );
}
