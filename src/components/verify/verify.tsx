"use client";

import { memo, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Card } from "../ui/card";
import { verifyOtp } from "@/actions/auth";
import { VerifyOTPSchema } from "@/schemas";
import VerifyForm from "./verify-form";

const Verify = memo(() => {
  const router = useRouter();

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof VerifyOTPSchema>>({
    resolver: zodResolver(VerifyOTPSchema),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = (values: z.infer<typeof VerifyOTPSchema>) => {
    setError("");

    startTransition(async () => {
      try {
        const email = sessionStorage.getItem("email");

        if (email) {
          const { error } = await verifyOtp(email, values.token);

          if (error) {
            setError("エラーが発生しました。");
            return;
          }

          sessionStorage.removeItem("email");

          router.push("/walkthrough");
          router.refresh();
        }
      } catch {
        setError("エラーが発生しました。");
      }
    });
  };

  return (
    <Center className="h-full">
      <Card className="p-6 sm:w-[400px] sm:px-8">
        <VStack className="w-full space-y-6">
          <VStack className="items-center space-y-4">
            <h1 className="text-xl font-bold">ワンタイムパスワード</h1>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-300">
              登録したメールアドレスに確認メールを送信しました。メール内のワンタイムパスワードを入力して登録を完了してください。
            </p>
          </VStack>
          <VerifyForm
            form={form}
            onSubmit={onSubmit}
            error={error}
            isMutating={isPending}
          />
        </VStack>
      </Card>
    </Center>
  );
});

export default Verify;
