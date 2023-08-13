"use client";

import { Inter } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], weight: ["400", "800"] });

const Navbar = ({ setMenu }: any) => {
  return (
    <div className="pb-10 py-5">
      <div className="flex items-center justify-between">
        <span
          onClick={() => setMenu(true)}
          className="text-xl cursor-pointer block sm:hidden hover:bg-[#00000007] p-2 rounded"
        >
          <HiOutlineMenuAlt2 />
        </span>
        <div onClick={() => setMenu(false)} className="w-fit ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div
        onClick={() => setMenu(false)}
        className={cn("text-center pt-3 md:pt-0", inter.className)}
      >
        <h2 className="text-2xl sm:text-3xl font-bold">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm font-normal pt-2">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
    </div>
  );
};

export default Navbar;
