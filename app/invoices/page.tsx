import Invoices from "./Invoices";

export default async function Page() {
  return (
    <main className="main-scrollbar overflow-y-scroll h-screen w-full pb-[50px] pt-9 md:pt-[62px] lg:pt-[80px] ">
      <div className="box-container">
        <div className="mt-[72px] md:mt-20 lg:mt-0 lg:ml-[103px]">
          <Invoices />
        </div>
      </div>
    </main>
  );
}
