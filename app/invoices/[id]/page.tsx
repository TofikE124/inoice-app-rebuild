import InvoiceDetailsContainer from "./InvoiceDetailsContainer";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params: paramsPromise }: Props) => {
  const { id } = await paramsPromise;

  return (
    <main className="main-scrollbar overflow-y-scroll h-screen w-full pb-[50px] pt-9 md:pt-[62px] lg:pt-[80px] ">
      <div className=" box-container">
        <div className="mt-[72px] md:mt-20 lg:mt-0 lg:ml-[103px]">
          <InvoiceDetailsContainer id={id} />
        </div>
      </div>
    </main>
  );
};

export default Page;
