"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, EyeOffIcon, EyeIcon, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Card, CardContent } from "../ui/card";
import { signUp } from "@/actions/auth";
import { SignUpSchema } from "@/schemas";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
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
        const { error } = await signUp(values.email, values.password);

        if (error) {
          setError("エラーが発生しました。");
          return;
        }

        toast.success("確認メールを送信しました。");
        router.push("/verify");
        router.refresh();
      } catch {
        setError("エラーが発生しました。");
      }
    });
  };

  return (
    <Center className="size-full">
      <Card>
        <CardContent className="w-[400px] py-6">
          <VStack className="w-full space-y-6">
            <div className="text-center text-xl font-bold">新規登録</div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12"
              >
                <VStack className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isPending} />
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
                              disabled={isPending}
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
                  disabled={isPending}
                >
                  {isPending && <Loader2 className="size-5 animate-spin" />}
                  <span>はじめる</span>
                </Button>
              </form>
            </Form>

            <HStack className="justify-center space-x-px align-middle">
              <div className="text-sm">既にアカウントをお持ちの場合は</div>
              <Link href="/signup" className="text-sm text-brand-600">
                こちら
              </Link>
            </HStack>
          </VStack>
        </CardContent>
      </Card>
    </Center>
  );
};

export default SignUp;
