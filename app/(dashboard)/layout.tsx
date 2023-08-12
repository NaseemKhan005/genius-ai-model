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
      <Sidebar menu={menu} setMenu={setMenu} />

      <div className="w-full">
        <Navbar menu={menu} setMenu={setMenu} />
        <div onClick={() => setMenu(false)}>{children}</div>
      </div>

      <div className="absolute bottom-5 right-5 sm:right-10 bg-[#5f27cd] hover:bg-[#592db1] rounded-full active:scale-95 cursor-pointer pt-2 px-2 pb-[2px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-3xl text-white">
                <HiChatBubbleOvalLeftEllipsis />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>How can we help you?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DashboardLoyout;
