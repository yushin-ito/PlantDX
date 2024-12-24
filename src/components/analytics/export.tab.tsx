"use client";

import { memo } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { VStack } from "../ui/vstack";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ExportSchema } from "@/schemas";
import { FileType } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ExportTabProps = {
  image: string | null;
  getPreview: () => void;
  onExport: ({ name, type }: { name: string; type: FileType }) => void;
};

const ExportTab = memo(({ image, getPreview, onExport }: ExportTabProps) => {
  const form = useForm<z.infer<typeof ExportSchema>>({
    resolver: zodResolver(ExportSchema),
    defaultValues: {
      name: "",
      type: "png",
    },
  });

  const onSubmit = async (values: z.infer<typeof ExportSchema>) => {
    onExport(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VStack className="items-center space-y-6 px-6 pt-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel className="text-xs">ファイル名</FormLabel>
                <FormControl>
                  <Input className="h-8 w-full !text-xs" {...field} />
                </FormControl>
                <FormMessage className="text-2xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel className="text-xs">ファイル形式</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-8 w-full !text-xs">
                      <SelectValue placeholder="ファイル形式を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem className="text-xs" value="png">
                      png
                    </SelectItem>
                    <SelectItem className="text-xs" value="jpg">
                      jpg
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-2xs" />
              </FormItem>
            )}
          />
          <VStack className="w-full space-y-1.5">
            <Label className="text-xs">プレビュー</Label>
            <div className="relative h-[140px] w-full rounded-lg bg-gray-100 dark:bg-neutral-900">
              {image ? (
                <Image
                  alt="export"
                  src={image}
                  fill
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Center className="size-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 px-2.5 text-2xs"
                    onClick={getPreview}
                  >
                    表示する
                  </Button>
                </Center>
              )}
            </div>
          </VStack>
          <Button type="submit" className=" h-8 w-[90%]" variant="brand">
            <span className="text-2xs">ダウンロード</span>
          </Button>
        </VStack>
      </form>
    </Form>
  );
});

export default ExportTab;
