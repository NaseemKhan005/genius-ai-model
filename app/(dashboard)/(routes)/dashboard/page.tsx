import {
  IoChatboxOutline,
  IoImageOutline,
  IoVideocamOutline,
  IoMusicalNotesOutline,
  IoCode,
} from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";

import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Conversation",
    icon: <IoChatboxOutline />,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/5",
  },
  {
    name: "Video Generation",
    icon: <IoVideocamOutline />,
    href: "/video-generation",
    color: "text-orange-500",
    bgColor: "bg-orange-500/5",
  },
  {
    name: "Music Generation",
    icon: <IoMusicalNotesOutline />,
    href: "/music-generation",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/5",
  },
  {
    name: "Image Generation",
    icon: <IoImageOutline />,
    href: "/image-generation",
    color: "text-rose-500",
    bgColor: "bg-rose-500/5",
  },
  {
    name: "Code Generation",
    icon: <IoCode />,
    href: "/code-generation",
    color: "text-green-600",
    bgColor: "bg-green-600/5",
  },
];

const DashboardPage = () => {
  return (
    <div>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="flex items-center gap-4 shadow-sm border border-[#00000007] mx-auto max-w-3xl mt-3 p-3 rounded-md hover:shadow-md transition"
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
  );
};

export default DashboardPage;
