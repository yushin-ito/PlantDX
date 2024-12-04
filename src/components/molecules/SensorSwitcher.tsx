"use client";

import * as React from "react";
import { AlertCircle, Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import VStack from "../atoms/VStack";
import { SensorSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import HStack from "../atoms/HStack";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
} from "../ui/multi-select";

const sensors = [
  {
    sensorId: 1,
    name: "MEOHタンク",
  },
];

const SensorSwitcher = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selected, setSelected] = useState(sensors[0]);

  const form = useForm<z.infer<typeof SensorSchema>>({
    resolver: zodResolver(SensorSchema),
    defaultValues: {
      name: "",
      type: [],
    },
  });

  const error = "";

  const onSubmit = (values: z.infer<typeof SensorSchema>) => {
    console.log(values);
    setIsOpenDialog(false);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-expanded={isOpenPopover}
            className="w-[200px] justify-between py-2 text-xs"
          >
            <span>{selected.name}</span>
            <ChevronsUpDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="センサーを検索"
              className="placeholder:text-xs"
            />
            <CommandList>
              <CommandEmpty>センサーが見つかりません</CommandEmpty>
              {sensors.map((sensor, index) => (
                <CommandGroup key={index}>
                  <CommandItem
                    onSelect={() => {
                      setSelected(sensor);
                      setIsOpenPopover(false);
                    }}
                    className="flex justify-between text-xs"
                  >
                    {sensor.name}
                    <Check
                      className={
                        selected.sensorId === sensor.sensorId
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    />
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setIsOpenPopover(false);
                      setIsOpenDialog(true);
                    }}
                    className="text-xs"
                  >
                    <PlusCircle className="size-4" />
                    センサーを追加
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <VStack className="space-y-6">
          <DialogHeader>
            <DialogTitle>センサーの作成</DialogTitle>
            <DialogDescription>
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
                      <FormItem >
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
                  <Button
                    variant="outline"
                    onClick={() => setIsOpenDialog(false)}
                  >
                    キャンセル
                  </Button>
                  <Button type="submit" variant="brand">
                    作成する
                  </Button>
                </DialogFooter>
              </VStack>
            </form>
          </Form>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};

export default SensorSwitcher;
