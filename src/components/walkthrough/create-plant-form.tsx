import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { memo } from "react";

import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
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

type CreatePlantFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof CreatePlantSchema>>>;
  onSubmit: (values: z.infer<typeof CreatePlantSchema>) => void;
  onCancel: () => void;
  error: string;
  isLoading: boolean;
};

const CreatePlantForm = memo(
  ({ form, onSubmit, onCancel, error, isLoading }: CreatePlantFormProps) => (
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
          <DialogFooter>
            <HStack className="items-center space-x-3">
              <Button variant="outline" onClick={onCancel}>
                キャンセル
              </Button>
              <Button type="submit" variant="brand">
                {isLoading && <Loader2 className="size-5 animate-spin" />}
                <span>作成する</span>
              </Button>
            </HStack>
          </DialogFooter>
        </VStack>
      </form>
    </Form>
  )
);

export default CreatePlantForm;
