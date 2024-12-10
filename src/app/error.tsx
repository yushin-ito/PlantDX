"use client";

import Link from "next/link";
import { Fragment } from "react";

import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/functions/tools";

const ErrorPage = ({ reset }: { reset: () => void }) => (
  <Fragment>
    <title>エラーが発生しました | PlantDX</title>
    <Center className="h-screen w-full">
      <VStack className="items-center space-y-20">
        <VStack className="items-center space-y-6">
          <h1 className="text-2xl font-semibold">
            予期せぬエラーが発生しました。
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            もう一度お試しいただくか、時間をおいてアクセスしてください。
          </p>
        </VStack>
        <Link
          href="/"
          onClick={reset}
          className={cn(
            buttonVariants({ variant: "brand" }),
            "h-12 rounded-full px-16"
          )}
        >
          フローに戻る
        </Link>
      </VStack>
    </Center>
  </Fragment>
);

export default ErrorPage;
