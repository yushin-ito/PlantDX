"use client";

import {
  Brush,
  CartesianGrid,
  Line,
  LineChart as LineReChart,
  XAxis,
  YAxis,
} from "recharts";
import { CSSProperties, Fragment, memo, useMemo } from "react";
import { addSeconds, format } from "date-fns";
import { Loader2 } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";

const chartConfig = {
  value: {
    label: "温度",
    color: "#7475f3",
  },
} satisfies ChartConfig;

type LineChartProps = {
  date: string;
  data: { timestamp: number; value: number }[];
  isLoading: boolean;
};

const LineChart = memo(({ date, data, isLoading }: LineChartProps) => {
  const ticks = useMemo(() => {
    const interval: number[] = [];
    for (let i = 0; i <= 24 * 3600; i++) {
      interval.push(i);
    }
    return interval;
  }, []);

  if (isLoading) {
    return (
      <HStack className="h-[320px] w-full justify-center space-x-2 pt-[120px] text-neutral-500 dark:text-neutral-400">
        <Loader2 className="size-4 animate-spin" />
        <span className="text-xs">読み込み中...</span>
      </HStack>
    );
  }

  if (data.length === 0) {
    return (
      <VStack className="h-[320px] w-full items-center space-y-2 pt-[100px]">
        <h3 className="text-lg font-semibold">データがありません</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          センサー番号が正しいか確認してください。
        </p>
      </VStack>
    );
  }

  return (
    <ChartContainer className="h-[320px] w-full" config={chartConfig}>
      <LineReChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamp"
          ticks={ticks}
          tickFormatter={(value: number) => {
            const base = new Date(`${date}T00:00:00Z`);
            const tick = format(addSeconds(base, value), "HH:mm:ss");
            return tick;
          }}
          tickLine={false}
          axisLine={false}
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
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono tabular-nums">
                    {Number(value).toFixed(2)}
                    <span>°C</span>
                  </div>
                </Fragment>
              )}
              className="bg-white"
            />
          }
        />
        <Brush
          dataKey="timestamp"
          startIndex={0}
          endIndex={Math.round(data.length / 4)}
          height={40}
          travellerWidth={2}
          stroke="transparent"
        >
          <LineReChart data={data}>
            <Line
              isAnimationActive={false}
              dataKey="value"
              type="monotone"
              stroke="#7475f3"
              strokeWidth={1.5}
              dot={false}
            />
          </LineReChart>
        </Brush>
        <Line
          isAnimationActive={false}
          dataKey="value"
          type="monotone"
          stroke="#7475f3"
          strokeWidth={2}
          dot={{ fill: "#7475f3", r: 2 }}
        />
      </LineReChart>
    </ChartContainer>
  );
});

export default LineChart;
