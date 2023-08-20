"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoChatboxOutline } from "react-icons/io5";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";

import Heading from "@/components/Heading";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import CopyButton from "@/components/CopyButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { formSchema } from "./constants";
import DeleteChatButton from "@/components/DeleteChatButton";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  useEffect(() => {
    // Load messages from local storage when component mounts
    const storedMessages = localStorage.getItem("conversation messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to local storage whenever messages change
    localStorage.setItem("conversation messages", JSON.stringify(messages));
  }, [messages]);

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

      const response = await axios.post("/api/conversation", {
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
    <div className="pb-10 relative">
      <div className="flex items-center justify-between">
        <Heading
          title="Chatbot"
          desc="Our most advanced conversational model."
          icon={<IoChatboxOutline />}
          iconColor="text-indigo-500"
          bgColor="bg-indigo-500/10"
        />
        {messages.length > 0 && <DeleteChatButton setChat={setMessages} />}
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
                      placeholder="Send a message"
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
        {messages.length === 0 && !isLoading && (
          <Empty
            image="/chatbot.png"
            alt="Coversation"
            label="No Converstaion started."
          />
        )}
        {isLoading && <Loader />}
        <div className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <div
              key={message.content}
              className={cn(
                "w-full p-4 md:p-8 flex items-start gap-x-4 md:gap-x-8 rounded-lg relative",
                message.role === "user" ? "" : "bg-muted dark:bg-[#161B2E]"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm pt-1 pr-7 lg:pr-20">{message.content}</p>
              <div className="w-full absolute right-2 lg:right-3 hover:bg-black/5">
                {message.role !== "user"
                  ? message.content && (
                      <CopyButton
                        text={message.content}
                        tooltipText1="Copy Text"
                        tooltipText2="Text Copied!"
                        copyText1="Copy Text"
                        copyText2="Copied!"
                      />
                    )
                  : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
