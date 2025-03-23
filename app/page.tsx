"use client";
import { useTheme } from "next-themes";
import Sidebar from "./Sidebar";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <main className="h-screen w-screen bg-pale-ghost dark:bg-deep-space dark-transition">
      <Sidebar />
    </main>
  );
}
