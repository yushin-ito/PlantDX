import { Power, PowerOff } from "lucide-react";
import { cva } from "class-variance-authority";

import { Center } from "../ui/center";
import { VStack } from "../ui/vstack";
import { Button } from "../ui/button";
import { ControlEvent, ControlStatus } from "@/types";

const labels = {
  "on-off": {
    active: "オン",
    inactive: "オフ",
    pending: "停止中",
  },
  "open-close": {
    active: "開",
    inactive: "閉",
    pending: "停止中",
  },
  "enable-disable": {
    active: "有効",
    inactive: "無効",
    pending: "停止中",
  },
  "connect-disconnect": {
    active: "接続",
    inactive: "切断",
    pending: "停止中",
  },
};

const controlButtonVariants = cva("w-40 space-y-4 rounded-xl p-4 shadow-sm", {
  variants: {
    variant: {
      active: "bg-green-100 hover:bg-green-100/90",
      inactive: "bg-red-100 hover:bg-red-100/90",
      pending: "bg-neutral-100 hover:bg-neutral-100/90",
    },
  },
  defaultVariants: {
    variant: "pending",
  },
});

const controlButtonIconVariants = cva("size-9 rounded-full", {
  variants: {
    variant: {
      active: "bg-green-500",
      inactive: "bg-red-500",
      pending: "bg-neutral-500",
    },
  },
  defaultVariants: {
    variant: "pending",
  },
});

type ControlButtonProps = {
  name: string;
  status: ControlStatus;
  event: ControlEvent;
  onClick: () => void;
};

const ControlButton = ({
  name,
  status,
  event,
  onClick,
}: ControlButtonProps) => (
  <Button variant="unstyled" onClick={onClick}>
    <VStack
      className={controlButtonVariants({ variant: status })}
      onClick={onClick}
    >
      <Center className={controlButtonIconVariants({ variant: status })}>
        {status ? (
          <Power className="size-5 text-white" />
        ) : (
          <PowerOff className="size-5 text-white" />
        )}
      </Center>
      <VStack className="space-y-[2px]">
        <h3 className="font-bold">{labels[event][status]}</h3>
        <p className="text-xs text-gray-500">{name}</p>
      </VStack>
    </VStack>
  </Button>
);

export default ControlButton;
