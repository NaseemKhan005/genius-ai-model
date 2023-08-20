"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoImageOutline } from "react-icons/io5";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import DeleteChatButton from "@/components/DeleteChatButton";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineDownload } from "react-icons/hi";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Load messages from local storage when component mounts
    const storedMessages = localStorage.getItem("image messages");
    if (storedMessages) {
      setImages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to local storage whenever messages change
    localStorage.setItem("image messages", JSON.stringify(images));
  }, [images]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);
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
      <div className="lg:flex lg:items-center justify-between lg:flex-row flex-col w-full">
        <Heading
          title="Image Generation"
          desc="Turn your prompt into an Image."
          icon={<IoImageOutline />}
          iconColor="text-rose-500"
          bgColor="bg-rose-500/10"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative mt-3 lg:mt-0 grid grid-cols-2 row-span-2 lg:flex sm:flex-row flex-col lg:items-center justify-end gap-2 ml-auto lg:m-0"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="lg:w-[170px]">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="lg:w-[170px]">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative mt-4 lg:mt-10 mb-5"
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
                      placeholder="A picture of a horse in Swiss alps"
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
        {images.length === 0 && !isLoading && (
          <Empty image="/image.png" alt="Image" label="No Images Generated." />
        )}
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8">
          {images.map((image) => (
            <div
              key={image}
              className="border rounded-md p-2 aspect-square relative"
            >
              {(
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-full w-full block rounded-md" />
                  <Skeleton className="h-12 w-full block rounded-md" />
                </div>
              ) && (
                <div className="flex flex-col gap-2 relative">
                  <Image
                    src={image}
                    alt="Image"
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                  <Link
                    href={image}
                    download={true}
                    target="_blank"
                    className="flex items-center justify-center gap-1 bg-muted hover:bg-muted-foreground/10 rounded-md py-[.65rem] text-center text-sm"
                  >
                    <HiOutlineDownload className="-mt-[1px]" />
                    <span>Download</span>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
