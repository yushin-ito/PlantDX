"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, memo, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CreatePlantSchema } from "@/schemas";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { getDevices } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";

type CreatePlantModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createPlantHandler: (values: z.infer<typeof CreatePlantSchema>) => Promise<void>;
  isLoadingCreatePlant: boolean;
};

const CreatePlantModal = memo(
  ({
    isOpen,
    setIsOpen,
    createPlantHandler,
    isLoadingCreatePlant,
  }: CreatePlantModalProps) => {
    const [error, setError] = useState("");

    const supabase = createBrowserClient();

    const form = useForm<z.infer<typeof CreatePlantSchema>>({
      resolver: zodResolver(CreatePlantSchema),
      defaultValues: {
        name: "",
        deviceId: "",
        template: "none",
      },
    });

    const onSubmit = async (values: z.infer<typeof CreatePlantSchema>) => {
      setError("");

      try {
        const devices = await getDevices(supabase, "deviceId", values.deviceId);

        if (!devices.data || devices.data.length === 0) {
          setError("デバイスが見つかりません。");
          return;
        }

        await createPlantHandler(values);

        toast.success("プラントを作成しました");
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
              <DialogTitle>プラントの作成</DialogTitle>
              <DialogDescription className="text-xs">
                プラントのIDを入力してプラントを作成しましょう。
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
                          <FormLabel>プラント名</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deviceId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>デバイス番号</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="template"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>テンプレート</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="テンプレートを選択" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">使用しない</SelectItem>
                              <SelectItem value="bdf">
                                BDF製造プラント
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
                        {isLoadingCreatePlant && (
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

export default CreatePlantModal;
