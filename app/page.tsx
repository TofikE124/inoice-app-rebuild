"use client";
import { useTheme } from "next-themes";
import Sidebar from "./Sidebar";
import Invoices from "./Invoices";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <main className="h-screen w-screen flex max-lg:flex-col bg-pale-ghost dark:bg-deep-space dark-transition">
      <Sidebar />
      <div className="box-container w-full pt-9 md:pt-[62px] lg:pt-[80px]">
        <Invoices />
      </div>
    </main>
  );
}
