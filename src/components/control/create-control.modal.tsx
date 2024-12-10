"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, memo, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CreateControlSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

type CreateControlModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createControlHandler: (values: z.infer<typeof CreateControlSchema>) => Promise<void>;
  isLoadingCreateControl: boolean;
};

const CreateControlModal = memo(
  ({
    isOpen,
    setIsOpen,
    createControlHandler,
    isLoadingCreateControl,
  }: CreateControlModalProps) => {
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof CreateControlSchema>>({
      resolver: zodResolver(CreateControlSchema),
      defaultValues: {
        name: "",
        type: "manual",
        event: "on-off",
      },
    });

    const onSubmit = async (values: z.infer<typeof CreateControlSchema>) => {
      setError("");

      try {
        await createControlHandler(values);

        toast.success("コントロールを作成しました");
        setIsOpen(false);

        form.reset();
      } catch {
        setError("エラーが発生しました。");
      }
    };

    return (
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          form.reset();
        }}
      >
        <DialogContent>
          <VStack className="space-y-6">
            <DialogHeader className="space-y-2">
              <DialogTitle>コントロールの作成</DialogTitle>
              <DialogDescription className="text-xs">
                コマンドを入力してコントロールを作成しましょう。
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <VStack className="space-y-12 px-2">
                  <VStack className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>コントロール名</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>タイプ</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="タイプを選択" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="auto">自動</SelectItem>
                              <SelectItem value="manual">手動</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="event"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>イベント</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="イベントを選択" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="on-off">ON / OFF</SelectItem>
                              <SelectItem value="open-close">
                                開 / 閉
                              </SelectItem>
                              <SelectItem value="enable-disable">
                                有効 / 無効
                              </SelectItem>
                              <SelectItem value="connect-disconnect">
                                接続 / 切断
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {error && (
                      <HStack className="space-x-1 rounded-md bg-red-100 p-3 text-sm text-red-500 dark:bg-red-500 dark:text-white">
                        <AlertCircle className="size-5" />
                        <span>{error}</span>
                      </HStack>
                    )}
                  </VStack>
                  <DialogFooter>
                    <HStack className="items-center space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsOpen(false);
                          form.reset();
                        }}
                      >
                        キャンセル
                      </Button>
                      <Button type="submit" variant="brand">
                        {isLoadingCreateControl && (
                          <Loader2 className="size-5 animate-spin" />
                        )}
                        <span>作成する</span>
                      </Button>
                    </HStack>
                  </DialogFooter>
                </VStack>
              </form>
            </Form>
          </VStack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default CreateControlModal;
