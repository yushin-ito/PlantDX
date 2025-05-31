import { AlertCircle, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { memo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CreateUserSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/functions/tools";

type ProfileTabProps = {
  nextTab: () => void;
  upsertUserHandler: (
    values: z.infer<typeof CreateUserSchema>
  ) => Promise<void>;
  isLoadingUpsertUser: boolean;
};

const ProfileTab = memo(
  ({ nextTab, upsertUserHandler, isLoadingUpsertUser }: ProfileTabProps) => {
    const colors = [
      { label: "レッド", value: "red" },
      { label: "ローズ", value: "rose" },
      { label: "オレンジ", value: "orange" },
      { label: "グリーン", value: "green" },
      { label: "ブルー", value: "blue" },
      { label: "イエロー", value: "yellow" },
      { label: "バイオレット", value: "violet" },
    ] as const;

    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof CreateUserSchema>>({
      resolver: zodResolver(CreateUserSchema),
      defaultValues: {
        name: "",
        color: "red",
      },
    });

    const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
      setError("");

      try {
        await upsertUserHandler(values);

        nextTab();
      } catch {
        setError("エラーが発生しました。");
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <VStack className="space-y-12 px-2">
            <VStack className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザー名</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>テーマカラー</FormLabel>
                    <ScrollArea className="w-full">
                      <HStack className="space-x-4">
                        {colors.map((color, index) => (
                          <Button
                            key={index}
                            type="button"
                            className={cn(
                              "relative size-10 rounded-full",
                              `bg-${color.value}-600 hover:bg-${color.value}-600/90 dark:bg-${color.value}-600 dark:hover:bg-${color.value}-600/90`
                            )}
                            onClick={() => field.onChange(color.value)}
                          >
                            {field.value === color.value && (
                              <Check className="absolute inset-0 m-auto text-white" />
                            )}
                          </Button>
                        ))}
                      </HStack>
                      <ScrollBar orientation="horizontal" className="hidden" />
                    </ScrollArea>
                    <HStack className="items-center space-x-2">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        選択した色:
                      </span>
                      <span
                        className={cn("text-sm", `text-${field.value}-600`)}
                      >
                        {colors.find((c) => c.value === field.value)?.label ||
                          "未選択"}
                      </span>
                    </HStack>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <HStack className="space-x-1 rounded-md bg-red-100 p-3 text-sm text-red-500 dark:bg-red-500 dark:text-neutral-50">
                  <AlertCircle className="size-5" />
                  <span>{error}</span>
                </HStack>
              )}
            </VStack>
            <HStack className="w-full justify-end">
              <Button type="submit" variant="brand">
                {isLoadingUpsertUser && (
                  <Loader2 className="size-5 animate-spin" />
                )}
                <span>次へ</span>
              </Button>
            </HStack>
          </VStack>
        </form>
      </Form>
    );
  }
);

export default ProfileTab;
