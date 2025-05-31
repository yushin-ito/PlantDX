"use client";

import { Dispatch, memo, SetStateAction } from "react";
import { z } from "zod";

import { Center } from "../ui/center";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CreatePlantSchema, CreateUserSchema } from "@/schemas";
import PlantTab from "./plant.tab";
import ProfileTab from "./profile.tab";
import WelcomeTab from "./welcome.tab";

type WalkthroughPresenterProps = {
  plantId: number | undefined;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  upsertUserHandler: (
    values: z.infer<typeof CreateUserSchema>
  ) => Promise<void>;
  isLoadingUpsertUser: boolean;
  upsertPlantHandler: (
    values: z.infer<typeof CreatePlantSchema>
  ) => Promise<void>;
  isLoadingUpsertPlant: boolean;
};

const WalkthroughPresenter = memo(
  ({
    plantId,
    tab,
    setTab,
    upsertUserHandler,
    isLoadingUpsertUser,
    upsertPlantHandler,
    isLoadingUpsertPlant,
  }: WalkthroughPresenterProps) => (
    <Center className="h-full">
      <Card className="p-6 sm:w-[400px] sm:px-8">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="space-y-8"
          variant="stepper"
        >
          <TabsList className="w-full">
            {[0, 1, 2].map((step) => (
              <TabsTrigger
                key={step}
                value={step.toString()}
                disabled={Number(tab) < step}
              >
                {step + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="0" forceMount hidden={tab !== "0"}>
            <ProfileTab
              nextTab={() => setTab("1")}
              upsertUserHandler={upsertUserHandler}
              isLoadingUpsertUser={isLoadingUpsertUser}
            />
          </TabsContent>
          <TabsContent value="1" forceMount hidden={tab !== "1"}>
            <PlantTab
              nextTab={() => setTab("2")}
              previousTab={() => setTab("0")}
              upsertPlantHandler={upsertPlantHandler}
              isLoadingUpsertPlant={isLoadingUpsertPlant}
            />
          </TabsContent>
          <TabsContent value="2" forceMount hidden={tab !== "2"}>
            <WelcomeTab plantId={plantId} previousTab={() => setTab("1")} />
          </TabsContent>
        </Tabs>
      </Card>
    </Center>
  )
);

export default WalkthroughPresenter;
