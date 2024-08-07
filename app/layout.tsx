import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider as Theme } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import CrispChat from "@/components/CrispChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Genius ― Naseem Khan",
  description: "AI Model",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispChat />
        <body className={cn("dark:bg-[#111827] ", inter.className)}>
          <Theme attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
