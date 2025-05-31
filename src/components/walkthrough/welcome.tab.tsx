"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Button } from "../ui/button";

type WelcomeTabProps = {
  plantId: number | undefined;
  previousTab: () => void;
};

const WelcomeTab = ({ plantId, previousTab }: WelcomeTabProps) => {
  const router = useRouter();

  return (
    <VStack className="space-y-12">
      <VStack className="items-center space-y-6">
        <div className="rounded-full bg-brand-600 p-4">
          <Image width="48" height="48" src="/images/logo.png" alt="logo" />
        </div>
        <VStack className="space-y-4">
          <h2 className="text-center text-2xl font-bold">PlantDXへようこそ</h2>
          <VStack className="space-y-2">
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              セットアップが完了しました。
            </p>
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              プラントの管理を始めましょう。
            </p>
          </VStack>
        </VStack>
      </VStack>
      <HStack className="w-full justify-end space-x-3">
        <Button variant="outline" onClick={previousTab}>
          戻る
        </Button>
        <Button
          variant="brand"
          disabled={!plantId}
          onClick={() => {
            document.cookie = `plantId=${plantId}; path=/`;

            router.push(`/${plantId}/flow`);
            router.refresh();
          }}
        >
          はじめる
        </Button>
      </HStack>
    </VStack>
  );
};

export default WelcomeTab;
