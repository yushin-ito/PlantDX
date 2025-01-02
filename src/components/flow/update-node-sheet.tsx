"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UpdateNodeSchema } from "@/schemas";
import { VStack } from "../ui/vstack";
import { SensorType } from "@/types";
import { getNodes, getSensors } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";
import UpdateNodeForm from "./update-node-form";
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

type UpdateNodeSheetProps = {
  nodeId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  updateNodeHandler: (
    values: z.infer<typeof UpdateNodeSchema>
  ) => Promise<void>;
  isLoadingUpdateNode: boolean;
};

const UpdateNodeSheet = memo(
  ({
    nodeId,
    isOpen,
    setIsOpen,
    updateNodeHandler,
    isLoadingUpdateNode,
  }: UpdateNodeSheetProps) => {
    const breakpoint = useBreakpoint();

    const [error, setError] = useState("");

    const supabase = createBrowserClient();
    const nodes = useQuery(getNodes(supabase, "nodeId", nodeId));
    const sensors = useQuery(getSensors(supabase, "nodeId", nodeId));

    const form = useForm<z.infer<typeof UpdateNodeSchema>>({
      resolver: zodResolver(UpdateNodeSchema),
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

    useEffect(() => {
      const node = nodes.data?.[0];

      if (node && sensors.data && sensors.data.length > 0) {
        form.reset({
          name: node.name,
          types: node.type as SensorType[],
          sensorId: {
            temperature: sensors.data
              .find((sensor) => sensor.type === "temperature")
              ?.sensorId.toString(),
            humidity: sensors.data
              .find((sensor) => sensor.type === "humidity")
              ?.sensorId.toString(),
            pressure: sensors.data
              .find((sensor) => sensor.type === "pressure")
              ?.sensorId.toString(),
            volume: sensors.data
              .find((sensor) => sensor.type === "volume")
              ?.sensorId.toString(),
          },
        });
      }
    }, [form, nodes.data, sensors.data]);

    const onSubmit = useCallback(
      async (values: z.infer<typeof UpdateNodeSchema>) => {
        setError("");

        try {
          await Promise.all(
            values.types.map(async (type) => {
              const sensorId = Number(values.sensorId[type]);
              if (sensorId) {
                const sensors = await getSensors(
                  supabase,
                  "sensorId",
                  sensorId
                );

                if (!sensors.data || sensors.data.length === 0) {
                  setError(`${labels[type]}センサーが見つかりません。`);
                  return;
                }
              }
            })
          );

          await updateNodeHandler(values);

          toast.success("ノードを更新しました");
          setIsOpen(false);

          form.reset();
        } catch {
          setError("エラーが発生しました。");
        }
      },
      [form, supabase, updateNodeHandler, setIsOpen]
    );

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
                <DrawerTitle>ノードの更新</DrawerTitle>
                <DrawerDescription className="text-xs">
                  センサーを選択してノードを更新しましょう。
                </DrawerDescription>
              </DrawerHeader>
            </VStack>

            <UpdateNodeForm
              form={form}
              onSubmit={onSubmit}
              onCancel={() => setIsOpen(false)}
              error={error}
              isMutating={isLoadingUpdateNode}
            />
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
              <DialogTitle>ノードの更新</DialogTitle>
              <DialogDescription className="text-xs">
                センサーを選択してノードを更新しましょう。
              </DialogDescription>
            </DialogHeader>

            <UpdateNodeForm
              form={form}
              onSubmit={onSubmit}
              onCancel={() => setIsOpen(false)}
              error={error}
              isMutating={isLoadingUpdateNode}
            />
          </VStack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default UpdateNodeSheet;
