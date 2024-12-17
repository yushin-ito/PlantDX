"use clinet";

import { Gauge, TrendingUp, TrendingDown, BarChart2 } from "lucide-react";
import { memo } from "react";

import { HStack } from "../ui/hstack";
import { Separator } from "../ui/separator";
import { VStack } from "../ui/vstack";

const metrics = {
  current: {
    label: "現在値",
    unit: "ml",
    icon: Gauge,
  },
  max: {
    label: "最大値",
    unit: "ml",
    icon: TrendingUp,
  },
  min: {
    label: "最小値",
    unit: "ml",
    icon: TrendingDown,
  },
  average: {
    label: "平均値",
    unit: "ml",
    icon: BarChart2,
  },
};

type MetricsProps = {
  current: number;
  max: number;
  min: number;
  average: number;
};

const Metrics = memo(({ current, max, min, average }: MetricsProps) => {
  const values = { current, max, min, average };

  return (
    <HStack className="size-full items-center justify-around">
      {Object.entries(metrics).map(
        ([key, { label, unit, icon: Icon }], index) => {
          const Metric = (
            <VStack key={key} className="items-center space-y-2">
              <HStack className="items-center space-x-2.5">
                <Icon className="size-6 text-brand-600" />
                <p>{label}</p>
              </HStack>
              <HStack className="items-end space-x-1">
                <p className="text-3xl font-semibold">
                  {values[key as "current" | "max" | "min" | "average"].toFixed(
                    1
                  )}
                </p>
                <span className="text-sm">{unit}</span>
              </HStack>
            </VStack>
          );

          const Divider =
            index < Object.entries(metrics).length - 1 ? (
              <Separator key={index} orientation="vertical" className="h-20" />
            ) : null;

          return Divider ? [Metric, Divider] : [Metric];
        }
      )}
    </HStack>
  );
});

export default Metrics;
