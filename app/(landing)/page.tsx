"use client";

import Link from "next/link";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ToggleMode } from "@/components/ToggleMode";

import { Testimonials } from "./constants";

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative container mx-auto sm:px-10 px-5 py-5 dark:bg-[#111827] w-full">
      {/* navbar */}
      <div className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={25} height={25} />
          <h2 className="text-xl font-bold">Genius</h2>
        </Link>

        <div className="flex items-center gap-2">
          <ToggleMode />
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button variant="gradients">Get Started</Button>
          </Link>
        </div>
      </div>

      {/* hero headings and buttons */}
      <div className="h-[75vh] sm:h-[80vh] w-full text-center grid place-items-center">
        <div className="flex flex-col gap-4">
          <div className="text-3xl sm:text-5xl md:text-6xl space-y-2 sm:space-y-5 font-extrabold">
            <h1 className="">The Best AI Tool for</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              <Typewriter
                options={{
                  strings: [
                    "Chatbot.",
                    "Photo Generation.",
                    "Video Generation.",
                    "Music Generation.",
                    "Code Generation.",
                    "Video Generation.",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <p className="text-gray-400">Create content using AI 10x faster.</p>
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button variant="gradients">Start Generating For Free</Button>
          </Link>
          <p className="text-gray-500 text-sm">No credit card required.</p>
        </div>
      </div>

      {/* testimonials */}
      <div className="pb-10">
        <h2 className="text-center font-bold text-2xl tracking-wider mb-8">
          Testimonials
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Testimonials.map(({ name, desc, desig }) => (
            <div
              key={name}
              className="dark:bg-[#161B2E] p-6 rounded-md border dark:border-0"
            >
              <h2 className="text-base font-semibold">{name}</h2>
              <span className="text-xs text-muted-foreground dark:text-zinc-400 font-semibold">
                {desig}
              </span>
              <p className="text-xs leading-relaxed mt-4">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
