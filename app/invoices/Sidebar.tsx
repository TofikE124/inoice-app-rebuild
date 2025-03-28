"use client";
import Image from "next/image";
import SidebarRectangle from "../..π/public/assets/sidebar-rectangle.svg";
import Logo from "../../public/assets/logo.svg";
import Avatar from "../../public/assets/image-avatar.jpg";
import MoonIcon from "../../public/assets/icon-moon.svg";
import SunIcon from "../../public/assets/icon-sun.svg";
import { useTheme } from "next-themes";

const Sidebar = () => {
  return (
    <div className="fixed z-30 inset-x-0 dark-transition bg-charcoal-slate dark:bg-slate-navy flex justify-between lg:h-screen lg:w-fit lg:flex-col lg:rounded-r-[20px]">
      <SidebarIcon />
      <SidebarFooter />
    </div>
  );
};

const SidebarIcon = () => {
  return (
    <div className="relative size-[72px] md:size-[80px] lg:size-[103px] grid place-content-center">
      <Image
        src={SidebarRectangle}
        alt="Sidebar"
        className="absolute inset-0"
      />
      <Image
        src={Logo}
        alt="Logo"
        className="relative size-[28px] md:size-[31px] lg:size-10"
      />
    </div>
  );
};

const SidebarFooter = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex lg:flex-col">
      <div className="grid place-items-center pr-4 lg:pr-0 lg:pb-4">
        <div
          className="p-2 md:p-3 cursor-pointer"
          onClick={() => {
            setTheme(theme == "dark" ? "light" : "dark");
          }}
        >
          <Image src={MoonIcon} alt="Moon" className="dark:hidden block" />
          <Image src={SunIcon} alt="Sun" className="hidden dark:block" />
        </div>
      </div>
      <div className="overflow-hidden px-6 py-5 md:px-8 md:py-6 border-l lg:border-l-0 lg:border-t border-[#494E6E]">
        <Image
          src={Avatar}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
