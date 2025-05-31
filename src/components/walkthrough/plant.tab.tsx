import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { memo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
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
import { CreatePlantSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { getDevices } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";

type PlantTabProps = {
  nextTab: () => void;
  previousTab: () => void;
  upsertPlantHandler: (
    values: z.infer<typeof CreatePlantSchema>
  ) => Promise<void>;
  isLoadingUpsertPlant: boolean;
};

const PlantTab = memo(
  ({
    nextTab,
    previousTab,
    upsertPlantHandler,
    isLoadingUpsertPlant,
  }: PlantTabProps) => {
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

        await upsertPlantHandler(values);

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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="テンプレートを選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">使用しない</SelectItem>
                        <SelectItem value="bdf">BDF製造プラント</SelectItem>
                      </SelectContent>
                    </Select>
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
            <HStack className="w-full justify-end space-x-3">
              <Button variant="outline" onClick={previousTab}>
                戻る
              </Button>
              <Button type="submit" variant="brand">
                {isLoadingUpsertPlant && (
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

export default PlantTab;
