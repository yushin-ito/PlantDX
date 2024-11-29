import Link from "next/link";

import Center from "@/components/atoms/Center";
import VStack from "@/components/atoms/VStack";

const NotFoundPage = () => {
  return (
    <Center className="size-full">
      <VStack className="items-center space-y-20">
        <VStack className="items-center space-y-10">
          <h1 className="text-3xl font-semibold">
            ご指定のページが見つかりません。
          </h1>
          <p className="text-sm text-gray-600">
            URLが変更されたか、削除された可能性があります。
          </p>
        </VStack>
        <Link href="/" className="w-auto">
          <Center className="rounded-full bg-brand-600 px-12 py-4 text-sm text-white hover:bg-brand-700 active:bg-brand-800">
            トップページに戻る
          </Center>
        </Link>
      </VStack>
    </Center>
  );
};

export default NotFoundPage;
