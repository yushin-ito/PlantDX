"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";

import VStack from "../atoms/VStack";
import HStack from "../atoms/HStack";
import Center from "../atoms/Center";
import { Card, CardContent } from "../ui/card";

type CustomNodeProps = {
  data: {
    title: string;
    value: {
      temperature?: number;
      humidity?: number;
      pressure?: number;
      volume?: number;
    };
    type: ("temperature" | "humidity" | "pressure" | "volume")[];
  };
  isConnectable: boolean;
};

const CustomNode = memo(({ data, isConnectable }: CustomNodeProps) => {
  const SCALE = 5;
  const NUMBER_OF_SCALE = 7;

  return (
    <Card>
      <CardContent className="w-[240px] rounded-xl py-4 dark:bg-neutral-800">
        <VStack className="w-full items-center space-y-4">
          {/* タイトル */}
          <h2 className="font-semibold">{data.title}</h2>

          {/* 温度 */}
          {data.type.includes("temperature") && data.value.temperature && (
            <HStack className="items-center space-x-2">
              <div className="relative h-1 w-36 rounded-full bg-red-100">
                <div
                  className="absolute left-0 top-0 h-1 rounded-full bg-red-500"
                  style={{
                    width: `${(data.value.temperature / 100) * 96}px`,
                  }}
                />
              </div>
              <div className="flex h-4 w-8 items-center justify-center rounded-full border-[1.2px] border-red-500 bg-red-100 text-[8px] text-red-500 dark:border-none dark:bg-red-500 dark:text-white">
                {data.value.temperature}°C
              </div>
            </HStack>
          )}

          {/* 湿度 */}
          {data.type.includes("humidity") && data.value.humidity && (
            <HStack className="items-center space-x-2">
              <div className="relative h-1 w-36 rounded-full bg-blue-100">
                <div
                  className="absolute left-0 top-0 h-1 rounded-full bg-blue-500"
                  style={{
                    width: `${(data.value.humidity / 100) * 96}px`,
                  }}
                />
              </div>
              <Center className="h-4 w-8 rounded-full border-[1.2px] border-blue-500 bg-blue-100 text-[8px] text-blue-500 dark:border-none dark:bg-blue-500 dark:text-white">
                {data.value.humidity}%
              </Center>
            </HStack>
          )}

          {/* 気圧 */}
          {data.type.includes("pressure") && data.value.pressure && (
            <HStack className="items-center space-x-2">
              <div className="relative h-1 w-36 rounded-full bg-green-100">
                <div
                  className="absolute left-0 top-0 h-1 rounded-full bg-green-500"
                  style={{
                    width: `${(data.value.pressure / 100) * 96}px`,
                  }}
                />
              </div>
              <Center className="h-4 w-8 rounded-full border-[1.2px] border-green-500 bg-green-100 text-[8px] text-green-500 dark:border-none dark:bg-green-500 dark:text-white">
                {data.value.pressure}hPa
              </Center>
            </HStack>
          )}

          {/* 容積 */}
          {data.type.includes("volume") && data.value.volume && (
            <div className="relative ml-[-32px]">
              {Array.from({ length: NUMBER_OF_SCALE }).map((_, index) => (
                <HStack key={index} className="w-full items-center space-x-2">
                  {/* ラベル */}
                  <span className="w-8 text-right text-xs text-neutral-400 dark:text-neutral-200">
                    {(NUMBER_OF_SCALE - 1) * SCALE - index * SCALE}
                  </span>
                  {/* 線 */}
                  <Center className="h-6 w-40">
                    <div className="w-full border-t border-neutral-400 dark:border-neutral-200" />
                  </Center>
                </HStack>
              ))}
              <div
                className="absolute bottom-3 left-10 w-40 bg-blue-100 opacity-60 dark:bg-blue-500"
                style={{
                  height: `${(data.value.volume / SCALE) * 24}px`,
                }}
              />
            </div>
          )}
        </VStack>

        <Handle
          type="target"
          position={Position.Top}
          id="target-top"
          isConnectable={isConnectable}
          className="opacity-0"
        />
        <Handle
          type="source"
          position={Position.Top}
          id="source-top"
          isConnectable={isConnectable}
          className="!border-none dark:bg-white"
          style={{ opacity: isConnectable ? 1 : 0 }}
        />

        <Handle
          type="target"
          position={Position.Right}
          id="target-right"
          isConnectable={isConnectable}
          className="opacity-0"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="source-right"
          isConnectable={isConnectable}
          className="!border-none dark:bg-white"
          style={{ opacity: isConnectable ? 1 : 0 }}
        />

        <Handle
          type="target"
          position={Position.Bottom}
          id="target-bottom"
          isConnectable={isConnectable}
          className="opacity-0"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="source-bottom"
          isConnectable={isConnectable}
          className="!border-none dark:bg-white"
          style={{ opacity: isConnectable ? 1 : 0 }}
        />

        <Handle
          type="target"
          position={Position.Left}
          id="target-left"
          isConnectable={isConnectable}
          className="opacity-0"
        />
        <Handle
          type="source"
          position={Position.Left}
          id="source-left"
          isConnectable={isConnectable}
          className="!border-none dark:bg-white"
          style={{ opacity: isConnectable ? 1 : 0 }}
        />
      </CardContent>
    </Card>
  );
});

export default CustomNode;
