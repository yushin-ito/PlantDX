import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { memo } from "react";

import { CreateControlSchema } from "@/schemas";
import { ScrollArea } from "../ui/scroll-area";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CreateControlFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof CreateControlSchema>>>;
  onSubmit: (values: z.infer<typeof CreateControlSchema>) => void;
  onCancel: () => void;
  error: string;
  isMutating: boolean;
};

const CreateControlForm = memo(
  ({ form, onSubmit, onCancel, error, isMutating }: CreateControlFormProps) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-[240px] pl-2 pr-4">
          <VStack className="space-y-6 pb-4">
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
                      <SelectItem value="open-close">開 / 閉</SelectItem>
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
            <FormField
              control={form.control}
              name="command"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>コマンド</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
        </ScrollArea>
        <HStack className="items-center justify-end space-x-3 pr-4 pt-4">
          <Button variant="outline" onClick={onCancel}>
            キャンセル
          </Button>
          <Button type="submit" variant="brand">
            {isMutating && <Loader2 className="size-5 animate-spin" />}
            <span>作成する</span>
          </Button>
        </HStack>
      </form>
    </Form>
  )
);

export default CreateControlForm;
