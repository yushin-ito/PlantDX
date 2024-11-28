"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { AlertCircle, CheckCircle } from "lucide-react";

import VStack from "../atoms/VStack";
import HStack from "../atoms/HStack";
import Center from "../atoms/Center";

type CustomNodeProps = {
  data: {
    title: string;
    value: {
      volume: number;
      temperature: number;
    };
    type: "tank" | "heater" | "hybrid" | "status";
  };
};

const CustomNode = memo(({ data }: CustomNodeProps) => {
  const SCALE = 5;
  const NUMBER_OF_SCALE = 7;

  const status = [
    {
      title: "原油加熱工程1",
      completed: true,
    },
    {
      title: "原油加熱工程2",
      completed: false,
    },
    {
      title: "原油加熱工程3",
      completed: true,
    },
    {
      title: "原油加熱工程4",
      completed: true,
    },
  ];

  if (data.type === "status") {
    return (
      <VStack className="space-y-6 rounded-xl bg-white p-6 shadow-md">
        <VStack>
          <h2 className="font-bold">ステータス</h2>
          <p className="text-xs text-gray-500">2024/01/01 00:00</p>
        </VStack>

        <HStack className="space-x-6">
          {status.map(({ title, completed }, index) => (
            <VStack
              key={index}
              className={`w-40 space-y-4 rounded-xl p-4 shadow-sm ${
                completed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {/* アイコン */}
              <Center
                className={`size-9 rounded-full ${
                  completed ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {completed ? (
                  <CheckCircle className="size-5 text-white" />
                ) : (
                  <AlertCircle className="size-5 text-white" />
                )}
              </Center>
              <VStack className="space-y-[2px]">
                <h3 className="font-bold">{completed ? "完了" : "未完了"}</h3>
                <p className="text-xs text-gray-500">{title}</p>
              </VStack>
            </VStack>
          ))}
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack className="w-[240px] items-center space-y-4 rounded-xl bg-white py-4 shadow-md">
      {/* タイトル */}
      <h2 className="font-semibold">{data.title}</h2>

      {/* ヒーター */}
      {(data.type === "heater" || data.type === "hybrid") && (
        <HStack className="items-center space-x-2">
          <div className="relative h-1 w-36 rounded-full bg-orange-100">
            <div
              className="absolute left-0 top-0 h-1 rounded-full bg-orange-400"
              style={{
                width: `${(data.value.temperature / 100) * 96}px`,
              }}
            />
          </div>
          <div className="flex h-4 w-8 items-center justify-center rounded-full border-[1.2px] border-orange-400 bg-orange-100">
            <div className="text-[8px] text-orange-400">
              {data.value.temperature}°C
            </div>
          </div>
        </HStack>
      )}

      {/* タンク */}
      {(data.type === "tank" || data.type === "hybrid") && (
        <div className="relative ml-[-32px]">
          {Array.from({ length: NUMBER_OF_SCALE }).map((_, index) => (
            <HStack key={index} className="w-full items-center space-x-2">
              {/* ラベル */}
              <span className="w-8 text-right text-xs text-gray-400">
                {(NUMBER_OF_SCALE - 1) * SCALE - index * SCALE}
              </span>
              {/* 線 */}
              <Center className="h-6 w-40">
                <div className="w-full border-t border-gray-400" />
              </Center>
            </HStack>
          ))}
          <div
            className="absolute bottom-3 left-10 w-40 bg-blue-100 opacity-60"
            style={{
              height: `${(data.value.volume / SCALE) * 24}px`,
            }}
          />
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="pointer-events-none opacity-0"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="pointer-events-none opacity-0"
      />

      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="pointer-events-none opacity-0"
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="pointer-events-none opacity-0"
      />
    </VStack>
  );
});

export default CustomNode;
