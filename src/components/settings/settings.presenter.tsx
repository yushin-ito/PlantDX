import { memo } from "react";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VStack } from "../ui/vstack";
import PlantTab from "./plant.tab";
import { UpdatePlantSchema } from "@/schemas";
import { Plant } from "@/types";

type SettingsPresenterProps = {
  plant: Plant["Row"] | null;
  updatePlantHandler: (
    values: z.infer<typeof UpdatePlantSchema>
  ) => Promise<void>;
  isLoadingUpdatePlant: boolean;
};

const SettingsPresenter = memo(
  ({
    plant,
    updatePlantHandler,
    isLoadingUpdatePlant,
  }: SettingsPresenterProps) => (
    <VStack className="mt-4 w-full space-y-6 px-8 sm:px-10">
      <Tabs defaultValue="plant" variant="outline">
        <TabsList className="w-full">
          <TabsTrigger value="plant">プラント</TabsTrigger>
          <TabsTrigger value="account">アカウント</TabsTrigger>
          <TabsTrigger value="about">外観</TabsTrigger>
          <TabsTrigger value="notification">通知</TabsTrigger>
        </TabsList>
        <TabsContent value="plant" className="py-6">
          <PlantTab
            plant={plant}
            updatePlantHandler={updatePlantHandler}
            isLoadingUpdatePlant={isLoadingUpdatePlant}
          />
        </TabsContent>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="notification"></TabsContent>
      </Tabs>
    </VStack>
  )
);

export default SettingsPresenter;
