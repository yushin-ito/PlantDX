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
} from "./ui/dialog";
import { CreatePlantSchema } from "@/schemas";
import { VStack } from "./ui/vstack";
import { getDevices } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";
import CreatePlantForm from "./create-plant-form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import useBreakpoint from "@/hooks/use-breakpoint";

type CreatePlantSheetProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createPlantHandler: (
    values: z.infer<typeof CreatePlantSchema>
  ) => Promise<void>;
  isLoadingCreatePlant: boolean;
};

const CreatePlantSheet = memo(
  ({
    isOpen,
    setIsOpen,
    createPlantHandler,
    isLoadingCreatePlant,
  }: CreatePlantSheetProps) => {
    const breakpoint = useBreakpoint();

    const [error, setError] = useState("");

    const supabase = createBrowserClient();

    const form = useForm<z.infer<typeof CreatePlantSchema>>({
      resolver: zodResolver(CreatePlantSchema),
      defaultValues: {
        name: "",
        deviceId: "",
        template: "none",
      },
    });

    const onSubmit = async (values: z.infer<typeof CreatePlantSchema>) => {
      setError("");

      try {
        const devices = await getDevices(supabase, "deviceId", values.deviceId);

        if (!devices.data || devices.data.length === 0) {
          setError("デバイスが見つかりません。");
          return;
        }

        await createPlantHandler(values);

        toast.success("プラントを作成しました");
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
                <DrawerTitle>プラントの作成</DrawerTitle>
                <DrawerDescription className="text-xs">
                  プラントのIDを入力してプラントを作成しましょう。
                </DrawerDescription>
              </DrawerHeader>
              <CreatePlantForm
                form={form}
                onSubmit={onSubmit}
                onCancel={() => {
                  setIsOpen(false);
                  form.reset();
                }}
                error={error}
                isLoading={isLoadingCreatePlant}
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
              <DialogTitle>プラントの作成</DialogTitle>
              <DialogDescription className="text-xs">
                プラントのIDを入力してプラントを作成しましょう。
              </DialogDescription>
            </DialogHeader>
            <CreatePlantForm
              form={form}
              onSubmit={onSubmit}
              onCancel={() => {
                setIsOpen(false);
                form.reset();
              }}
              error={error}
              isLoading={isLoadingCreatePlant}
            />
          </VStack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default CreatePlantSheet;
