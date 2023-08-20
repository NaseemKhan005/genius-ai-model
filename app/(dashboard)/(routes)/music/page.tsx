"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoChatboxOutline, IoMusicalNotesOutline } from "react-icons/io5";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import DeleteChatButton from "@/components/DeleteChatButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { formSchema } from "./constants";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  useEffect(() => {
    // Load music from local storage when component mounts
    const storedmusic = localStorage.getItem("music messages");
    if (storedmusic !== null) {
      try {
        setMusic(JSON.parse(storedmusic));
      } catch (error) {
        console.error("Error parsing stored music:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save music to local storage whenever music change
    localStorage.setItem("music messages", JSON.stringify(music));
  }, [music]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);
      form.reset();
    } catch (error) {
      // TODO: Open Pro Model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="pb-10 relative">
      <div className="flex items-center justify-between">
        <Heading
          title="Music Generation"
          desc="Turn your Prompt into Music."
          icon={<IoMusicalNotesOutline />}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-500/10"
        />
        {music && <DeleteChatButton setChat={setMusic} />}
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative mt-10 mb-5"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Piano Solo"
                      className="px-4 pr-14 py-6 outline-none focus-visible:ring-0 focus-visible:ring-transparent rounded-md drop-shadow-md shadow-md border-transparent dark:bg-[#161B2E] dark:py-[1.6rem] dark:focus-within:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="secondary"
              size="icon"
              disabled={isLoading}
              className="absolute top-[.4rem] dark:top-2 right-2 text-indigo-600 bg-indigo-600/10 dark:text-white dark:bg-indigo-400/10 dark:hover:bg-indigo-400/5 hover:bg-indigo-600/5 text-lg"
            >
              <PiPaperPlaneRightFill />
            </Button>
          </form>
        </Form>
      </div>

      <div>
        {!music && !isLoading && (
          <Empty
            image="/music.png"
            alt="Music"
            label="No Converstaion started."
          />
        )}
        {isLoading && <Loader />}
        <div className="flex flex-col gap-2">
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
