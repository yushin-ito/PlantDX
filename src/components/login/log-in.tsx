"use client";

import { memo, useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { LogInSchema } from "@/schemas";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Card } from "../ui/card";
import { signIn } from "@/actions/auth";
import LogInForm from "./log-in-form";

const LogIn = memo(() => {
  const router = useRouter();

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LogInSchema>) => {
    setError("");

    startTransition(async () => {
      try {
        const { error } = await signIn(values.email, values.password);

        if (error) {
          setError("エラーが発生しました。");
          return;
        }

        toast.success("ログインしました");

        router.push("/");
        router.refresh();
      } catch {
        setError("エラーが発生しました。");
      }
    });
  };

  return (
    <Center className="h-full">
      <Card className="p-6 sm:w-[400px] sm:px-8">
        <VStack className="w-full space-y-6">
          <div className="text-center text-xl font-bold">ログイン</div>
          <LogInForm
            form={form}
            onSubmit={onSubmit}
            error={error}
            isMutating={isPending}
          />
          <HStack className="justify-center space-x-px align-middle">
            <div className="text-sm">アカウントをお持ちでない場合は</div>
            <Link href="/signup" className="text-sm text-brand-600">
              こちら
            </Link>
          </HStack>
        </VStack>
      </Card>
    </Center>
  );
});

export default LogIn;
