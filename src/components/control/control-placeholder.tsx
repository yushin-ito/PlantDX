import { Dispatch, SetStateAction } from "react";

import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { VStack } from "../ui/vstack";

type ControlPlaceholderProps = {
  onOpenCreateControlSheet: Dispatch<SetStateAction<boolean>>;
};

const ControlPlaceholder = ({
  onOpenCreateControlSheet,
}: ControlPlaceholderProps) => (
  <Center className="size-full">
    <VStack className="w-full items-center space-y-12">
      <VStack className="space-y-2">
        <h3 className="text-xl font-semibold">コントロールがありません</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          下のボタンからコントロールを作成しましょう。
        </p>
      </VStack>
      <Button
        variant="brand"
        className="rounded-full px-16"
        onClick={() => onOpenCreateControlSheet(true)}
      >
        作成する
      </Button>
    </VStack>
  </Center>
);

export default ControlPlaceholder;
