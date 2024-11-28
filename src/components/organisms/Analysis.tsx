"use client";

import { TrendingUp, TrendingDown, Gauge, BarChart2 } from "lucide-react";

import HStack from "../atoms/HStack";
import VStack from "../atoms/VStack";

const Analysis = () => {
  const metrics = [
    {
      label: "現在値",
      value: 214,
      unit: "ml",
      icon: <Gauge className="size-8 text-brand-600" />,
    },
    {
      label: "最大値",
      value: 305,
      unit: "ml",
      icon: <TrendingUp className="size-8 text-brand-600" />,
    },
    {
      label: "最小値",
      value: 73,
      unit: "ml",
      icon: <TrendingDown className="size-8 text-brand-600" />,
    },
    {
      label: "平均値",
      value: 204,
      unit: "ml",
      icon: <BarChart2 className="size-8 text-brand-600" />,
    },
  ];

  return (
    <HStack className="w-full justify-evenly">
      {metrics.map((metric) => (
        <VStack
          key={metric.label}
          className="items-center space-y-2 text-center"
        >
          {metric.icon}
          <h2 className="text-3xl font-semibold text-gray-800">
            {metric.value}
            <span className="text-sm">{metric.unit}</span>
          </h2>
          <p className="text-sm text-gray-500">{metric.label}</p>
        </VStack>
      ))}
    </HStack>
  );
};

export default Analysis;
