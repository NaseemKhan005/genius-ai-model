import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface HeadingProps {
  title: string;
  desc: string;
  icon: any;
  iconColor?: string;
  bgColor?: string;
}

const Heading = ({ title, desc, icon, iconColor, bgColor }: HeadingProps) => {
  return (
    <div className={cn("flex items-center gap-2", inter.className)}>
      <div className={cn("w-fit p-2 rounded-md", iconColor, bgColor)}>
        <span className="text-3xl">{icon}</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-xs sm:text-sm font-medium text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
};

export default Heading;
