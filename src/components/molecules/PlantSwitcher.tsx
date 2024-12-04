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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import VStack from "../atoms/VStack";
import { PlantSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import HStack from "../atoms/HStack";

const plants = [
  {
    id: 1,
    name: "プラント1",
  },
];

const PlantSwitcher = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selected, setSelected] = useState(plants[0]);

  const form = useForm<z.infer<typeof PlantSchema>>({
    resolver: zodResolver(PlantSchema),
    defaultValues: {
      name: "",
      template: "none",
    },
  });

  const error = "";

  const onSubmit = (values: z.infer<typeof PlantSchema>) => {
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
            className="h-9 w-[200px] justify-between text-xs"
          >
            <span>{selected.name}</span>
            <ChevronsUpDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="プラントを検索"
              className="placeholder:text-xs"
            />
            <CommandList>
              <CommandEmpty>プラントが見つかりません</CommandEmpty>
              {plants.map((plant) => (
                <CommandGroup key={plant.id}>
                  <CommandItem
                    onSelect={() => {
                      setSelected(plant);
                      setIsOpenPopover(false);
                    }}
                    className="flex justify-between text-xs"
                  >
                    {plant.name}
                    <Check
                      className={
                        selected.id === plant.id ? "opacity-100" : "opacity-0"
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
                    プラントを追加
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
            <DialogTitle>プラントの作成</DialogTitle>
            <DialogDescription>
              プラントのIDを入力してプラントを作成しましょう。
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
                    name="template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>テンプレート</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="テンプレートを選択" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none" className="font-medium">
                                使用しない
                              </SelectItem>
                              <SelectItem value="bdf" className="font-medium">
                                BDF製造プラント
                              </SelectItem>
                            </SelectContent>
                          </Select>
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

export default PlantSwitcher;
