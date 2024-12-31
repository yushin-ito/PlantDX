import { Plus } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import { z } from "zod";

import { Button } from "../ui/button";
import { HStack } from "../ui/hstack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import CreateControlSheet from "./create-control-sheet";
import { CreateControlSchema, UpdateControlSchema } from "@/schemas";
import { Control } from "@/types";
import UpdateControlSheet from "./update-control-sheet";
import ControlGrid from "./control-grid";
import ControlPlaceholder from "./control-placeholder";
import { ScrollArea } from "../ui/scroll-area";

type ControlPresenterProps = {
  controls: Control["Row"][];
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
  isDraggable: boolean;
  setIsDraggable: Dispatch<SetStateAction<boolean>>;
  isOpenCreateControlSheet: boolean;
  setIsOpenCreateControlSheet: Dispatch<SetStateAction<boolean>>;
  isOpenUpdateControlSheet: boolean;
  setIsOpenUpdateControlSheet: Dispatch<SetStateAction<boolean>>;
  createControlHandler: (
    values: z.infer<typeof CreateControlSchema>
  ) => Promise<void>;
  isLoadingCreateControl: boolean;
  updateControlHandler: (
    values: z.infer<typeof UpdateControlSchema>
  ) => Promise<void>;
  isLoadingUpdateControl: boolean;
};

const ControlPresenter = memo(
  ({
    controls,
    selectedId,
    setSelectedId,
    isDraggable,
    setIsDraggable,
    isOpenCreateControlSheet,
    setIsOpenCreateControlSheet,
    isOpenUpdateControlSheet,
    setIsOpenUpdateControlSheet,
    createControlHandler,
    isLoadingCreateControl,
    updateControlHandler,
    isLoadingUpdateControl,
  }: ControlPresenterProps) => (
    <div className="mt-6 w-full px-8 sm:px-10">
      <Tabs defaultValue="manual" className="space-y-4">
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
            onClick={() => setIsDraggable(!isDraggable)}
          >
            {isDraggable ? "完了" : "並び替え"}
          </Button>
        </HStack>
        <TabsContent value="manual">
          <Card className="border-none shadow-none sm:border-dashed">
            <CardContent className="px-0 py-4 sm:p-6">
              <ScrollArea className="sm:h-[500px]">
                {controls.length === 0 ? (
                  <ControlPlaceholder
                    onOpenCreateControlSheet={setIsOpenCreateControlSheet}
                  />
                ) : (
                  <ControlGrid
                    isDraggable={isDraggable}
                    controls={controls.filter(
                      (control) => control.type === "manual"
                    )}
                    onClickControlButton={() => {}}
                    onOpenUpdateControlSheet={(controlId: number) => {
                      setSelectedId(controlId);
                      setIsOpenUpdateControlSheet(true);
                    }}
                  />
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="auto">
          <Card className="border-none shadow-none sm:border-dashed">
            <CardContent className="px-0 py-4 sm:p-6">
              <ScrollArea className="sm:h-[500px]">
                {controls.length === 0 ? (
                  <ControlPlaceholder
                    onOpenCreateControlSheet={setIsOpenCreateControlSheet}
                  />
                ) : (
                  <ControlGrid
                    isDraggable={isDraggable}
                    controls={controls.filter(
                      (control) => control.type === "auto"
                    )}
                    onClickControlButton={() => {}}
                    onOpenUpdateControlSheet={(controlId: number) => {
                      setSelectedId(controlId);
                      setIsOpenUpdateControlSheet(true);
                    }}
                  />
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Button
        variant="brand"
        className="fixed bottom-8 right-8 z-fab size-12 rounded-full shadow-md"
        onClick={() => setIsOpenCreateControlSheet(true)}
      >
        <Plus className="size-6" />
      </Button>
      <CreateControlSheet
        isOpen={isOpenCreateControlSheet}
        setIsOpen={setIsOpenCreateControlSheet}
        createControlHandler={createControlHandler}
        isLoadingCreateControl={isLoadingCreateControl}
      />
      {selectedId && (
        <UpdateControlSheet
          controlId={selectedId}
          isOpen={isOpenUpdateControlSheet}
          setIsOpen={setIsOpenUpdateControlSheet}
          updateControlHandler={updateControlHandler}
          isLoadingUpdateControl={isLoadingUpdateControl}
        />
      )}
    </div>
  )
);

export default ControlPresenter;
