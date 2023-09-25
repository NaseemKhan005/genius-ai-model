"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLoyout = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="realtive w-full h-full flex">
      <div className="fixed top-0 left-0 z-[80]">
        <Sidebar menu={menu} setMenu={setMenu} />
      </div>

      <div className="w-full container md:px-10 px-5 mx-auto">
        <Navbar setMenu={setMenu} />
        <div
          onClick={() => setMenu(false)}
          className="relative min-h-[80vh] sm:pl-[17rem]"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoyout;
