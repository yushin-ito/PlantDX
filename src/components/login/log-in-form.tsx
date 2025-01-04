"use client";

import { Loader2, EyeOffIcon, EyeIcon, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { memo, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { LogInSchema } from "@/schemas";

type LogInFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof LogInSchema>>>;
  onSubmit: (values: z.infer<typeof LogInSchema>) => void;
  error: string;
  isMutating: boolean;
};

const LogInForm = memo(
  ({ form, onSubmit, error, isMutating }: LogInFormProps) => {
    const [visible, setVisible] = useState(false);

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <VStack className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isMutating} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={visible ? "text" : "password"}
                        {...field}
                        disabled={isMutating}
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3"
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? (
                          <EyeOffIcon className="size-5 text-gray-300" />
                        ) : (
                          <EyeIcon className="size-5 text-gray-300" />
                        )}
                      </div>
                    </div>
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

          <Button
            type="submit"
            variant="brand"
            className="w-full"
            disabled={isMutating}
          >
            {isMutating && <Loader2 className="size-5 animate-spin" />}
            <span>ログイン</span>
          </Button>
        </form>
      </Form>
    );
  }
);

export default LogInForm;
