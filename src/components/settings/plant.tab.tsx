"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
import { UpdatePlantSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { getDevices } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";
import { Plant } from "@/types";
import { Separator } from "../ui/separator";

type PlnatTabProps = {
  plant: Plant["Row"] | null;
  updatePlantHandler: (
    values: z.infer<typeof UpdatePlantSchema>
  ) => Promise<void>;
  isLoadingUpdatePlant: boolean;
};

const PlnatTab = memo(
  ({ plant, updatePlantHandler, isLoadingUpdatePlant }: PlnatTabProps) => {
    const [error, setError] = useState("");

    const supabase = createBrowserClient();

    const form = useForm<z.infer<typeof UpdatePlantSchema>>({
      resolver: zodResolver(UpdatePlantSchema),
      defaultValues: {
        name: "",
        deviceId: "",
      },
    });

    useEffect(() => {
      if (plant) {
        form.reset({
          name: plant.name,
          deviceId: plant.deviceId,
        });
      }
    }, [form, plant]);

    const onSubmit = async (values: z.infer<typeof UpdatePlantSchema>) => {
      setError("");

      try {
        const devices = await getDevices(supabase, "deviceId", values.deviceId);

        if (!devices.data || devices.data.length === 0) {
          setError("デバイスが見つかりません。");
          return;
        }

        await updatePlantHandler(values);

        toast.success("プラントを更新しました。");

        form.reset();
      } catch {
        setError("エラーが発生しました。");
      }
    };

    return (
      <VStack className="space-y-6 px-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <VStack className="space-y-12 px-2">
              <VStack>
                <VStack>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex h-[120px] flex-col justify-center">
                        <HStack className="items-center justify-between">
                          <FormLabel>プラント名</FormLabel>
                          <FormControl>
                            <Input className="w-[500px]" {...field} />
                          </FormControl>
                        </HStack>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                </VStack>
                <VStack>
                  <FormField
                    control={form.control}
                    name="deviceId"
                    render={({ field }) => (
                      <FormItem className="flex h-[120px] flex-col justify-center">
                        <HStack className="items-center justify-between">
                          <FormLabel>デバイス番号</FormLabel>
                          <FormControl>
                            <Input className="w-[500px]" {...field} />
                          </FormControl>
                        </HStack>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                </VStack>

                {error && (
                  <HStack className="space-x-1 rounded-md bg-red-100 p-3 text-sm text-red-500 dark:bg-red-500 dark:text-white">
                    <AlertCircle className="size-5" />
                    <span>{error}</span>
                  </HStack>
                )}
              </VStack>
              <HStack className="w-full items-center justify-end space-x-3">
                <Button variant="outline" onClick={() => form.reset()}>
                  キャンセル
                </Button>
                <Button type="submit" variant="brand">
                  {isLoadingUpdatePlant && (
                    <Loader2 className="size-5 animate-spin" />
                  )}
                  <span>更新する</span>
                </Button>
              </HStack>
            </VStack>
          </form>
        </Form>
      </VStack>
    );
  }
);

export default PlnatTab;
