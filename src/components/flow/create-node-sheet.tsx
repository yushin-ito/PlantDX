"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, memo, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CreateNodeSchema } from "@/schemas";
import { VStack } from "../ui/vstack";
import { SensorType } from "@/types";
import { createBrowserClient } from "@/functions/browser";
import { getSensors } from "@/functions/query";
import CreateNodeForm from "./create-node-form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import useBreakpoint from "@/hooks/use-breakpoint";

const labels: Record<SensorType, string> = {
  temperature: "温度",
  humidity: "湿度",
  pressure: "圧力",
  volume: "容量",
};

type CreateNodeSheetProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createNodeHandler: (
    values: z.infer<typeof CreateNodeSchema>
  ) => Promise<void>;
  isLoadingCreateNode: boolean;
};

const CreateNodeSheet = memo(
  ({
    isOpen,
    setIsOpen,
    createNodeHandler,
    isLoadingCreateNode,
  }: CreateNodeSheetProps) => {
    const breakpoint = useBreakpoint();

    const [error, setError] = useState("");

    const supabase = createBrowserClient();

    const form = useForm<z.infer<typeof CreateNodeSchema>>({
      resolver: zodResolver(CreateNodeSchema),
      defaultValues: {
        name: "",
        types: [],
        sensorId: {
          temperature: "",
          humidity: "",
          pressure: "",
          volume: "",
        },
      },
    });

    const onSubmit = async (values: z.infer<typeof CreateNodeSchema>) => {
      setError("");

      try {
        await Promise.all(
          values.types.map(async (type) => {
            const sensorId = Number(values.sensorId[type]);
            if (sensorId) {
              const sensors = await getSensors(supabase, "sensorId", sensorId);

              if (!sensors.data || sensors.data.length === 0) {
                setError(`${labels[type]}センサーが見つかりません。`);
                return;
              }
            }
          })
        );

        await createNodeHandler(values);

        toast.success("ノードを作成しました");
        setIsOpen(false);

        form.reset();
      } catch {
        setError("エラーが発生しました。");
      }
    };

    if (breakpoint === "sm" || breakpoint === "md") {
      return (
        <Drawer
          open={isOpen}
          onOpenChange={() => {
            setIsOpen(!isOpen);
            form.reset();
          }}
        >
          <DrawerContent>
            <VStack className="space-y-6">
              <DrawerHeader className="space-y-1">
                <DrawerTitle>ノードの作成</DrawerTitle>
                <DrawerDescription className="text-xs">
                  センサーを選択してノードを作成しましょう。
                </DrawerDescription>
              </DrawerHeader>
              <CreateNodeForm
                form={form}
                onSubmit={onSubmit}
                onCancel={() => setIsOpen(false)}
                error={error}
                isLoading={isLoadingCreateNode}
              />
            </VStack>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          form.reset();
        }}
      >
        <DialogContent>
          <VStack className="space-y-6">
            <DialogHeader className="space-y-2">
              <DialogTitle>ノードの作成</DialogTitle>
              <DialogDescription className="text-xs">
                センサーを選択してノードを作成しましょう。
              </DialogDescription>
            </DialogHeader>
            <CreateNodeForm
              form={form}
              onSubmit={onSubmit}
              onCancel={() => setIsOpen(false)}
              error={error}
              isLoading={isLoadingCreateNode}
            />
          </VStack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default CreateNodeSheet;
