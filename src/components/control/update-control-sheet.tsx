"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UpdateControlSchema } from "@/schemas";
import { VStack } from "../ui/vstack";
import UpdateControlForm from "./update-control-form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import useBreakpoint from "@/hooks/use-breakpoint";
import { createBrowserClient } from "@/functions/browser";
import { getControls } from "@/functions/query";
import { ControlEvent, ControlType } from "@/types";

type UpdateControlSheetProps = {
  controlId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  updateControlHandler: (
    values: z.infer<typeof UpdateControlSchema>
  ) => Promise<void>;
  isLoadingUpdateControl: boolean;
};

const UpdateControlSheet = memo(
  ({
    controlId,
    isOpen,
    setIsOpen,
    updateControlHandler,
    isLoadingUpdateControl,
  }: UpdateControlSheetProps) => {
    const breakpoint = useBreakpoint();

    const [error, setError] = useState("");

    const supabase = createBrowserClient();
    const controls = useQuery(getControls(supabase, "controlId", controlId));

    const form = useForm<z.infer<typeof UpdateControlSchema>>({
      resolver: zodResolver(UpdateControlSchema),
      defaultValues: {
        name: "",
        type: "manual",
        event: "on-off",
        command: "",
      },
    });

    useEffect(() => {
      const control = controls.data?.[0];

      if (control) {
        form.reset({
          name: control.name,
          type: control.type as ControlType,
          event: control.event as ControlEvent,
          command: control.command,
        });
      }
    }, [controls.data, form]);

    const onSubmit = async (values: z.infer<typeof UpdateControlSchema>) => {
      setError("");

      try {
        await updateControlHandler(values);

        toast.success("コントロールを更新しました");
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
                <DrawerTitle>コントロールの作成</DrawerTitle>
                <DrawerDescription className="text-xs">
                  コマンドを入力してコントロールを作成しましょう。
                </DrawerDescription>
              </DrawerHeader>
              <UpdateControlForm
                form={form}
                onSubmit={onSubmit}
                onCancel={() => {
                  setIsOpen(false);
                  form.reset();
                }}
                error={error}
                isLoading={isLoadingUpdateControl}
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
              <DialogTitle>コントロールの更新</DialogTitle>
              <DialogDescription className="text-xs">
                コマンドを入力してコントロールを更新しましょう。
              </DialogDescription>
            </DialogHeader>
            <UpdateControlForm
              form={form}
              onSubmit={onSubmit}
              onCancel={() => {
                setIsOpen(false);
                form.reset();
              }}
              error={error}
              isLoading={isLoadingUpdateControl}
            />
          </VStack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default UpdateControlSheet;
