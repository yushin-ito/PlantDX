import Link from "next/link";
import { Fragment } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@/functions/tools";

const NotFoundPage = () => (
  <Fragment>
    <title>ページが見つかりません | PlantDX</title>
    <Center className="h-screen w-full">
      <VStack className="items-center space-y-20">
        <VStack className="items-center space-y-6">
          <h1 className="text-2xl font-semibold">
            ご指定のページが見つかりません。
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            URLが変更されたか、削除された可能性があります。
          </p>
        </VStack>
        <Link
          href="/"
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

export default NotFoundPage;
