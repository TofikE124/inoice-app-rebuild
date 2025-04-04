"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import MoonIcon from "../../public/assets/icon-moon.svg";
import SunIcon from "../../public/assets/icon-sun.svg";
import Logo from "../../public/assets/logo.svg";
import SidebarRectangle from "../../public/assets/sidebar-rectangle.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import DefaultProfileIcon from "../../public/assets/icon-default-profile.webp";
import Button from "../components/Button";
import Skeleton from "@/app/components/Skeleton";

const Sidebar = () => {
  return (
    <div className="fixed z-30 inset-x-0 dark-transition bg-charcoal-slate dark:bg-slate-navy flex justify-between lg:h-screen lg:w-fit lg:flex-col lg:rounded-r-[20px]">
      <SidebarIcon />
      <SidebarFooter />
    </div>
  );
};

const SidebarIcon = () => {
  const { data, status } = useSession();

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
      <div className="grid place-items-center px-2 py-5 md:px-3 md:py-4 border-l lg:border-l-0 lg:border-t border-[#494E6E]">
        <Avatar />
      </div>
    </div>
  );
};

const Avatar = () => {
  const { data, status } = useSession();
  if (status == "loading")
    return (
      <div className="flex flex-col items-center gap-4">
        <Skeleton
          width={32}
          height={32}
          borderRadius={99999}
          className="primary-loading-skeleton"
        />
        <Skeleton
          width={75}
          height={40}
          borderRadius={24}
          className="primary-loading-skeleton"
        />
      </div>
    );
  if (status == "unauthenticated")
    return (
      <Button
        onClick={() => signIn("google")}
        color="deepPurple"
        className="text-[10px] px-4 py-2"
      >
        Login
      </Button>
    );

  return (
    <div className="flex lg:flex-col md:place-items-center gap-2 md:gap-4">
      <div className="ml-2 pr-2 group relative">
        {data?.user?.image ? (
          <Image
            src={data?.user?.image as string}
            width={32}
            height={32}
            alt="avatar"
            className="rounded-full"
          />
        ) : (
          <Image
            src={DefaultProfileIcon}
            width={32}
            height={32}
            alt="avatar"
            className="rounded-full"
          />
        )}
        <div className="absolute left-full top-1/2 -translate-y-1/2 bg-midnight-slate px-4 py-2 rounded-lg duration-200 transition-all translate-x-[-30px] opacity-0 scale-[80%] invisible group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible group-hover:scale-100">
          <h3 className="heading-s text-white text-center">
            {data.user?.email}
          </h3>
          <h3 className="body-variant text-white text-center">
            {data.user?.name}
          </h3>
        </div>
      </div>

      <Button
        onClick={() => signOut()}
        color="red"
        className="text-[10px] px-4 py-2"
      >
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
