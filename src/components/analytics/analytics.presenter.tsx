import { memo } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import ChartToolbar from "./chart-toolbar";
import SensorSwitcher from "./sensor-switcher";
import LineChart from "./line-chart";
import Metrics from "./metrics";

const AnalyticsPresenter = memo(() => {
  return (
    <HStack className="mt-6 w-full space-x-6 px-10">
      <VStack className="w-full items-center space-y-6 overflow-auto">
        <Card className="w-full">
          <CardHeader className="w-full">
            <HStack className="w-full items-center justify-between">
              <CardTitle>MEOHタンク</CardTitle>
              <SensorSwitcher />
            </HStack>
          </CardHeader>
          <CardContent className="py-4">
            <LineChart />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="py-8">
            <Metrics />
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
});

export default AnalyticsPresenter;
