import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { memo } from "react";

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
import { ScrollArea } from "../ui/scroll-area";

const labels: Record<SensorType, string> = {
  temperature: "温度",
  humidity: "湿度",
  pressure: "圧力",
  volume: "容量",
};

type CreateNodeFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof CreateNodeSchema>>>;
  onSubmit: (values: z.infer<typeof CreateNodeSchema>) => void;
  onCancel: () => void;
  error: string;
  isLoading: boolean;
};

const CreateNodeForm = memo(
  ({ form, onSubmit, onCancel, error, isLoading }: CreateNodeFormProps) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-[240px] pl-2 pr-4">
          <VStack className="space-y-6 pb-4">
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
              name="types"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイプ</FormLabel>
                  <FormControl>
                    <MultiSelect onValueChange={field.onChange} {...field}>
                      <MultiSelectTrigger placeholder="センサーを選択" />
                      <MultiSelectContent>
                        <MultiSelectItem value="temperature" label="温度" />
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
            {form.getValues("types").map((type, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`sensorId.${type}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labels[type]}センサー番号</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {error && (
              <HStack className="space-x-1 rounded-md bg-red-100 p-3 text-sm text-red-500 dark:bg-red-500 dark:text-neutral-50">
                <AlertCircle className="size-5" />
                <span>{error}</span>
              </HStack>
            )}
          </VStack>
        </ScrollArea>

        <HStack className="items-center justify-end space-x-3 pr-4 pt-4">
          <Button variant="outline" onClick={onCancel}>
            キャンセル
          </Button>
          <Button type="submit" variant="brand">
            {isLoading && <Loader2 className="size-5 animate-spin" />}
            <span>作成する</span>
          </Button>
        </HStack>
      </form>
    </Form>
  )
);

export default CreateNodeForm;
