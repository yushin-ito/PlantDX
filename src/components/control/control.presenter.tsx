import { PlusCircle } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import { z } from "zod";

import { Button } from "../ui/button";
import { HStack } from "../ui/hstack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VStack } from "../ui/vstack";
import { Card, CardContent } from "../ui/card";
import CreateControlModal from "./create-control.modal";
import { CreateControlSchema } from "@/schemas";
import { Control, ControlEvent, ControlStatus } from "@/types";
import ControlButton from "./control-button";
import { Center } from "../ui/center";

type ControlPresenterProps = {
  controls: Control["Row"][];
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  createControlHandler: (values: z.infer<typeof CreateControlSchema>) => Promise<void>;
  isLoadingCreateControl: boolean;
};

const ControlPresenter = memo(
  ({
    controls,
    isOpenModal,
    setIsOpenModal,
    createControlHandler,
    isLoadingCreateControl,
  }: ControlPresenterProps) => (
    <VStack className="mt-6 w-full space-y-6 px-10">
      <Tabs defaultValue="manual" className="space-y-6">
        <HStack className="w-full items-center justify-between">
          <TabsList>
            <TabsTrigger value="manual" className="text-xs">
              手動
            </TabsTrigger>
            <TabsTrigger value="auto" className="text-xs">
              自動
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpenModal(true)}
          >
            <PlusCircle className="size-4" />
            新規作成
          </Button>
        </HStack>
        <TabsContent value="manual">
          <Card className="border-dashed">
            <CardContent className="h-[500px] py-4">
              {controls.length === 0 ? (
                <Center className="size-full">
                  <VStack className="w-full items-center space-y-12">
                    <VStack className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        コントロールがありません
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        下のボタンからコントロールを作成しましょう。
                      </p>
                    </VStack>
                    <Button
                      variant="brand"
                      className="rounded-full px-16"
                      onClick={() => setIsOpenModal(true)}
                    >
                      作成する
                    </Button>
                  </VStack>
                </Center>
              ) : (
                controls
                  .filter((control) => control.type === "manual")
                  .map((control, index) => (
                    <ControlButton
                      key={index}
                      name={control.name}
                      status={control.status as ControlStatus}
                      event={control.event as ControlEvent}
                      onClick={() => {}}
                    />
                  ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="auto">
          <Card className="border-dashed">
            <CardContent className="h-[500px] py-4">
              {controls.length === 0 ? (
                <Center className="size-full">
                  <VStack className="w-full items-center space-y-12">
                    <VStack className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        コントロールがありません
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        下のボタンからコントロールを作成しましょう。
                      </p>
                    </VStack>
                    <Button
                      variant="brand"
                      className="rounded-full px-16"
                      onClick={() => setIsOpenModal(true)}
                    >
                      作成する
                    </Button>
                  </VStack>
                </Center>
              ) : (
                controls
                  .filter((control) => control.type === "auto")
                  .map((control, index) => (
                    <ControlButton
                      key={index}
                      name={control.name}
                      status={control.status as ControlStatus}
                      event={control.event as ControlEvent}
                      onClick={() => {}}
                    />
                  ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <CreateControlModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        createControlHandler={createControlHandler}
        isLoadingCreateControl={isLoadingCreateControl}
      />
    </VStack>
  )
);

export default ControlPresenter;
