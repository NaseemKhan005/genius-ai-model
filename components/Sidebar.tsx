"use client";

import {
  IoChatboxOutline,
  IoImageOutline,
  IoVideocamOutline,
  IoMusicalNotesOutline,
  IoCode,
  IoSettingsOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });

const routes = [
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    name: "Conversation",
    icon: <IoChatboxOutline />,
    href: "/conversation",
    color: "text-purple-500",
  },
  {
    name: "Image Generation",
    icon: <IoImageOutline />,
    href: "/image-generation",
    color: "text-rose-500",
  },
  {
    name: "Video Generation",
    icon: <IoVideocamOutline />,
    href: "/video-generation",
    color: "text-orange-500",
  },
  {
    name: "Music Generation",
    icon: <IoMusicalNotesOutline />,
    href: "/music-generation",
    color: "text-emerald-500",
  },
  {
    name: "Code Generation",
    icon: <IoCode />,
    href: "/code-generation",
    color: "text-green-600",
  },
  {
    name: "Settings",
    icon: <IoSettingsOutline />,
    href: "/settings",
  },
];

const Sidebar = ({ menu, setMenu }: any) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-64 sm:w-80 h-full bg-[#111827] text-white px-3 py-5 sm:relative sm:left-0 fixed top-0 transition-all duration-500",
        menu === true ? "left-0" : "-left-full"
      )}
    >
      <span
        onClick={() => setMenu(false)}
        className="text-xl absolute top-4 right-0 cursor-pointer block sm:hidden bg-white/10 hover:bg-[#0000006d] py-3 rounded-tl rounded-bl"
      >
        <MdOutlineKeyboardArrowLeft />
      </span>
      <Link
        href={"/"}
        className="flex items-center gap-2 w-8 h-8 relative pb-10 py-5"
      >
        <Image src="/logo.png" alt="logo" width={20} height={20} />
        <h2 className="font-bold">Genius</h2>
      </Link>

      <div className="flex flex-col gap-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-2 rounded p-3 capitalize hover:bg-white/10",
              pathname === route.href ? "bg-white/10" : "text-zinc-400"
            )}
          >
            <span className={cn("text-lg", route.color)}>{route.icon}</span>
            <p className="text-xs">{route.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
