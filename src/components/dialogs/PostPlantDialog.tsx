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
import { PlantSchema } from "@/schemas";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

type PostPlantDialogProps = {
  onSubmit: (values: z.infer<typeof PlantSchema>) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const PostPlantDialog = ({
  onSubmit,
  isOpen,
  setIsOpen,
}: PostPlantDialogProps) => {
  const form = useForm<z.infer<typeof PlantSchema>>({
    resolver: zodResolver(PlantSchema),
    defaultValues: {
      name: "",
      template: "none",
    },
  });

  const error = "";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <VStack className="space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle>プラントの作成</DialogTitle>
            <DialogDescription className="text-xs">
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
                              <SelectItem value="none">使用しない</SelectItem>
                              <SelectItem value="bdf">
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

export default PostPlantDialog;
