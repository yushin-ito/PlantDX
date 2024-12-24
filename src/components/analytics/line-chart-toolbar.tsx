import { Dispatch, memo, SetStateAction } from "react";
import { Download, Calendar, Pencil } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CalendarTab from "./calendar.tab";
import StyleTab from "./style.tab";
import { ChartStyle, FileType } from "@/types";
import ExportTab from "./export.tab";
import { VStack } from "../ui/vstack";

type LineChartToolbarProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  period: {
    start: Date;
    end: Date;
  } | null;
  setPeriod: Dispatch<SetStateAction<{ start: Date; end: Date } | null>>;
  style: ChartStyle;
  setStyle: Dispatch<SetStateAction<ChartStyle>>;
  image: string | null;
  name: string;
  getPreview: () => void;
  onExport: ({ name, type }: { name: string; type: FileType }) => void;
};

const LineChartToolbar = memo(
  ({
    date,
    setDate,
    period,
    setPeriod,
    style,
    setStyle,
    image,
    getPreview,
    onExport,
  }: LineChartToolbarProps) => (
    <Tabs defaultValue="calendar" className="h-full">
      <VStack className="h-full">
        <TabsList className="w-full">
          <TabsTrigger value="calendar" className="flex-1">
            <Calendar className="size-4" />
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            <Pencil className="size-4" />
          </TabsTrigger>
          <TabsTrigger value="export" className="flex-1">
            <Download className="size-4" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="py-2">
          <CalendarTab
            date={date}
            setDate={setDate}
            period={period}
            setPeriod={setPeriod}
          />
        </TabsContent>
        <TabsContent
          value="style"
          className="py-2 h-full overflow-hidden"
        >
          <StyleTab style={style} setStyle={setStyle} />
        </TabsContent>
        <TabsContent value="export" className="py-2">
          <ExportTab
            image={image}
            getPreview={getPreview}
            onExport={onExport}
          />
        </TabsContent>
      </VStack>
    </Tabs>
  )
);

export default LineChartToolbar;
