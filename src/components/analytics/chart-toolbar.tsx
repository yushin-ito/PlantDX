import { memo } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { VStack } from "../ui/vstack";

const ChartToolbar = memo(() => {
  return (
    <VStack>
      <Tabs defaultValue="filter">
        <TabsList>
          <TabsTrigger value="filter" className="text-xs">
            フィルター
          </TabsTrigger>
          <TabsTrigger value="design" className="text-xs">
            デザイン
          </TabsTrigger>
          <TabsTrigger value="export" className="text-xs">
            エクスポート
          </TabsTrigger>
        </TabsList>
        <TabsContent value="filter"></TabsContent>
        <TabsContent value="design"></TabsContent>
        <TabsContent value="export"></TabsContent>
      </Tabs>
    </VStack>
  );
});

export default ChartToolbar;
