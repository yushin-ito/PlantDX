"use clinet";

import {
  Gauge,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Minus,
} from "lucide-react";
import { Fragment, memo } from "react";

import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const statistics = [
  {
    key: "current",
    label: "最新値",
    calc: (values: number[]) =>
      values.length > 0 ? values[values.length - 1] : null,
    icon: Gauge,
  },
  {
    key: "max",
    label: "最大値",
    calc: (values: number[]) =>
      values.length > 0 ? Math.max(...values) : null,
    icon: TrendingUp,
  },
  {
    key: "min",
    label: "最小値",
    calc: (values: number[]) =>
      values.length > 0 ? Math.min(...values) : null,
    icon: TrendingDown,
  },
  {
    key: "average",
    label: "平均値",
    calc: (values: number[]) =>
      values.length > 0
        ? values.reduce((acc, value) => acc + value, 0) / values.length
        : null,
    icon: BarChart2,
  },
];

type StatisticsProps = {
  unit: string;
  values: number[];
  isLoading: boolean;
};

const Statistics = memo(({ unit, values, isLoading }: StatisticsProps) => {
  return (
    <HStack className="h-full items-center justify-around px-4">
      {statistics.map(({ label, icon: Icon, calc }, index) => (
        <Fragment key={index}>
          {isLoading ? (
            <VStack className="space-y-2">
              <HStack className="items-center space-x-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-3 w-16" />
              </HStack>
              <Skeleton className="h-3 w-24" />
            </VStack>
          ) : (
            <VStack className="items-center space-y-2">
              <HStack className="items-center space-x-2">
                <Icon className="size-6 text-brand-600" />
                <p>{label}</p>
              </HStack>

              <div className="relative">
                <p className="text-3xl font-semibold">
                  {calc(values)?.toFixed(1) || (
                    <Minus className="w-5" strokeWidth={3} />
                  )}
                </p>
                <span className="absolute -right-5 bottom-0 text-base">
                  {unit}
                </span>
              </div>
            </VStack>
          )}
          {index < statistics.length - 1 && (
            <Separator key={index} orientation="vertical" className="h-20" />
          )}
        </Fragment>
      ))}
    </HStack>
  );
});

export default Statistics;
