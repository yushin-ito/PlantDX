"use client";

import { memo, useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Card } from "../ui/card";
import { signUp } from "@/actions/auth";
import { SignUpSchema } from "@/schemas";
import SignUpForm from "./sign-up-form";

const SignUp = memo(() => {
  const router = useRouter();

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setError("");

    startTransition(async () => {
      try {
        const { data, error } = await signUp(values.email, values.password);

        if (error) {
          setError("エラーが発生しました。");
          return;
        }

        if (data && data.user) {
          console.log(data.user.user_metadata);

          if (
            data.user.identities?.length === 0 &&
            !("email_verified" in data.user.user_metadata)
          ) {
            setError("既に登録されています。");
            return;
          }
        }

        console.log(data);

        sessionStorage.setItem("email", values.email);

        router.push("/verify");
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
          <h1 className="text-center text-xl font-bold">新規登録</h1>
          <SignUpForm
            form={form}
            onSubmit={onSubmit}
            error={error}
            isMutating={isPending}
          />
          <HStack className="justify-center space-x-px align-middle">
            <div className="text-sm">既にアカウントをお持ちの場合は</div>
            <Link href="/login" className="text-sm text-brand-600">
              こちら
            </Link>
          </HStack>
        </VStack>
      </Card>
    </Center>
  );
});

export default SignUp;
