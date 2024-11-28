"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { sec: 1, temperature: 72 },
  { sec: 2, temperature: 75 },
  { sec: 3, temperature: 78 },
  { sec: 4, temperature: 73 },
  { sec: 5, temperature: 79 },
  { sec: 6, temperature: 81 },
  { sec: 7, temperature: 77 },
  { sec: 8, temperature: 80 },
  { sec: 9, temperature: 82 },
  { sec: 10, temperature: 79 },
  { sec: 11, temperature: 85 },
  { sec: 12, temperature: 83 },
  { sec: 13, temperature: 86 },
  { sec: 14, temperature: 84 },
  { sec: 15, temperature: 87 },
  { sec: 16, temperature: 85 },
  { sec: 17, temperature: 88 },
  { sec: 18, temperature: 86 },
  { sec: 19, temperature: 89 },
  { sec: 20, temperature: 87 },
];

const chartConfig = {
  temperature: {
    label: "温度",
    color: "#7475f3",
  },
} satisfies ChartConfig;

const Chart = () => {
  return (
    <div className="hidden-scrollbar w-full overflow-x-auto">
      <div style={{ width: data.length * 100 }}>
        <ChartContainer className="h-72 w-full" config={chartConfig}>
          <LineChart width={data.length * 100} height={288} data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="sec" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="size-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                        style={
                          {
                            "--color-bg": `var(--color-${name})`,
                          } as React.CSSProperties
                        }
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                        {value}
                        <span className="font-normal">°C</span>
                      </div>
                      {index === 1 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                          Total
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                            {item.payload.running + item.payload.swimming}
                            <span className="font-normal">°C</span>
                          </div>
                        </div>
                      )}
                    </>
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
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Chart;
