import Invoices from "./Invoices";
import Sidebar from "./Sidebar";

export default async function Home() {
  return (
    <main className="overflow-hidden h-screen overflow-x-hidden bg-pale-ghost dark:bg-deep-space  dark-transition">
      <Sidebar />
      <div className="main-scrollbar overflow-y-scroll h-screen pb-[50px] box-container w-full pt-9 md:pt-[62px] lg:pt-[80px]">
        <div className="mt-[72px] md:mt-20 lg:mt-0 lg:ml-[103px]">
          <Invoices />
        </div>
      </div>
    </main>
  );
}
