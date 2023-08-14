import {
  IoChatboxOutline,
  IoImageOutline,
  IoVideocamOutline,
  IoMusicalNotesOutline,
  IoCode,
} from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";
import { Inter } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], weight: ["400", "800"] });

const routes = [
  {
    name: "Code Generation",
    icon: <IoCode />,
    href: "/code",
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    name: "Video Generation",
    icon: <IoVideocamOutline />,
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    name: "Conversation",
    icon: <IoChatboxOutline />,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    name: "Image Generation",
    icon: <IoImageOutline />,
    href: "/image",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    name: "Music Generation",
    icon: <IoMusicalNotesOutline />,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const DashboardPage = () => {
  return (
    <>
      <div className={cn("text-center pt-3 md:pt-0", inter.className)}>
        <h2 className="text-2xl md:text-3xl font-bold">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm font-normal pt-2">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center gap-4 shadow-sm dark:bg-[#161B2E] border border-[#00000007] dark:border-0 mx-auto max-w-3xl mt-3 p-3 rounded-md hover:shadow-md transition"
          >
            <span
              className={cn(
                "p-2 rounded-md text-2xl",
                route.bgColor,
                route.color
              )}
            >
              {route.icon}
            </span>
            <p className="font-semibold text-sm">{route.name}</p>
            <BsArrowRightShort className="ml-auto text-2xl" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default DashboardPage;
