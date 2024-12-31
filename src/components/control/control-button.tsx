"use client";

import { Ellipsis, Power, PowerOff } from "lucide-react";
import { cva } from "class-variance-authority";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useRef } from "react";

import { Center } from "../ui/center";
import { VStack } from "../ui/vstack";
import { ControlEvent, ControlStatus } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/functions/tools";

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

const controlButtonVariants = cva(
  "relative w-[150px] origin-center rounded-xl p-4 shadow-sm sm:w-[160px]",
  {
    variants: {
      variant: {
        active:
          "bg-green-200 hover:bg-green-200/90 dark:bg-green-500 dark:hover:bg-green-500/90",
        inactive:
          "bg-red-200 hover:bg-red-200/90 dark:bg-red-500 dark:hover:bg-red-500/90",
        pending:
          "bg-neutral-200 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-800/90",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

const controlButtonIconVariants = cva(
  "size-8 rounded-full text-neutral-50 sm:size-9",
  {
    variants: {
      variant: {
        active: "bg-green-500 dark:bg-green-600",
        inactive: "bg-red-500 dark:bg-red-600",
        pending: "bg-neutral-500 dark:bg-neutral-900",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

type ControlButtonProps = {
  controlId: number;
  name: string;
  status: ControlStatus;
  event: ControlEvent;
  onClick: () => void;
  onOpen: () => void;
  className?: string;
  isDraggable?: boolean;
};

const ControlButton = memo(
  ({
    controlId,
    name,
    status,
    event,
    onClick,
    onOpen,
    className,
    isDraggable,
  }: ControlButtonProps) => {
    const controlButtonWrapper = useRef<HTMLDivElement | null>(null);
    const {
      isDragging,
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: controlId.toString() });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition,
    };

    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          controlButtonWrapper.current = node;
        }}
        className={cn(
          className,
          controlButtonVariants({ variant: status }),
          isDraggable ? "cursor-grab" : "cursor-pointer",
          isDragging && "opacity-40"
        )}
        {...(isDraggable && attributes)}
        {...(isDraggable && listeners)}
        style={style}
      >
        <VStack
          className="space-y-2.5 sm:space-y-4"
          onClick={() => isDraggable && onClick()}
          onMouseEnter={() => {
            if (controlButtonWrapper.current) {
              controlButtonWrapper.current.classList.add("active:scale-[0.98]");
            }
          }}
          onMouseLeave={() => {
            if (controlButtonWrapper.current) {
              controlButtonWrapper.current.classList.remove(
                "active:scale-[0.98]"
              );
            }
          }}
        >
          <Center className={controlButtonIconVariants({ variant: status })}>
            {status === "active" ? (
              <Power className="size-[18px] sm:size-5" strokeWidth={2.5} />
            ) : (
              <PowerOff className="size-4 sm:size-[18px]" strokeWidth={2.5} />
            )}
          </Center>
          <VStack className="ml-0.5 space-y-px sm:space-y-0.5">
            <h3 className="text-md font-bold">{labels[event][status]}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-100">
              {name}
            </p>
          </VStack>
        </VStack>
        <Button
          variant="unstyled"
          className="absolute right-4 top-3 size-5 rounded-full bg-neutral-50 p-0 hover:bg-neutral-100 sm:size-6"
          onClick={onOpen}
        >
          <Ellipsis className="size-4 text-brand-900 sm:size-[18px]" />
        </Button>
      </div>
    );
  }
);

export default ControlButton;
