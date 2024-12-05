"use client";

import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
} from "../ui/multi-select";
import { SensorSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

type PostSensorDialogProps = {
  onSubmit: (values: z.infer<typeof SensorSchema>) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const PostSensorDialog = ({
  onSubmit,
  isOpen,
  setIsOpen,
}: PostSensorDialogProps) => {
  const form = useForm<z.infer<typeof SensorSchema>>({
    resolver: zodResolver(SensorSchema),
    defaultValues: {
      name: "",
      type: [],
    },
  });

  const error = "";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <VStack className="space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle>センサーの作成</DialogTitle>
            <DialogDescription className="text-xs">
              センサーのIDを入力してセンサーを作成しましょう。
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <VStack className="space-y-12">
                <VStack className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>センサー名</FormLabel>
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
                        <FormControl>
                          <MultiSelect
                            onValueChange={(value) => field.onChange(value)}
                            {...field}
                          >
                            <MultiSelectTrigger placeholder="センサーを選択" />
                            <MultiSelectContent>
                              <MultiSelectItem
                                value="temperature"
                                label="温度"
                              />
                              <MultiSelectItem value="humidity" label="湿度" />
                              <MultiSelectItem value="pressure" label="圧力" />
                              <MultiSelectItem value="volume" label="容量" />
                            </MultiSelectContent>
                          </MultiSelect>
                        </FormControl>
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
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      キャンセル
                    </Button>
                    <Button type="submit" variant="brand">
                      作成する
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
};

export default PostSensorDialog;
