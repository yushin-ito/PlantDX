"use client";

import {
  CartesianGrid,
  Line,
  LineChart as LineReChart,
  XAxis,
  YAxis,
} from "recharts";
import { CSSProperties, Fragment, memo } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { time: new Date("2024-12-01T00:00:01"), temperature: 72 },
  { time: new Date("2024-12-01T00:00:02"), temperature: 75 },
  { time: new Date("2024-12-01T00:00:03"), temperature: 78 },
  { time: new Date("2024-12-01T00:00:04"), temperature: 73 },
  { time: new Date("2024-12-01T00:00:05"), temperature: 79 },
  { time: new Date("2024-12-01T00:00:06"), temperature: 81 },
  { time: new Date("2024-12-01T00:00:07"), temperature: 77 },
  { time: new Date("2024-12-01T00:00:08"), temperature: 80 },
  { time: new Date("2024-12-01T00:00:09"), temperature: 82 },
  { time: new Date("2024-12-01T00:00:10"), temperature: 79 },
  { time: new Date("2024-12-01T00:00:11"), temperature: 85 },
  { time: new Date("2024-12-01T00:00:12"), temperature: 83 },
  { time: new Date("2024-12-01T00:00:13"), temperature: 86 },
  { time: new Date("2024-12-01T00:00:14"), temperature: 84 },
  { time: new Date("2024-12-01T00:00:15"), temperature: 87 },
  { time: new Date("2024-12-01T00:00:16"), temperature: 85 },
  { time: new Date("2024-12-01T00:00:17"), temperature: 88 },
  { time: new Date("2024-12-01T00:00:18"), temperature: 86 },
  { time: new Date("2024-12-01T00:00:19"), temperature: 89 },
  { time: new Date("2024-12-01T00:00:20"), temperature: 87 },
];

const chartConfig = {
  temperature: {
    label: "温度",
    color: "#7475f3",
  },
} satisfies ChartConfig;

const LineChart = memo(() => {
  return (
    <div className="w-full">
      <ChartContainer className="h-[300px] w-full" config={chartConfig}>
        <LineReChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickFormatter={(time) => new Date(time).getSeconds().toString()}
          />
          <YAxis tickLine={false} axisLine={false} width={30} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => (
                  <Fragment>
                    <div
                      className="size-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                      style={
                        {
                          "--color-bg": `var(--color-${name})`,
                        } as CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono tabular-nums">
                      {value}
                      <span>°C</span>
                    </div>
                  </Fragment>
                )}
                className="bg-white"
              />
            }
          />
          <Line
            isAnimationActive={false}
            dataKey="temperature"
            type="linear"
            stroke="#7475f3"
            strokeWidth={2}
            dot={{ fill: "#7475f3", r: 2 }}
          />
        </LineReChart>
      </ChartContainer>
    </div>
  );
});

export default LineChart;
