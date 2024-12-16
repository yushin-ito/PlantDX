import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Edit } from "lucide-react";

import { Card, CardContent } from "../ui/card";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { SensorType } from "@/types";
import { Button } from "../ui/button";

type CustomNodeProps = {
  isReadOnly: boolean;
  onEdit?: () => void;
  data: {
    name: string;
    value: {
      temperature: number;
      humidity: number;
      pressure: number;
      volume: number;
    }
    type: SensorType[];
  };
  isConnectable: boolean;
};

const CustomNode = memo(
  ({ isReadOnly, onEdit, data, isConnectable }: CustomNodeProps) => {
    const SCALE = 5;
    const NUMBER_OF_SCALE = 7;

    return (
      <Card>
        <CardContent className="w-[250px] rounded-xl py-4 dark:bg-neutral-800">
          {!isReadOnly && (
            <Button
              size="icon"
              variant="unstyled"
              className="absolute right-1 top-1"
              onClick={onEdit}
            >
              <Edit className="size-3.5" strokeWidth="2.4" />
            </Button>
          )}
          <VStack className="relative w-full items-center space-y-4">
            {/* タイトル */}
            <h2 className="mb-2 font-semibold">{data.name}</h2>

            {/* 温度 */}
            {data.type.includes("temperature") &&
              typeof data.value.temperature === "number" && (
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
            {data.type.includes("humidity") &&
              typeof data.value.humidity === "number" && (
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
            {data.type.includes("pressure") &&
              typeof data.value.pressure === "number" && (
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
            {data.type.includes("volume") &&
              typeof data.value.volume === "number" && (
                <div className="relative ml-[-32px]">
                  {Array.from({ length: NUMBER_OF_SCALE }).map((_, index) => (
                    <HStack
                      key={index}
                      className="w-full items-center space-x-2"
                    >
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
  }
);

export default CustomNode;
