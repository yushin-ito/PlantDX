import { Gauge, TrendingUp, TrendingDown, BarChart2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import SensorSwitcher from "../switcher/SensorSwitcher";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import Chart from "../charts/Chart";
import ChartToolbar from "../charts/ChartToolbar";
import { Separator } from "../ui/separator";

const metrics = {
  current: {
    label: "現在値",
    value: 214,
    unit: "ml",
    icon: Gauge,
  },
  max: {
    label: "最大値",
    value: 305,
    unit: "ml",
    icon: TrendingUp,
  },
  min: {
    label: "最小値",
    value: 73,
    unit: "ml",
    icon: TrendingDown,
  },
  average: {
    label: "平均値",
    value: 204,
    unit: "ml",
    icon: BarChart2,
  },
};

const Graph = () => {
  return (
    <HStack className="mt-4 w-full space-x-6 px-10">
      <VStack className="w-full items-center space-y-6 overflow-auto">
        <Card className="w-full">
          <CardHeader className="w-full">
            <HStack className="w-full items-center justify-between">
              <CardTitle>MEOHタンク</CardTitle>
              <SensorSwitcher />
            </HStack>
          </CardHeader>
          <CardContent className="py-4">
            <Chart />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="py-8">
            <HStack className="size-full items-center justify-around">
              {Object.entries(metrics).flatMap(
                ([key, { label, value, unit, icon: Icon }], index) => {
                  const Metric = (
                    <VStack key={key} className="items-center space-y-4">
                      <HStack className="items-center space-x-2.5">
                        <Icon className="size-6 text-brand-600" />
                        <p>{label}</p>
                      </HStack>
                      <HStack className="items-end space-x-1">
                        <p className="text-3xl font-semibold">{value}</p>
                        <span className="text-sm">{unit}</span>
                      </HStack>
                    </VStack>
                  );

                  const Divider =
                    index < Object.entries(metrics).length - 1 ? (
                      <Separator
                        key={index}
                        orientation="vertical"
                        className="h-20"
                      />
                    ) : null;

                  return Divider ? [Metric, Divider] : [Metric];
                }
              )}
            </HStack>
          </CardContent>
        </Card>
      </VStack>
      <Card className="w-[400px]">
        <CardContent className="py-4">
          <ChartToolbar />
        </CardContent>
      </Card>
    </HStack>
  );
};

export default Graph;
