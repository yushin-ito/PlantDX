import HStack from "../atoms/HStack";
import VStack from "../atoms/VStack";
import ChartToolbar from "../organisms/ChartToolbar";
import Analytics from "../organisms/Analytics";
import Chart from "../organisms/Chart";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import SensorSwitcher from "../molecules/SensorSwitcher";

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
            <Analytics />
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
