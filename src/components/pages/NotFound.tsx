import Link from "next/link";

import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { VStack } from "../ui/vstack";

const NotFound = () => {
  return (
    <Center className="size-full">
      <VStack className="items-center space-y-20">
        <VStack className="items-center space-y-6">
          <h1 className="text-2xl font-semibold">
            ご指定のページが見つかりません。
          </h1>
          <p className="text-sm">
            URLが変更されたか、削除された可能性があります。
          </p>
        </VStack>
        <Link href="/home">
          <Button variant="brand" className="h-12 rounded-full px-16">
            ホームに戻る
          </Button>
        </Link>
      </VStack>
    </Center>
  );
};

export default NotFound;
