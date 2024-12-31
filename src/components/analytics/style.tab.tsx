"use client";

import { ChartLine, ChartSpline, ChartScatter } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import { AnimationTiming } from "recharts/types/util/types";

import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Button } from "../ui/button";
import { cn } from "@/functions/tools";
import { Label } from "../ui/label";
import { ChartStyle } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type StyleTabProps = {
  style: ChartStyle;
  setStyle: Dispatch<SetStateAction<ChartStyle>>;
};

const StyleTab = memo(({ style, setStyle }: StyleTabProps) => (
  <ScrollArea className="h-full px-6 py-4">
    <VStack className="space-y-2">
      <Label className="text-xs">グラフ</Label>
      <HStack className="h-8 w-full rounded-lg border border-neutral-200 dark:border-neutral-800">
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none opacity-50 rounded-l-lg",
            style.type === "linear" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, type: "linear" })}
        >
          <ChartLine className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none opacity-50",
            style.type === "monotone" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, type: "monotone" })}
        >
          <ChartSpline className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none opacity-50 rounded-r-lg",
            style.type === "scatter" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, type: "scatter" })}
        >
          <ChartScatter className="size-3.5" />
        </Button>
      </HStack>
    </VStack>
    <VStack className="mt-6 w-full space-y-2">
      <Label className="text-xs">X軸</Label>
      <HStack className="h-8 w-full rounded-lg border border-neutral-200 dark:border-neutral-800">
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-l-lg",
            style.xAxis.type === "show" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, xAxis: { type: "show" } })}
        >
          表示
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50",
            style.xAxis.type === "hide" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, xAxis: { type: "hide" } })}
        >
          非表示
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-r-lg",
            style.xAxis.type === "custom" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, xAxis: { type: "custom" } })}
        >
          カスタム
        </Button>
      </HStack>
    </VStack>
    <HStack
      className={cn(
        "overflow-hidden transition-all duration-800 items-start space-x-4 px-1",
        style.xAxis.type === "custom" ? "h-[80px] pt-4" : "h-0"
      )}
    >
      <VStack className="w-full space-y-1">
        <Label className="text-2xs">最小値</Label>
        <Input
          placeholder="0"
          className="h-8 w-full !text-xs"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (isNaN(value)) {
              return;
            }
            setStyle({
              ...style,
              xAxis: { ...style.xAxis, min: value },
            });
          }}
        />
      </VStack>
      <VStack className="w-full space-y-1">
        <Label className="text-2xs">最大値</Label>
        <Input
          placeholder="100"
          className="h-8 w-full !text-xs"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (isNaN(value)) {
              return;
            }
            setStyle({
              ...style,
              xAxis: { ...style.xAxis, max: value },
            });
          }}
        />
      </VStack>
    </HStack>
    <VStack className="mt-6 w-full space-y-2">
      <Label className="text-xs">Y軸</Label>
      <HStack className="h-8 w-full rounded-lg border border-neutral-200  dark:border-neutral-800">
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-l-lg",
            style.yAxis.type === "show" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, yAxis: { type: "show" } })}
        >
          表示
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50",
            style.yAxis.type === "hide" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, yAxis: { type: "hide" } })}
        >
          非表示
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-r-lg",
            style.yAxis.type === "custom" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, yAxis: { type: "custom" } })}
        >
          カスタム
        </Button>
      </HStack>
    </VStack>
    <HStack
      className={cn(
        "overflow-hidden transition-all duration-800 items-start space-x-4 px-1",
        style.yAxis.type === "custom" ? "h-[80px] pt-4" : "h-0"
      )}
    >
      <VStack className="w-full space-y-1">
        <Label className="text-2xs">最小値</Label>
        <Input
          placeholder="00:00:00"
          className="h-8 w-full !text-xs"
          onChange={(e) => {
            const value = e.target.value;
            if (!value.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
              return;
            }

            setStyle({
              ...style,
              yAxis: { ...style.yAxis, min: e.target.value },
            });
          }}
        />
      </VStack>
      <VStack className="w-full space-y-1">
        <Label className="text-2xs">最大値</Label>
        <Input
          placeholder="23:59:59"
          className="h-8 w-full !text-xs"
          onChange={(e) => {
            const value = e.target.value;
            if (!value.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
              return;
            }

            setStyle({
              ...style,
              yAxis: { ...style.yAxis, max: e.target.value },
            });
          }}
        />
      </VStack>
    </HStack>
    <VStack className="mt-6 w-full space-y-2">
      <Label className="text-xs">グリッド</Label>
      <HStack className="h-8 w-full rounded-lg border border-neutral-200 dark:border-neutral-800">
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-l-lg",
            style.grid.horizontal &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() =>
            setStyle({
              ...style,
              grid: { ...style.grid, horizontal: !style.grid.horizontal },
            })
          }
        >
          水平
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50",
            style.grid.vertical &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() =>
            setStyle({
              ...style,
              grid: { ...style.grid, vertical: !style.grid.vertical },
            })
          }
        >
          垂直
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-r-lg",
            !(style.grid.horizontal || style.grid.vertical) &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() =>
            setStyle({
              ...style,
              grid: { horizontal: false, vertical: false },
            })
          }
        >
          なし
        </Button>
      </HStack>
    </VStack>
    <VStack className="mt-6 w-full space-y-2">
      <Label className="text-xs">アニメーション</Label>
      <HStack className="h-8 w-full rounded-lg border border-neutral-200  dark:border-neutral-800">
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-l-lg",
            style.animation.type === "enable" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, animation: { type: "enable" } })}
        >
          有効
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50",
            style.animation.type === "disable" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, animation: { type: "disable" } })}
        >
          無効
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-none text-2xs opacity-50 rounded-r-lg",
            style.animation.type === "custom" &&
              "!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-800 dark:!text-neutral-200 !opacity-100"
          )}
          onClick={() => setStyle({ ...style, animation: { type: "custom" } })}
        >
          カスタム
        </Button>
      </HStack>
    </VStack>
    <VStack
      className={cn(
        "overflow-hidden transition-all duration-800 space-y-4 px-1",
        style.animation.type === "custom" ? "h-[160px] pt-4" : "h-0"
      )}
    >
      <VStack className="w-full space-y-1">
        <Label className="text-2xs">時間</Label>
        <Input
          placeholder="1000"
          className="h-8 w-full !text-xs"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (isNaN(value)) {
              return;
            }
            setStyle({
              ...style,
              animation: { ...style.animation, duration: value },
            });
          }}
        />
      </VStack>
      <VStack className="w-full space-y-1 px-1">
        <Label className="text-2xs">種類</Label>
        <Select
          value={style.animation.easing}
          onValueChange={(value) =>
            setStyle({
              ...style,
              animation: {
                ...style.animation,
                easing: value as AnimationTiming,
              },
            })
          }
        >
          <SelectTrigger className="h-8 w-full !text-xs">
            <SelectValue placeholder="イベントを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">linear</SelectItem>
            <SelectItem value="ease">ease</SelectItem>
            <SelectItem value="ease-in">ease-in</SelectItem>
            <SelectItem value="ease-out">ease-out</SelectItem>
            <SelectItem value="ease-in-out">ease-in-out</SelectItem>
          </SelectContent>
        </Select>
      </VStack>
    </VStack>
  </ScrollArea>
));

export default StyleTab;
