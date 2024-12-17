import { memo } from "react";
import { Download, Filter, Pencil } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const ChartToolbar = memo(() => {
  return (
    <Tabs defaultValue="filter">
      <TabsList className="w-full ">
        <TabsTrigger value="filter" className="flex-1">
          <Filter className="size-4" />
        </TabsTrigger>
        <TabsTrigger value="design" className="flex-1">
          <Pencil className="size-4" />
        </TabsTrigger>
        <TabsTrigger value="export" className="flex-1">
          <Download className="size-4" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="filter"></TabsContent>
      <TabsContent value="design"></TabsContent>
      <TabsContent value="export"></TabsContent>
    </Tabs>
  );
});

export default ChartToolbar;
