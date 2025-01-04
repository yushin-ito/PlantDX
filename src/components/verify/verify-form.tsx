import { memo } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { HStack } from "../ui/hstack";
import { VerifyOTPSchema } from "@/schemas";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

type VerifyFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof VerifyOTPSchema>>>;
  onSubmit: (values: z.infer<typeof VerifyOTPSchema>) => void;
  error: string;
  isMutating: boolean;
};

const VerifyForm = memo(
  ({ form, onSubmit, error, isMutating }: VerifyFormProps) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <VStack className="space-y-4">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field} disabled={isMutating}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
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
          <span>送信する</span>
        </Button>
      </form>
    </Form>
  )
);

export default VerifyForm;
