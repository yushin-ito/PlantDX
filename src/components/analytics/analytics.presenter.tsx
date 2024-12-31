import { Dispatch, memo, RefObject, SetStateAction } from "react";
import { differenceInSeconds, format, parseISO, startOfDay } from "date-fns";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import LineChartToolbar from "./line-chart-toolbar";
import SensorSwitcher from "./sensor-switcher";
import LineChart from "./line-chart";
import { Sensor, Node, Record, ChartStyle, FileType } from "@/types";
import Statistics from "./statistics";
import { Skeleton } from "../ui/skeleton";

type AnalyticsPresenterProps = {
  chartWrapper: RefObject<HTMLDivElement>;
  sensorId: number | null;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  period: {
    start: Date;
    end: Date;
  } | null;
  setPeriod: Dispatch<SetStateAction<{ start: Date; end: Date } | null>>;
  style: ChartStyle;
  setStyle: Dispatch<SetStateAction<ChartStyle>>;
  sensors: (Sensor["Row"] & { node: Node["Row"] | null })[];
  records: Record["Row"][];
  isLoadingSensors: boolean;
  isLoadingRecords: boolean;
  image: string | null;
  getPreview: () => void;
  onExport: ({ name, type }: { name: string; type: FileType }) => void;
};

const AnalyticsPresenter = memo(
  ({
    chartWrapper,
    sensorId,
    date,
    setDate,
    period,
    setPeriod,
    style,
    setStyle,
    sensors,
    records,
    isLoadingSensors,
    isLoadingRecords,
    image,
    getPreview,
    onExport,
  }: AnalyticsPresenterProps) => {
    const values = records.map((record) => record.value);
    const sensor = sensors.find((sensor) => sensor.sensorId === sensorId);

    return (
      <HStack className="my-6 space-x-6 px-8 sm:px-10">
        <VStack className="h-[600px] w-full items-center space-y-6">
          <Card className="size-full">
            <CardHeader>
              <HStack className="items-center justify-between">
                {isLoadingSensors ? (
                  <Skeleton className="h-4 w-20" />
                ) : (
                  <CardTitle>{sensor?.node?.name}</CardTitle>
                )}
                <SensorSwitcher sensorId={sensorId} sensors={sensors} />
              </HStack>
            </CardHeader>
            <CardContent className="pb-4 pt-2">
              <LineChart
                chartWrapper={chartWrapper}
                date={format(date, "yyyy-MM-dd")}
                period={
                  period
                    ? {
                        start: format(period.start, "yyyy-MM-dd"),
                        end: format(period.end, "yyyy-MM-dd"),
                      }
                    : null
                }
                data={records.map((record) => ({
                  timestamp: differenceInSeconds(
                    parseISO(record.createdAt),
                    startOfDay(parseISO(record.createdAt))
                  ),
                  value: record.value,
                }))}
                type={sensor?.type || ""}
                unit={sensor?.unit || ""}
                style={style}
                isLoading={isLoadingRecords}
              />
            </CardContent>
          </Card>
          <Card className="h-[150px] w-full items-center">
            <CardContent className="h-full py-0">
              <Statistics
                values={values}
                unit={sensor?.unit || ""}
                isLoading={isLoadingRecords}
              />
            </CardContent>
          </Card>
        </VStack>
        <Card className="h-[600px] w-[450px]">
          <CardContent className="size-full p-4">
            <LineChartToolbar
              date={date}
              setDate={setDate}
              period={period}
              setPeriod={setPeriod}
              style={style}
              setStyle={setStyle}
              image={image}
              name={sensor?.node?.name || ""}
              getPreview={getPreview}
              onExport={onExport}
            />
          </CardContent>
        </Card>
      </HStack>
    );
  }
);

export default AnalyticsPresenter;
