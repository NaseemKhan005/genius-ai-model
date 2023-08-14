"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoCode } from "react-icons/io5";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import ReactMarkdown from "react-markdown";

import Heading from "@/components/Heading";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
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
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";

const CodePage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error) {
      // TODO: Open Pro Model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <div>
        <Heading
          title="Code Generation"
          desc="Generate code using descriptive text."
          icon={<IoCode />}
          iconColor="text-green-600"
          bgColor="bg-green-600/10"
        />
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative mt-10 mb-5"
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
                      placeholder="How to toggle light and dark theme in next js?"
                      className="px-4 py-6 outline-none focus-visible:ring-0 focus-visible:ring-transparent rounded-md focus-visible:shadow-md focus-visible:border-transparent focus-visible:drop-shadow-sm dark:bg-[#161B2E] dark:border-0 dark:py-[1.6rem] dark:focus-within:ring-offset-0"
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
        {messages.length === 0 && !isLoading && (
          <Empty
            image="/empty.png"
            alt="Empty"
            label="No code generated yet."
          />
        )}
        {isLoading && <Loader />}
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "w-full p-8 flex items-start gap-x-8 rounded-lg",
                message.role === "user" ? "" : "bg-muted dark:bg-[#161B2E]"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="w-full overflow-auto my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code {...props} className="bg-black/10 rounded-lg p-1" />
                  ),
                }}
                className="text-sm leading-7 overflow-hidden"
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodePage;
