import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { memo } from "react";

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
import { UpdateControlSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { ScrollArea } from "../ui/scroll-area";

type UpdateControlFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof UpdateControlSchema>>>;
  onSubmit: (values: z.infer<typeof UpdateControlSchema>) => void;
  onCancel: () => void;
  error: string;
  isLoading: boolean;
};

const UpdateControlForm = memo(
  ({ form, onSubmit, onCancel, error, isLoading }: UpdateControlFormProps) => (
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
            {isLoading && <Loader2 className="size-5 animate-spin" />}
            <span>更新する</span>
          </Button>
        </HStack>
      </form>
    </Form>
  )
);

export default UpdateControlForm;
