"use client";

import {
  Brush,
  CartesianGrid,
  Line,
  LineChart as LineReChart,
  XAxis,
  YAxis,
} from "recharts";
import { memo, RefObject, useCallback, useMemo } from "react";
import { addSeconds, differenceInSeconds, format, parseISO } from "date-fns";
import { Clock, Loader2 } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Center } from "../ui/center";
import CustomTraveller from "./custom-traveller";
import { ChartStyle, SensorType } from "@/types";
import CustomTooltip from "./custom-tooltip";

const labels: Record<SensorType, string> = {
  temperature: "温度",
  humidity: "湿度",
  pressure: "圧力",
  volume: "容量",
};

type LineChartProps = {
  chartWrapper: RefObject<HTMLDivElement>;
  date: string;
  period: { start: string; end: string } | null;
  data: { timestamp: number; value: number }[];
  type: string;
  unit: string;
  style: ChartStyle;
  isLoading: boolean;
};

const LineChart = memo(
  ({
    chartWrapper,
    date,
    period,
    data,
    type,
    unit,
    style,
    isLoading,
  }: LineChartProps) => {
    const chartConfig = {
      value: {
        label: labels[type as SensorType],
        color: "#7475f3",
      },
    } satisfies ChartConfig;

    const ticks = useMemo(() => {
      const interval: number[] = [];
      let length = 24 * 3600;

      if (period) {
        const start = parseISO(period.start);
        const end = parseISO(period.end);
        length = differenceInSeconds(end, start);
      }

      for (let i = 0; i <= length; i++) {
        interval.push(i);
      }
      return interval;
    }, [period]);

    const getDateByTimestamp = useCallback(
      (timestamp: number) => {
        const base = new Date(`${date}T00:00:00Z`);
        return addSeconds(base, timestamp);
      },
      [date]
    );

    if (isLoading) {
      return (
        <Center className="mt-6 size-full h-[240px] space-x-2 text-neutral-500 dark:text-neutral-400">
          <HStack className="space-x-1">
            <Loader2 className="size-4 animate-spin" />
            <span className="text-xs">読み込み中...</span>
          </HStack>
        </Center>
      );
    }

    if (data.length === 0) {
      return (
        <Center className="mt-6 size-full h-[240px] space-y-1">
          <h3 className="text-lg font-semibold">データがありません</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            センサー番号が正しいか確認してください。
          </p>
        </Center>
      );
    }

    return (
      <ChartContainer
        ref={chartWrapper}
        className="h-[350px] w-full"
        config={chartConfig}
      >
        <LineReChart data={data}>
          <CartesianGrid
            vertical={style.grid.vertical}
            horizontal={style.grid.horizontal}
            strokeDasharray={
              style.grid.horizontal && style.grid.vertical ? "3 3" : "none"
            }
          />
          <XAxis
            dataKey="timestamp"
            ticks={ticks}
            tickFormatter={(value: number) =>
              format(
                getDateByTimestamp(value),
                period ? "HHH:mm:ss" : "HH:mm:ss"
              )
            }
            tickLine={style.xAxis.type === "show"}
            axisLine={style.xAxis.type === "show"}
            domain={
              style.xAxis.max && style.xAxis.min
                ? [style.xAxis.min, style.xAxis.max]
                : ["auto", "auto"]
            }
            tickMargin={15}
            height={50}
          />
          <YAxis
            tickLine={style.yAxis.type === "show"}
            axisLine={style.yAxis.type === "show"}
            domain={
              style.yAxis.min && style.yAxis.max
                ? [style.yAxis.min, style.yAxis.max]
                : ["auto", "auto"]
            }
            width={30}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name, payload) => {
                  if (!payload || !payload.payload) return null;
                  const { timestamp } = payload.payload;

                  return (
                    <CustomTooltip
                      name={
                        chartConfig[name as keyof typeof chartConfig]?.label ||
                        ""
                      }
                      value={Number(value)}
                      unit={unit}
                      date={format(getDateByTimestamp(timestamp), "HH:mm:ss")}
                    />
                  );
                }}
                className="rounded-md bg-white shadow-sm dark:bg-neutral-800"
              />
            }
          />

          <Brush
            dataKey="timestamp"
            startIndex={0}
            endIndex={Math.round(data.length / 4)}
            height={40}
            travellerWidth={2}
            traveller={(props) => <CustomTraveller {...props} />}
            stroke="transparent"
            fill="transparent"
            className="[&_.recharts-brush-slide]:fill-opacity-20 [&_.recharts-brush-slide]:fill-neutral-400 dark:[&_.recharts-brush-slide]:fill-neutral-200"
          >
            <LineReChart data={data}>
              <Line
                isAnimationActive={style.animation.type === "enable"}
                animationDuration={style.animation.duration}
                animationEasing={style.animation.easing}
                dataKey="value"
                type={style.type === "scatter" ? "linear" : style.type}
                stroke={
                  style.type === "scatter" ? "none" : chartConfig.value.color
                }
                strokeWidth={1.5}
                dot={
                  style.type === "scatter"
                    ? { r: 1.5, fill: chartConfig.value.color }
                    : false
                }
              />
            </LineReChart>
          </Brush>
          <Line
            isAnimationActive={style.animation.type === "enable"}
            animationDuration={style.animation.duration}
            animationEasing={style.animation.easing}
            dataKey="value"
            type={style.type === "scatter" ? "linear" : style.type}
            stroke={style.type === "scatter" ? "none" : chartConfig.value.color}
            strokeWidth={2}
            dot={
              style.type === "scatter"
                ? { r: 2.5, fill: chartConfig.value.color }
                : false
            }
            activeDot={{
              r: 3,
              fill: "white",
              stroke: chartConfig.value.color,
            }}
          />
        </LineReChart>
      </ChartContainer>
    );
  }
);

export default LineChart;
