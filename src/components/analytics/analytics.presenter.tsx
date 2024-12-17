import { memo } from "react";
import { differenceInSeconds, parseISO, startOfDay } from "date-fns";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import ChartToolbar from "./chart-toolbar";
import SensorSwitcher from "./sensor-switcher";
import LineChart from "./line-chart";
import Metrics from "./metrics";
import { Sensor, Node, Record } from "@/types";

type AnalyticsPresenterProps = {
  sensorId: number | null;
  sensors: (Sensor["Row"] & { node: Node["Row"] | null })[];
  records: Record["Row"][];
  isLoadingRecords: boolean;
};

const AnalyticsPresenter = memo(
  ({
    sensorId,
    sensors,
    records,
    isLoadingRecords,
  }: AnalyticsPresenterProps) => {
    const values = records.map((record) => record.value);

    return (
      <HStack className="mt-6 w-full space-x-6 px-10">
        <VStack className="w-full items-center space-y-6 overflow-auto">
          <Card className="w-full">
            <CardHeader className="w-full">
              <HStack className="w-full items-center justify-between">
                <CardTitle>MEOHタンク</CardTitle>
                <SensorSwitcher sensorId={sensorId} sensors={sensors} />
              </HStack>
            </CardHeader>
            <CardContent className="py-4">
              <LineChart
                date="2024-12-01"
                data={records.map((record) => ({
                  timestamp: differenceInSeconds(
                    parseISO(record.createdAt),
                    startOfDay(parseISO(record.createdAt))
                  ),
                  value: record.value,
                }))}
                isLoading={isLoadingRecords}
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="py-6">
              <Metrics
                current={values[values.length - 1] || 0}
                max={Math.max(...values, 0)}
                min={Math.min(...values, 0)}
                average={
                  values.length > 0
                    ? values.reduce((sum, value) => sum + value, 0) /
                      values.length
                    : 0
                }
              />
            </CardContent>
          </Card>
        </VStack>
        <Card className="w-[400px]">
          <CardContent className="w-full py-4">
            <ChartToolbar />
          </CardContent>
        </Card>
      </HStack>
    );
  }
);

export default AnalyticsPresenter;
