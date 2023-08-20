"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoVideocamOutline } from "react-icons/io5";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import DeleteChatButton from "@/components/DeleteChatButton";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { formSchema } from "./constants";

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="pb-10 relative">
      <div className="flex items-center justify-between">
        <Heading
          title="Video Generation"
          desc="Our most advanced conversational model."
          icon={<IoVideocamOutline />}
          iconColor="text-orange-500"
          bgColor="bg-orange-500/10"
        />
        {!video && <DeleteChatButton setChat={setVideo} />}
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
                      placeholder="Clown fish swimming in a pool"
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
        {!video && !isLoading && (
          <Empty image="/video.png" alt="Video" label="No Video Generated." />
        )}
        {isLoading && <Loader />}

        {video && (
          <video
            src={video}
            controls
            className="w-full aspect-video mt-8 rounded-lg border bg-black"
          ></video>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
