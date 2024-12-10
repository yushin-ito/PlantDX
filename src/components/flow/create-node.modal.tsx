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
import { CreateNodeSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { SensorType } from "@/types";

const labels: Record<SensorType, string> = {
  temperature: "温度",
  humidity: "湿度",
  pressure: "圧力",
  volume: "容量",
};

type CreateNodeModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createNodeHandler: (values: z.infer<typeof CreateNodeSchema>) => Promise<void>;
  isLoadingCreateNode: boolean;
};

const CreateNodeModal = memo(
  ({
    isOpen,
    setIsOpen,
    createNodeHandler,
    isLoadingCreateNode,
  }: CreateNodeModalProps) => {
    const [error, setError] = useState("");
    const [selected, setSelected] = useState<string[]>([]);

    const form = useForm<z.infer<typeof CreateNodeSchema>>({
      resolver: zodResolver(CreateNodeSchema),
      defaultValues: {
        name: "",
        type: [],
        command: {
          temperature: "",
          humidity: "",
          pressure: "",
          volume: "",
        },
      },
    });

    const onSubmit = async (values: z.infer<typeof CreateNodeSchema>) => {
      setError("");

      try {
        await createNodeHandler(values);

        toast.success("ノードを作成しました");
        setIsOpen(false);

        form.reset();
        setSelected([]);
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
          setSelected([]);
        }}
      >
        <DialogContent>
          <VStack className="space-y-6">
            <DialogHeader className="space-y-2">
              <DialogTitle>ノードの作成</DialogTitle>
              <DialogDescription className="text-xs">
                センサーを選択してノードを作成しましょう。
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <VStack className="space-y-12 px-2">
                  <VStack className="hidden-scrollbar h-52 space-y-6 overflow-y-auto">
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
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelected(value);
                              }}
                              {...field}
                            >
                              <MultiSelectTrigger placeholder="センサーを選択" />
                              <MultiSelectContent>
                                <MultiSelectItem
                                  value="temperature"
                                  label="温度"
                                />
                                <MultiSelectItem
                                  value="humidity"
                                  label="湿度"
                                />
                                <MultiSelectItem
                                  value="pressure"
                                  label="圧力"
                                />
                                <MultiSelectItem value="volume" label="容量" />
                              </MultiSelectContent>
                            </MultiSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {Object.entries(labels).map(
                      ([key, label]) =>
                        selected.includes(key) && (
                          <FormField
                            key={key}
                            control={form.control}
                            name={`command.${
                              key as
                                | "temperature"
                                | "humidity"
                                | "pressure"
                                | "volume"
                            }`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{label}コマンド</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )
                    )}
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
                          setSelected([]);
                        }}
                      >
                        キャンセル
                      </Button>
                      <Button type="submit" variant="brand">
                        {isLoadingCreateNode && (
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

export default CreateNodeModal;
