"use client";

import { UserButton } from "@clerk/nextjs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { ToggleMode } from "./ToggleMode";
import { Button } from "./ui/button";

const Navbar = ({ setMenu }: any) => {
  return (
    <div className="py-3 md:py-5 sm:pb-5 pb-8">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenu(true)}
          className="block sm:hidden"
        >
          <HiOutlineMenuAlt2 className="text-xl mx-auto" />
        </Button>
        <div
          onClick={() => setMenu(false)}
          className="w-fit ml-auto flex items-center gap-3"
        >
          <ToggleMode />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
